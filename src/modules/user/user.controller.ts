import { Body, Controller, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id')
  @ApiOperation({ summary: 'API for update user details' })
  @ApiBody({
    description: 'User details data',
    type: UserDto,
    examples: {
      'application/json': {
        value: {
          fullname: 'John Doe',
          email: 'johndoe@example.com',
          password: 'P@ssw0rd123',
          business: {
            name: 'Your Business',
            description: 'Lorem ipsum dolor sit amet.',
            tagline: 'Lorem ipsum dolor sit amet.',
            email: 'business@example.com',
            website: 'http://your-business.com',
            phone: '+6285123456789',
            address: 'XYZ Street',
          },
        },
      },
    },
  })
  async updateUser(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userService.updateUser(id, userDto);
  }
}
