import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginateProjectDto {
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  page: number;

  @IsNotEmpty()
  @ApiProperty({ default: 10 })
  limit: number;

  @ApiProperty({ default: '', required: false })
  search?: string;

  @ApiProperty({ default: false, required: false })
  isAssigned?: boolean;
}

export class CreateProjectDto {
  @ApiProperty({ default: 'manypage' })
  name: string;

  @ApiProperty({ default: 'MANYPAGE' })
  code: string;

  @ApiProperty({ default: '' })
  description: string;

  @ApiProperty({ default: '' })
  picture: string;

  @ApiProperty({ default: '' })
  leader: string;
}
