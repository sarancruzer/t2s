import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Stores } from '../entities/stores.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { StoresListDto, StoresDto, CreateStoreDto, StoresSearchDto } from '../dto/stores';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class StoresService {

    constructor(
        @InjectRepository(Stores)
        private readonly storesRepository: Repository<Stores>        
    ) { }

    async getStoreById(storeId: number): Promise<ResponseDto> {
        const store = await this.storesRepository.findOne({ id: storeId });
        const errors = { user: ' store not found' };
        if (!store) throw new HttpException({ errors }, HttpStatus.UNAUTHORIZED);

        const storeData = plainToClass(StoresDto, store);
        return this.buildCustomResponse(storeData, "Successfully received", HttpStatus.OK.toString());
    }

    async getStoreList(): Promise<ResponseDto> {
        const store = await this.storesRepository.find();
        const errors = { user: ' store not found' };
        if (!store) throw new HttpException({ errors }, HttpStatus.UNAUTHORIZED);

        const storeData = plainToClass(StoresListDto, store);
        return this.buildCustomResponse(storeData, "Successfully received", HttpStatus.OK.toString());
    }

    async updateStore(storeData: CreateStoreDto, storeId: any): Promise<ResponseDto> {
        const store = await this.storesRepository.findOne({ id: storeId });        
        let updateStore = Object.assign(store, storeData);

        const errors = await validate(storeData);
        if (errors.length > 0) {
            const _errors = { className: 'store input is not valid.' };
            throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);

        } else {
            const savedStore = await this.storesRepository.save(updateStore);
            const storeData = plainToClass(StoresListDto, savedStore);
            return this.buildCustomResponse(storeData, "Requested Update Data is sanitised", HttpStatus.OK.toString());
        }

    }

    async getStoreListCount(): Promise<ResponseDto> {
        const store = await this.storesRepository.createQueryBuilder("stores")
                                .loadRelationCountAndMap('stores.customersCount', 'stores.customers')
                                .getMany();
        const storeData = plainToClass(StoresListDto, store);
        return this.buildCustomResponse(storeData, "Successfully received", HttpStatus.OK.toString());
    }

    private isEmptyObject(obj) {
        return !!obj && Object.keys(obj).length === 0 && obj.constructor === Object;
      }

    async getStoreListFilter(storesData: StoresSearchDto): Promise<ResponseDto> {
        let isEmpty = this.isEmptyObject(storesData);
        const qb = await this.storesRepository.createQueryBuilder("stores");
                if(!isEmpty && storesData.storeName) {
                    qb.where("stores.storeName like :name", {name: '%' + storesData.storeName + '%' });
                }
                qb.skip(0);
                qb.limit(5);
        const stores = await qb.getMany();
        const errors = { user: ' store not found' };
        if (!stores) throw new HttpException({ errors }, HttpStatus.UNAUTHORIZED);

        const storeData = plainToClass(StoresListDto, stores);
        return this.buildCustomResponse(storeData, "Successfully received", HttpStatus.OK.toString());
    }
    
    

    private buildCustomResponse(data: object, message: string, status: string) {
        const dto = new ResponseDto();
        dto.status = status;
        dto.message = message;
        dto.data = data;
        return dto;
    }  


}
