import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../user/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { createResponse } from 'src/helper/api.helper';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private readonly auditLogService: AuditLogService,
  ) {}

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
    const token = await this.jwtService.signAsync(payload);

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
    const token = await this.jwtService.signAsync(payload);

    const data = { token };

    // Create audit log
    await this.auditLogService.createAuditLog({
      userId: user.id,
      email: user.email,
      action: 'LOGIN',
      resource: 'Successfully login',
      data: JSON.stringify(payload),
    });

    return createResponse('success', HttpStatus.CREATED, data);
  }
}
