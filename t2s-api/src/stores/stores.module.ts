import { Module } from '@nestjs/common';
import { StoresController } from './stores/stores.controller';
import { StoresService } from './stores/stores.service';
import { Stores } from './entities/stores.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Stores])],
  controllers: [StoresController],
  providers: [StoresService]
})
export class StoresModule {}
