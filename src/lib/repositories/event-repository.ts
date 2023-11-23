import { Prisma, PrismaClient, Event as PrismaEvent } from '@prisma/client'
import { Event } from '../models/domain'
import { HasAll, HasInsert, RepositoryMapper } from './interfaces'
import { Dayjs } from 'dayjs'
import { Saved } from '../models/modifiers'

export interface CanFindByAppInRange {
    findByAppInRange: (start: Dayjs, end: Dayjs, applicationId?: number) => Promise<Saved<Event>[]>
}

export default class EventRepository implements HasInsert<Event>, HasAll<Event>, CanFindByAppInRange {

    constructor(
        private context: {
            prisma: PrismaClient,
            mapper: RepositoryMapper<Event, PrismaEvent, Prisma.EventUncheckedCreateInput>
        }
    ) {}

    async insert(event: Event) {
        const persisted = this.context.mapper.fromDomainToPersisted(event)
        const saved = await this.context.prisma.event.create({
            data: persisted
        })
        return this.context.mapper.fromSavedPersistedToSavedDomain(saved)
    }

    async all() {
        const saved = await this.context.prisma.event.findMany()
        return saved.map(this.context.mapper.fromSavedPersistedToSavedDomain)
    }

    async findByAppInRange(
        start: Dayjs,
        end: Dayjs,
        applicationId?: number
    ): Promise<Saved<Event>[]> {

        const events = await this.context.prisma.event.findMany({
            where: {
                application_id: applicationId,
                created_at: {
                    gte: start.toDate(),
                    lte: end.toDate(),
                },
            },
            orderBy: {
                created_at: 'asc'
            }
        })

        return events.map(this.context.mapper.fromSavedPersistedToSavedDomain)

    }

}
