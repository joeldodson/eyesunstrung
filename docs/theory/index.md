# Music Theory - sort of

Calling what will likely be in this section theory is probably a stretch.
I can't say I really know what is and isn't considered "Music Theory."
I am curious though how western music evolved though.
And it is important to know about notes, keys, scales, and chords.
Most likely this area will be full of articles on music and guitar related themes I find interesting.

For a great, and quick, introduction to music theory,check out the YouTube video by Andrew Huang:
[learn music theory in half an hour](https://www.youtube.com/watch?v=rgaTLrZGlk0).

I'm updating this introduction as I'm about to post the second article in this section.
Like the first article, it is also a Q&A thread with Claude.
My intention had been to use Claude, and other LLMs, to learn about various concepts and write articles about what I learned.
I realized simply posting the interactions with the LLM is more honest, and, let's be frank, much less work.
My suspicion now is most everything in here will be from sessions with Claude.

(what_is_claude)=
## What is Claude

Most people reading this have probably heard of LLMs, though might not realize it.
LLMs are Large Language Models, Chat GPT is probably the most synonymous one.
But there are others, many others.

Claude is the LLM from [Anthropic](https://www.anthropic.com/).
It has a GUI (Graphical User Interface) including a web interface.
Being a software developer though, I decided I'd write my own interface.
I call it blaude.
It gives me much more control over the accessibility and is much cheaper to pay by the token if you're not a heavy user.

If you're curious, you can find
[blaude.py in my clu github repo](https://github.com/joeldodson/clu/blob/main/blaude.py).
The code is in a single file with a few third party package dependencies.
run ``` blaude --help ``` for details.
You will also need an API Key from Anthropic and add some money to your account.
You'll see the output from blaude in the articles in this section, hopefully it's intuitive.

### Hallucinations

You've probably also heard LLMs make stuff up, i.e, hallucinate.
If you're here studying for your dissertation on western music, you have very much misunderstood my level of commitment to complete accuracy
(at least in this section, I try to be very accurate when describing specific chords in other sections).
I have asked similar questions through Chat GPT and Google's Gemini.
They seem to give roughly the same information.
It's best to consider these articles as very high level and probably/hopefully mostly correct.

## [Physics, Math, and Music](physics_math_music.md)

A Q and A session with Claude to understand the origins of western music.
It gets into some weeds and probably isn't critical to playing well.
It scratched a curiosity itch of mine though, and it's really not that long.
Hopefully you find some value there as well.

## [Notes and Keys](notes_keys.md)

Ever wonder how we ended up with A through G and the sharps and flats?
And what does it mean for A minor to be a good country key 
(bonus points if you know the movie reference)?
This article is an attempt to understand the origins of what we call notes and keys.

``` {toctree}
:maxdepth: 1
:hidden: true

"Physics, Math, and Music"<physics_math_music.md>
"Notes and Keys"<notes_keys.md>
```

