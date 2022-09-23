import { Module } from '@nestjs/common';
import { CoinsController } from './controllers/coins.controller';
import { BaseController } from './controllers/basic.controller';
import { CoinsService } from './services/coins.service';
import { BaseService } from './services/base.service';

@Module({
  controllers: [CoinsController, BaseController],
  providers: [BaseService, CoinsService],
  /* exports: [ProductsService], */
})
export class CoinsModule {}
