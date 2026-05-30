import { SessionClient } from "../../session";

// UDP "server" binds a local socket; connect/open behaviour is inherited
// from SessionClient and the bind happens in the server UdpChannel.connect().
export class UdpServer extends SessionClient {}
