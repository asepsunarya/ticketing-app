import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketModule } from './modules/ticket/ticket.module';
import { ProjectModule } from './modules/project/project.module';
import { PeopleModule } from './modules/people/people.module';
import { TeamModule } from './modules/team/team.module';
import { TeamMemberModule } from './modules/team-member/team-member.module';
import { ActivityModule } from './modules/activity/activity.module';
import { UserModule } from '@/auth/modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/boosticket'),
    TicketModule,
    ProjectModule,
    PeopleModule,
    TeamModule,
    TeamMemberModule,
    ActivityModule,
    UserModule,
  ],
})
export class AdminAppModule {}
