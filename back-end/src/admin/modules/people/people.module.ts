import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { PeopleSchema } from './people.model';
import { CoreAuthModule } from '@/auth/modules/auth/core.auth.module';

@Module({
  imports: [
    CoreAuthModule,
    MongooseModule.forFeatureAsync([
      {
        name: 'people',
        useFactory: () => {
          const schema = PeopleSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
  ],
  providers: [PeopleService],
  controllers: [PeopleController],
})
export class PeopleModule {}
