import * as HID  from "node-hid";
import { HidChannel } from "../lib/hid/client/hidChannel";
import { HidClient } from "../lib/hid/client/hidClient";
import { SessionManager } from "../lib/sessionManager";
import {StringFilter} from "../lib/filter";

const sessionManager = new SessionManager();

const devices = HID.devices();
const rfid = devices.filter(x => x.vendorId == 0x03eb && x.productId == 0x2421);
function connect(){
    sessionManager.connect(sessionId).then((result) => {
        if (result)
            setInterval(() => {
                sessionManager.send(sessionId, Buffer.from([0x5A,0x00,0x01,0x02,0xFF,0x00,0x00,0x88,0x5A]))
            }, 3000)
        else
            setTimeout(connect,3000)
    }).catch(e=>{
        setTimeout(connect,3000)
    })
}
const sessionId = sessionManager.add(HidClient, HidChannel, ["IOService:/IOResources/IOHIDResource/IOHIDResourceDeviceUserClient/IOHIDUserDevice",new StringFilter()])
sessionManager.onData(sessionId, (message: any) => {
    console.log("消息:", message)
})
connect();


