import { Event } from "./event";

export interface ServerChannel {
    onData: Event<string>

    listen(): void

    disListen(): void

    state: boolean
}
