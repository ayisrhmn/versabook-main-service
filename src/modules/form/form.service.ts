import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form } from './schemas/form.schema';
import { createResponse } from 'src/helper/api.helper';
import { AuditLogService } from '../audit-log/audit-log.service';
import { UserService } from '../user/user.service';

@Injectable()
export class FormService {
  constructor(
    @InjectModel(Form.name) private formModel: Model<Form>,
    private readonly userService: UserService,
    private readonly auditLogService: AuditLogService,
  ) {}

  // Get form fields by userId
  async getForm(userId: string) {
    const form = await this.formModel.findOne({ userId, deletedAt: null });
    const data = form || { userId, fields: [] };
    return createResponse('success', 200, data);
  }

  // Create or Update form fields
  async upsertForm(userId: string, fields: any[]) {
    const upsertForm = await this.formModel.findOneAndUpdate(
      { userId },
      { userId, fields, deletedAt: null },
      { new: true, upsert: true }, // Create if not exists
    );

    // Find user
    const user = await this.userService.getUser(userId);
    if (user) {
      const userData = user.data;

      // Create log
      if (userData) {
        await this.auditLogService.createAuditLog({
          userId,
          email: userData.email,
          action: 'CREATE',
          resource: 'Create or Update Form',
          data: JSON.stringify(upsertForm),
        });
      }
    }

    return createResponse('success', 201, upsertForm);
  }

  // Soft Delete form by setting deletedAt date
  async deleteForm(userId: string) {
    const form = await this.formModel.findOne({ userId });

    if (!form) {
      throw new NotFoundException(
        createResponse('error', 404, 'Form not found'),
      );
    }

    form.deletedAt = new Date(); // Set deletedAt to current date
    await form.save();

    // Find user
    const user = await this.userService.getUser(userId);
    if (user) {
      const userData = user.data;

      // Create log
      if (userData) {
        await this.auditLogService.createAuditLog({
          userId,
          email: userData.email,
          action: 'DELETE',
          resource: 'Delete Form',
          data: JSON.stringify(form),
        });
      }
    }

    return createResponse('success', 200, 'Form deleted successfully');
  }
}
