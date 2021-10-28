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
import { CreateProfessionalDTO } from './dtos/create-professional.dto';
import { UpdateProfessionalDTO } from './dtos/update-professional.dto';
import { ProfessionalService } from './professional.service';

@Controller({
  version: '1',
  path: 'api/professional',
})
@ApiTags('professional')
export class ProfessionalController {
  constructor(private professionalService: ProfessionalService) {}

  @Get()
  async findAll(@Query() query: QueryDto) {
    return this.professionalService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.professionalService.findOne({ _id: id });
  }

  @Post()
  async create(@Body() data: CreateProfessionalDTO) {
    return this.professionalService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDTO: UpdateProfessionalDTO,
  ) {
    return this.professionalService.update(id, updateDocumentDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.professionalService.deleteById(id);
  }
}
