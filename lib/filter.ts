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
        result = this.buffer.toString()
        this.buffer =  this.buffer.subarray(this.buffer.length)
        return result.toString()
    }
}
