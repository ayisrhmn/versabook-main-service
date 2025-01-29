import { IsOptional } from 'class-validator';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';

export class UserDto extends RegisterDto {
  @IsOptional()
  business?: {
    name: string;
    description: string;
    tagline: string;
    email: string;
    website: string;
    phone: string;
    address: string;
    slug: string;
  };
}
