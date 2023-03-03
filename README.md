# Butane Converter
Butan Converter allows simply to convert a human readable Butane Config into a machine readable Ignition Config file using a web interface.

Butane Converter is an UI extension of the official butane docker image quay.io/coreos/butane:release. RedHat's original docker image has been taken and being extend by an GO-based web ui. This means, Butan Converter is always uses the latest command line tool.


## Online Version
Online: https://butane.meixxi.com

## Run locally using Docker
```
docker run -p 8080:8080 ghcr.io/meixxi/butane-converter:latest
```
Docker Repo on github: https://github.com/meiXXI/butane-converter/pkgs/container/butane-converter

## Screen
Here is a screen shot of the butaon converter:
  
![Butaone Converter Screen](screen-1.png)