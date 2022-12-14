import {Duplex} from "stream";
import {Filter, StringFilter} from "./filter";
export interface ChannelConstructor{
    new (...args:any[]):BaseChannel
}

export interface ChannelConstructorWithDuplex{
    new (duplex:Duplex,filter:Filter):BaseChannel
}
export abstract class BaseChannel extends Duplex {
    public readonly duplex:Duplex
    private filter:Filter;
    public onClose:() => void;

    protected constructor(duplex:Duplex,filter:Filter) {
        super({ readableObjectMode: true });
        this.filter = filter
        this.duplex = duplex
        this.duplex.pipe(this)
        this.duplex.on("close",()=>{
            this.onClose()
        })
    }

     _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
        if (!this.filter)
            this.filter = new StringFilter()
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
