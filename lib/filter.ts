import { Buffer } from "buffer";
import { StringDecoder } from "string_decoder";

export interface Filter {
    /**
     * Decode a raw chunk into zero or more complete application frames.
     * Implementations buffer partial data internally and only return
     * complete frames, so callers are protected from TCP packet
     * fragmentation ("半包") and coalescing ("粘包").
     */
    decodePackage(buffer: Buffer): any[];
}

/**
 * Stream-mode filter. Emits decoded UTF-8 text as soon as it arrives.
 * Uses StringDecoder so multi-byte characters split across chunk
 * boundaries are not corrupted. Performs no framing — one chunk in,
 * at most one string out.
 */
export class StringFilter implements Filter {
    private decoder = new StringDecoder("utf8");

    decodePackage(buffer: Buffer): string[] {
        const text = this.decoder.write(buffer);
        return text.length > 0 ? [text] : [];
    }
}

/**
 * Frame-mode filter. Splits the incoming byte stream on a delimiter
 * (default: "\n") and returns only complete frames, keeping any trailing
 * partial frame buffered until the remainder arrives. This is what most
 * line/record based TCP protocols need to solve sticky-packet issues.
 */
export class DelimiterFilter implements Filter {
    private buffer: Buffer = Buffer.alloc(0);
    private readonly delimiter: Buffer;

    constructor(delimiter: string | Buffer = "\n") {
        this.delimiter = Buffer.isBuffer(delimiter) ? delimiter : Buffer.from(delimiter);
    }

    decodePackage(buffer: Buffer): string[] {
        this.buffer =
            this.buffer.length === 0 ? Buffer.from(buffer) : Buffer.concat([this.buffer, buffer]);

        const frames: string[] = [];
        let index: number;
        while ((index = this.buffer.indexOf(this.delimiter)) !== -1) {
            frames.push(this.buffer.subarray(0, index).toString());
            this.buffer = this.buffer.subarray(index + this.delimiter.length);
        }
        return frames;
    }
}
