import { Buffer } from 'buffer'

export interface Filter{
    decodePackage(buffer:Buffer):any
}

export class StringFilter implements Filter {
    private buffer:Buffer;

    decodePackage(buffer:Buffer): any{
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
