import { Injectable, NotFoundException } from '@nestjs/common';
import { Ticket, PaginateTicket } from './ticket.entity';
import { InjectModel } from '@nestjs/mongoose';
import { TicketDocument } from './ticket.model';
import { Model, PaginateModel, Types } from 'mongoose';
import { User } from '@/global/entity/user.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel('ticket')
    private ticketModel: Model<TicketDocument> & PaginateModel<TicketDocument>,
  ) {}

  async paginate(query: PaginateTicket, userId: string) {
    const filter = {
      projectId: new Types.ObjectId(query.projectId),
      createdAt: {
        $gte: new Date(Number(query.year), 0, 1), // Start of the target year
        $lt: new Date(Number(query.year) + 1, 0, 1), // Start of the next year
      },
    };
    if (query.status != 'me' && query.status != 'undefined') {
      filter['status'] = query.status;
    } else if (query.status == 'me') {
      filter['assignedBy._id'] = new Types.ObjectId(userId);
    }

    if (query.search) {
      filter['$or'] = [
        { feature: new RegExp(query.search, 'i') },
        { description: new RegExp(query.search, 'i') },
      ];
    }
    if (query.isAssigned) filter['assignedBy'] = { $exists: false };
    return await this.ticketModel.paginate(filter, {
      page: query.page,
      limit: query.limit,
    });
  }

  async findOne(id: string) {
    return await this.ticketModel.findOne({ _id: new Types.ObjectId(id) });
  }

  async findCustomerTicket(id: string, userId: string) {
    const ticket = await this.ticketModel.findOne({
      _id: new Types.ObjectId(id),
      'createdBy._id': new Types.ObjectId(userId),
    });
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  async paginateCustomer(query: PaginateTicket, userId: string) {
    const filter = {
      'createdBy._id': new Types.ObjectId(userId),
      createdAt: {
        $gte: new Date(Number(query.year), 0, 1),
        $lt: new Date(Number(query.year) + 1, 0, 1),
      },
    };

    if (query.projectId) filter['projectId'] = new Types.ObjectId(query.projectId);
    if (query.status && query.status != 'undefined') filter['status'] = query.status;
    if (query.search) {
      filter['$or'] = [
        { feature: new RegExp(query.search, 'i') },
        { description: new RegExp(query.search, 'i') },
      ];
    }

    return await this.ticketModel.paginate(filter, {
      page: query.page,
      limit: query.limit,
    });
  }

  async count(projectId: string, user: User) {
    const [all, me, open, inprogress, closed, pending] = await Promise.all([
      this.generateCount(projectId, 'all'),
      this.generateCount(projectId, 'all', user._id),
      this.generateCount(projectId, 'open'),
      this.generateCount(projectId, 'inprogress'),
      this.generateCount(projectId, 'closed'),
      this.generateCount(projectId, 'pending'),
    ]);
    return { all, me, open, inprogress, closed, pending };
  }

  async create(body: Ticket, { _id, name, email, photo }: User) {
    const ticket = {
      ...body,
      projectId: new Types.ObjectId(body.projectId),
      reportBy: {
        _id: new Types.ObjectId(body.reportBy._id),
        name: body.reportBy.name,
        email: body.reportBy.email,
        photo: body.reportBy.photo,
      },
      createdBy: {
        _id: new Types.ObjectId(_id),
        name,
        email,
        photo,
      },
    };
    if (body.assignedBy?._id) {
      ticket['assignedBy._id'] = new Types.ObjectId(body.assignedBy._id);
    }
    return await this.ticketModel.create(ticket);
  }

  async createCustomerTicket(
    body: Pick<Ticket, 'projectId' | 'feature' | 'description' | 'urgencyLevel' | 'releaseStatus' | 'files'>,
    { _id, name, email, photo }: User,
  ) {
    const customer = {
      _id: new Types.ObjectId(_id),
      name,
      email,
      photo,
    };
    return await this.ticketModel.create({
      projectId: new Types.ObjectId(body.projectId),
      feature: body.feature,
      description: body.description,
      email,
      urgencyLevel: body.urgencyLevel || 'standard',
      releaseStatus: body.releaseStatus || 'old',
      status: 'open',
      reportBy: customer,
      createdBy: customer,
      files: body.files || [],
      comments: [],
    });
  }

  async reopenCustomerTicket(id: string, userId: string, user: User) {
    await this.findCustomerTicket(id, userId);
    return await this.ticketModel.updateOne(
      { _id: new Types.ObjectId(id) },
      {
        $set: {
          status: 'open',
          reason: '',
          solution: '',
          lastUpdatedBy: {
            _id: new Types.ObjectId(user?._id),
            name: user?.name,
            email: user?.email,
            photo: user?.photo,
          },
          updatedAt: new Date(),
        },
      },
    );
  }

  async addComment(id: string, description: string, { _id, name, email, photo }: User) {
    return await this.ticketModel.updateOne(
      { _id: new Types.ObjectId(id) },
      {
        $push: {
          comments: {
            description,
            createdBy: {
              _id: new Types.ObjectId(_id),
              name,
              email,
              photo,
            },
            createdAt: new Date(),
          },
        },
      },
    );
  }

  async update(body: Ticket, id: string, user: User) {
    const ticket = {
      ...body,
      lastUpdatedBy: {
        _id: new Types.ObjectId(user?._id),
        name: user?.name,
        email: user?.email,
        photo: user?.photo,
      },
    };
    if (body.assignedBy?._id) {
      ticket['assignedBy'] = {
        _id: new Types.ObjectId(body.assignedBy?._id),
        name: body.assignedBy?.name,
        email: body.assignedBy?.email,
        photo: body.assignedBy?.photo,
      };
    }
    return await this.ticketModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: ticket },
    );
  }

  async delete(id: string) {
    return await this.ticketModel.deleteOne({ _id: new Types.ObjectId(id) });
  }

  async generateCount(
    projectId: string,
    status?: string,
    userId?: string | Types.ObjectId,
  ) {
    const query = { projectId: new Types.ObjectId(projectId) };
    if (status != 'all') query['status'] = status;
    if (userId) query['assignedBy._id'] = new Types.ObjectId(userId);
    return this.ticketModel.countDocuments(query);
  }
}
