import { Buffer } from 'buffer'

export interface Filter<T>{
    filter(buffer:Buffer):T
}

export class BaseFilter<R> implements Filter<R> {
    private buffer:Buffer;

    filter(buffer:Buffer): R{
        let result;
        if (!this.buffer)
           this.buffer = Buffer.from(buffer)
        else
            this.buffer = Buffer.concat([this.buffer,buffer])
        if (this.buffer.length >=20){
            result = this.buffer.slice(0,20).toString()
            this.buffer =  this.buffer.subarray(20)
        }
        return result
    }
}
