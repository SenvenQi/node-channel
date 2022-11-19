import {Duplex} from "stream";
import {BaseFilter} from "./filter";

export abstract class BaseChannel<R> extends Duplex {
    private readonly duplex:Duplex
    private readonly filter:BaseFilter = new BaseFilter()

    protected constructor(duplex:Duplex) {
        super({readableObjectMode:true});
        this.duplex = duplex
        this.duplex.pipe(this)
    }

     _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
         const result = this.filter.decodePackage(chunk);
         if (result)
            this.push(result)
         callback()
    }

    _read(size: number) {
       this.resume()
    }

    send(buffer): void {
        this.duplex.write(buffer);
    }

}
