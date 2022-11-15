import {Event} from "../../event";
import {Socket, SocketConstructorOpts} from "net"
import {Channel} from "../../channel";
import {Buffer} from "buffer";




export class SocketChannel implements Channel{

    private socket:Socket;

    receive: Event<Buffer>;

    send(buffer): void {
        this.socket.write(buffer)
    }
}


