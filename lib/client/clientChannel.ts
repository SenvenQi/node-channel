import { Event } from "../event"
export interface ClientChannel {
    onData: Event<any>
    connect():void
    disConnect():void
    state:boolean
}

export interface IOption<T>{
    args:T
    name:string
    id:any
}
