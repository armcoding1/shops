import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignupDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    username: any;

    @IsString()
    @IsNotEmpty()
    email: any;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: any;
}