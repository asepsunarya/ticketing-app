import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginateTeamDto {
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  page: number;

  @IsNotEmpty()
  @ApiProperty({ default: 10 })
  limit: number;

  @ApiProperty({ default: '', required: false })
  search?: string;
}

export class CreateTeamDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
