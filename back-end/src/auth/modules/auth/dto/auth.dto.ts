import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'asepsunarya839@gmail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123' })
  password: string;
}
