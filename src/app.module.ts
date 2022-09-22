import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseController } from './controllers/basic.controller';
import { BaseService } from './services/base.service';
import { CoinsController } from './controllers/coins.controller';
import { CoinsService } from './services/coins.service';
import { ConfigModule } from '@nestjs/config';
import { environments } from "./environments";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:  environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController, BaseController, CoinsController],
  providers: [AppService, BaseService, CoinsService],
})
export class AppModule {}
