import {SessionImpl} from "../../session";
import {TcpChannel} from "./tcpChannel";

export class SocketClient extends SessionImpl{
    async connect():Promise<boolean>{
        const channel = this.channel as TcpChannel
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
        if (await this.connect()){
            this.channel.on("data",this.onMessage)
            return true;
        }
        return false;
    }
}


