import { PaginationDto } from '@/global/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  role: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  photo?: string;
}

export class GetUserDto extends PaginationDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'admin' })
  role: string;

  @ApiProperty({ example: 'dummy@gmail.com', required: false })
  search?: string;

  @ApiProperty({ example: false, required: false })
  includeSelf?: boolean;
}
