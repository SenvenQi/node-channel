import {SessionManager} from "./lib/sessionManager";
import {SocketClient} from "./lib/socket/client/socketClient";
import {Socket} from "net";


const sessionManager = new SessionManager();

sessionManager.add(new SocketClient(new Socket()))

