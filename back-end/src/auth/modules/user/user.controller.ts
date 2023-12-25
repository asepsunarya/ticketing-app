import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/user.dto';
import { UserDocument } from './user.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Signup')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/signup')
  async createUser(@Body() body: SignupDto): Promise<UserDocument> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);
    return await this.userService.createUser({
      ...body,
      password: hashedPassword,
    });
  }
}
