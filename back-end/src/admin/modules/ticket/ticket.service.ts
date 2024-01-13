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

  async paginate(query: PaginateTicket) {
    const filter = {
      projectId: new Types.ObjectId(query.projectId),
    };
    if (query.search)
      filter['$or'] = [
        { feature: new RegExp(query.search, 'i') },
        { description: new RegExp(query.search, 'i') },
      ];
    if (query.isAssigned) filter['assignedBy'] = { $exists: false };
    return await this.ticketModel.paginate(filter, {
      page: query.page,
      limit: query.limit,
    });
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
      ticket['assignedBy'] = {
        _id: new Types.ObjectId(body.assignedBy._id),
        name: body.assignedBy.name,
        email: body.assignedBy.email,
        photo: body.assignedBy.photo,
      };
    }
    return await this.ticketModel.create(ticket);
  }

  async update(body: Ticket, id: string) {
    return await this.ticketModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: body },
    );
  }

  async delete(id: string) {
    return await this.ticketModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
