import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BugReportModule } from './modules/bug-report/bug-report.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/boosticket'),
    BugReportModule,
  ],
})
export class AdminAppModule {}
