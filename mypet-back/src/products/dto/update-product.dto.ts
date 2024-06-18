import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsOptional()
    price: number;
    
    @IsString()
    @IsOptional()
    imageUrl: string;
}
