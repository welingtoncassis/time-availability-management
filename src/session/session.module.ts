import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionController } from './session.controller';
import { Session, SessionSchema } from './session.schema';
import { SessionService } from './session.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  controllers: [SessionController],
  exports: [SessionService, MongooseModule],
  providers: [SessionService],
})
export class SessionModule {}
