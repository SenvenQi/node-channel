import {Socket} from "net";
import {BaseChannel} from "../../baseChannel";
import {StringFilter} from "../../filter";

export class TcpChannel extends BaseChannel{
    constructor(socket:Socket) {
        super(socket,StringFilter)
    }
}
