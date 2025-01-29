import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FormModule } from './modules/form/form.module';
import { BookModule } from './modules/book/book.module';
import { AuditLogModule } from './modules/audit-log/audit-log.module';

@Module({
  imports: [
    // Load env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Database setup
    MongooseModule.forRoot(
      process.env.MONGO_URL ?? 'mongodb://localhost:27017',
    ),
    AuthModule,
    UserModule,
    FormModule,
    BookModule,
    AuditLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
