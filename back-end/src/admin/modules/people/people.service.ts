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
  ) {
    this.ensureProjectMemberIndexes();
  }

  private async ensureProjectMemberIndexes() {
    try {
      const indexes = await this.peopleModel.collection.indexes();
      const legacyUniqueUserIndex = indexes.find((index) => {
        const keys = Object.keys(index.key || {});
        return index.unique && keys.length === 1 && index.key.userId === 1;
      });

      if (legacyUniqueUserIndex?.name) {
        await this.peopleModel.collection.dropIndex(legacyUniqueUserIndex.name);
      }

      await this.peopleModel.collection.createIndex(
        { projectId: 1, userId: 1 },
        { unique: true, name: 'project_user_unique' },
      );
    } catch (error) {
      console.log('error ensuring people indexes: ', error);
    }
  }

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
    await this.ensureProjectMemberIndexes();

    const people = {
      ...body,
      userId: new Types.ObjectId(body.userId),
      projectId: new Types.ObjectId(body.projectId),
      createdBy: {
        _id: new Types.ObjectId(_id),
        email,
      },
    };

    const { role, ...peopleOnInsert } = people;

    return await this.peopleModel.findOneAndUpdate(
      {
        projectId: people.projectId,
        userId: people.userId,
      },
      {
        $set: {
          role,
          updatedAt: new Date(),
        },
        $setOnInsert: peopleOnInsert,
      },
      { new: true, upsert: true },
    );
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
