import {HidClient} from "./hid/client/hidClient";
import {HidChannel} from "./hid/client/hidChannel";
import {TcpClient} from "./tcp/client/tcpClient";
import {TcpChannel} from "./tcp/client/tcpChannel";
import {SerialClient} from "./serialPort/client/serialClient";
import {SerialChannel} from "./serialPort/client/serialChannel";
import {UdpClient} from "./udp/client/udpClient";
import {UdpChannel} from "./udp/client/udpChannel";
import {WebSocketClient} from "./webSocket/client/webSocketClient";
import {WebSocketChannel} from "./webSocket/client/webSocketChannel";
import {Filter} from "./filter";
import {ChannelConstructor} from "./baseChannel";
import {SessionClientConstructor} from "./session";

export enum ChannelType{
    Hid,
    Serial,
    Tcp,
    Udp,
    WebSocket
}

export  interface ChannelOption<T>{
    options:T
    filter:new () => Filter
}
export interface ClientArgs<T>{
    channelOptions:ChannelOption<T>
    channelType:ChannelType
}

export interface ClientOptions{
    session: any;
    channel:ChannelConstructor
}
export class Config{
    private static values:Map<ChannelType,ClientOptions> = new Map<ChannelType,ClientOptions>([
        [ChannelType.Hid,{
            session:HidClient,
            channel:HidChannel
        }],
        [ChannelType.Tcp,{
            session:TcpClient,
            channel:TcpChannel
        }],
        [ChannelType.Serial,{
            session:SerialClient,
            channel:SerialChannel
        }],
        [ChannelType.WebSocket,{
            session:WebSocketClient,
            channel:WebSocketChannel
        }],
        [ChannelType.Udp,{
            session:UdpClient,
            channel:UdpChannel
        }]]);

    public static getClientOptions(channelType:ChannelType):ClientOptions{
        return this.values.get(channelType)
    }
}
