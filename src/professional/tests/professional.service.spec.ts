import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalService } from '../professional.service';
import { ProfessionalModelProvider } from './professional-test.provider';

const customer: any = {
  _id: '612fc33dad426c003b980cf7',
  name: 'sicrano',
  email: 'sicrano@gmail.com',
};

describe('ProfessionalService', () => {
  let service: ProfessionalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessionalService, ProfessionalModelProvider(customer)],
    }).compile();

    service = module.get<ProfessionalService>(ProfessionalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
