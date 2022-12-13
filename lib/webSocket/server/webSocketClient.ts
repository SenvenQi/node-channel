import {SessionImpl} from "../../session";
import {WebSocketChannel} from "./webSocketChannel";
import {BaseChannel} from "../../baseChannel";

export class WebSocketClient extends SessionImpl{
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


