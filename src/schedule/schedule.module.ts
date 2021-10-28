import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionModule } from '../session/session.module';
import { ScheduleController } from './schedule.controller';
import { Schedule, ScheduleSchema } from './schedule.schema';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
    SessionModule,
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
