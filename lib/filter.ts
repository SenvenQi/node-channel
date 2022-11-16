import { Buffer } from 'buffer'
import {Duplex} from "stream";

export interface Filter<T>{
    filter(buffer:Buffer):T
}

export class BaseFiler extends Duplex implements Filter<Buffer> {
    private buffer:Buffer;
    readable:boolean = true
    constructor() {
        super();
    }
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
         this.push({})
         callback()
    }

    _read(size: number) {
       this.resume()
    }

    filter(buffer:Buffer): Buffer {
         if (!this.buffer)
           this.buffer = Buffer.from(buffer)
        else
            this.buffer = Buffer.concat([this.buffer,buffer])
        return buffer
    }
}
