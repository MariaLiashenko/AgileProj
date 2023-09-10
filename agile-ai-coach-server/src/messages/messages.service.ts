import { Injectable } from "@nestjs/common"

@Injectable()
export class MessagesService {
  typing() {
    return `This action returns all messages`
  }
}
