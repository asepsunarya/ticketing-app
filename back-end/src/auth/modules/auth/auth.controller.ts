import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards()
  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @UseGuards()
  @Post('login/admin')
  async loginAdmin(@Body() { email, password }: LoginDto) {
    return this.authService.loginAdmin(email, password);
  }
}
