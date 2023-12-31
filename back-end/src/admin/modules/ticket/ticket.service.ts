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
    const filter = {};
    if (query.search) filter['search'] = query.search;
    if (query.isAssigned) filter['assignedBy'] = { $exists: false };
    return await this.ticketModel.paginate(filter, {
      page: query.page,
      limit: query.limit,
    });
  }

  async create(body: Ticket, { _id, email }: User) {
    const ticket = {
      ...body,
      createdBy: {
        _id: new Types.ObjectId(_id),
        email,
      },
    };
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
