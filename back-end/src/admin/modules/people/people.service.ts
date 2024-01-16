import { Injectable } from '@nestjs/common';
import { People, PaginatePeople } from './people.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PeopleDocument } from './people.model';
import { Model, AggregatePaginateModel, Types } from 'mongoose';
import { User } from '@/global/entity/user.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel('people')
    private peopleModel: Model<PeopleDocument> &
      AggregatePaginateModel<PeopleDocument>,
  ) {}

  async paginate(query: PaginatePeople) {
    const filter = {
      projectId: new Types.ObjectId(query.projectId),
    };
    const searchFilter = {};
    if (query.search)
      searchFilter['$or'] = [
        { name: new RegExp(query.search, 'i') },
        { email: new RegExp(query.search, 'i') },
      ];
    const pipeline = this.peopleModel.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          role: '$role',
          userId: '$user._id',
          name: '$user.name',
          email: '$user.email',
          photo: '$user.photo',
        },
      },
      { $match: searchFilter },
    ]);
    return await this.peopleModel.aggregatePaginate(pipeline, {
      page: query.page,
      limit: query.limit,
    });
  }

  async create(body: People, { _id, email }: User) {
    const people = {
      ...body,
      userId: new Types.ObjectId(body.userId),
      projectId: new Types.ObjectId(body.projectId),
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
