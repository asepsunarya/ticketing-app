import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from '../user/dto/user.dto';
import { UserDocument } from '../user/user.model';
import { UserService } from '../user/user.service';

@Controller()
@ApiTags('Login')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

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

  @Post('signup')
  async createUser(@Body() body: SignupDto): Promise<UserDocument> {
    const saltOrRounds = 10;
    if (!body.password) body.password = '123456';
    const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);
    return await this.userService.createUser({
      ...body,
      password: hashedPassword,
    });
  }
}
