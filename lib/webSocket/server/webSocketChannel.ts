import {BaseChannel} from "../../baseChannel";
import {StringFilter} from "../../filter";
import  { WebSocket , WebSocketServer } from 'ws';
import {WebSocketDuplex} from "../webSocketDuplex";

export class WebSocketChannel extends BaseChannel{

    constructor(webSocketDuplex:WebSocketDuplex) {
        super(webSocketDuplex,StringFilter)
    }
}
