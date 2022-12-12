import {SessionImpl} from "../../session";
import {HidChannel} from "./hidChannel";
export class HidClient extends SessionImpl{
    async connect():Promise<boolean>{
        const channel = this.channel as HidChannel
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
