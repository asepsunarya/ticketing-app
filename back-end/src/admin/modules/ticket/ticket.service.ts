import { Injectable } from '@nestjs/common';
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
