import {Buffer} from "buffer";
import {Socket} from "net";
import {BaseChannel} from "../../baseChannel";
import {StringFilter} from "../../filter";
import {SerialPort, SerialPortOpenOptions} from "serialport";

export class TcpChannel extends BaseChannel{
    constructor(serialPortOpenOptions:SerialPortOpenOptions<any>) {
        super(new SerialPort(serialPortOpenOptions),StringFilter)
    }
    async connect(): Promise<Boolean> {
        const serialPort = this.duplex as SerialPort;
        return  new Promise((resolve,reject)=>{
            const listener = (error)=>{
                console.log(error)
                reject(false)
            }
            serialPort.once("error",listener)
            serialPort.open(()=>{
                serialPort.removeListener("error",listener);
                resolve(true)
            });
        })
    }
}
