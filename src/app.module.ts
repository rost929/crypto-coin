import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseController } from './controllers/basic.controller';
import { BaseService } from './services/base.service';
import { CoinsController } from './controllers/coins.controller';
import { CoinsService } from './services/coins.service';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        BASE_API_URL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController, BaseController, CoinsController],
  providers: [AppService, BaseService, CoinsService],
})
export class AppModule {}
