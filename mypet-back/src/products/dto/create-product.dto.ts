import { Transform } from "class-transformer";
import { IsDecimal, IsString, MinLength } from "class-validator";

export class CreateProductDto {
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @IsDecimal()
    price: number;
}
