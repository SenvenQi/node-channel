import { Duplex } from "stream";
import { HID } from "node-hid";

export class HidStream extends Duplex {
    private hid!: HID;
    private readonly path: string;
    constructor(path: string) {
        super();
        this.path = path;
    }
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void) {
        this.hid.write(chunk);
        callback();
    }

    _read(size: number) {
        this.resume();
    }

    /**
     * Close the underlying HID handle when the stream is destroyed so the
     * device is released instead of being held open after the session ends.
     */
    _destroy(error: Error | null, callback: (error?: Error | null) => void) {
        try {
            this.hid?.close();
        } catch {
            // handle may already be closed; ignore.
        }
        callback(error);
    }

    open() {
        this.hid = new HID(this.path);
        this.hid.on("data", (data: Buffer) => {
            this.push(data);
        });
        // Surface device errors to consumers instead of swallowing them.
        this.hid.on("error", (err: Error) => {
            this.emit("error", err);
        });
    }
}
