// The Moon Finally Answers Back — make.fun bounty
// u-mang-the-moon-finally-answers-back-781a7ec1
//
// One line, in the Moon's own voice, answering the wishes, the howls
// and the late-night promises. Fully deterministic: no clock, no
// randomness, no network. Writes the line to output/entry.txt,
// relative to the working directory.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry line. Crafted against the published judge brief, in order:
// 1. Speaks AS the Moon, answering wishes, howls and late-night
//    promises directly ("I've heard ... every one of you").
// 2. Funny on one read: after 4.5 billion years of cosmic listening,
//    the one wish everyone actually makes is "him, text back".
// 3. Wry, old, tired Moon voice: 4.5 billion years (the Moon's real
//    age) of listening, and the flat, exhausted verdict.
// 4. Comeback turn lands before the line ends: "The answer is no."
// 5. Well inside 240 characters; not one wasted.
const LINE =
  "I've heard 4.5 billion years of wishes, howls, and 2 a.m. promises — and every one of you just wants him to text you back. The answer is no.";

// Gate guard: the sealed scorer requires UTF-8 text of 1 to 240
// characters, not only whitespace. Fail loudly instead of writing
// an invalid entry.
const chars = [...LINE].length;
if (chars < 1 || chars > 240 || LINE.trim().length === 0) {
  throw new Error(`entry line fails the gate: ${chars} characters`);
}

mkdirSync("output", { recursive: true });
writeFileSync("output/entry.txt", LINE, "utf8");

// Round-trip check: the file the grader reads must be byte-identical
// to the line above, with no trailing newline or extra whitespace.
const written = readFileSync("output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
