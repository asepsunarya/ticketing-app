import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamSchema } from './team.model';
import { CoreAuthModule } from '@/auth/modules/auth/core.auth.module';

@Module({
  imports: [
    CoreAuthModule,
    MongooseModule.forFeatureAsync([
      {
        name: 'team',
        useFactory: () => {
          const schema = TeamSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
  ],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
