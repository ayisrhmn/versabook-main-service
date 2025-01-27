import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { createResponse } from 'src/helper/api.helper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(userId: string) {
    const findMe = await this.userModel.findById(userId, '-password');
    return createResponse('success', HttpStatus.OK, findMe);
  }

  async updateUser(userId: string, userDto: UserDto) {
    // Hash password
    const hashedPassword = userDto.password
      ? await bcrypt.hash(userDto.password, 10)
      : undefined;

    // Updated user
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: hashedPassword
          ? {
              ...userDto,
              password: hashedPassword,
            }
          : userDto,
      },
      { new: true, fields: '-password' },
    );

    return createResponse('success', HttpStatus.OK, updatedUser);
  }
}
