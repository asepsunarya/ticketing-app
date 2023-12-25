import { Injectable } from '@nestjs/common';
import { TeamMember, PaginateTeamMember } from './team-member.entity';
import { InjectModel } from '@nestjs/mongoose';
import { TeamMemberDocument } from './team-member.model';
import { Model, PaginateModel, Types } from 'mongoose';
import { User } from '@/global/entity/user.entity';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectModel('team-member')
    private teamMemberModel: Model<TeamMemberDocument> &
      PaginateModel<TeamMemberDocument>,
  ) {}

  async paginate(query: PaginateTeamMember) {
    const filter = {};
    if (query.search) filter['search'] = query.search;
    return await this.teamMemberModel.paginate(filter, {
      page: query.page,
      limit: query.limit,
    });
  }

  async create(body: TeamMember, { _id, email }: User) {
    const teamMember = {
      ...body,
      createdBy: {
        _id: new Types.ObjectId(_id),
        email,
      },
    };
    return await this.teamMemberModel.create(teamMember);
  }

  async update(body: TeamMember, id: string) {
    return await this.teamMemberModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: body },
    );
  }

  async delete(id: string) {
    return await this.teamMemberModel.deleteOne({
      _id: new Types.ObjectId(id),
    });
  }
}
