import { Controller,  Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { ResponseDto } from '../../shared/dto/response.dto';
import { UserRegisterDto } from '../dto/auth-dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
   
  constructor(private authService: AuthService) {}

    // User authentication    
    @UsePipes(new ValidationPipe())
    @Post('login')
    @ApiBody({ type: LoginUserDto})
    async authenticate(@Body() loginUserDto: LoginUserDto): Promise<ResponseDto> {
    console.log('AuthController -> constructor -> loginUserDto', loginUserDto);
        return await this.authService.authenticate(loginUserDto);
    }

    // User register
    @UsePipes(new ValidationPipe())
    @Post('register')
    @ApiBody({ type: UserRegisterDto})
    async register(@Body() userRegisterDto: UserRegisterDto): Promise<ResponseDto>{
      return await this.authService.register(userRegisterDto);
    }

   

}
