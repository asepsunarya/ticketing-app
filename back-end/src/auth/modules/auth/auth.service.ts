import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
    role?: string | string[],
  ): Promise<any> {
    const query = { email };
    if (role) query['role'] = role;
    const user = await this.userService.getUser(query);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password, 'user');
    if (user) {
      const payload = { userId: user._id, email: user.email, role: user.role };
      return {
        user,
        accessToken: this.jwtService.sign(payload, {
          secret: jwtConstants.secret,
        }),
      };
    }
    throw new NotFoundException('user not found');
  }

  async loginAdmin(email: string, password: string) {
    const roles = ['admin', 'programmer', 'customer-service', 'product-owner'];
    const user = await this.validateUser(email, password, roles);
    if (user) {
      const payload = {
        userId: user._id,
        email: user.email,
        role: user.role,
      };
      return {
        user,
        accessToken: this.jwtService.sign(payload, {
          secret: jwtConstants.secret,
        }),
      };
    }
    throw new NotFoundException('user not found');
  }
}
