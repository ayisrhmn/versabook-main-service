import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'API for get details form' })
  async getFormData(@Req() req: { user: Me }) {
    return this.formService.getForm(req.user.id);
  }

  @Get('client/:slug')
  @ApiOperation({ summary: 'API for get form by business slug' })
  async getBookById(@Param('slug') slug: string) {
    return this.formService.getFormClient(slug);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete()
  @ApiOperation({ summary: 'API for delete data form' })
  async deleteFormFields(@Req() req: { user: Me }) {
    return this.formService.deleteForm(req.user.id);
  }
}
