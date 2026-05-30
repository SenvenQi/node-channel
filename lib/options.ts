/**
 * Connection option shapes for the built-in channels. These replace the
 * previous `options: any` so callers get compile-time checking and editor
 * completion when building a session.
 */

export interface TcpOptions {
    port: number;
    /** Remote host/IP to connect to. */
    host: string;
}

export interface UdpOptions {
    /** Remote/target port to send datagrams to. */
    port: number;
    /** Remote/target host. Use a broadcast address (e.g. "255.255.255.255") together with `broadcast`. */
    host: string;
    /**
     * Local port to bind for *receiving* datagrams. When omitted the socket
     * is send-only and is not bound to a fixed local port. Required for
     * listen/broadcast style clients that need to read inbound packets.
     */
    localPort?: number;
    /** Enable SO_BROADCAST so datagrams can be sent to a broadcast address. */
    broadcast?: boolean;
}

export interface WebSocketOptions {
    /** Full ws:// or wss:// URL. */
    address: string;
}

/** HID device path. */
export type HidOptions = string;

export interface HttpOptions {
    /** Port the HTTP server listens on. */
    port: number;
    /** Optional host/interface to bind to. Defaults to all interfaces. */
    host?: string;
}
