import {Event} from "./Event";
import {IClientChannel} from "./client/IClientChannel";

interface IOption<T>{
    address:T
    name:string
    id:any
}

interface IChannelManager{
    channels: IClientChannel[]
    add:()=>{}
    remove:()=>{}
}

class SocketChannel implements IClientChannel{

    constructor(option:IOption<string>) {
        this.option = option;
    }

    onData: Event<string>;
    state: boolean;
    option:IOption<string>;
    connect(): void {
    }

    disConnect(): void {
    }
}

 new SocketChannel({name:"测试设备",id:1,address:"192.168.1.222:10001"}).onData(e => console.log(e))
