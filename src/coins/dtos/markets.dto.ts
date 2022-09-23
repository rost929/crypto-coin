import { IsNotEmpty, IsString } from "class-validator";

export class MarketsDto {
    @IsString()
    @IsNotEmpty()
    readonly currency : string;
}