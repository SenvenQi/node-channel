import {Channel} from "./channel";
import {Transform, Duplex, Readable, Writable, TransformCallback} from "stream";
import {BaseFiler} from "./filter";

export class BaseChannel extends Transform implements Channel{
    private isSend:boolean = false;
    private readonly duplex:Duplex;
    constructor(duplex:Duplex) {
        super();
        this.duplex = duplex;
        this.duplex.pipe(new BaseFiler()).on("data",(data)=>{
            console.log(data);
        });
    }

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        console.log(chunk)
        if (this.isSend)
            callback(null,"hello")
        else{
            this.isSend = true
            callback(null,"hello123123")
        }
    }

    receive(buffer: any): void {
    }

    send(buffer): void {
        this.push(buffer);
    }

}
