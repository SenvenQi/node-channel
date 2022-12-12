import {SessionImpl} from "../../session";
import {UdpChannel} from "./udpChannel";

export class UdpClient extends SessionImpl{
    async connect():Promise<boolean>{
        const channel = this.channel as UdpChannel
        try {
            await channel.connect()
            this.channel = channel
            return true
        }catch (e) {
            console.log(e);
            return false
        }
    }

    async open():Promise<boolean>{
        await this.connect()
        this.channel.on("data",this.onMessage)

        return false;
    }
}


