import {Channel} from "./channel";
import {Duplex} from "stream";
import {BaseFilter} from "./filter";

export class BaseChannel<R> extends Duplex implements Channel{
    private readonly duplex:Duplex
    private readonly filter:BaseFilter<R> = new BaseFilter<R>()

    constructor(duplex:Duplex) {
        super({readableObjectMode:true});
        this.duplex = duplex
        this.duplex.pipe(this)
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
