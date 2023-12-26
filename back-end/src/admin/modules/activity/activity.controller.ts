import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuardAdmin } from '@/auth/modules/auth/guards/jwt-auth-admin.guard';
import { CreateActivityDto, PaginateActivityDto } from './activity.dto';
import { ParamIdDto } from '@/global/dto/param-id.dto';

@ApiTags('Activity')
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async paginate(@Query() query: PaginateActivityDto) {
    return await this.activityService.paginate(query);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async create(@Body() body: CreateActivityDto, @Req() { user }) {
    return await this.activityService.create(body, user);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async update(@Body() body: CreateActivityDto, @Param() { id }: ParamIdDto) {
    return await this.activityService.update(body, id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async delete(@Param() { id }: ParamIdDto) {
    return await this.activityService.delete(id);
  }
}
