import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsDate, IsArray } from 'class-validator';
import { DaysOfWeek } from '../../common/enums/days-of-week.enum';
import { Professional } from '../../professional/professional.schema';

export class CreateSessionDTO {
  @IsNotEmpty()
  @ApiProperty()
  professional: Professional;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  days: DaysOfWeek[];

  @IsNotEmpty()
  @ApiProperty()
  start: Date;

  @IsNotEmpty()
  @ApiProperty()
  end: Date;
}
