import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class LoginUserDto {

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

@Exclude()
export class UserTokenDto {

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
    mobileNumber: string;

    @ApiProperty()
    @Expose()
    token: string;

    @ApiProperty()
    @Expose()
    passwordFlag: number;

    @ApiProperty()
    @Expose()
    emailVerify: number;

    @ApiProperty()
    @Expose()
    googleAuth: number;

    @ApiProperty()
    @Expose()
    facebookAuth: number;    

    @ApiProperty()
    @Expose()
    role: string;
    
}


// Request DTO
export class UserPasswordDto {

  
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  confirmPassword: string;
  
}