import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ActivitySchema } from './activity.model';
import { CoreAuthModule } from '@/auth/modules/auth/core.auth.module';

@Module({
  imports: [
    CoreAuthModule,
    MongooseModule.forFeatureAsync([
      {
        name: 'activity',
        useFactory: () => {
          const schema = ActivitySchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
  ],
  providers: [ActivityService],
  controllers: [ActivityController],
})
export class ActivityModule {}
