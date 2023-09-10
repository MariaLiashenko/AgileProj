import { Injectable, Logger } from "@nestjs/common"
import { Configuration, OpenAIApi, CreateCompletionRequest } from "openai"
import { GetAiModelAnswer } from "../model/openai.model.answer"

@Injectable()
export class ChatGptAiService {
  private readonly openAiApi: OpenAIApi
  private readonly logger: Logger = new Logger(ChatGptAiService.name)
  constructor() {
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    })

    this.openAiApi = new OpenAIApi(configuration)
  }

  async listModels() {
    const models = await this.openAiApi.listModels()
    return models.data
  }

  async getModelAnswer(input: GetAiModelAnswer) {
    try {
      const prompt =
        "I want you to act as a coach and generate user stories and give advice based on Agile principles. " +
        "If I ask something about Agile, you should answer as Agile coach" +
        "If I say greetings you should answer and explain what you can do as Agile coach" +
        "If I ask to create me user story you should ask me about all fields in user story" +
        " Each user story should have such fields: Responsibility:  text field; Status: to do, in progress, finished; Priority:  from 1 to 5;Project: text field;Sprint: number;Description: text" +
        "I need to provide all details about my current user story and write all fields" +
        "You can`t fill fields with your information, If I am not write all fields, you should ask me about each field" +
        "If I am not write all fields, you should ask me about each field: Responsibility, Status, Priority,Project, Sprint,Description" +
        " if I enter them not by their type, you should ask me to rewrite them. " +
        "After you have all information about that story point you as Agile coach should combine that all to json, write it to me and ask me if I want to put that into database," +
        " if I unswer Yes, answer, that you post that information to database." +
        " By the way,I can ask advice and you should offering advice on various topics,based on Agile principles."

      const params: CreateCompletionRequest = {
        prompt: prompt + input.question,
        model: input.getModelId(),
        temperature: input.getTemperature(),
        max_tokens: input.getMaxTokens(),
      }

      const response = await this.openAiApi.createCompletion(params)

      const { data } = response
      if (data.choices.length) {
        return data.choices
      }
      return response.data
    } catch (error) {
      this.logger.error("Error processing user request >> ", error)
    }
  }
}
