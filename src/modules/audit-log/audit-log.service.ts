import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuditLog } from './schemas/audit-log.schema';
import { Model } from 'mongoose';
import { createResponse } from 'src/helper/api.helper';
import { AuditLogDto } from './dto/audit-log.dto';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectModel(AuditLog.name) private auditLogModel: Model<AuditLog>,
  ) {}

  // Create audit log
  async createAuditLog(auditLogDto: AuditLogDto) {
    const newLog = new this.auditLogModel(auditLogDto);
    await newLog.save();
  }

  // Get all logs
  async getAuditLogs(userId: string, search?: string, page = 1, limit = 10) {
    const query: any = { userId };

    if (search) {
      query.resource = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    const total = await this.auditLogModel.countDocuments(query);
    const logs = await this.auditLogModel
      .find(query)
      .sort({ createdAt: -1 }) // Sort by new
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      ...createResponse('success', HttpStatus.OK, logs),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
