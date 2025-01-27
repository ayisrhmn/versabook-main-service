import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LOGIN_BODY, REGISTER_BODY } from 'src/constants/api-body';

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
        value: REGISTER_BODY,
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
        value: LOGIN_BODY,
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return result;
  }
}
