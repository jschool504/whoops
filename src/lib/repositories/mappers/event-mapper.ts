import dayjs from 'dayjs'
import { RepositoryMapper } from '../interfaces'
import { $Enums, Event as PrismaEvent } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { Event } from '../../models/domain'
import { Saved, SavedWithTimestamps, Unsaved } from '@/lib/models/modifiers'
import { Level } from '@/lib/models/enums'

const EventMapper: RepositoryMapper<Event, PrismaEvent, Prisma.EventUncheckedCreateInput> = {
    fromSavedPersistedToSavedDomain: function (persisted: Saved<PrismaEvent>): SavedWithTimestamps<Event> {
        return {
            id: persisted.id,
            applicationId: persisted.application_id,
            tag: persisted.tag,
            body: persisted.body,
            level: Level[persisted.level],
            createdAt: dayjs(persisted.created_at),
            updatedAt: dayjs(persisted.updated_at),
            deletedAt: dayjs(persisted.deleted_at),
        }
    },
    fromSavedDomainToSavedPersisted: function (domain: SavedWithTimestamps<Event>): Saved<PrismaEvent> {
        return {
            id: domain.id,
            application_id: domain.applicationId,
            tag: domain.tag,
            body: domain.body,
            level: domain.level as $Enums.Level,
            created_at: dayjs(domain.createdAt).toDate(),
            updated_at: dayjs(domain.updatedAt).toDate(),
            deleted_at: dayjs(domain.deletedAt).toDate(),
        }
    },
    fromDomainToPersisted: function (domain: Event): Prisma.EventUncheckedCreateInput {
        return {
            application_id: domain.applicationId,
            tag: domain.tag,
            body: domain.body,
            level: domain.level as $Enums.Level,
            created_at: dayjs().toDate(),
            updated_at: dayjs().toDate(),
            deleted_at: null
        }
    }
}

export default EventMapper
