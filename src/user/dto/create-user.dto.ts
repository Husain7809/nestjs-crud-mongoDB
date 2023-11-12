import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Mohammad' })
  first_name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Husain' })
  last_name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Mohammad@gmail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '972407214' })
  phone: string;
}
