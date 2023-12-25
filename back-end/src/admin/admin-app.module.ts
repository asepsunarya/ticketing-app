import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketModule } from './modules/ticket/ticket.module';
import { ProjectModule } from './modules/project/project.module';
import { PeopleModule } from './modules/people/people.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/boosticket'),
    TicketModule,
    ProjectModule,
    PeopleModule,
  ],
})
export class AdminAppModule {}
