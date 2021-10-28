import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryDto } from '../common/dtos/query.dto';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dtos/create-customer.dto';
import { UpdateCustomerDTO } from './dtos/update-customer.dto';

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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDTO: UpdateCustomerDTO,
  ) {
    return this.customerService.update(id, updateDocumentDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.customerService.deleteById(id);
  }
}
