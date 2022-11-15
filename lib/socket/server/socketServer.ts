import { ClientChannel, IOption } from "../../client/clientChannel";
import {Event} from "../../event";
import {Server, ServerOpts} from "net"
import { ServerChannel } from "../../server/serverChannel";

class SocketOptions {
    socketConstructorOpts:ServerOpts
    path:string;
}


class SocketChannel implements ServerChannel{

    private socket:Server;

    constructor(option:IOption<SocketOptions>) {
        this.option = option;
    }

    onData: Event<any>;
    state: boolean;
    option:IOption<SocketOptions>;
    listen(): void {
        this.socket = new Server(this.option.args.socketConstructorOpts)
        this.socket.on("connect",this.onData)
        // this.socket.on("ready",this.onData)
        // this.socket.on("timeout",this.onData)
        // this.socket.on("end",this.onData)
        // this.socket.on("close",this.onData)
        this.socket.on("data",this.onData)
        // this.socket.on("error",this.onData)
        // this.socket.on("lookup",this.onData)
        // this.socket.on("drain",this.onData)
        this.socket.listen(this.option.args.path);
    }

    disListen(): void {
        this.socket?.close();
    }
}
