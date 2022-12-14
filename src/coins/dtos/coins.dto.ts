import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCoindDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `coin's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly symbol: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;
}

export class UpdateCointDto extends PartialType(CreateCoindDto) {}
