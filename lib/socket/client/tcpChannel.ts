import {Buffer} from "buffer";
import {Socket} from "net";
import {BaseChannel} from "../../baseChannel";

export class TcpChannel extends BaseChannel<string>{

    constructor(socketTemp: Socket) {
        super(socketTemp)
    }

    receive: (e:Buffer) => void
}
