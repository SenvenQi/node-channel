import { Duplex } from "stream";
import { Socket } from "dgram";
export class UdpDuplex extends Duplex {
    private udp: Socket;
    private msg: string | Uint8Array | ReadonlyArray<any>;
    private port?: number;
    private address?: string;
    constructor(udp: Socket) {
        super({ readableObjectMode: true });
        this.udp = udp;
        this.udp.on("message", (msg, rinfo) => {
            // Push the raw datagram payload so the data shape matches the
            // other channels (TCP/WS) and the configured filter can decode
            // it. Sender info is exposed separately for those who need it.
            this.push(msg);
            this.emit("rinfo", rinfo);
        });
        this.udp.on("error", (err) => {
            this.emit("error", err);
        });
        this.udp.on("close", () => {
            this.emit("close");
        });
    }

    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void) {
        this.udp.send(chunk, this.port, this.address, callback);
    }
    _read(size: number) {
        this.resume();
    }

    connect(port: number, host: string, connectionListener?: () => void) {
        this.port = port;
        this.address = host;
    }

    bind(port: number, host: string, connectionListener?: () => void) {
        this.port = port;
        this.address = host;
        this.udp.bind(port, host, connectionListener);
    }
}
