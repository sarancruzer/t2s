import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Exclude, Expose } from "class-transformer";

// Request DTO
export class CreateStoreDto {
   
    @ApiProperty()
    @IsNotEmpty()
    storeName: string;

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    mobileNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    address: string;
  
}

// Response DTO
@Exclude()
export class StoresDto {

    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    storeName: string;

    @ApiProperty()
    @Expose()
    email: string;
    
    @ApiProperty()
    @Expose()
    mobileNumber: string;   
}

// Response DTO
@Exclude()
export class StoresListDto {

    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    storeName: string; 
    
    @ApiProperty()
    @Expose()
    customersCount: number; 
}

// Request DTO
export class StoresSearchDto {  

    @ApiProperty()
    storeName: string;    
}
