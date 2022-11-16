import {Channel} from "./channel";
import {Transform, Duplex, Readable, Writable, TransformCallback} from "stream";
import {BaseFiler} from "./filter";

export class BaseChannel implements Channel{
    private isSend:boolean = false
    private readonly duplex:Duplex
    constructor(duplex:Duplex) {
        this.duplex = duplex
        this.duplex.pipe(new BaseFiler())
    }

    receive(buffer: any): void {
    }

    send(buffer): void {
        this.duplex.push(buffer)
    }

}
