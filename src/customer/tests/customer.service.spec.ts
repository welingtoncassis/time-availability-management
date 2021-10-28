import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../customer.service';
import { CustomerModelProvider } from './customer-test.provider';

const customer: any = {
  _id: '612fc33dad426c003b980cf9',
  name: 'fulano',
  email: 'fulano@gmail.com',
};

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService, CustomerModelProvider(customer)],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
