import { createSocket } from "dgram";
import { BaseChannel } from "../../baseChannel";
import { Filter } from "../../filter";
import { UdpDuplex } from "../udpDuplex";
import { UdpOptions } from "../../options";

export class UdpChannel extends BaseChannel {
    private readonly port: number;
    private readonly host: string;
    private readonly localPort?: number;

    constructor(options: UdpOptions, filter: Filter) {
        super(new UdpDuplex(createSocket("udp4"), options.broadcast), filter);
        this.port = options.port;
        this.host = options.host;
        this.localPort = options.localPort;
    }
    async connect(): Promise<boolean> {
        const socket = this.duplex as UdpDuplex;
        // Configure the send target first so writes go to host:port.
        socket.connect(this.port, this.host);
        // When a local port is requested, bind it so inbound datagrams are
        // received; otherwise the socket is send-only and ready immediately.
        if (this.localPort === undefined) return true;
        return new Promise((resolve, reject) => {
            const listener = (error: Error) => reject(error);
            socket.once("error", listener);
            socket.bindLocal(this.localPort as number, () => {
                socket.removeListener("error", listener);
                resolve(true);
            });
        });
    }
}
