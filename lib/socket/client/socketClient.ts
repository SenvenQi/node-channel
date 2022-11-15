import {Channel} from "../../channel";
import {Buffer} from "buffer";
import {Connector} from "./conenctor";

export class SocketClient implements Channel{

    private channel:Channel;

    receive: (e:Buffer) => void

    getConnector():Connector {
        return  new Connector({})
    }

    async connect(path:string):Promise<void>{
        const connector = this.getConnector()
        const connectState = await connector.connect(path)
        this.channel = connectState.createChannel()
        this.channel.receive = this.receive;
    }

    send(buffer): void {
        this.channel.send(buffer)
    }
}


