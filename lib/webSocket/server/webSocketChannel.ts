import { Duplex } from "stream";
import { BaseChannel } from "../../baseChannel";
import { Filter } from "../../filter";

export class WebSocketChannel extends BaseChannel {
    constructor(webSocketDuplex: Duplex, filter: Filter) {
        super(webSocketDuplex, filter);
    }
}
