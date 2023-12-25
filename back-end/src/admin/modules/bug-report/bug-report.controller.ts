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
import { BugReportService } from './bug-report.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuardAdmin } from '@/auth/modules/auth/guards/jwt-auth-admin.guard';
import { CreateBugReportDto, PaginateBugReportDto } from './bug-report.dto';
import { ParamIdDto } from '@/global/dto/param-id.dto';

@ApiTags('Bug Report')
@Controller('bug-report')
export class BugReportController {
  constructor(private readonly bugReportService: BugReportService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async paginate(@Query() query: PaginateBugReportDto) {
    return await this.bugReportService.paginate(query);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async create(@Body() body: CreateBugReportDto, @Req() { user }) {
    return await this.bugReportService.create(body, user);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async update(@Body() body: CreateBugReportDto, @Param() { id }: ParamIdDto) {
    return await this.bugReportService.update(body, id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async delete(@Param() { id }: ParamIdDto) {
    return await this.bugReportService.delete(id);
  }
}
