import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from '../session.service';
import { SessionModelProvider } from './session-test.provider';

const session: any = {
  professional: '617748b8682a2947603fe4e7',
  days: [1, 2, 4, 5],
  start: '2021-10-01T10:00:00.000',
  end: '2021-10-01T17:00:00.000',
};

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionService, SessionModelProvider(session)],
    }).compile();

    service = module.get<SessionService>(SessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
