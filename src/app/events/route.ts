import dayjs from 'dayjs'
import { NextRequest } from 'next/server'
import { Event } from '@/lib/models/domain'
import { context } from '@/app/singletons/context-singleton'

export async function POST(request: Request) {

    const payload: Event = await request.json()

    const event = await context.eventService.logEvent(payload)

    return Response.json({
        ok: true,
        event
    })

}

interface GetParams {
    applicationId?: string
    start: string
    end: string
}

export async function GET(request: NextRequest) {

    const params = Object.fromEntries(request.nextUrl.searchParams.entries()) as unknown as GetParams

    const events = await context.eventService.getApplicationEvents({
        applicationId: params.applicationId
            ? parseInt(params.applicationId)
            : undefined,
        start: dayjs(params.start),
        end: dayjs(params.end),
    })

    return Response.json({
        ok: true,
        events
    })

}
