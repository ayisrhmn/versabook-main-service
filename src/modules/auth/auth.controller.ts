import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createResponse } from 'src/helper/api.helper';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'API for register user' })
  @ApiBody({
    description: 'User registration data',
    type: RegisterDto,
    examples: {
      'application/json': {
        value: {
          fullname: 'John Doe',
          email: 'johndoe@example.com',
          password: 'P@ssw0rd123',
        },
      },
    },
  })
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return result;
  }

  @Post('login')
  @ApiOperation({ summary: 'API for login user' })
  @ApiBody({
    description: 'User login data',
    type: LoginDto,
    examples: {
      'application/json': {
        value: {
          email: 'johndoe@example.com',
          password: 'P@ssw0rd123',
        },
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return result;
  }
}
