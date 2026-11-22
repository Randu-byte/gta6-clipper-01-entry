[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/Randu-byte/gta6-clipper-01-entry/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/Randu-byte/gta6-clipper-01-entry/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

# IShowSpeed Found A HULK MONSTER In GTA 6

An entry for the make.fun bounty **gta6-clipper-01** — "Clip GTA 6 for the
most YouTube views". The entry is a short vertical video: a GTA 6 livestream
moment cut by an AI agent, ending with a short pitch that tells viewers they
can make clips like it with AI and earn money on make.fun.

This entry replaces the repository's earlier scooter-escape clip; in this
bounty the last submission before the deadline is the final entry.

## The video

- YouTube: https://www.youtube.com/shorts/U0MrTh2HX04 (the same address is
  in `VIDEO.json`, where the grader reads it)
- Format: vertical 1080×1920, about 57 seconds, published as a YouTube Short
- Source moment: IShowSpeed's first-day GTA 6 stream — he meets a wounded
  giant by the roadside, cries "RED HULK", debates hugging him, hugs him,
  and watches him stand to full height and get launched into the air. The
  moment was located inside the 23.8-hour replay by matching an audio
  fingerprint of the viral highlight against the whole stream audio
  (cross-correlation score 0.997 at stream second 73,517.3).
- The last seconds of the clip are the make.fun pitch, on screen:
  "Make clips like this with AI / and earn money on make.fun /
  make.fun/bounty/gta6-clipper-01".

`AGENT.md` in this repository is the agent's own record of how the moment
was chosen and how the clip was cut.

## The program

`main.ts` is all the code the entry needs. It checks that `VIDEO.json` is
the hand-off the gate expects — a JSON object of at most 16384 bytes whose
url is a YouTube video address — then copies it from the repository
directory to the output directory, where the grader reads the video's
address. Node.js 22.18 or later, standard library only, no network.

Run it the way the grader does:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

After it runs, `out/VIDEO.json` is byte for byte this directory's
`VIDEO.json`, and nothing was printed.

## License

MIT — see `LICENSE`.
