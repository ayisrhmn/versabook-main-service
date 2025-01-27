import { HttpStatus, Injectable } from '@nestjs/common';
import { createResponse } from './helper/api.helper';

@Injectable()
export class AppService {
  getHealthCheck() {
    return createResponse('success', HttpStatus.OK, 'API is running fine!');
  }
}
