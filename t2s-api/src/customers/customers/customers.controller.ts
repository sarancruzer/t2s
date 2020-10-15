import { CustomersSearchDto } from './../dto/customers.dto';
import { Controller, UseGuards, UseFilters, Get, Param, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from '../dto/customers.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {

    
    constructor(private readonly customersService: CustomersService) {}
   

    @UseGuards(AuthGuard('jwt'))
    @UseFilters(new HttpExceptionFilter())
    @Get(':storeId')
    async getCustomersByStoreId(@Param() params: any): Promise<ResponseDto> {
    console.log('StoresController -> constructor -> params', params);
        const storeId = params.storeId;
        return await this.customersService.getCustomersByStore(storeId);
    }
   

    
    @UseGuards(AuthGuard('jwt'))
    @UseFilters(new HttpExceptionFilter())
    @UsePipes(new ValidationPipe())
    @Post()
    async createCustomerByStore(@Body() customerData: CreateCustomerDto): Promise<ResponseDto> {
        console.log('CustomersController -> constructor -> customerData', customerData);
        return await this.customersService.createCustomerByStore(customerData);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @UseFilters(new HttpExceptionFilter())
    @Post('/search')
    async getCustomersList(@Body() customerData: CustomersSearchDto): Promise<ResponseDto> {        
        return await this.customersService.getCustomerListFilter(customerData);
    }

}
