import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginatePeopleDto {
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  page: number;

  @IsNotEmpty()
  @ApiProperty({ default: 10 })
  limit: number;

  @IsNotEmpty()
  @ApiProperty()
  projectId: string;

  @ApiProperty({ default: '', required: false })
  search?: string;
}

export class CreatePeopleDto {
  @IsNotEmpty()
  @ApiProperty()
  projectId: string;

  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  role: string;
}
