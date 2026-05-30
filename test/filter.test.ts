import { test } from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "buffer";
import { StringFilter, DelimiterFilter } from "../lib/filter";

test("StringFilter returns decoded text per chunk", () => {
    const f = new StringFilter();
    assert.deepEqual(f.decodePackage(Buffer.from("hello")), ["hello"]);
    assert.deepEqual(f.decodePackage(Buffer.from(" world")), [" world"]);
});

test("StringFilter does not corrupt multi-byte chars split across chunks", () => {
    const f = new StringFilter();
    const full = Buffer.from("你好"); // 6 bytes, 2 chars
    const part1 = full.subarray(0, 4);
    const part2 = full.subarray(4);
    const out = [...f.decodePackage(part1), ...f.decodePackage(part2)].join("");
    assert.equal(out, "你好");
});

test("DelimiterFilter only emits complete frames and buffers the remainder", () => {
    const f = new DelimiterFilter("\n");
    assert.deepEqual(f.decodePackage(Buffer.from("a\nb\nc")), ["a", "b"]);
    // "c" is still buffered; completing it yields the frame.
    assert.deepEqual(f.decodePackage(Buffer.from("c\n")), ["cc"]);
});

test("DelimiterFilter handles coalesced packets (粘包)", () => {
    const f = new DelimiterFilter("\n");
    assert.deepEqual(f.decodePackage(Buffer.from("one\ntwo\nthree\n")), ["one", "two", "three"]);
});

test("DelimiterFilter handles fragmented packets (半包)", () => {
    const f = new DelimiterFilter("\n");
    assert.deepEqual(f.decodePackage(Buffer.from("par")), []);
    assert.deepEqual(f.decodePackage(Buffer.from("tial\n")), ["partial"]);
});
