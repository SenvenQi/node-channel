import {SessionImpl} from "../../session";
import {BaseChannel} from "../../baseChannel";

export class SocketClient extends SessionImpl{

    constructor(channel:BaseChannel,options:any) {
        super(channel,options);
        this.channel.on("data",(message:any)=>{
            console.log(message)
        })
    }
    async open(){

    }
}


