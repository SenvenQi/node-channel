import {BaseChannel} from "../../baseChannel";
import {Filter} from "../../filter";
import  { WebSocket  } from 'ws';
import {WebSocketDuplex} from "../webSocketDuplex";
import {WebSocketOptions} from "../../options";

export class WebSocketChannel extends BaseChannel{

    constructor(options:WebSocketOptions,filter:Filter) {
        super(new WebSocketDuplex(new WebSocket(options.address)),filter)
    }
    async connect(): Promise<Boolean> {
        const socket = this.duplex as WebSocketDuplex;
        return socket.connect();
    }
}
