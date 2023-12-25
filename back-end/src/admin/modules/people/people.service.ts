import { Injectable } from '@nestjs/common';
import { People, PaginatePeople } from './people.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PeopleDocument } from './people.model';
import { Model, PaginateModel, Types } from 'mongoose';
import { User } from '@/global/entity/user.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel('people')
    private peopleModel: Model<PeopleDocument> & PaginateModel<PeopleDocument>,
  ) {}

  async paginate(query: PaginatePeople) {
    const filter = {};
    if (query.search) filter['search'] = query.search;
    return await this.peopleModel.paginate(filter, {
      page: query.page,
      limit: query.limit,
    });
  }

  async create(body: People, { _id, email }: User) {
    const people = {
      ...body,
      createdBy: {
        _id: new Types.ObjectId(_id),
        email,
      },
    };
    return await this.peopleModel.create(people);
  }

  async update(body: People, id: string) {
    return await this.peopleModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: body },
    );
  }

  async delete(id: string) {
    return await this.peopleModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
