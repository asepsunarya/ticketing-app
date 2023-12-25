import { Injectable } from '@nestjs/common';
import { Team, PaginateTeam } from './team.entity';
import { InjectModel } from '@nestjs/mongoose';
import { TeamDocument } from './team.model';
import { Model, PaginateModel, Types } from 'mongoose';
import { User } from '@/global/entity/user.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel('team')
    private teamModel: Model<TeamDocument> & PaginateModel<TeamDocument>,
  ) {}

  async paginate(query: PaginateTeam) {
    const filter = {};
    if (query.search) filter['search'] = query.search;
    return await this.teamModel.paginate(filter, {
      page: query.page,
      limit: query.limit,
    });
  }

  async create(body: Team, { _id, email }: User) {
    const team = {
      ...body,
      createdBy: {
        _id: new Types.ObjectId(_id),
        email,
      },
    };
    return await this.teamModel.create(team);
  }

  async update(body: Team, id: string) {
    return await this.teamModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: body },
    );
  }

  async delete(id: string) {
    return await this.teamModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
