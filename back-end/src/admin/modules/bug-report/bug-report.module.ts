import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BugReportController } from './bug-report.controller';
import { BugReportService } from './bug-report.service';
import { BugReportSchema } from './bug-report.model';
import { CoreAuthModule } from '@/auth/modules/auth/core.auth.module';

@Module({
  imports: [
    CoreAuthModule,
    MongooseModule.forFeatureAsync([
      {
        name: 'bug-report',
        useFactory: () => {
          const schema = BugReportSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
  ],
  providers: [BugReportService],
  controllers: [BugReportController],
})
export class BugReportModule {}
