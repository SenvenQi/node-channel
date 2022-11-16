import { Buffer } from "buffer";

export interface Channel{
    send(buffer:Buffer):void
}


