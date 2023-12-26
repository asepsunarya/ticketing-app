import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUserDto } from './dto/user.dto';
import { JwtAuthGuardAdmin } from '../auth/guards/jwt-auth-admin.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async get(
    @Query() { role, search, includeSelf, page, limit }: GetUserDto,
    @Req() { user },
  ) {
    const filterRole = role != 'user' ? { $ne: 'user' } : 'user';
    const query = {
      role: filterRole,
      $or: [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
      ],
    };
    if (!includeSelf) query['_id'] = { $ne: user._id };
    return await this.userService.paginate(query, { page, limit });
  }
}
