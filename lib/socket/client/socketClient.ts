import { ClientChannel, IOption } from "../../client/clientChannel";
import {Event} from "../../event";
import {Socket, SocketConstructorOpts} from "net"

class SocketOptions {
    socketConstructorOpts:SocketConstructorOpts
    path:string;
}


class SocketChannel implements ClientChannel{

    private socket:Socket;

    constructor(option:IOption<SocketOptions>) {
        this.option = option;
    }

    onData: Event<any>;
    state: boolean;
    option:IOption<SocketOptions>;
    connect(): void {
        this.socket = new Socket(this.option.args.socketConstructorOpts)
        this.socket.on("connect",this.onData)
        this.socket.on("ready",this.onData)
        this.socket.on("timeout",this.onData)
        this.socket.on("end",this.onData)
        this.socket.on("close",this.onData)
        this.socket.on("data",this.onData)
        this.socket.on("error",this.onData)
        this.socket.on("lookup",this.onData)
        this.socket.on("drain",this.onData)
        this.socket.connect(this.option.args.path);
    }

    disConnect(): void {
        this.socket?.destroy();
    }
}


