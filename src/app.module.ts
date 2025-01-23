import { INestApplication, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly appService: AppService) {}

  // Swagger config
  configureSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('VersaBook API')
      .setDescription('API documentation for the VersaBook App')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }
}
