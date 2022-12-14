import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Coin } from '../entities/coin.entity';
import { ConfigService } from '@nestjs/config';
//import { Db } from 'mongodb';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCoindDto, UpdateCointDto } from '../dtos/coins.dto';

//import * as dotenv from 'dotenv';
//dotenv.config();

const axios = require('axios');

//const BASE_URL = process.env.BASE_API_URL;

@Injectable()
export class CoinsService {
  /* constructor(
    private configService: ConfigService,
    @Inject('MONGO') private database: Db,
  ) {} */

  constructor(
    private configService: ConfigService,
    @InjectModel(Coin.name)
    private coinModel: Model<Coin>,
  ) {}

  findAll() {
    console.log('find All service called');
    console.log(Coin.name);
    

    return this.coinModel.find().exec();
  }

  async findById(id: string) {
    try {
      const coin = await this.coinModel.findById(id).exec();
      if (!coin) throw new NotFoundException(`Coin with id ${id} not found`);
      return coin;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCoin(data: CreateCoindDto) {
    const newCoin = new this.coinModel(data);
    return await newCoin.save();
  }

  async updateCoin(id: string, data: UpdateCointDto) {
    try {
      const coin = await this.coinModel
        .findByIdAndUpdate(id, { $set: data }, { new: true })
        .exec();
      if (!coin) {
        throw new NotFoundException(`Coin with id ${id} not found`);
      }
      return coin;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCoin(id: string) {
    return await this.coinModel.findByIdAndDelete(id);
  }

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

  /*   async getCoinsFromMongo(): Promise<any> {
    try {
      const coinsCollection = this.database.collection('coins');
      const coins = await coinsCollection.find().toArray();
      return coins;
    } catch (error) {
      throw new Error('Error getting coins from DB');
    }
  } */
}
