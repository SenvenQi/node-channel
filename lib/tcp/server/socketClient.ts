import {SessionServer} from "../../session";
import {BaseChannel} from "../../baseChannel";

export class SocketClient extends SessionServer{

    constructor(channel:BaseChannel) {
        super(channel);
        this.channel.on("data",(message:any)=>{
            console.log(message)
        })
    }
    async open():Promise<boolean>{
        return true;
    }
}


