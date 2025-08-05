# Something New

[Editor's Note: It's been over 13 months and I'm back to this project.
I've realized what a dumb name "eyesun" is and am changing that.
Also, the initial scope is too optimistic.
See the [take two](take_two.md) article for an update.]

Today, July 3rd, 2024, I'm starting a project I hope, at the very least, I will find useful.

Like maybe most people who want to play guitar, I've picked it up many times,
fiddled around with some picking and chords,
not made much progress,
enthusiasm wanes,
practices are shorter, less often, and not challenging or productive,
and I'm back where I started, with the calluses gone from my fingertips.

How can I keep from repeating that process?
Be more disciplined, of course.  

Okay, now, for real. 

I have found some decently accessible sources online.
I've even purchased a few courses and contacted the instructor about accessibility.
I believe he does try hard to make his courses accessible, at least the newer ones.
It's probably unreasonable to expect the existing ones to be re-recorded.

The platform I use to access those courses is technically accessible.
It's painful though to use with a screen reader.

Maybe this goes back to my lack of discipline. 
The barrier to getting to a course, finding where I left off, and continuing is, well, higher than my moderate motivation. 

Again, maybe we're back to this is just me.
I don't think so though. 
Plus, the courses are fine for conveying information,
but not very useful for regular practice.

If there were  an application I could quickly launch,
with a fully accessible user interface with low barriers,
with functionality for both learning and practicing,
surely I'd be Jimmy Page in a matter of months.
Or, maybe at least cranking out Margaritaville.

## The Name

As I was writing this post, I kept saying, "the application."
I realized it needs a name if for no other reason than something to search from the start menu.
And now, the reveal; `eyesun`.

The name itself is probably obvious, shortened version of the project name.
But is it pronounced "eyes un", or "eye sun"?
Say each several times quickly and you'll find it doesn't matter.

## Initial Ideas 

Assuming `eyesun`, at least initially, will be used by only me,
I'll be starting with functionality I want.
This means there will be an assumption of some existing understanding of the guitar and how to play it.
If there's interest, I might address those assumptions and make it easier for people to get started. 

### Supported Platforms

It's highly unlikely this will ever be a mobile app.
I use Windows 11 with the
[NVDA screen reader](https://nvaccess.org) on a laptop.
Ease of use will be targeting that environment.

I plan to use mainly Python including a GUI package that will work across MacOS and Linux as well.
There might be some cross platform support.
I'll write about that later if/when it happens. 

### Initial Features

So many thoughts bouncing around of what I'd like this to become,
it's hard to nail down where to start
(if only there were a "hello World" song).
And I really don't know what's actually possible/easy to implement.
As I get deeper into this, and get punched in the face, or pleasantly surprised,
my initial goals will almost certainly change.

My current plan is to focus on a practice buddy:

- Specify some chords, time signature, and tempo, "press" play, and strum along.
- Save and easily recall a session I've already configured.
- Some preconfigured sessions as well.
- Maybe try a similar experience with picking and chords.

## Wrapping It Up

There is quite a lot there hidden beneath 4 bullet points.
Time to wrap this up and get hacking.
I'll post more technical details as I get into them.

Cheers!!

Joel
