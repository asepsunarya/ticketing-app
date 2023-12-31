import { Injectable } from '@nestjs/common';
import { Project, PaginateProject } from './project.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectDocument } from './project.model';
import { AggregatePaginateModel, Model, Types } from 'mongoose';
import { User } from '@/global/entity/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('project')
    private projectModel: Model<ProjectDocument> &
      AggregatePaginateModel<ProjectDocument>,
  ) {}

  async find(query: any) {
    const results = await this.projectModel.aggregate([
      { $match: query },
      {
        $lookup: {
          from: 'users',
          localField: 'leader._id',
          foreignField: '_id',
          as: 'leader',
        },
      },
      {
        $unwind: '$leader',
      },
    ]);
    return results[0] || {};
  }

  async paginate(query: PaginateProject) {
    const filter = {};
    const pipeline = this.projectModel.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: 'users',
          localField: 'leader._id',
          foreignField: '_id',
          as: 'leader',
        },
      },
      {
        $unwind: '$leader',
      },
    ]);
    return await this.projectModel.aggregatePaginate(pipeline, {
      page: query.page,
      limit: query.limit,
    });
  }

  async create(body: Project, { _id, email }: User) {
    const project = {
      ...body,
      leader: {
        _id: new Types.ObjectId(body.leader._id),
        email: body.leader.email,
      },
      createdBy: {
        _id: new Types.ObjectId(_id),
        email,
      },
    };
    return await this.projectModel.create(project);
  }

  async update(body: Project, id: string) {
    return await this.projectModel.updateOne(
      { _id: new Types.ObjectId(id) },
      {
        $set: {
          ...body,
          leader: {
            _id: new Types.ObjectId(body.leader._id),
            email: body.leader.email,
          },
        },
      },
    );
  }

  async delete(id: string) {
    return await this.projectModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
