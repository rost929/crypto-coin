import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO',
      useFactory: async () => {
        try {
          const uri =
            'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT';
          const client = new MongoClient(uri);
          await client.connect();
          const database = client.db('crypto-coin');
          return database;
        } catch (error) {
          throw new Error('Error when trying to connect to mongo DB');
        }
      },
    },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}
