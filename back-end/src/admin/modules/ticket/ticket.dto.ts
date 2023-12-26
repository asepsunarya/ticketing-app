import { PaginationDto } from '@/global/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PaginateTicketDto extends PaginationDto {
  @ApiProperty({ default: '', required: false })
  search?: string;

  @ApiProperty({ default: false, required: false })
  isAssigned?: boolean;
}

export class CreateTicketDto {
  @ApiProperty({ default: 'manypage' })
  product: string;

  @ApiProperty({ default: '' })
  description: string;

  @ApiProperty({ default: 'user@manypage.id' })
  email: string;

  @ApiProperty({ default: [''] })
  screenshot: string[];

  @ApiProperty({ default: 1 })
  urgencyLevel: string;

  @ApiProperty({ default: 'user' })
  reportBy: string;

  @ApiProperty({ default: 'old' })
  releaseStatus: string;

  @ApiProperty({ default: 'open' })
  status: string;

  @ApiProperty({ required: false })
  solution?: string;

  @ApiProperty({ required: false })
  note?: string;
}
