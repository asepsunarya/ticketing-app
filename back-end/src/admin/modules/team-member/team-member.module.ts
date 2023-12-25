import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMemberController } from './team-member.controller';
import { TeamMemberService } from './team-member.service';
import { TeamMemberSchema } from './team-member.model';
import { CoreAuthModule } from '@/auth/modules/auth/core.auth.module';

@Module({
  imports: [
    CoreAuthModule,
    MongooseModule.forFeatureAsync([
      {
        name: 'team-member',
        useFactory: () => {
          const schema = TeamMemberSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
  ],
  providers: [TeamMemberService],
  controllers: [TeamMemberController],
})
export class TeamMemberModule {}
