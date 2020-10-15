import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserRegisterDto {

    
    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    mobileNumber: string;

    @ApiProperty()
    token: string;

    @ApiProperty()
    passwordFlag: number;

}

export class GoogleAuthDto {

    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    photoUrl: string; 

}

export class FacebookAuthDto {

    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    photoUrl: string; 

}

export class TokenVerifyDto {

    @ApiProperty()
    @IsNotEmpty()
    token: string;

    @ApiProperty()
    email: string; 
}

export class ResendTokenDto {

    @ApiProperty()
    @IsNotEmpty()
    email: string; 
}

export class ForgotPasswordMailDto {

    @ApiProperty()
    username: string; 

    @ApiProperty()
    email: string; 

    @ApiProperty()
    password: string; 
}