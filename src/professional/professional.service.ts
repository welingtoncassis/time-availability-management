import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../common/services/base.service';
import { ProfessionalDocument, Professional } from './professional.schema';

@Injectable()
export class ProfessionalService extends BaseService<ProfessionalDocument> {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
  ) {
    super(professionalModel);
  }
}
