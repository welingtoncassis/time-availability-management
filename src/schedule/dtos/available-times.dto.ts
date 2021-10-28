import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AvailableTimesDTO {
  @IsNotEmpty()
  @ApiProperty()
  idProfessional: string;

  @IsNotEmpty()
  @ApiProperty()
  initDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  endDate: Date;
}
