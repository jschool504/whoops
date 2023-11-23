import { Dayjs } from 'dayjs'
import { Event } from '../models/domain'
import { HasAll, HasInsert } from '../repositories/interfaces'
import { CanFindByAppInRange } from '../repositories/event-repository'

export default class EventService {

    constructor(
        private context: {
            eventRepository: HasAll<Event> & HasInsert<Event> & CanFindByAppInRange
        }
    ) {}

    async logEvent(event: Event) {
        return await this.context.eventRepository.insert(event)
    }

    async getApplicationEvents(
        params: {
            applicationId?: number,
            start: Dayjs,
            end: Dayjs
        }
    ) {
        return await this.context.eventRepository
            .findByAppInRange(
                params.start,
                params.end,
                params.applicationId
            )
    }

}
