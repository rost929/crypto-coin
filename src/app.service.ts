import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(@Inject('MONGO') private database: Db) {}

  async getHello(): Promise<void> {
    //return 'Hello World!';
    const coinsCollection = this.database.collection('coins');
    const coins = await coinsCollection.find().toArray();
    console.log(coins);
  }
}
