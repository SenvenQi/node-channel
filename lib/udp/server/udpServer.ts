import {BindOptions, createSocket, Socket} from "dgram"
import { UdpChannel } from "./udpChannel";
import {SessionClient, SessionServer} from "../../session";


export class UdpServer extends SessionClient{
    private socket:Socket;
    async connect():Promise<boolean>{
        const channel = this.channel as UdpChannel
        try {
            const connected = await channel.connect()
            if (connected){
                this.channel = channel
                return true
            }
            return connected;
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
