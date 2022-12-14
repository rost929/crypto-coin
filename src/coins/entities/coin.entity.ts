import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Coin extends Document {
  
  @Prop({ required: true})
  name: string;
  
  @Prop({ required: true})
  symbol: string;
  
  @Prop({ type: Number})
  price: number
}

export const CoinSchema = SchemaFactory.createForClass(Coin);
