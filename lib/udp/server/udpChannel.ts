import {BaseChannel} from "../../baseChannel";
import {StringFilter} from "../../filter";
import {UdpDuplex} from "../udpDuplex";

export class UdpChannel extends BaseChannel{
    constructor(socket:UdpDuplex) {
        super(socket,StringFilter)
    }
}
