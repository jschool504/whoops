import { Dayjs } from "dayjs"
import { Level } from "./enums"

export interface Application {
    name: string
    // event: Event[]
}

export interface Event {
    applicationId: number
    tag: string
    body: string
    level: Level
    // application: Application
}

export interface User {
    email: string
}
