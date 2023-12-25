import { Injectable } from '@nestjs/common';
import { BugReport, PaginateBugReport } from './bug-report.entity';
import { InjectModel } from '@nestjs/mongoose';
import { BugReportDocument } from './bug-report.model';
import { Model, PaginateModel, Types } from 'mongoose';
import { User } from '@/global/entity/user.entity';

@Injectable()
export class BugReportService {
  constructor(
    @InjectModel('bug-report')
    private bugReportModel: Model<BugReportDocument> &
      PaginateModel<BugReportDocument>,
  ) {}

  async paginate(query: PaginateBugReport) {
    const filter = {};
    if (query.search) filter['search'] = query.search;
    if (query.isAssigned) filter['assignedBy'] = { $exists: false };
    return await this.bugReportModel.paginate(filter, {
      page: query.page,
      limit: query.limit,
    });
  }

  async create(body: BugReport, { _id, email }: User) {
    const bugReport = {
      ...body,
      createdBy: {
        _id: new Types.ObjectId(_id),
        email,
      },
    };
    return await this.bugReportModel.create(bugReport);
  }

  async update(body: BugReport, id: string) {
    return await this.bugReportModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: body },
    );
  }

  async delete(id: string) {
    return await this.bugReportModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
