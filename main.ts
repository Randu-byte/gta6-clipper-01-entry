// Entry program for the make.fun bounty "gta6-clipper-01"
// (Clip GTA 6 for the most YouTube views).
//
// The entry itself is a public YouTube video; this program has exactly one
// job: hand the video's address to the grader. It copies VIDEO.json from
// the repository directory into the output directory, byte for byte, and
// stays silent when that works. Only the Node standard library is used,
// nothing is read except the environment and VIDEO.json, and nothing is
// written except the copy, so two runs always produce the same bytes.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

function main(): void {
  const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const source = join(botDir, 'VIDEO.json');
  const target = join(outputDir, 'VIDEO.json');

  if (!existsSync(source)) {
    fail(`no VIDEO.json found in ${botDir}`);
  }

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
