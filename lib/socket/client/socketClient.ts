import {Connector} from "./conenctor";
import {BaseChannel} from "../../baseChannel";

export class SocketClient {

    private channel:BaseChannel<string>;


    receive(action){
        this.channel?.on("data",action)
    }

    getConnector():Connector {
        return  new Connector({})
    }

    async connect(path:string):Promise<void>{
        const connector = this.getConnector()
        try {
            const connectState = await connector.connect(path)
            this.channel = connectState.createChannel()
        }catch (e) {
            console.log(e);
        }
    }

    send(buffer): void {
        this.channel?.send(buffer)
    }
}


