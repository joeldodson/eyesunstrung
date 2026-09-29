---
title: "Introduction to eyesunstrung"
description: "Explains what eyesunstrung is."
date: "2026-09-26"
---

This might be the only article written by me, Joel, the prompter of this project.
But I have not entirely given in to our LLM overlords.
I do read and edit the output.
Article generation is an iterative process of prompting and editing until I like it, or am tired of the process.

## What is eyesunstrung?

Like many people, I've been trying to learn to play the guitar for many years.
Lots of starts and, well, not so much stops as fade-aways.

So much material for learning guitar, probably most musical instruments, is visual.
I have posters, from when I could see, with images of fingering for dozens of chords.
Then there's sheet music, which is inherently visual (there is braille sheet music, but I can't read braille).
For guitar, there's tablature, also visual.
Even on YouTube videos, I so often hear, "place your fingers like this..."
Some YouTubers do try to explain the fingering, but inevitably, there's a visual assumption.

I'm sure there's some accessible material out there considering how many blind musicians there are.
It's either not easy to find, or I'm not very good at searching.
Probably both.

So, in 2024, I started eyesunstrung with the idea of building some type of application to help blind people with little to no musical background learn to play the guitar.
I tried hacking around with Python, exploring sound libraries and accessible UI toolkits.
I enjoyed digging into new areas of software development, but struggled with what to build.

Fast forward a few years.
After hearing from other blind people how efficiently they could iterate on an idea using LLM coding tools, I thought, let's give eyesunstrung another go.

## unstrung Comes to Life

After consulting with Claude regarding what type of features I'd like to build, I settled on using the Electron platform and started creating the unstrung app.
Initially I built it as an installable desktop app for Windows, with Mac to follow if/when I bought a Mac.
A big reason for choosing Electron, though, is that it uses HTML, CSS, and JavaScript, the same as a web app.

Along the way, I asked Claude how much of what we have built could run directly in a browser.
The answer was, almost everything.
The question then was where to host a web version of unstrung.

## Finally Realizing the Goal of eyesunstrung.vip

So here I am, rebuilding eyesunstrung with Claude and Eleventy.
There will still be articles addressing questions I find interesting regarding music and playing guitar.
Those can be found in the [articles section](/articles/).
Hopefully people will find some value there.
They will almost certainly though be the output of an iterative Claude (or some LLM) session; anyone can do that.

The main purpose of eyesunstrung.vip is to host the web-based version of the unstrung app.
Documentation for the unstrung application will be in [the unstrung documentation](/unstrung/docs/).
Those docs will also be heavily written by Claude, though not something someone else could easily generate on their own.
They are focused mainly on using unstrung but will occasionally detour into thoughts addressing ideas like accessibility purism versus practical tradeoffs.
