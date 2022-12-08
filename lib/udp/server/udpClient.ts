import {SessionImpl} from "../../session";
import {BaseChannel} from "../../baseChannel";

export class UdpClient extends SessionImpl{

    constructor(channel:BaseChannel) {
        super(channel);
        this.channel.on("data",(message:any)=>{
            console.log(message)
        })
    }
    async open(){

    }
}


