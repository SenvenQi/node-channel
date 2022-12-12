import {BindOptions, createSocket, Socket} from "dgram"
import { UdpChannel } from "./udpChannel";
import {SessionImpl} from "../../session";


export class UdpServer extends SessionImpl{
    private socket:Socket;
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
        if (await this.connect()){
            this.channel.on("data",this.onMessage)
            return true;
        }
        return false;
    }


    state: boolean;
    option:BindOptions;
    error(error:Error):void {
        console.log(error.message)
        this.socket?.close();

    }
}
