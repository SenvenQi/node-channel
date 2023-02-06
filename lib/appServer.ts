import {Duplex} from "stream";
import {SessionManager} from "./sessionManager";
import {ChannelConstructorWithDuplex} from "./baseChannel";
import {Event, SessionConstructor} from "./session";
import {Filter} from "./filter";

export interface AppServer{
    connection(duplex:Duplex,filter:Filter):void
    listen(): void
    disListen(): void
}


export class BaseAppServer extends SessionManager implements AppServer {
    private readonly ctorSession:SessionConstructor
    private readonly ctorChannel:ChannelConstructorWithDuplex
    private callback:Event<any>
    constructor(ctorSession:SessionConstructor,ctorChannel:ChannelConstructorWithDuplex) {
        super();
        this.ctorChannel = ctorChannel
        this.ctorSession = ctorSession
    }

    connection(duplex:Duplex,filter:Filter): void {
        const session = new this.ctorSession(new this.ctorChannel(duplex,filter),this.callback);
        session.onClose = this.remove.bind(this)
        session.onMessage = this.callback.bind(this)
        this.sessions.set(session.id,session)
    }

    listen():void{

    }

    onServerData(func:Event<any>){
        this.callback = func;
    }
    disListen():void{

    }
}
