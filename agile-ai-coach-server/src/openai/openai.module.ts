import { Module } from "@nestjs/common"
import { ChatGptAiController } from "./openai.controller"
import { ChatGptAiService } from "./openai.service"

@Module({
  controllers: [ChatGptAiController],
  providers: [ChatGptAiService],
})
export class ChatGptAiModule {}
