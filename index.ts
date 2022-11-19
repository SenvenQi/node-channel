import {SessionManager} from "./lib/sessionManager";
import {Socket} from "net";


const sessionManager = new SessionManager();

sessionManager.add(new Socket())

