# Take Two

Now it's August, 2025, more than 13 months since [Something New](something_new.md).

I've not been completely idle. 
In fact, I have a "new" guitar, a 2007 Eastman AR905CE,
(hollow body electric though I tend to play acoustic).
And I kind of had a real job for a while.

With the new guitar, I've been much better about practicing.
And with that, I've ben thinking more about this project.
With my enthusiasm peaking, and embracing the lukewarm reality of early retirement,
I'm ready to try and build something useful.

## Initial Scope

There is a saying in software development, "shipping is a feature."

I still plan to create an application based on the 
[RealPython Guitar synthesizer](https://realpython.com/python-guitar-synthesizer/).
I plan to call it ```unstrung```.

As I poked around various options for building a UI for unstrung, I realized I would be spending a great deal of time exploring those packages, especially ensuring accessibility.
In the interest of having something minimal I can use, and post on PyPI,
unstrung will initially be command line only.
This also makes it more likely to work across platforms (Windows, Mac, and Linux).

Now my focus is on defining a very simple text file format (probably toml) to specify chords, tempo, and maybe strumming pattern.
Unstrung will read in that file and play whatever is specified, probably in a loop.

## More Web Content

I also want to develop more content for this site.
I'm thinking initially of some articles addressing the very basics of western music theory.
This could be helpful when listening to a video and someone says, "now play a d minor 7".
Instead of thinking, what is that, you'll have an idea of what it is, and which frets on which strings.
Of course you could whip out your phone and search, or ask some LLM, for fingering of a d minor 7.
Do you want to have to keep doing that though?
Plus, wouldn't it be nice to know why you might want to play certain chords in some sequence?
And knowing why a chord has the notes it does is fundamental to eventually exploring sounds and patterns.

I do want to build up a page (set of pages probably) including details of several chords.
There's a 
[great article regarding displaying chord tabs using CSS](https://dev.to/madsstoumann/guitar-chords-in-css-3hk8).
I'm aiming to start with some very basic chords to see if it's useful.
Maybe that will be my next post, in another 13 months...

cheers!!

Joel
