export interface ChannelConstructor<T>{
    new ( options: T) : Channel;
}

export interface Channel{
    send<T>(buffer:T):void
}


