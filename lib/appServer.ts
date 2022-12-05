import {Duplex} from "stream";
import {SessionManager} from "./sessionManager";
import {ChannelConstructor, ChannelConstructorWithDuplex} from "./baseChannel";
import {SessionConstructor} from "./session";

export interface AppServer{
    connection(duplex:Duplex):void
    listen(): void
    disListen(): void
}


export class BaseAppServer extends SessionManager implements AppServer {
    private readonly ctorSession:SessionConstructor
    private readonly ctorChannel:ChannelConstructorWithDuplex
    constructor(ctorSession:SessionConstructor,ctorChannel:ChannelConstructorWithDuplex) {
        super();
        this.ctorChannel = ctorChannel
        this.ctorSession = ctorSession
    }

    connection(duplex:Duplex): void {
        const session = new this.ctorSession(new this.ctorChannel(duplex),{});
        session.onClose = this.remove.bind(this)
        this.sessions.set(session.id,session)
    }

    listen():void{

    }

    disListen():void{

    }
}
