import * as http from "http";
import formidable, { Fields, Files } from "formidable";
import { Event } from "../../session";
import { HttpOptions } from "../../options";

/**
 * Minimal HTTP listener that funnels every inbound request body to a single
 * data callback and answers each request with `200 OK`. Unlike the socket /
 * websocket servers it has no persistent per-connection sessions: HTTP is
 * request/response, so each request body is surfaced as one message.
 *
 * - `multipart/form-data` bodies are parsed with formidable and emitted as a
 *   JSON string `{ fields, files }`.
 * - Any other body is emitted as raw text, chunk by chunk, as it arrives.
 */
export class HttpServer {
    private server?: http.Server;
    private readonly option: HttpOptions;
    private callback?: Event<any>;

    /** Invoked when the server fails to listen or errors at runtime. */
    public onError: (error: Error) => void = () => {};
    /** Invoked once the server is listening. */
    public onListening: () => void = () => {};

    constructor(option: HttpOptions) {
        this.option = option;
    }

    onServerData(func: Event<any>) {
        this.callback = func;
    }

    private requestHandler(req: http.IncomingMessage, res: http.ServerResponse) {
        if (req.headers["content-type"]?.startsWith("multipart/form-data")) {
            const form = formidable({});
            form.parse(req, (err: any, fields: Fields, files: Files) => {
                if (!err) this.callback?.(JSON.stringify({ fields, files }));
            });
        } else {
            req.on("data", (data: any) => {
                this.callback?.(data.toString());
            });
        }
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("<strong>OK!</strong>");
    }

    listen(): void {
        this.server = http.createServer(this.requestHandler.bind(this));
        this.server.on("error", (error: Error) => this.onError(error));
        this.server.on("listening", () => this.onListening());
        this.server.listen(this.option.port, this.option.host);
    }

    disListen(): void {
        this.server?.removeAllListeners();
        this.server?.close();
        this.server = undefined;
    }
}
