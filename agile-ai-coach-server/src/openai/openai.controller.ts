import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { ChatGptAiService } from "./openai.service"
import { GetAiModelAnswer } from "../model/openai.model.answer"

@Controller("chat-gpt-ai")
export class ChatGptAiController {
  constructor(private readonly service: ChatGptAiService) {}

  @Post("/message")
  @UsePipes(ValidationPipe)
  getModelAnswer(
    @Body(new ValidationPipe({ transform: true })) data: GetAiModelAnswer,
  ) {
    return this.service.getModelAnswer(data)
  }

  @Get("/model")
  listModels() {
    return this.service.listModels()
  }
}
