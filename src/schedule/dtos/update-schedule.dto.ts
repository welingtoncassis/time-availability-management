import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Customer } from '../../customer/customer.schema';
import { Professional } from '../../professional/professional.schema';

export class UpdateScheduleDTO {
  @IsNotEmpty()
  @ApiProperty()
  professional: Professional;

  @IsNotEmpty()
  @ApiProperty()
  customer: Customer;

  @IsNotEmpty()
  @ApiProperty()
  date: Date;
}
