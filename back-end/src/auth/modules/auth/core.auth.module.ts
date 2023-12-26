import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalStrategy } from './strategies/local.strategy';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAdminStrategy } from './strategies/jwt-admin.strategy';
import { UserSchema } from '../user/user.model';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    MongooseModule.forFeatureAsync([
      {
        name: 'user',
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    JwtAdminStrategy,
  ],
  exports: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    JwtAdminStrategy,
    MongooseModule,
  ],
})
export class CoreAuthModule {}
