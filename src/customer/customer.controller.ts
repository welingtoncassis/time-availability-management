import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryDto } from '../common/dtos/query.dto';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dtos/create-customer.dto';

@Controller({
  version: '1',
  path: 'api/customer',
})
@ApiTags('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async findAll(@Query() query: QueryDto) {
    return this.customerService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.customerService.findOne({ _id: id });
  }

  @Post()
  async create(@Body() data: CreateCustomerDTO) {
    return this.customerService.create(data);
  }
}
