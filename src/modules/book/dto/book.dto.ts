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
  @IsArray()
  formData: FormDataItem[];
}
