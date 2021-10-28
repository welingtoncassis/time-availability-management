import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from 'inspector';
import { Model } from 'mongoose';
import { BaseService } from '../common/services/base.service';
import { SessionDocument } from './session.schema';

@Injectable()
export class SessionService extends BaseService<SessionDocument> {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {
    super(sessionModel);
  }
}
