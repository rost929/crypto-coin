import { Module } from '@nestjs/common';
import { CoinsController } from './controllers/coins.controller';
import { BaseController } from './controllers/basic.controller';
import { CoinsService } from './services/coins.service';
import { BaseService } from './services/base.service';
import { MongooseModule } from "@nestjs/mongoose";
import { CoinSchema, Coin } from './entities/coin.entity';

@Module({
  imports: [ MongooseModule.forFeature([
    {
      name: Coin.name,
      schema: CoinSchema
    }
  ])],
  controllers: [CoinsController, BaseController],
  providers: [BaseService, CoinsService],
  exports: [CoinsService],
})
export class CoinsModule {}
