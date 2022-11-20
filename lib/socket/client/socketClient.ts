import {Connector} from "./conenctor";
import {SessionImpl} from "../../session";

export class SocketClient extends SessionImpl{

    getConnector():Connector {
        return  new Connector({})
    }

    async connect(path:string):Promise<boolean>{
        const connector = this.getConnector()
        try {
            const connectState = await connector.connect(path)
            this.channel = connectState.createChannel()
            return true;
        }catch (e) {
            console.log(e);
            return false
        }
    }

    async open(path:string){
        await this.connect(path)
        this.channel.on("data",this.onMessage)
    }
}


