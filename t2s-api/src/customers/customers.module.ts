import { Module } from '@nestjs/common';
import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { Customers } from './entities/customers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stores } from 'src/stores/entities/stores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customers, Stores])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
