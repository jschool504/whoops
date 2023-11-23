import { Dayjs } from "dayjs"

export interface HasCreatedAt {
    createdAt: Dayjs
}

export interface HasUpdatedAt {
    updatedAt: Dayjs
}

// deleted may be null
export interface HasDeletedAt {
    deletedAt?: Dayjs
}

export interface IsSaved {
    id: number
}

export type HasTimestamps = HasCreatedAt & HasUpdatedAt & HasDeletedAt

export type SavedWithTimestamps<T> = T & IsSaved & HasTimestamps
export type Saved<T> = T & IsSaved
// FIXME: this is needed because Prisma has id as a required field on it's
// model, even though it doesn't actually require it :(
export type Unsaved<T> = T
