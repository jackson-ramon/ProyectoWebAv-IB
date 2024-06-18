import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'socket.io';
import { Socket } from 'dgram';
import { OnModuleInit } from '@nestjs/common';
import { Observable, from, map } from 'rxjs';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnModuleInit {
  constructor(private readonly chatService: ChatService) { }

  @WebSocketServer() server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Client connected: ', socket.id);
      socket.on('disconnect', () => {
        console.log('Client disconnected: ', socket.id);
      });
    });
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map((item) => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  @SubscribeMessage('event_message')
  handleIncommingMessage(client: any, payload: { message: string; username: string }): void {
    this.server.emit('event_message', payload);
  }
}