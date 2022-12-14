import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { MarketsDto } from '../dtos/markets.dto';
import { CoinsService } from '../services/coins.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCoindDto, UpdateCointDto } from '../dtos/coins.dto';

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
  @Get('/stored/:id')
  @ApiOperation({ summary: 'Get coins stored in mongo DB' })
  findStoredCoinById(@Param('id') id: string) {
    return this.coinsService.findById(id);
  }

  @Get('/storedB')
  @ApiOperation({ summary: 'Get coins stored in mongo DB' })
  findAllStoredCoins() {
    return this.coinsService.findAll();
  }

  @Post()
  create(@Body() payload: CreateCoindDto) {
    return this.coinsService.createCoin(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCointDto) {
    return this.coinsService.updateCoin(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coinsService.deleteCoin(id);
  }
}
