import {BaseChannel} from "../../baseChannel";
import {StringFilter} from "../../filter";
import {SerialPort, SerialPortOpenOptions} from "serialport";

export class SerialChannel extends BaseChannel{
    constructor(serialPortOpenOptions:SerialPortOpenOptions<any>) {
        super(new SerialPort(serialPortOpenOptions),StringFilter)
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
