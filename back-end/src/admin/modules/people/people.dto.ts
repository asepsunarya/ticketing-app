import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginatePeopleDto {
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  page: number;

  @IsNotEmpty()
  @ApiProperty({ default: 10 })
  limit: number;

  @ApiProperty({ default: '', required: false })
  search?: string;
}

export class CreatePeopleDto {
  @ApiProperty()
  projectId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  role: string;
}
