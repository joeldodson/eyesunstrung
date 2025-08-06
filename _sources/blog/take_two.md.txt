# Take Two

Now it's August, 2025, more than 13 months since [Something New](something_new.md).

I've not been completely idle. 
In fact, I have a "new" guitar, a 2007 Eastman AR905CE,
(hollow body electric though I tend to play acoustic).
And I kind of had a real job for a while.

With the new guitar, I've been much better about practicing.
And with that, I've ben thinking more about this project.
With my enthusiasm peaking, and embracing the warm reality of early retirement,
I'm ready to try and build something useful.

## Back to the Name

Upon some reflection, I don't like the name ```eyesun```.
I've decided if an actual program does find its way from my thoughts to PyPI,
it will be called ```unstrung```.
And that's probably everything worth saying on this topic.

## Initial Scope

There is a saying in software development, "shipping is a feature."

As I poked around various options for building a UI for unstrung, I realized I would be spending a great deal of time exploring those packages, especially ensuring accessibility.
In the interest of having something minimal I can use, and post on PyPI,
unstrung will initially be command line only.
This also makes it more likely to work across platforms (Windows, Mac, and Linux).

Now my focus is on defining a very simple text file format (probably toml) to specify chords, tempo, and maybe strumming pattern.
Unstrung will read in that file and play whatever is specified, probably in a loop.
