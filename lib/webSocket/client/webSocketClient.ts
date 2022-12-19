import {SessionClient, SessionServer} from "../../session";
import {WebSocketChannel} from "./webSocketChannel";

export class WebSocketClient extends SessionClient{
    async connect():Promise<boolean>{
        const channel = this.channel as WebSocketChannel
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


