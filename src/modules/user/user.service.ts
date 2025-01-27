import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { createResponse } from 'src/helper/api.helper';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async updateUser(userId: string, userDto: UserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $set: userDto },
      { new: true },
    );

    return createResponse('success', HttpStatus.OK, updatedUser);
  }
}
