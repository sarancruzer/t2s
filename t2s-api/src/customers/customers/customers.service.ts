import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Customers } from '../entities/customers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { plainToClass } from 'class-transformer';
import { CustomersDto, CreateCustomerDto, CustomersListDto, CustomersSearchDto } from '../dto/customers.dto';
import { validate } from 'class-validator';
import { Stores } from 'src/stores/entities/stores.entity';

@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(Customers)
        private readonly customersRepository: Repository<Customers>,
        @InjectRepository(Stores)
        private readonly storeRepository: Repository<Stores>        
    ) { }

    async getCustomersByStore(storeId: number): Promise<ResponseDto> {

        const customers = await this.customersRepository.createQueryBuilder("customers")
                                .where("customers.stores = :id", { id: storeId })
                                .getMany();
                                console.log('CustomersService -> customers', customers);

        const customerData = plainToClass(CustomersDto, customers);
        return this.buildCustomResponse(customerData, "Successfully received", HttpStatus.OK.toString());
    }

    async createCustomerByStore(customerData: CreateCustomerDto): Promise<ResponseDto> {            
            console.log('CustomersService -> customerData', customerData);
            const { store } = customerData;
            const stores = await this.storeRepository.findOne({ id: store });
            if (!stores) {
                const errors = {errors: 'Store not found!'};
                throw new HttpException({ message: 'store not found!', errors }, HttpStatus.NOT_FOUND);
            }    

            // create new class
            let newCustomer = new Customers();
            newCustomer.firstName = customerData.firstName;
            newCustomer.lastName = customerData.lastName;
            newCustomer.email = customerData.email;
            newCustomer.stores = stores;
            
            const errors = await validate(customerData);
            if (errors.length > 0) {
                const errors = {errors: 'Input data validation failed!'};
                throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
    
            } else {
                const savedCustomer = await this.customersRepository.save(newCustomer);
                let classList = plainToClass(CustomersListDto, savedCustomer);
                return this.buildCustomResponse(classList, "Requested Create Data is formatted", HttpStatus.OK.toString());
            }
    
        }  

        private isEmptyObject(obj) {
            return !!obj && Object.keys(obj).length === 0 && obj.constructor === Object;
          }
    

        async getCustomerListFilter(customerData: CustomersSearchDto): Promise<ResponseDto> {
        console.log('CustomersService -> customerData', customerData);
            let isEmpty = this.isEmptyObject(customerData);
            const qb = await this.customersRepository.createQueryBuilder("customers");
                        qb.leftJoinAndSelect('customers.stores', 'stores');
                    if(!isEmpty && customerData.customerName) {
                        qb.where("customers.firstName like :name", {name: '%' + customerData.customerName + '%' });
                        qb.orWhere("customers.lastName like :name", {name: '%' + customerData.customerName + '%' });
                    }
            const customers = await qb.getMany();
            const storeData = plainToClass(CustomersListDto, customers);
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
