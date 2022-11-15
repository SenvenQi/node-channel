import {Event} from "./event";
import { Buffer } from "buffer";

export interface Channel{
    send(buffer:Buffer):void
    receive:Event<Buffer>
}

interface IChannelManager{
    channels: Channel[]
    add:()=>{}
    remove:()=>{}
}


