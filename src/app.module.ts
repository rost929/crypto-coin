import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import * as Joi from 'joi';
import { CoinsModule } from './coins/coins.module';
import { CategoriesModule } from './categories/categories.module';
import { DatabaseModule } from './database.module';
import  config  from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        BASE_API_URL: Joi.string().required(),
      }),
    }),
    CoinsModule,
    CategoriesModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
