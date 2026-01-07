import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
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

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}/${globalPrefix}`);
}
bootstrap();
