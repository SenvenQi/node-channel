import { Duplex } from "stream";
import { BaseChannel } from "../../baseChannel";
import { Filter } from "../../filter";

export class TcpChannel extends BaseChannel {
    constructor(socket: Duplex, filter: Filter) {
        super(socket, filter);
    }
}
