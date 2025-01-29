import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Audit Log')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('audit-log')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  @ApiOperation({ summary: 'API for get all audit logs' })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Filter search for audit logs',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  async getBooks(
    @Req() req: { user: Me },
    @Query('search') search?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.auditLogService.getAuditLogs(
      req.user.id,
      search,
      Number(page),
      Number(limit),
    );
  }
}
