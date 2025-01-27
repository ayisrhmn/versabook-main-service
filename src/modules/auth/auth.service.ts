import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { createResponse } from 'src/helper/api.helper';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(registerDto: RegisterDto) {
    // Check registered email
    const existingUser = await this.userModel.findOne({
      email: registerDto.email,
    });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Store user into db
    const user = new this.userModel({
      fullname: registerDto.fullname,
      email: registerDto.email,
      password: hashedPassword,
    });
    await user.save();

    // Generate JWT token
    const payload = {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET ?? 'JWT_SECRET', {
      expiresIn: '1h',
    });

    const data = { token };

    return createResponse('success', HttpStatus.CREATED, data);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });

    if (!user) {
      throw new UnauthorizedException(
        createResponse(
          'error',
          HttpStatus.UNAUTHORIZED,
          'Invalid email or password',
        ),
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        createResponse(
          'error',
          HttpStatus.UNAUTHORIZED,
          'Invalid email or password',
        ),
      );
    }

    // Generate JWT token
    const payload = {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET ?? 'JWT_SECRET', {
      expiresIn: '1h',
    });

    const data = { token };

    return createResponse('success', HttpStatus.CREATED, data);
  }
}
