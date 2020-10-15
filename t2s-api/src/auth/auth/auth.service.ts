import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseDto } from '../../shared/dto/response.dto';
import { validate } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { UserRegisterDto } from '../dto/auth-dto';
import { LoginUserDto, UserTokenDto } from '../dto/login-user.dto';
import { UsersService } from '../../users/users/users.service';
import { Users } from '../../users/entities/users.entity';
import { plainToClass } from 'class-transformer';


@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,       
        private usersService: UsersService,
    ) { }

    async register(userData: UserRegisterDto): Promise<ResponseDto> {
    console.log('AuthService -> userData', userData);
    
        const { email } = userData;
        const user = await this.userRepository.findOne({ email });
        if (user) {
            const errors = {};
            throw new HttpException({ message: 'Email already exists! ', errors }, HttpStatus.BAD_REQUEST);
        }    
        let newUser = new Users();
        newUser.firstName = userData.firstName;
        newUser.lastName = userData.lastName;
        newUser.email = userData.email;
        newUser.mobileNumber = userData.mobileNumber;
        newUser.password = userData.password;
        
        const errors = await validate(userData);
        if (errors.length > 0) {
            const _errors = { username: 'Userinput is not valid.' };
            throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);

        } else {
            const savedUser = await this.userRepository.save(newUser);
            const userData = this.buildUserDto(savedUser);            
            return this.buildCustomResponse(userData, "User registered successfully!", HttpStatus.CREATED.toString());
        }

    }
   

    async authenticate({ email, password }: LoginUserDto): Promise<ResponseDto> {
        const user = await this.userRepository.findOne({ email });
        
        const errors = { user: email + ' User not found' };
        if (!user) throw new HttpException({ errors }, HttpStatus.UNAUTHORIZED);        
        
        if (bcrypt.compareSync(password, user.password)) {
            const userData = plainToClass(UserTokenDto, user);
            return this.buildCustomResponse(userData, "Login successfully", HttpStatus.OK.toString(), userData);
        }
        const _errors = { email: 'Password is wrong!.' };
        throw new HttpException({ message: 'Password is wrong!', _errors }, HttpStatus.UNAUTHORIZED);
    }      
    

    private buildUserDto(users: Users) {
        const dto = new UserRegisterDto();
        dto.email = users.email;
        dto.firstName = users.firstName;
        dto.lastName = users.lastName;
        dto.mobileNumber = users.mobileNumber;
        return dto;
    }
   

    private buildCustomResponse(data: object, message: string, status: string, userData?: Object) {
        const dto = new ResponseDto();
        dto.status = status;
        dto.message = message;
        dto.data = data;
        if(userData) {
            dto.token = this.generateJWT(userData)
        }
        return dto;
    }


    public generateJWT(data: any) {
        return this.jwtService.sign({data});
    };

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }


}
