import { Duplex } from "stream";
import { Socket } from "dgram";
export class UdpDuplex extends Duplex {
    private udp: Socket;
    private port?: number;
    private address?: string;
    private readonly broadcast: boolean;
    constructor(udp: Socket, broadcast = false) {
        super({ readableObjectMode: true });
        this.udp = udp;
        this.broadcast = broadcast;
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

    /**
     * Release the underlying dgram socket when the stream is destroyed so
     * the bound local port is freed instead of leaking for the lifetime of
     * the process.
     */
    _destroy(error: Error | null, callback: (error?: Error | null) => void) {
        try {
            this.udp.close();
        } catch {
            // socket may already be closed; ignore.
        }
        callback(error);
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

    /**
     * Bind a *local* port for receiving without overwriting the send target
     * configured via {@link connect}. Enables SO_BROADCAST when the duplex
     * was created in broadcast mode. Used by listen/broadcast style clients.
     */
    bindLocal(localPort: number, connectionListener?: () => void) {
        this.udp.bind(localPort, () => {
            if (this.broadcast) this.udp.setBroadcast(true);
            connectionListener?.();
        });
    }
}
