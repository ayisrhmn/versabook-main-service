import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
    cors: true,
  });

  // Set global prefix
  app.setGlobalPrefix('api');

  // Setup Swagger
  const swaggerCfg = new DocumentBuilder()
    .setTitle('VersaBook API')
    .setDescription('API documentation for VersaBook App')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerCfg, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('docs', app, swaggerDoc, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'VersaBook Swagger Docs',
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
