import { SessionClient } from "../../session";

// Connect/open behaviour is inherited from SessionClient; the TcpChannel
// supplies the transport-specific connect().
export class TcpClient extends SessionClient {}
