import { ApiProperty } from '@nestjs/swagger';

export class ParamIdDto {
  @ApiProperty()
  id: string;
}
