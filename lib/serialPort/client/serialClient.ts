import {SessionClient, SessionServer} from "../../session";
import {SerialChannel} from "./serialChannel";

export class SerialClient extends SessionClient{
     async connect():Promise<boolean>{
        const channel = this.channel as SerialChannel
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
}
