import {SessionManager} from "./sessionManager";

export interface ServerChannelManager {
    listen(): void

    disListen(): void

    state: boolean
}
