import {BaseChannel} from "../../baseChannel";
import {StringFilter} from "../../filter";
import  { WebSocket , WebSocketServer } from 'ws';
import {WebSocketDuplex} from "../webSocketDuplex";

export class WebSocketChannel extends BaseChannel{

    constructor(options:any) {
        super(new WebSocketDuplex(new WebSocket(options.address)),StringFilter)
    }
    async connect(): Promise<Boolean> {
        const socket = this.duplex as WebSocketDuplex;
        return socket.connect();
    }
}
