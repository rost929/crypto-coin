import { Inject, Injectable } from '@nestjs/common';
import { Coin } from '../entities/coin.entity';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { Db } from 'mongodb';

//dotenv.config();

const axios = require('axios');

//const BASE_URL = process.env.BASE_API_URL;

@Injectable()
export class CoinsService {
  constructor(
    private configService: ConfigService,
    @Inject('MONGO') private database: Db,
  ) {}

  async getCoinList(): Promise<Coin[]> {
    try {
      const BASE_URL = this.configService.get('BASE_API_URL');
      const MESSAGE = this.configService.get('MESSAGE');
      const coinList = await axios.get(`${BASE_URL}/coins/list`);
      console.log('Var env', MESSAGE);
      return coinList.data;
    } catch (error) {
      throw new Error('Error getting coin lists');
    }
  }

  async getCoinById(id: string) {
    try {
      const BASE_URL = this.configService.get('BASE_API_URL');
      const coinList = await axios.get(`${BASE_URL}/coins/${id}`);
      return coinList.data;
    } catch (error) {
      throw new Error('Error getting coin lists');
    }
  }

  async getCoinsMarket(currency: string) {
    try {
      const BASE_URL = this.configService.get('BASE_API_URL');
      const marketList = await axios.get(
        `${BASE_URL}/coins/markets?vs_currency=${currency}`,
      );
      return marketList.data;
    } catch (error) {
      throw new Error('Error getting coin market list');
    }
  }

  async getCoinsFromMongo(): Promise<any> {
    try {
      const coinsCollection = this.database.collection('coins');
      const coins = await coinsCollection.find().toArray();
      return coins;
    } catch (error) {
      throw new Error('Error getting coins from DB');
    }
  }
}
