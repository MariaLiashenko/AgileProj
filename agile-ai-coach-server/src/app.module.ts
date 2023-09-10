import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ChatGptAiModule } from "./openai/openai.module"
import { MessagesGateway } from "./messages/messages.gateway"
import { ChatGptAiService } from "./openai/openai.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"

@Module({
  imports: [ChatGptAiModule],
  controllers: [AppController],
  providers: [MessagesGateway, ChatGptAiService, AppService],
})
export class AppModule {}
