import { BaseChannel } from "../../baseChannel";
import { Filter } from "../../filter";
import { UdpDuplex } from "../udpDuplex";
import { createSocket } from "dgram";
import { UdpOptions } from "../../options";

export class UdpChannel extends BaseChannel {
    private readonly port: number;
    private readonly host: string;
    constructor(options: UdpOptions, filter: Filter) {
        super(new UdpDuplex(createSocket("udp4")), filter);
        this.port = options.port;
        this.host = options.host;
    }
    async connect(): Promise<boolean> {
        const socket = this.duplex as UdpDuplex;
        return new Promise((resolve, reject) => {
            const listener = (error: Error) => {
                reject(error);
            };
            socket.once("error", listener);
            socket.bind(this.port, this.host, () => {
                socket.removeListener("error", listener);
                resolve(true);
            });
        });
    }
}
