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
        await fetch(this.context.whoopsSettings.host, {
            method: 'post',
            body: JSON.stringify({
                tag,
                body,
                level: 'INFO'
            })
        })
    }

    async warn(tag: string, body: string) {
        await fetch(this.context.whoopsSettings.host, {
            method: 'post',
            body: JSON.stringify({
                tag,
                body,
                level: 'WARN'
            })
        })
    }

    async error(tag: string, body: string) {
        await fetch(this.context.whoopsSettings.host, {
            method: 'post',
            body: JSON.stringify({
                tag,
                body,
                level: 'ERROR'
            })
        })
    }

}
