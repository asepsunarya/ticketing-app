import { Injectable } from '@nestjs/common';
import { Activity, PaginateActivity } from './activity.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ActivityDocument } from './activity.model';
import { Model, PaginateModel, Types } from 'mongoose';
import { User } from '@/global/entity/user.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel('activity')
    private activityModel: Model<ActivityDocument> &
      PaginateModel<ActivityDocument>,
  ) {}

  async paginate(query: PaginateActivity) {
    const filter = {};
    if (query.search) filter['search'] = query.search;
    return await this.activityModel.paginate(filter, {
      page: query.page,
      limit: query.limit,
    });
  }

  async create(body: Activity, { _id, email }: User) {
    const activity = {
      ...body,
      createdBy: {
        _id: new Types.ObjectId(_id),
        email,
      },
    };
    return await this.activityModel.create(activity);
  }

  async update(body: Activity, id: string) {
    return await this.activityModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: body },
    );
  }

  async delete(id: string) {
    return await this.activityModel.deleteOne({
      _id: new Types.ObjectId(id),
    });
  }
}
