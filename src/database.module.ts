import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
//import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

//import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({
  imports: [
    /* MongooseModule.forRoot(`mongodb://localhost:27017`, {
      user: 'root',
      pass: 'root',
      dbName: 'crypto-coin'
    }) */
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        try {
          const { dbName , user, password, host, port, connection} = configService.mongo;
          const uri =
            `${connection}://${host}:${port}`;
          return {
            uri,
            user,
            pass: password,
            dbName
          }
        } catch (error) {
          throw new Error('Error when trying to connect to mongo DB');
        }
      },
      inject: [config.KEY]
    })
  ],
  /*providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        try {
          const { dbName , user, password, host, port, connection} = configService.mongo;
          const uri =
            `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
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
  ],*/
  exports: [ MongooseModule],
})
export class DatabaseModule {}