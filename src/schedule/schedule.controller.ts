import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryDto } from '../common/dtos/query.dto';
import { AvailableTimesDTO } from './dtos/available-times.dto';
import { CreateScheduleDTO } from './dtos/create-schedule.dto';
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
  async create(@Body() data: CreateScheduleDTO) {
    return this.scheduleService.createSchedule(data);
  }

  @Post('available-times')
  async availableTimes(@Body() data: AvailableTimesDTO) {
    return this.scheduleService.availableTimes(data);
  }
}
