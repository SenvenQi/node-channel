import { Event } from "../Event"
export interface IClientChannel{
    onData: Event<string>
    connect():void
    disConnect():void
    state:boolean
}
