import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma.service';
import { EventsService } from './events.service';
import { OnModuleInit } from '@nestjs/common';
import { CreateChatDto } from './dto/events.dto';

@WebSocketGateway({
  cors: {
    origin: 3000
  },
})
export class EventsGateway implements OnModuleInit {
  constructor(private readonly eventsService: EventsService) { }

  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on("connection", (socket) => {
    })
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: any) {

    const newMessage = await this.eventsService.newMessage(body)

    this.server.emit("onMessage", {
      sender: body.authorId,
      content: body.content,
      object: newMessage
    })
  }

  @SubscribeMessage("newWriting")
  onWritingMessage(@MessageBody() body: any) {
    this.server.emit("onWriting", {
      msg: "Someone is Writing",
      content: body.sender
    })
  }

}


