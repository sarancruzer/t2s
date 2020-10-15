import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { StoresModule } from './stores/stores.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    LoggerModule,
    AuthModule,
    StoresModule,
    CustomersModule       
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  constructor() {}
}
