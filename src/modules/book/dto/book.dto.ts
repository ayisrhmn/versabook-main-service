import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';

class FormDataItem {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class BookDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        label: { type: 'string', example: 'Nama' },
        value: { type: 'string', example: 'John Doe' },
        type: { type: 'string', example: 'text' },
      },
    },
  })
  @IsArray()
  formData: FormDataItem[];
}
