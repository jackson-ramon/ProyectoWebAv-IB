import { Transform } from "class-transformer";
import { IsString, Min, MinLength } from "class-validator";

export class SearchProductdto {
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;
}
