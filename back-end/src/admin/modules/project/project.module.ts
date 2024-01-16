import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectSchema } from './project.model';
import { CoreAuthModule } from '@/auth/modules/auth/core.auth.module';
import { PeopleModule } from '../people/people.module';

@Module({
  imports: [
    CoreAuthModule,
    PeopleModule,
    MongooseModule.forFeatureAsync([
      {
        name: 'project',
        useFactory: () => {
          const schema = ProjectSchema;
          schema.plugin(mongoosePaginate);
          schema.plugin(mongooseAggregatePaginate);
          return schema;
        },
      },
    ]),
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
