import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class FormDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        label: { type: 'string', example: 'Name' },
        type: { type: 'string', example: 'text' },
        required: { type: 'boolean', example: true },
        options: { type: 'array', items: { type: 'string' }, example: [] },
        order: { type: 'number', example: 1 },
      },
    },
  })
  @IsArray()
  @IsNotEmpty()
  fields: Array<{
    label: string;
    type: string;
    required: boolean;
    options?: string[];
    order: number;
  }>;
}
