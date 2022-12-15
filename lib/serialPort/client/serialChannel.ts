import {BaseChannel} from "../../baseChannel";
import {Filter, StringFilter} from "../../filter";
import {SerialPort, SerialPortOpenOptions} from "serialport";

export class SerialChannel extends BaseChannel{
    constructor(serialPortOpenOptions:SerialPortOpenOptions<any>,filter:Filter) {
        super(new SerialPort(serialPortOpenOptions),filter)
    }
    async connect(): Promise<boolean> {
        const serialPort = this.duplex as SerialPort;
        return  new Promise((resolve,reject)=>{
            const listener = (error)=>{
                console.log(error)
                reject(false)
            }
            serialPort.once("error",listener)
            serialPort.open((err)=>{
                serialPort.removeListener("error",listener);
                if (err)
                    reject(err)
                else
                    resolve(true)
            });
        })
    }
}
