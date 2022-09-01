import { Injectable } from "@nestjs/common";
import { Coin } from "src/entities/coin.entity";
const axios = require('axios');

@Injectable()
export class CoinsService {

    async getCoinList(): Promise<Coin[]> {
        try {
            const coinList = await axios.get('https://api.coingecko.com/api/v3/coins/list');
            const bitcoin = coinList.data.filter(currency => currency.name === 'Bitcoin');
            console.log(bitcoin);
            return coinList.data;
        } catch (error) {
            throw new Error("Error getting coin lists");
        }
    }

    async getCoinById(id: string) {
        try {
            const coinList = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
            return coinList.data;
        } catch (error) {
            throw new Error("Error getting coin lists");
        }
    }

    async getCoinsMarket(currency: string) {
        try {
            const marketList = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`);
            return marketList.data;
        } catch (error) {
            throw new Error("Error getting coin market list");
        }
    }


}