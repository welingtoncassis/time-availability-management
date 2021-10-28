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
import { AvailableTimesDTO } from './dtos/available-times.dto';
import { CreateScheduleDTO } from './dtos/create-schedule.dto';
import { UpdateScheduleDTO } from './dtos/update-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller({
  version: '1',
  path: 'api/schedule',
})
@ApiTags('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  async findAll(@Query() query: QueryDto) {
    return this.scheduleService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.scheduleService.findOne({ _id: id });
  }

  @Post()
  async create(@Body() createScheduleDTO: CreateScheduleDTO) {
    await this.scheduleService.verifySchedule(createScheduleDTO);
    return this.scheduleService.create(createScheduleDTO);
  }

  @Post('available-times')
  async availableTimes(@Body() data: AvailableTimesDTO) {
    return this.scheduleService.availableTimes(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDTO: UpdateScheduleDTO,
  ) {
    await this.scheduleService.verifySchedule(updateDocumentDTO);
    return this.scheduleService.update(id, updateDocumentDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.scheduleService.deleteById(id);
  }
}
