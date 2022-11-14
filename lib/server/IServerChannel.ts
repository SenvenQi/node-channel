import { Event } from "../Event";

export interface IServerChannel {
    onData: Event<string>

    listen(): void

    disListen(): void

    state: boolean
}
