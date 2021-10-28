import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessionalController } from './professional.controller';
import { Professional, ProfessionalSchema } from './professional.schema';
import { ProfessionalService } from './professional.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Professional.name, schema: ProfessionalSchema },
    ]),
  ],
  controllers: [ProfessionalController],
  providers: [ProfessionalService],
})
export class ProfessionalModule {}
