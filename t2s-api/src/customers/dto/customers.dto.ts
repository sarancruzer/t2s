import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Exclude, Expose, Type } from "class-transformer";
import { StoresListDto } from "src/stores/dto/stores";

// Request DTO
export class CreateCustomerDto {
   
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
    mobileNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    store: number;
    
}


// Response DTO
@Exclude()
export class CustomersDto {

    @ApiProperty()
    @Expose()
    firstName: string;

    @ApiProperty()
    @Expose()
    lastName: string;

    @ApiProperty()
    @Expose()
    email: string;
}

// Response DTO
@Exclude()
export class CustomersListDto {

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
    @Type(() => StoresListDto)
    stores: StoresListDto[];
    
   
}


// Request DTO
export class CustomersSearchDto {  

    @ApiProperty()
    customerName: string;    
}
