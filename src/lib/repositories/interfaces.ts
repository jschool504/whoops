import { PrismaClient } from '@prisma/client'
import { IsSaved, Saved } from '../models/modifiers'

export interface FromSavedPersistedToSavedDomain<D, P> {
    fromSavedPersistedToSavedDomain(persisted: Saved<P>): Saved<D>
}

export interface FromSavedDomainToSavedPersisted<D, P> {
    fromSavedDomainToSavedPersisted(domain: Saved<D>): Saved<P>
}

export interface FromDomainToPersisted<D, U> {
    fromDomainToPersisted(domain: D): U
}

export interface RepositoryMapper<D, P, U> extends
    FromSavedPersistedToSavedDomain<D, P>,
    FromSavedDomainToSavedPersisted<D, P>,
    FromDomainToPersisted<D, U> {}

export abstract class PrismaRepository<D, P, U> {

    constructor(
        protected context: {
            prisma: PrismaClient
            mapper: RepositoryMapper<D, P, U>
        }
    ) {}

}

export interface HasInsert<D> {
    insert: (domain: D) => Promise<Saved<D>>
}

export interface HasFindById<D> {
    findById: (id: number) => Promise<Saved<D>>
}

export interface HasAll<D> {
    all: () => Promise<Saved<D>[]>
}
