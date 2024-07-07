# WUMPS

## Web Utility for Managing Power States

### For \*arr users with power bills!

[![Build and Push Docker Image](https://github.com/KaiStarkk/wumps/actions/workflows/docker-image.yml/badge.svg)](https://github.com/KaiStarkk/wumps/actions/workflows/docker-image.yml)

![image](https://user-images.githubusercontent.com/1722064/229474685-60f1c7e5-431e-4185-94af-21889cab82e1.png)

When starting out with self-hosted media servers, many users run \*arr apps on their personal machines. It's not uncommon to have Windows services installed for Sonarr, Radarr, Readarr, Prowlarr, Jellyfin, Audiobookshelf, Jellyseerr, VueTorrent, Dashy... and the like.

This can be inefficient, as personal computers (let's be honest, _gaming computers_) run on power-intensive hardware, and are wasting energy while idle if not in use. Not to mention the noise and heat coming out of that ATX case! This is compounded when the computer is left on 24/7 _in case_ you might need to add something to a DVR or watch 15 minutes of a show on your lunch break.

Yes it's possible to buy a $2000 NAS and run Unraid/OMV, set up redundant disks, split your libraries onto dedicated drives/volumes so only one spins up when you use it (etc. etc. etc.) but who has the money and time for that!

This is a very simple app intended to provide a dashboard for powering personal machines on and off instead.

## Installation

NOTE: This app is intended to be installed on a lightweight client such as an old Raspberry Pi, on the same local network as your media server<sup>_gaming computer_</sup>. If you happen to have an old RPI1/0 lying around, remember they run on ARMv6 so some extra work may be necessary to compile binaries if you don't use docker.

1. Pull the latest image, build, and start the app using

`docker run -d --restart always --network host kaistarkk/wumps`

2. Install [SleepOnLan](https://github.com/SR-G/sleep-on-lan) on any target machines that you need to be able to hibernate as well as wake.

The recommended method of exposing this application to the internet is to use a Cloudflare Zero Trust tunnel. See the `cloudflared` documentation for further details on setting up a tunnel.

WUMPS runs on port 9008 by default.

## Roadmap

-   [X] Improve install instructions
-   [X] Save configuration from the dashboard
-   [X] Tidy up UI for changing configuration
-   [ ] Add authentication
-   [ ] Switch between multiple saved hosts (tiles?)
-   [ ] Check for updates

## Contributing

Current dependencies and stack:

-   [SleepOnLan](https://github.com/SR-G/sleep-on-lan)
-   Python3 (w/ wakeonlan, ping3, configparser)
-   Flask
-   HTML/CSS/JS (jinja)
-   Docker

## License

Gifted to the public domain in a Boddhisattva-like act.
For jurisdictions that don't permit gifting to the public domain, this software is licensed under BSD 0-clause:

```
Zero-Clause BSD
=============

Permission to use, copy, modify, and/or distribute this software for
any purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL
WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE
FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY
DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN
AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT
OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```
