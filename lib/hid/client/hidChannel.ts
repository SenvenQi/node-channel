import {BaseChannel} from "../../baseChannel";
import {StringFilter} from "../../filter";
import {HidStream} from "../HidStream";

export class HidChannel extends BaseChannel{
    constructor(path:string) {
        super(new HidStream(path),StringFilter)
    }
    async connect(): Promise<boolean> {
        const serialPort = this.duplex as HidStream;
        return  new Promise((resolve,reject)=>{
            try {
                serialPort.open()
                resolve(true)
            }
            catch (e) {
                console.log(e)
                reject(false)
            }
        })
    }
}
