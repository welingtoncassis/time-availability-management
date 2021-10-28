import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../common/services/base.service';
import { CustomerDocument, Customer } from './customer.schema';

@Injectable()
export class CustomerService extends BaseService<CustomerDocument> {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {
    super(customerModel);
  }
}
