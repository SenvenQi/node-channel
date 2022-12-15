import {Socket} from "net";
import {BaseChannel} from "../../baseChannel";
import {Filter, StringFilter} from "../../filter";

export class TcpChannel extends BaseChannel{
    constructor(socket:Socket,filter:Filter) {
        super(socket,filter)
    }
}
