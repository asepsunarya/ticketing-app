import { Injectable } from '@nestjs/common';
import { Project, PaginateProject } from './project.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectDocument } from './project.model';
import { AggregatePaginateModel, Model, Types } from 'mongoose';
import { User } from '@/global/entity/user.entity';
import { PeopleService } from '../people/people.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('project')
    private projectModel: Model<ProjectDocument> &
      AggregatePaginateModel<ProjectDocument>,

    private peopleService: PeopleService,
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
    if (query.search) filter['name'] = new RegExp(query.search, 'i');
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

  async report(year: string) {
    const projects = await this.projectModel.find({});
    for (const project of projects) {
      const report = await this.getReport({
        year,
        month: '01',
        projectId: project._id,
      });
      console.log(report, 'report');
    }
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

    const result = await this.projectModel.create(project);
    const people = {
      projectId: result._id,
      userId: _id,
      role: 'admin',
    };
    await this.peopleService.create(people, { _id, email });
    return result;
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

  private async getReport({ year, month, projectId }) {
    return await this.projectModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(projectId),
        },
      },
      {
        $lookup: {
          from: 'tickets',
          localField: '_id',
          foreignField: 'projectId',
          as: 'tickets',
        },
      },
      {
        $project: {
          name: 1,
          closed: {
            $size: {
              $filter: {
                input: '$tickets',
                as: 'ticket',
                cond: { $eq: ['$$ticket.status', 'closed'] },
              },
            },
          },
          remainingTicketsCount: {
            $size: {
              $filter: {
                input: '$tickets',
                as: 'ticket',
                cond: { $ne: ['$$ticket.status', 'closed'] },
              },
            },
          },
          totalTicketsCount: { $size: '$tickets' },
          createdAt: 1,
        },
      },
      {
        $project: {
          name: 1,
          closed: 1,
          remainingTicketsCount: 1,
          totalTicketsCount: 1,
          openTicketsRate: {
            $cond: {
              if: { $eq: ['$totalTicketsCount', 0] },
              then: 0,
              else: {
                $multiply: [
                  { $divide: ['$remainingTicketsCount', '$totalTicketsCount'] },
                  100,
                ],
              },
            },
          },
          createdAt: 1,
        },
      },
    ]);
  }
}
