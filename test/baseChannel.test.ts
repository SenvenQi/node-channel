import { test } from "node:test";
import assert from "node:assert/strict";
import { PassThrough } from "node:stream";
import { Buffer } from "buffer";
import { BaseChannel } from "../lib/baseChannel";
import { DelimiterFilter, StringFilter, Filter } from "../lib/filter";

class TestChannel extends BaseChannel {
    constructor(duplex: PassThrough, filter: Filter = new StringFilter()) {
        super(duplex, filter);
    }
}

test("BaseChannel pushes every complete frame from one chunk", async () => {
    const underlying = new PassThrough();
    const channel = new TestChannel(underlying, new DelimiterFilter("\n"));
    const received: string[] = [];
    channel.on("data", (d) => received.push(d.toString()));

    underlying.write(Buffer.from("a\nb\nc\n"));
    await new Promise((r) => setImmediate(r));

    assert.deepEqual(received, ["a", "b", "c"]);
});

test("BaseChannel.onClose fires on underlying close", async () => {
    const underlying = new PassThrough();
    const channel = new TestChannel(underlying);
    let closed = false;
    channel.onClose = () => { closed = true; };

    underlying.destroy();
    await new Promise((r) => setImmediate(r));

    assert.equal(closed, true);
});

test("BaseChannel does not throw on close when onClose is unset", async () => {
    const underlying = new PassThrough();
    new TestChannel(underlying); // no onClose assigned
    assert.doesNotThrow(() => underlying.destroy());
    await new Promise((r) => setImmediate(r));
});

test("BaseChannel.close tears down the underlying transport", () => {
    const underlying = new PassThrough();
    const channel = new TestChannel(underlying);
    channel.close();
    assert.equal(underlying.destroyed, true);
});
