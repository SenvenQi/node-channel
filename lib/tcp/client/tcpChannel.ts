import { Socket } from "net";
import { BaseChannel } from "../../baseChannel";
import { Filter } from "../../filter";
import { TcpOptions } from "../../options";

export class TcpChannel extends BaseChannel {
    private readonly port: number;
    private readonly host: string;

    constructor(options: TcpOptions & { ipEndpoint?: string }, filter: Filter) {
        super(new Socket(), filter);
        this.port = options.port;
        // `host` is the canonical name; `ipEndpoint` kept for back-compat.
        this.host = options.host ?? options.ipEndpoint;
    }
    async connect(): Promise<boolean> {
        const socket = this.duplex as Socket;
        return new Promise((resolve, reject) => {
            const listener = (error: Error) => {
                reject(error);
            };
            socket.once("error", listener);
            socket.connect(this.port, this.host, () => {
                socket.removeListener("error", listener);
                resolve(true);
            });
        });
    }
}
