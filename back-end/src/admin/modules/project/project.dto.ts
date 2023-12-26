import { UserDto } from '@/global/dto/user.dto';
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
}

export class CreateProjectDto {
  @ApiProperty({ default: 'manypage' })
  name: string;

  @ApiProperty({ default: 'MANYPAGE' })
  code: string;

  @ApiProperty({ default: '' })
  description: string;

  @ApiProperty({ default: '', type: UserDto })
  leader: UserDto;

  @ApiProperty({ default: '', required: false })
  picture?: string;
}
