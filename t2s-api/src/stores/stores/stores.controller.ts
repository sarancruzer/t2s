import { Controller, UseGuards, UseFilters, Get, Param, UsePipes, ValidationPipe, Put, Body, Request, Query, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { StoresService } from './stores.service';
import { CreateStoreDto, StoresSearchDto } from '../dto/stores';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stores')
@Controller('stores')
export class StoresController {

    constructor(private readonly storesService: StoresService) {}
   
    // To return particular user by specific id
    @UseGuards(AuthGuard('jwt'))
    @UseFilters(new HttpExceptionFilter())
    @Get(':id')
    async getStoreById(@Param() params: any): Promise<ResponseDto> {
    console.log('StoresController -> constructor -> params', params);
        const id = params.id;
        return await this.storesService.getStoreById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @UseFilters(new HttpExceptionFilter())
    @Get()
    async getStoreLists(): Promise<ResponseDto> {
        return await this.storesService.getStoreList();
    }

    // To create a new User
    @UseGuards(AuthGuard('jwt'))
    @UseFilters(new HttpExceptionFilter())
    @UsePipes(new ValidationPipe())
    @Put(':id')
    async update(@Body() storeData: CreateStoreDto, @Request() req: any, @Param() params: any) {
        const storeId = params.id;
      return await this.storesService.updateStore(storeData, storeId);
    }

    // To return particular user by specific id
    @UseGuards(AuthGuard('jwt'))
    @UseFilters(new HttpExceptionFilter())
    @Get('/list/count')
    async getStoreListsCount(): Promise<ResponseDto> {
    console.log('StoresController -> constructor -> getStoreListsCount');
        return await this.storesService.getStoreListCount();
    }


    @UseGuards(AuthGuard('jwt'))
    @UseFilters(new HttpExceptionFilter())
    @Post('/search')
    async getStoreFilter(@Body() storesData: StoresSearchDto): Promise<ResponseDto> {
    console.log('StoresController -> constructor -> storesData', storesData);
        return await this.storesService.getStoreListFilter(storesData);
    }
    
}
