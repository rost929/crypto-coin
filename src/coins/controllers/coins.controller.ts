import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { MarketsDto } from '../dtos/markets.dto';
import { CoinsService } from '../services/coins.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('coins')
@Controller('coins')
export class CoinsController {
  constructor(private coinsService: CoinsService) {}

  @Get()
  @ApiOperation({ summary: 'List all coins' })
  getCoinsList() {
    return this.coinsService.getCoinList();
  }

  @Get('markets')
  @ApiOperation({ summary: 'List all markets' })
  getCoinsMarket(@Query('currency') currency: string) {
    return this.coinsService.getCoinsMarket(currency);
  }

  @Get('/coin/:id')
  @ApiOperation({ summary: 'Get a single coin by id' })
  getCoinById(@Param('id') id: string) {
    return this.coinsService.getCoinById(id);
  }

  @Get('/stored')
  @ApiOperation({ summary: 'Get coins stored in mongo DB'})
  getCoinsFromDb() {
    return this.coinsService.getCoinsFromMongo();
  }
}
