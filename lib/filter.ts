import { Buffer } from 'buffer'
import {Duplex} from "stream";

export interface Filter<T>{
    filter(buffer:Buffer):T
}

export class BaseFiler extends Duplex implements Filter<string> {
    private buffer:Buffer;
    readable:boolean = true
    constructor() {
        super();
        this.pipe(process.stdout)
    }
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
         this.push(this.filter(chunk))
         callback()
    }

    _read(size: number) {
       this.resume()
    }

    filter(buffer:Buffer): string {
        let result;
        if (!this.buffer)
           this.buffer = Buffer.from(buffer)
        else
            this.buffer = Buffer.concat([this.buffer,buffer])
        if (this.buffer.length >=20){
            result = this.buffer.slice(0,20).toString()
            this.buffer =  this.buffer.subarray(20)
        }
        return result
    }
}
