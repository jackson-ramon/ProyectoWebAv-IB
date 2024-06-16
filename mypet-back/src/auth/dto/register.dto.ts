import { Transform } from "class-transformer";
import { IsEmail, IsString, Min, MinLength } from "class-validator";

export class RegisterDto {

    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(8) 
    password: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;
}