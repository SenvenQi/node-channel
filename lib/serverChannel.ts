
export interface ServerChannel {
    listen(): void

    disListen(): void

    state: boolean
}
