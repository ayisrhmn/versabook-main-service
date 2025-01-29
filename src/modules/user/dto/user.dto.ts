import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';

export class UserDto extends RegisterDto {
  @ApiProperty({
    type: 'object',
    properties: {
      name: { type: 'string', example: 'XYZ Company' },
      description: { type: 'string', example: 'Lorem ipsum dolor sit amet.' },
      tagline: { type: 'string', example: 'Lorem ipsum dolor sit amet.' },
      email: { type: 'string', example: 'xyz@example.com' },
      website: { type: 'string', example: 'https://xyz-company.com' },
      phone: { type: 'string', example: '+6285123456789' },
      address: { type: 'string', example: 'XYZ Street' },
      slug: { type: 'string', example: 'xyz-company' },
    },
  })
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
