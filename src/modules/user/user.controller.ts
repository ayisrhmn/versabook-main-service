import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { USER_BODY } from 'src/constants/api-body';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'API for get details me' })
  async getMe(@Req() req: { user: Me }) {
    return this.userService.getUser(req.user.id);
  }

  @Put('me')
  @ApiOperation({ summary: 'API for update details me' })
  @ApiBody({
    description: 'Me details data',
    type: UserDto,
    examples: {
      'application/json': {
        value: USER_BODY,
      },
    },
  })
  async updateMe(@Req() req: { user: Me }, @Body() userDto: UserDto) {
    return this.userService.updateUser(req.user.id, userDto);
  }
}
