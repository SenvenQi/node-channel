import {BaseChannel} from "../../baseChannel";
import {Filter, StringFilter} from "../../filter";
import  { WebSocket , WebSocketServer } from 'ws';
import {WebSocketDuplex} from "../webSocketDuplex";

export class WebSocketChannel extends BaseChannel{

    constructor(webSocketDuplex:WebSocketDuplex,filter:Filter) {
        super(webSocketDuplex,filter)
    }
}
