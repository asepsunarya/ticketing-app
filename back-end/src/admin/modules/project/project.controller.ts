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
import { ProjectService } from './project.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuardAdmin } from '@/auth/modules/auth/guards/jwt-auth-admin.guard';
import { CreateProjectDto, PaginateProjectDto } from './project.dto';
import { ParamIdDto } from '@/global/dto/param-id.dto';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async get(@Param() { id }: ParamIdDto) {
    return await this.projectService.find({ code: id });
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async paginate(@Query() query: PaginateProjectDto) {
    return await this.projectService.paginate(query);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async create(@Body() body: CreateProjectDto, @Req() { user }) {
    return await this.projectService.create(body, user);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async update(@Body() body: CreateProjectDto, @Param() { id }: ParamIdDto) {
    return await this.projectService.update(body, id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async delete(@Param() { id }: ParamIdDto) {
    return await this.projectService.delete(id);
  }
}
