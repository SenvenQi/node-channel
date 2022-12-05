import {Duplex} from "stream";
import {HID} from "node-hid";

export class HidStream extends Duplex {
    private hid:HID;
    private readonly path:string;
    constructor(path:string) {
       super();
       this.path = path;
    }
     _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
        this.hid.write(chunk);
        callback()
    }

    _read(size: number) {
       this.resume()
    }

    open(){
        this.hid = new HID(this.path);
       this.hid.on("data",(data:Buffer)=>{
           this.push(data)
       })
    }
}
