import {Channel} from "./channel";
import {Transform, Duplex, Readable, Writable, TransformCallback} from "stream";
import {BaseFilter,Filter} from "./filter";
import * as buffer from "buffer";

export class BaseChannel<R> extends Duplex implements Channel{
    private readonly duplex:Duplex
    private readonly filter:BaseFilter<R> = new BaseFilter<R>()
    constructor(duplex:Duplex) {
        super();
        this.duplex = duplex
        this.duplex.pipe(this).pipe(process.stdout)

    }

     _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
         const result = this.filter.filter(chunk);
         if (result)
            this.push(result)
         callback()
    }

    _read(size: number) {
       this.resume()
    }

    send(buffer): void {
        this.push(buffer);
    }

}
