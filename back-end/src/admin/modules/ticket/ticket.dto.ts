import { PaginationDto } from '@/global/dto/pagination.dto';
import { UserDto } from '@/global/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginateTicketDto extends PaginationDto {
  @IsNotEmpty()
  @ApiProperty({ default: '' })
  projectId: string;

  @ApiProperty({ default: '2024' })
  year: string;

  @ApiProperty({ default: '' })
  status?: string;

  @ApiProperty({ default: '', required: false })
  search?: string;

  @ApiProperty({ default: false, required: false })
  isAssigned?: boolean;
}

export class CreateTicketDto {
  @ApiProperty({ default: '658d2611d9a82ee5abff1fef' })
  projectId: string;

  @IsNotEmpty()
  @ApiProperty({ default: '' })
  feature: string;

  @IsNotEmpty()
  @ApiProperty({ default: '' })
  description: string;

  @ApiProperty({ default: 'user@manypage.id' })
  email: string;

  @ApiProperty({ default: 1 })
  urgencyLevel: string;

  @ApiProperty()
  reportBy: UserDto;

  @ApiProperty({ default: 'old' })
  releaseStatus: string;

  @ApiProperty({ default: 'open' })
  status: string;

  @ApiProperty({ type: UserDto })
  assignedBy?: UserDto;

  @ApiProperty()
  files?: string[];

  @ApiProperty({ required: false })
  solution?: string;

  @ApiProperty({ required: false })
  note?: string;
}
