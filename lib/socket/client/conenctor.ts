import {Socket, SocketConstructorOpts} from "net";

export class SocketOptions {
    socketConstructorOpts:SocketConstructorOpts
    path:string;
}

export class Connector {
    private socket:Socket
    option:SocketOptions;
    error(error:Error):void {
        console.log(error.message)
        this.socket?.destroy();
    }
    state:boolean
    connect(): void {
        this.socket = new Socket(this.option.socketConstructorOpts)
        this.socket.on("connect",()=>console.log("连接成功"))
        // this.socket.on("ready",this.onData)
        // this.socket.on("timeout",this.onData)
        // this.socket.on("end",this.onData)
        // this.socket.on("close",this.onData)
        // this.socket.on("data",this.onData.bind(this))
        this.socket.on("error",this.error.bind(this))
        // this.socket.on("lookup",this.onData)
        // this.socket.on("drain",this.onData)
        this.socket.connect(this.option.path);
    }

    disConnect(): void {
        this.socket?.destroy();
    }

}
