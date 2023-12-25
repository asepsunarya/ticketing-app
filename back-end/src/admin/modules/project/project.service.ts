import { Injectable } from '@nestjs/common';
import { Project, PaginateProject } from './project.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectDocument } from './project.model';
import { Model, PaginateModel, Types } from 'mongoose';
import { User } from '@/global/entity/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('project')
    private projectModel: Model<ProjectDocument> &
      PaginateModel<ProjectDocument>,
  ) {}

  async paginate(query: PaginateProject) {
    const filter = {};
    if (query.search) filter['search'] = query.search;
    return await this.projectModel.paginate(filter, {
      page: query.page,
      limit: query.limit,
    });
  }

  async create(body: Project, { _id, email }: User) {
    const project = {
      ...body,
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
      { $set: body },
    );
  }

  async delete(id: string) {
    return await this.projectModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
