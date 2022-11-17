import {Session, SessionImpl} from "./session";
import {Channel} from "./channel";

export class Student implements Session{
    constructor(name:string) {
        this.name = name;
    }
    name:string
    channel: Channel;
    id: string;
}

export function SessionFactory<T extends Session>(ctor: new (...args: any[]) => T,args:any[]){
    return new ctor(args);
}


SessionFactory(Student,["1111"])
