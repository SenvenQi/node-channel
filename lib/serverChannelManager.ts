import {Session, SessionImpl} from "./session";
import {SessionManager} from "./sessionManager";

export interface ServerChannelManager {
    listen(): void

    disListen(): void

    state: boolean
}

export abstract class ServerChannelManagerImpl extends SessionManager implements ServerChannelManager{

    abstract state: boolean;

    abstract disListen(): void;

    abstract listen(): void;
}
