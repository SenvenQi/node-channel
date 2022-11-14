import {Event} from "./event";
import {ClientChannel} from "./client/clientChannel";


interface IChannelManager{
    channels: ClientChannel[]
    add:()=>{}
    remove:()=>{}
}


