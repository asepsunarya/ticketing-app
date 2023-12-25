import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CoreAuthModule } from './core.auth.module';

@Module({
  imports: [CoreAuthModule],
  controllers: [AuthController],
  exports: [CoreAuthModule],
})
export class AuthModule {}
