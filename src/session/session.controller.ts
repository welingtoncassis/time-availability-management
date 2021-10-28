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
import { CreateSessionDTO } from './dtos/create-session.dto';
import { UpdateSessionDTO } from './dtos/update-session.dto';
import { SessionService } from './session.service';

@Controller({
  version: '1',
  path: 'api/session',
})
@ApiTags('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get()
  async findAll(@Query() query: QueryDto) {
    return this.sessionService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sessionService.findOne({ _id: id });
  }

  @Post()
  async create(@Body() data: CreateSessionDTO) {
    return this.sessionService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDTO: UpdateSessionDTO,
  ) {
    return this.sessionService.update(id, updateDocumentDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sessionService.deleteById(id);
  }
}
