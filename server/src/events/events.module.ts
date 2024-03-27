import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [EventsService, EventsGateway, PrismaService],
})
export class EventsModule {
}
