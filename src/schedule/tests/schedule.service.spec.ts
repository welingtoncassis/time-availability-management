import { Test, TestingModule } from '@nestjs/testing';
import { SessionModule } from '../../session/session.module';
import { SessionService } from '../../session/session.service';
import { SessionModelProvider } from '../../session/tests/session-test.provider';
import { ScheduleService } from '../schedule.service';
import { ScheduleModelProvider } from './schedule-test.provider';

const schedule: any = {
  professional: '617748b8682a2947603fe4e7',
  customer: '6177493f682a2947603fe4eb',
  date: '2021-10-29T10:30:00.000',
};

const session: any = {
  professional: '617748b8682a2947603fe4e7',
  days: [1, 2, 4, 5],
  start: '2021-10-01T10:00:00.000',
  end: '2021-10-01T17:00:00.000',
};

describe('ScheduleService', () => {
  let service: ScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleService,
        ScheduleModelProvider(schedule),
        SessionService,
        SessionModelProvider(session),
      ],
    }).compile();

    service = module.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
