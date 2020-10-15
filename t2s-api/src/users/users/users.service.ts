import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
const jwt = require('jsonwebtoken');
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { ResponseDto } from '../../shared/dto/response.dto';
import { CreateUserDto, UsersDto} from '../dto/users.dto';
import { Users } from '../entities/users.entity';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>        
    ) { }

    async create(userData: CreateUserDto, currentUser: any): Promise<ResponseDto> {
    console.log('UsersService -> currentUser', currentUser);
        // check uniqueness of username/email
        const { email } = userData;

        const qb = getRepository(Users)
            .createQueryBuilder('users')
            .where('users.email = :email', { email });

        const user = await qb.getOne();

        if (user) {
            const errors = { username: 'Email already exist' };
            throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.CONFLICT);
        }
        // create new user
        let newUser = new Users();
        newUser.firstName = userData.firstName;
        newUser.lastName = userData.lastName;
        newUser.email = userData.email;
        newUser.password = userData.password;
        newUser.mobileNumber = userData.mobileNumber;
        
        const errors = await validate(userData);
        if (errors.length > 0) {
            const _errors = { username: 'Userinput is not valid.' };
            throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);

        } else {
            const savedUser = await this.userRepository.save(newUser);
            const userData =  this.buildUserDto(savedUser);
            return this.buildCustomResponse(userData, "Successfully received", HttpStatus.OK.toString());
        }
    }


    async getUserById(userId: number): Promise<ResponseDto> {
        const user = await this.userRepository.findOne({ id: userId });

        const errors = { user: ' User not found' };
        if (!user) throw new HttpException({ errors }, HttpStatus.UNAUTHORIZED);

        const userData = this.buildUserDto(user);
        return this.buildCustomResponse(userData, "Successfully received", HttpStatus.OK.toString());
    }


    async findAll(options: IPaginationOptions): Promise<ResponseDto> {
        const queryBuilder = await this.userRepository.createQueryBuilder('users');
        queryBuilder.select(["users.id", "users.firstName"]);
        queryBuilder.leftJoinAndSelect("users.company", "company");
        queryBuilder.orderBy('users.id', 'DESC'); // Or whatever you need to do

        const usersList = await paginate<Users>(queryBuilder, options);
        return this.buildCustomResponse(usersList, "Successfully received", HttpStatus.OK.toString());
    }

    async findOne(username: string): Promise<Users | undefined> {
        return this.userRepository.findOne({email : username });
    }



    private buildUserDto(user: Users) {
        const dto = new UsersDto();
        dto.id = user.id;
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        return dto;
    }

    private buildCustomResponse(data: object, message: string, status: string) {
        const dto = new ResponseDto();
        dto.status = status;
        dto.message = message;
        dto.data = data;
        return dto;
    }  

}
