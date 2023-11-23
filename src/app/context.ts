import EventRepository from '@/lib/repositories/event-repository'
import EventMapper from '@/lib/repositories/mappers/event-mapper'
import { Event } from '@/lib/models/domain'
import { PrismaClient, Event as PrismaEvent } from '@prisma/client'
import { HasAll, HasInsert } from '@/lib/repositories/interfaces'
import EventService from '@/lib/services/event-service'
import { singleton } from '@/lib/singleton'


export default class Context {

    @singleton
    get prisma() {
        return new PrismaClient()
    }

    @singleton
    get eventRepository(): HasInsert<Event> & HasAll<Event> {
        return new EventRepository({
            prisma: this.prisma,
            mapper: EventMapper
        })
    }

    @singleton
    get eventService() {
        return new EventService(this)
    }

}
