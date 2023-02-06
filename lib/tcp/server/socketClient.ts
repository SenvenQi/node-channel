import {SessionServer} from "../../session";
import {BaseChannel} from "../../baseChannel";
import {Event} from "../../session";

export class SocketClient extends SessionServer{

    constructor(channel:BaseChannel,func?:Event<any>) {
        super(channel);
        this.onMessage = func;
        this.channel.on("data",this.onMessage)
    }
    async open():Promise<boolean>{
        return true;
    }
}


