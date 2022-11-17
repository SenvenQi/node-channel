import {Session} from "./session";

export function SessionFactory<T extends Session>(ctor: new (...args: any[]) => T,args:any[]){
    return new ctor(args);
}
