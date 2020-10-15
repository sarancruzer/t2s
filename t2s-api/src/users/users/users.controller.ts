import { Controller, Post, Body, UsePipes, Get, Param, Query, UseFilters, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../dto/users.dto';

import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from '../../exception-filters/http-exception.filter';
import { ResponseDto } from '../../shared/dto/response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}
   

    // To return particular user by specific id
    @UseGuards(AuthGuard('jwt'))
    @UseFilters(new HttpExceptionFilter())
    @Get(':id')
    async findOne(@Param() params: any): Promise<ResponseDto> {
        console.log(params.id);
        const id = params.id;
        return await this.usersService.getUserById(id);
    }


    // To return list of Users
    @UseGuards(AuthGuard('jwt'))
    @UseFilters(new HttpExceptionFilter())
    @Get()
    async index(@Query('page') page: number = 0, @Query('limit') limit: number = 10): Promise<ResponseDto> {
      limit = limit > 100 ? 100 : limit;
      return await this.usersService.findAll({page, limit, route: 'http://cats.com/cats',});
    }

    // To create a new User
    @UseGuards(AuthGuard('jwt'))
    @UseFilters(new HttpExceptionFilter())
    @UsePipes(new ValidationPipe())
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto, @Request() req: any) {
    console.log('UsersController -> create -> req', req.user);
    // console.log('UsersController -> create -> user', user);
      return await this.usersService.create(createUserDto, req.user);
    }

}
