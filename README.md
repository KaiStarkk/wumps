# Powarr

### For \*arr users with power bills!

![image](https://user-images.githubusercontent.com/1722064/229331367-91cca053-6d0b-49a0-9e86-94ad725cc482.png)

When starting out with self-hosted media servers, many users run \*arr apps on a personal machines. It's not uncommon to have services installed for Sonarr, Radarr, Readarr, Prowlarr, Jellyfin, Audiobookshelf, Jellyseerr, VueTorrent, Dashy, and the like.

This can be inefficient, as personal computers (let's be honest, _gaming computers_) run on power-intensive hardware, and are wasting energy while idle if not in use. This is compounded when the computer is left on 24/7 _in case_ you might need to add something to a DVR or watch 15 minutes of a show on lunch break.

Yes it's possible to get a NAS with RAID, multiple drives, libraries and volumes split onto separate drives so only one hard drive spins up when you request a show, etc. etc. etc.

But who has the money and time for that!

This is a very simple app intended to provide a dashboard for powering machines on and off instead.

## Installation

NOTE: This app is intended to be installed on a lightweight client such as an old Raspberry Pi, on the same local network as your media server<sup>_gaming computer_</sup>. If you happen to have an old RPI1/0 lying around, remember they run on ARMv6 so some extra work may be necessary to compile binaries.

1. Pull the latest image, build, and start the app using `docker run`

2. Modify config.py file using `docker cp` or `docker exec`

3. Install [SleepOnLan](https://github.com/SR-G/sleep-on-lan) on any target machines that you want to be able to hibernate.

The recommended method of exposing this application to the internet is to use a Cloudflare Zero Trust tunnel. See the `cloudflared` documentation for further details on setting up a tunnel.

## Roadmap

-   [ ] Improve install instructions
-   [ ] Save configuration from the dashboard
-   [ ] Add authentication
-   [ ] Switch between multiple saved hosts (tiles?)
-   [ ] Check for updates

## Contributing

Current dependencies and stack:

-   Wakeonlan
-   ping3

-   Flask
-   Python
-   Raw HTML/CSS/JS
-   Docker

## Support

If you would like to support further development, firstly thank you! - the easiest way for now is:

BTC: bc1qjq62jhmpr25dr63jacmaxzuh3qkr2ufsl7s6dw

If other contributors come on board, this will be converted to more conventional GitHub open source support methods.
