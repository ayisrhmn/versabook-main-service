import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class FormDto {
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
