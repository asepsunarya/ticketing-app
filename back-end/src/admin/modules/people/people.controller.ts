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
import { PeopleService } from './people.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuardAdmin } from '@/auth/modules/auth/guards/jwt-auth-admin.guard';
import { CreatePeopleDto, PaginatePeopleDto } from './people.dto';
import { ParamIdDto } from '@/global/dto/param-id.dto';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async paginate(@Query() query: PaginatePeopleDto) {
    return await this.peopleService.paginate(query);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async create(@Body() body: CreatePeopleDto, @Req() { user }) {
    return await this.peopleService.create(body, user);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async update(@Body() body: CreatePeopleDto, @Param() { id }: ParamIdDto) {
    return await this.peopleService.update(body, id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async delete(@Param() { id }: ParamIdDto) {
    return await this.peopleService.delete(id);
  }
}
