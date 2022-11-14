import { ClientChannel, IOption } from "../../client/clientChannel";
import {Event} from "../../event";
import {Socket, SocketConstructorOpts, Server, ServerOpts} from "net"
import {ServerChannel} from "../../server/serverChannel";

class SocketOptions {
    serverOpts:ServerOpts
    path:string;
}


class SocketChannel implements ServerChannel{

    private socketServer:Server;

    constructor(option:IOption<SocketOptions>) {
        this.option = option;
    }

    onData: Event<any>;
    state: boolean;
    option:IOption<SocketOptions>;
    listen(): void {
        this.socketServer = new Server(this.option.args.serverOpts)
        // this.socket.on("connect",this.onData)
        // this.socket.on("ready",this.onData)
        // this.socket.on("timeout",this.onData)
        // this.socket.on("end",this.onData)
        // this.socket.on("close",this.onData)
        this.socketServer.on("data",this.onData.bind(this))
        // this.socket.on("error",this.onData)
        // this.socket.on("lookup",this.onData)
        // this.socket.on("drain",this.onData)
        this.socketServer.listen(this.option.args.path)
    }

    disListen(): void {
        this.socketServer?.close();
    }
}
