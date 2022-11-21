import {Duplex} from "stream";
import {StringFilter} from "./filter";
export interface ChannelConstructor{
    new ():BaseChannel
}
export abstract class BaseChannel extends Duplex {
    protected readonly duplex:Duplex
    private readonly filter:StringFilter= new StringFilter()

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
