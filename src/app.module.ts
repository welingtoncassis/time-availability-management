import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentVariables } from './common/interfaces/env.interface';
import { CustomerModule } from './customer/customer.module';
import { ProfessionalModule } from './professional/professional.module';
import { SessionModule } from './session/session.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({
        uri: configService.get<string>('DATABASE_HOST'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    CustomerModule,
    ProfessionalModule,
    SessionModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
