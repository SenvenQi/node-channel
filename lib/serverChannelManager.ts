export interface ServerChannelManager {
    listen(): void

    disListen(): void

    state: boolean
}
