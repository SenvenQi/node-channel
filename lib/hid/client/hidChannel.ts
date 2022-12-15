import {BaseChannel} from "../../baseChannel";
import {Filter, StringFilter} from "../../filter";
import {HidStream} from "../HidStream";

export class HidChannel extends BaseChannel{
    constructor(path:string,filter:Filter) {
        super(new HidStream(path),filter)
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
