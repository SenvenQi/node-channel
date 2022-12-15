import {BaseChannel} from "../../baseChannel";
import {Filter, StringFilter} from "../../filter";
import  { WebSocket , WebSocketServer } from 'ws';
import {WebSocketDuplex} from "../webSocketDuplex";

export class WebSocketChannel extends BaseChannel{

    constructor(options:any,filter:Filter) {
        super(new WebSocketDuplex(new WebSocket(options.address)),filter)
    }
    async connect(): Promise<Boolean> {
        const socket = this.duplex as WebSocketDuplex;
        return socket.connect();
    }
}
