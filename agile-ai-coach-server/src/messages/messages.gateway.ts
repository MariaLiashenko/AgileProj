import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets"

import { GetAiModelAnswer } from "../model/openai.model.answer"
import { ChatGptAiService } from "../openai/openai.service"
import { Socket } from "socket.io"

@WebSocketGateway(1001, { cors: { origin: "*" } })
export class MessagesGateway {
  constructor(private readonly chatGptService: ChatGptAiService) {}

  @WebSocketServer()
  server

  @SubscribeMessage("message")
  async handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const modelAnswerRequest = new GetAiModelAnswer()
      modelAnswerRequest.question = data
      modelAnswerRequest.modelId = "text-davinci-003"
      modelAnswerRequest.temperature = 0.9
      modelAnswerRequest.maxTokens = 2048

      const answer =
        await this.chatGptService.getModelAnswer(modelAnswerRequest)

      this.server.emit("message", answer[0].text)
    } catch (error) {
      console.error("Error processing message:", error)
    }
  }
}
