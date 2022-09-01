import { Controller, Get, Param, Query, ValidationPipe } from "@nestjs/common";
import { MarketsDto } from "src/dtos/Markets.dtos";
import { CoinsService } from "../services/coins.service";

@Controller('coins')
export class CoinsController {
    constructor(private coinsService: CoinsService) { }

    @Get()
    getCoinsList() {
        return this.coinsService.getCoinList();
    }

    @Get('markets')
    getCoinsMarket(@Query('currency') currency : string) {
        return this.coinsService.getCoinsMarket(currency);
    }

    @Get('/coin/:id')
    getCoinById(@Param('id') id: string) {
        return this.coinsService.getCoinById(id);
    }

}