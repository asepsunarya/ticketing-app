import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginateActivityDto {
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  page: number;

  @IsNotEmpty()
  @ApiProperty({ default: 10 })
  limit: number;

  @ApiProperty({ default: '', required: false })
  search?: string;
}

export class CreateActivityDto {
  @ApiProperty()
  ticketId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  teamId?: string;
}
