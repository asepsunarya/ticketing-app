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
import { TeamService } from './team.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuardAdmin } from '@/auth/modules/auth/guards/jwt-auth-admin.guard';
import { CreateTeamDto, PaginateTeamDto } from './team.dto';
import { ParamIdDto } from '@/global/dto/param-id.dto';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async paginate(@Query() query: PaginateTeamDto) {
    return await this.teamService.paginate(query);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async create(@Body() body: CreateTeamDto, @Req() { user }) {
    return await this.teamService.create(body, user);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async update(@Body() body: CreateTeamDto, @Param() { id }: ParamIdDto) {
    return await this.teamService.update(body, id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async delete(@Param() { id }: ParamIdDto) {
    return await this.teamService.delete(id);
  }
}
