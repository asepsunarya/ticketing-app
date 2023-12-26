import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CoreAuthModule } from '../auth/core.auth.module';

@Module({
  imports: [CoreAuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
