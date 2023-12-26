import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: '658a598e816b3e3d1f6933d3' })
  _id: string;

  @ApiProperty({ example: 'tifaraavisa@gmail.com' })
  email: string;
}
