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
    port: number;
    host: string;
}

export interface WebSocketOptions {
    /** Full ws:// or wss:// URL. */
    address: string;
}

/** HID device path. */
export type HidOptions = string;
