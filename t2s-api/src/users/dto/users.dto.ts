import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Exclude, Expose, Type } from "class-transformer";

// Request DTO
export class CreateUserDto {
   
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
    mobileNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    confirmPassword: string;
}

export class UpdateUserDto {
   
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
    mobileNumber: string;  
   

    
}

// Response DTO
@Exclude()
export class UsersDto {

    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    firstName: string;

    @ApiProperty()
    @Expose()
    lastName: string;

    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    token: string;
    
    @ApiProperty()
    @Expose()
    role: string;
}

// Response DTO
@Exclude()
export class UserListDto {

    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    firstName: string;

    @ApiProperty()
    @Expose()
    lastName: string;

    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    photoUrl: string;

    @ApiProperty()
    @Expose()
    mobileNumber: string;

    @ApiProperty()
    @Expose()
    userCode: string;

    @ApiProperty()
    @Expose()
    role: string;
   
}
