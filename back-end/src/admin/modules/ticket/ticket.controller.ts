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
import { TicketService } from './ticket.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuardAdmin } from '@/auth/modules/auth/guards/jwt-auth-admin.guard';
import { CreateTicketDto, PaginateTicketDto } from './ticket.dto';
import { ParamIdDto } from '@/global/dto/param-id.dto';
import { User } from '@/global/entity/user.entity';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async paginate(
    @Query() query: PaginateTicketDto,
    @Req() { user }: { user: User },
  ) {
    return await this.ticketService.paginate(query, String(user._id));
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async detail(@Param() { id }: ParamIdDto) {
    return await this.ticketService.findOne(id);
  }

  @Get('count/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async countTicket(@Param() { id }: ParamIdDto, @Req() { user }) {
    return await this.ticketService.count(id, user);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async create(@Body() body: CreateTicketDto, @Req() { user }) {
    return await this.ticketService.create(body, user);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async update(
    @Body() body: CreateTicketDto,
    @Param() { id }: ParamIdDto,
    @Req() { user },
  ) {
    return await this.ticketService.update(body, id, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async delete(@Param() { id }: ParamIdDto) {
    return await this.ticketService.delete(id);
  }
}
