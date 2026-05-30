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
    public onClose?:() => void;

    protected constructor(duplex:Duplex,filter:Filter) {
        super({ readableObjectMode: true });
        this.filter = filter || new StringFilter()
        this.duplex = duplex
        this.duplex.pipe(this)
        this.duplex.on("close",()=>{
            this.onClose?.()
        })
    }

     _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
         const frames = this.filter.decodePackage(chunk);
         for (const frame of frames)
            this.push(frame)
         callback()
    }

    _read(size: number) {
       this.resume()
    }

    send(buffer: any): void {
        this.duplex.write(buffer);
    }

    /**
     * Tear down both the wrapper stream and the underlying transport so
     * sockets/handles are released instead of leaking after a session
     * is removed.
     */
    close(): void {
        const underlying = this.duplex as Duplex;
        if (typeof underlying.destroy === "function")
            underlying.destroy();
        if (typeof this.destroy === "function")
            this.destroy();
    }

}
