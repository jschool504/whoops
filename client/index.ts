export interface WhoopsClientContext {
    whoopsSettings: {
        host: string
        applicationId: number
    }
}

export class WhoopsClient {

    constructor(
        private context: WhoopsClientContext
    ) {}

    async info(tag: string, body: string) {
        await fetch(this.context.whoopsSettings.host + '/events', {
            method: 'post',
            body: JSON.stringify({
                tag,
                body,
                applicationId: this.context.whoopsSettings.applicationId,
                level: 'INFO'
            })
        })
    }

    async warn(tag: string, body: string) {
        await fetch(this.context.whoopsSettings.host + '/events', {
            method: 'post',
            body: JSON.stringify({
                tag,
                body,
                applicationId: this.context.whoopsSettings.applicationId,
                level: 'WARN'
            })
        })
    }

    async error(tag: string, body: string) {
        await fetch(this.context.whoopsSettings.host + '/events', {
            method: 'post',
            body: JSON.stringify({
                tag,
                body,
                applicationId: this.context.whoopsSettings.applicationId,
                level: 'ERROR'
            })
        })
    }

}
