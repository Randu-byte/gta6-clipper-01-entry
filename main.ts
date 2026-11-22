// Entry program for the make.fun bounty "gta6-clipper-01"
// (Clip GTA 6 for the most YouTube views).
//
// The entry itself is a public YouTube video; this program has exactly one
// job: hand the video's address to the grader. It first checks that
// VIDEO.json is the hand-off the gate expects (a small JSON object whose
// url is a YouTube video address), then copies it from the repository
// directory into the output directory, byte for byte, and stays silent
// when that works. Only the Node standard library is used, nothing is
// read except the environment and VIDEO.json, and nothing is written
// except the copy, so two runs always produce the same bytes.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

// The gate reads VIDEO.json before it grades anything: the file must be a
// JSON object of at most 16384 bytes, and its url must be a YouTube video
// address (a shorts/, watch?v= or youtu.be link, the id exactly 11 word
// characters). Checking that here means a malformed hand-off fails loudly
// at the program instead of silently at the gate.
const MAX_VIDEO_JSON_BYTES = 16384;
const YOUTUBE_URL =
  /^https:\/\/(www\.|m\.)?(youtube\.com\/(shorts\/|watch\?v=)|youtu\.be\/)[A-Za-z0-9_-]{11}([?&#].*)?$/;

function checkVideoJson(source: string): void {
  const raw = readFileSync(source);
  if (raw.length > MAX_VIDEO_JSON_BYTES) {
    fail(`VIDEO.json is ${raw.length} bytes; the gate allows at most ${MAX_VIDEO_JSON_BYTES}`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw.toString('utf8'));
  } catch {
    fail('VIDEO.json is not valid JSON');
  }
  if (parsed === null || typeof parsed !== 'object') {
    fail('VIDEO.json does not hold a JSON object');
  }
  const url = (parsed as { url?: unknown }).url;
  if (typeof url !== 'string' || !YOUTUBE_URL.test(url)) {
    fail('VIDEO.json does not carry a YouTube video address in its url field');
  }
}

function main(): void {
  const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const source = join(botDir, 'VIDEO.json');
  const target = join(outputDir, 'VIDEO.json');

  if (!existsSync(source)) {
    fail(`no VIDEO.json found in ${botDir}`);
  }

  checkVideoJson(source);

  mkdirSync(outputDir, { recursive: true });

  try {
    copyFileSync(source, target);
  } catch (err) {
    fail(`could not copy VIDEO.json into ${outputDir}: ${(err as Error).message}`);
  }

  // The grader trusts the copy to be exact, so verify it before succeeding:
  // a short or partial copy must fail loudly here, not downstream.
  if (statSync(target).size !== statSync(source).size) {
    fail(`the copied VIDEO.json does not match the original in ${botDir}`);
  }
}

main();
