import { Injectable } from '@nestjs/common';
const axios = require('axios');

@Injectable()
export class BaseService {
  async pingConnection(): Promise<string> {
    try {
      const pingResult = await axios.get('https://api.coingecko.com/ping');
      return pingResult.data;
    } catch (error) {
      throw new Error('Error testing connection');
    }
  }
}
