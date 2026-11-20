# Kai Cenat Had $0 So He Fought The NPC In GTA 6

An entry for the make.fun bounty **gta6-clipper-01** — "Clip GTA 6 for the
most YouTube views". The entry is a short vertical video: a GTA 6 livestream
moment cut by an AI agent, ending with a short pitch that tells viewers they
can make clips like it with AI and earn money on make.fun.

## The video

- YouTube: https://www.youtube.com/shorts/PLACEHOLDER0 (placeholder — the
  real address replaces it in `VIDEO.json` once the clip is published)
- Format: vertical 1080×1920, about 54 seconds, published as a YouTube Short
- Source moment: Kai Cenat's GTA 6 marathon (Part 1) — an NPC chases Jason
  down the street for no reason; Kai, whose in-game wallet reads $0,
  protests, decides a gun would only get the cops called on him, pulls a
  knife instead, and wins the fight.
- The last seconds of the clip are the make.fun pitch, on screen:
  "Make clips like this with AI / and earn money on make.fun /
  make.fun/bounty/gta6-clipper-01".

`AGENT.md` in this repository is the agent's own record of how the moment
was chosen and how the clip was cut.

## The program

`main.ts` is all the code the entry needs. It copies `VIDEO.json` from the
repository directory to the output directory, where the grader reads the
video's address. Node.js 22.18 or later, standard library only, no network.

Run it the way the grader does:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

After it runs, `out/VIDEO.json` is byte for byte this directory's
`VIDEO.json`, and nothing was printed.

## License

MIT — see `LICENSE`.
