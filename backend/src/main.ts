import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WsAdapter } from "@nestjs/platform-ws";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const globalPrefix = config.get<string>("app.globalPrefix") || "api";
  const port = config.get<number>("app.port") || 3000;
  const origin = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

  app.enableCors({
    origin,
    credentials: true
  });

  app.useWebSocketAdapter(new WsAdapter(app));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}/${globalPrefix}`);
}
bootstrap();
