import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FormService } from './form.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { FormDto } from './dto/form.dto';
import { FORM_BODY } from 'src/constants/api-body';

@ApiTags('Form')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get()
  @ApiOperation({ summary: 'API for get details form' })
  async getFormData(@Req() req: { user: Me }) {
    return this.formService.getForm(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'API for create or update details form' })
  @ApiBody({
    description: 'Form details data',
    type: FormDto,
    examples: {
      'application/json': {
        value: FORM_BODY,
      },
    },
  })
  async upsertFormData(@Req() req: { user: Me }, @Body() formDto: FormDto) {
    return this.formService.upsertForm(req.user.id, formDto.fields);
  }

  @Delete()
  @ApiOperation({ summary: 'API for delete data form' })
  async deleteFormFields(@Req() req: { user: Me }) {
    return this.formService.deleteForm(req.user.id);
  }
}
