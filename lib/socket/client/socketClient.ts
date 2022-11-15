import {Event} from "../../event";
import {Socket} from "net"
import {Channel} from "../../channel";
import {Buffer} from "buffer";
import {Connector} from "./conenctor";

export class SocketChannel implements Channel{

    private socket:Socket

    receive: Event<Buffer>

    getConnector():Connector {
        return  new Connector({})
    }

    async connect(path:string):Promise<void>{
        const connector = this.getConnector()
        const connectState = await connector.connect(path)
        connectState.createChannel()
    }

    send(buffer): void {
        this.socket.write(buffer)
    }
}


