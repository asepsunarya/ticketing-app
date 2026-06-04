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
import { JwtAuthGuard } from '@/auth/modules/auth/guards/jwt-auth.guard';
import {
  CreateCustomerTicketDto,
  CreateTicketCommentDto,
  CreateTicketDto,
  PaginateTicketDto,
} from './ticket.dto';
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

  @Get('customer/list')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async paginateCustomer(@Query() query: PaginateTicketDto, @Req() { user }) {
    return await this.ticketService.paginateCustomer(query, String(user._id));
  }

  @Get('customer/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async detailCustomer(@Param() { id }: ParamIdDto, @Req() { user }) {
    return await this.ticketService.findCustomerTicket(id, String(user._id));
  }

  @Get('count/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async countTicket(@Param() { id }: ParamIdDto, @Req() { user }) {
    return await this.ticketService.count(id, user);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async detail(@Param() { id }: ParamIdDto) {
    return await this.ticketService.findOne(id);
  }

  @Post('customer')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createCustomer(@Body() body: CreateCustomerTicketDto, @Req() { user }) {
    return await this.ticketService.createCustomerTicket(body, user);
  }

  @Post(':id/comment')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardAdmin)
  async createCommentAdmin(
    @Param() { id }: ParamIdDto,
    @Body() body: CreateTicketCommentDto,
    @Req() { user },
  ) {
    return await this.ticketService.addComment(id, body.description, user);
  }

  @Post('customer/:id/comment')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createCommentCustomer(
    @Param() { id }: ParamIdDto,
    @Body() body: CreateTicketCommentDto,
    @Req() { user },
  ) {
    await this.ticketService.findCustomerTicket(id, String(user._id));
    return await this.ticketService.addComment(id, body.description, user);
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
