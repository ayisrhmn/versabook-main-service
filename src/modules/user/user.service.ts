import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { createResponse } from 'src/helper/api.helper';
import * as bcrypt from 'bcrypt';
import { AuditLogService } from '../audit-log/audit-log.service';
import { toSlug } from 'src/helper/string.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly auditLogService: AuditLogService,
  ) {}

  async getUser(userId: string) {
    const findMe = await this.userModel.findOne(
      { _id: userId, deletedAt: null },
      '-password',
    );
    return createResponse('success', HttpStatus.OK, findMe as Me);
  }

  async updateUser(userId: string, userDto: UserDto) {
    // Hash password
    const hashedPassword = userDto.password
      ? await bcrypt.hash(userDto.password, 10)
      : undefined;

    // business name to slug
    const businessSlug =
      userDto.business && userDto.business.name
        ? toSlug(String(userDto.business.name))
        : undefined;

    let payload = userDto;

    if (hashedPassword) {
      payload.password = hashedPassword;
    }

    if (payload.business && payload.business.name && businessSlug) {
      payload.business.slug = businessSlug;
    }

    // Updated user
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: payload,
      },
      { new: true, fields: '-password' },
    );

    // Find me
    const user = await this.userModel.findOne(
      { _id: userId, deletedAt: null },
      '-password',
    );

    // Create audit log
    if (user) {
      await this.auditLogService.createAuditLog({
        userId,
        email: user.email,
        action: 'UPDATE',
        resource: 'Update User',
        data: JSON.stringify(updatedUser),
      });
    }

    return createResponse('success', HttpStatus.OK, updatedUser);
  }
}
