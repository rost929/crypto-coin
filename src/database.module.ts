import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import config from './config';

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        try {
          const { dbName , user, password, host, port, connection} = configService.mongo;
          const uri =
            `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
          const client = new MongoClient(uri);
          await client.connect();
          const database = client.db(dbName);
          return database;
        } catch (error) {
          throw new Error('Error when trying to connect to mongo DB');
        }
      },
      inject: [config.KEY]
    },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}
