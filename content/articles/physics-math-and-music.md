---
title: Physics, Math, and Music
description: Why a guitar string sounds the way it does, and where the twelve notes of Western music come from, starting from basic physics and algebra.
date: 2026-09-26
---

Why does a guitar string sound like a guitar string? Why do two notes played together sometimes sound sweet and sometimes sound like an argument? Why are there twelve notes in Western music, why do we call seven of them a scale, and why does one arrangement of those seven sound happy and another sound sad?

None of these are questions you have to answer in order to play the guitar. But they all have answers, and the answers are more interesting than most people expect. They start in physics, pass through arithmetic, and end up in a set of compromises that musicians have argued about for two and a half thousand years.

This article assumes you know a little basic physics and a little algebra. It assumes no musical background at all. Every technical term is defined when it first appears, and defined again in the glossary at the end.

## Contents

- [Before you start: notes and their names](#before-you-start-notes-and-their-names)
- [Part 1: Sound and waves](#part-1-sound-and-waves)
- [Part 2: The mathematical toolkit](#part-2-the-mathematical-toolkit)
- [Part 3: From physics to music](#part-3-from-physics-to-music)
- [Part 4: All of this, on a guitar](#part-4-all-of-this-on-a-guitar)
- [Part 5: Where to go deeper](#part-5-where-to-go-deeper)
- [Glossary of terms](#glossary-of-terms)

## Before you start: notes and their names

The physics and mathematics in this article come first, but a handful of musical words appear along the way. This short section introduces them by sound, so none of them arrives unexplained. Part 3 returns to each one and explains why it works the way it does.

### Singing up a scale

Most people have heard, or can sing, this rising sequence of syllables:

- doh, ray, me, fa, soh, lah, tee, doh

This way of naming notes by syllable is called **solfège**. The spellings vary in print; you will often see do, re, mi, fa, sol, la, ti. This article uses doh, ray, me, fa, soh, lah, tee because those spellings are pronounced correctly by screen readers.

A few terms fall straight out of that one sung line:

- Note - a single musical sound with a definite pitch. Each syllable is one note.
- Scale - an ordered set of notes used as the raw material for music. The doh-to-doh sequence is the most familiar one in Western music, the major scale.
- Octave - the distance from the first doh to the last. The top doh sounds like the bottom doh, only higher; it is recognisably "the same note." The name comes from the Latin for eight, because the top doh is the eighth note sung. Part 1 shows that going up an octave exactly doubles a note's frequency.
- Key - doh does not have to be any particular pitch. You can start the song on a low note or a high one and it is still the same tune. Choosing which pitch serves as doh is choosing the key.

### Naming the distance between two notes

The distance between two notes is called an **interval**. Intervals are named by counting notes of the scale, and the count includes both the starting note and the finishing note:

- doh up to ray - a second, because it spans two notes
- doh up to me - a third
- doh up to fa - a fourth
- doh up to soh - a fifth
- doh up to lah - a sixth
- doh up to tee - a seventh
- doh up to the next doh - an octave, the eighth

The same names apply between any two notes, not only from doh. Ray up to soh is also a fourth, because it spans four notes: ray, me, fa, soh.

### Semitones: the smallest step

The steps in the scale are not all the same size. Most neighbouring notes have a gap between them big enough to fit another note. Two pairs do not: me to fa, and tee to the top doh. Those two small steps are each a **semitone**, also called a half step. The larger steps are two semitones each, called a whole step or whole tone.

On a guitar, moving one fret along a string raises the pitch by exactly one semitone. Twelve semitones make one octave, so fret 12 on any string plays the same note as the open string, an octave higher. Counting in semitones from the bottom doh, the scale's notes sit at these positions:

- doh - 0
- ray - 2
- me - 4
- fa - 5
- soh - 7
- lah - 9
- tee - 11
- doh - 12

The positions 1, 3, 6, 8 and 10 are the notes between the scale notes. They exist, and a guitar plays all of them, but this particular scale skips them. Twelve notes are available; the scale uses seven.

### Notes that agree and notes that clash

Sing or play two notes at once and they either blend or grate. Doh and soh together sound smooth and settled. Tee and the doh just above it, a semitone apart, sound tense and harsh. The first kind of pairing is called **consonant**, the second **dissonant**. Why this happens is one of the main questions of Part 3.

## Part 1: Sound and waves

### What sound actually is

Air is made of molecules, and normally they are spread out at a roughly even density. When something vibrates in air, it pushes on the molecules next to it. Those molecules crowd together, then spring apart, pushing on the molecules next to them, which crowd together and spring apart in turn.

The result is a travelling pattern of slightly-higher-than-normal pressure followed by slightly-lower-than-normal pressure, moving outward from the vibrating object. That pattern is a sound wave. Your eardrum is a thin membrane that gets pushed in when the high-pressure part arrives and pulled out when the low-pressure part arrives. Everything you have ever heard is your eardrum being wobbled by air pressure.

Two things follow from this that are worth holding onto:

- The air itself does not travel from the guitar to your ear - the air molecules jiggle back and forth around where they already were. What travels is the *pattern*, the disturbance. Think of a stadium wave: the wave crosses the stadium, but no individual person changes seat.
- Sound needs a medium. In a vacuum there are no molecules to crowd together, so there is no sound. Sound travels through water and steel too, and faster in both than in air.

### What a wave is

A wave is a disturbance that travels through a medium, carrying energy without permanently carrying material along with it. Physicists sort waves into two families based on the direction of the jiggling:

- Transverse wave - the medium moves at right angles to the direction the wave travels. A plucked guitar string is the classic example: the wave runs along the length of the string, while the string itself moves up and down. Ripples on water and light are also transverse.
- Longitudinal wave - the medium moves back and forth along the same direction the wave travels. Sound in air is longitudinal. A stretched spring that you push sharply at one end shows this well: a compressed region runs down the spring.

A guitar is a machine for converting one into the other. The string vibrates transversely, the bridge transmits that vibration to the top of the guitar body, the top pushes on the air, and the air carries a longitudinal wave to your ear.

### The properties of a wave, and which ones you hear

The simplest possible wave is a **sine wave**, a smooth back-and-forth oscillation with a single rate of repetition. Real sounds are more complicated, but every real sound can be built out of sine waves, which is why they are the natural starting point. A sine wave can be fully described by four numbers.

#### Frequency, and what you hear as pitch

A wave is a repeating pattern. One complete repetition - out to one side, back through the middle, out to the other side, and back to where it started - is called a **cycle**. There are two ways to describe how fast the pattern repeats, and they are two views of the same fact:

- Frequency - how many cycles happen in one second. It is a count. It is measured in **hertz**, abbreviated Hz, and "200 Hz" means "the wave repeats itself 200 times every second."
- Period - how long one single cycle takes. It is a length of time, usually given in milliseconds for musical sounds. A millisecond is one thousandth of a second.

If a wave repeats 200 times in a second, each repetition must take one two-hundredth of a second, which is 5 milliseconds. So "a frequency of 200 Hz" and "a period of 5 milliseconds" describe exactly the same wave. To convert between them:

- Period in milliseconds equals 1,000 divided by the frequency in hertz.
- Frequency in hertz equals 1,000 divided by the period in milliseconds.

Some matching pairs:

- 100 Hz - each cycle takes 10 milliseconds.
- 110 Hz, the open A string on a guitar - each cycle takes about 9.09 milliseconds.
- 200 Hz - each cycle takes 5 milliseconds.
- 440 Hz, the A that orchestras tune to - each cycle takes about 2.27 milliseconds.
- 1,000 Hz - each cycle takes 1 millisecond.

The two numbers move in opposite directions: the higher the frequency, the shorter each cycle. It is worth keeping them firmly apart. A frequency in hertz is never a length of time, and a number like 600 Hz does not mean anything takes 600 of anything; it means 600 repetitions fit into each second.

Frequency is what you perceive as **pitch** - how high or low a note sounds. Faster vibration means higher pitch. The A string on a guitar in standard tuning vibrates 110 times per second. The note orchestras tune to, A440, vibrates 440 times per second, which is two octaves above that guitar string.

A young, healthy human ear responds roughly from 20 Hz up to 20,000 Hz. The top of that range drops with age; most adults lose the region above about 15,000 Hz. Guitar fundamental frequencies live in a narrow band near the bottom, from about 82 Hz for the low E string to about 1,000 Hz at the high frets, but the harmonics that give the instrument its character extend far above that.

#### Amplitude, and what you hear as loudness

**Amplitude** is the size of the disturbance - how far the string swings from its rest position, or how much the air pressure deviates from normal. Amplitude is what you perceive as **loudness**.

The relationship is not proportional, and that matters. Doubling the amplitude does not make a sound seem twice as loud. Human hearing responds to ratios rather than to differences, so we measure sound level in **decibels**, a logarithmic scale. Adding 10 decibels multiplies the sound power by ten, and is heard as roughly a doubling of loudness. This is the first appearance of a theme that will dominate the rest of this article: *our ears work in ratios, not in differences.*

#### Wavelength and speed

**Wavelength** is the physical distance between one peak of the wave and the next. It is tied to frequency by the speed of the wave in the medium:

- speed equals frequency times wavelength
- equivalently, wavelength equals speed divided by frequency

Sound travels through room-temperature air at about 343 metres per second, which is about 1,125 feet per second. So a 343 Hz note has a wavelength of one metre, and a 34.3 Hz note has a wavelength of ten metres. Low notes are physically enormous, which is part of why bass is hard to contain, why it leaks through walls, and why subwoofers are big.

Note that wavelength is a property of the wave in the air, not a property of the note as such. The same note has a different wavelength underwater, because sound travels about four times faster in water. Frequency is the part that stays fixed, which is why musicians talk about frequency and not wavelength.

#### Phase

**Phase** describes where in its cycle a wave is at a given moment - whether it is at a peak, at a trough, or crossing zero. On its own, phase is inaudible: a sine wave sounds the same no matter where in the cycle it happened to start. Phase becomes audible only when two waves meet, which is the subject of the next section.

### What happens when waves meet

When two waves pass through the same place at the same time, the disturbances add together. At each instant, the total pressure change is simply the sum of the individual pressure changes. This is called the **principle of superposition**, and it is why you can hear a singer and a guitar at the same time without them blending into mush: the air carries the sum, and your ear and brain pull the parts back out again.

When two waves add, phase determines the result:

- Constructive interference - the waves line up peak with peak, and the result is larger than either one alone.
- Destructive interference - one wave's peak lines up with the other's trough, and they partly or completely cancel. Two identical sine waves exactly out of phase produce silence. This is the principle behind noise-cancelling headphones.

#### Beats: hearing a frequency difference directly

Now suppose two waves have *almost* the same frequency, say 440 Hz and 442 Hz. They cannot stay in a fixed phase relationship, because one is running slightly ahead of the other. They drift into alignment, reinforcing each other, then drift out of alignment, cancelling, then back again.

The result is a single tone whose loudness pulses up and down. Those pulses are called **beats**, and the rule is beautifully simple:

- The number of beats per second equals the difference between the two frequencies.

So 440 Hz against 442 Hz gives two pulses per second. Against 441 Hz, one pulse per second. Against 440 Hz exactly, no pulsing at all. That last fact is the foundation of tuning by ear: you do not need to identify the pitches, you only need to notice the wobble and make it stop. Beats turn a frequency comparison into a rhythm you can count, and the human ear is extremely good at it. Trained tuners can hear a discrepancy of a fraction of a hertz this way.

### Waveform and timbre

Play the same note, at the same loudness, on a guitar and on a flute, and you can tell them apart instantly. Frequency is the same, amplitude is the same, and yet the sounds are obviously different. The difference is **timbre** (pronounced TAM-ber), sometimes called tone colour.

Timbre comes from two things. The first is **waveform**: the actual shape of the pressure pattern over one cycle. A pure sine wave sounds hollow and flute-like. A sawtooth wave sounds bright and buzzy. A guitar string produces something much more intricate, and Part 3 explains exactly what that shape is made of.

The second is the **envelope**: how the sound changes over its lifetime. A plucked guitar note starts abruptly and decays away; a bowed violin note can be shaped and sustained. If you record a piano note and play it backwards, it no longer sounds like a piano at all, even though every frequency in it is unchanged. Timbre is not only about which frequencies are present, but about when.

### Standing waves: why a string has a pitch at all

Pluck a string that is anchored at both ends. A wave travels out from your finger, reaches the fixed end, and reflects back. It then runs to the other end and reflects again. The string is now full of waves running in both directions at once, adding by superposition.

Almost all of these cancel themselves into nothing. But certain frequencies fit the string's length exactly, so that a reflected wave lines up with the wave behind it and reinforces it, cycle after cycle. Those frequencies survive. The result is a **standing wave**: a pattern that appears to stay put and simply oscillate in place, rather than travelling.

Two pieces of vocabulary describe a standing wave's shape:

- Node - a point that stays still. The two fixed ends of a string are always nodes.
- Antinode - a point of maximum movement, halfway between two nodes.

Which frequencies fit? The requirement is that both ends must be nodes, which means the string's length must be a whole number of half-wavelengths. That gives an infinite series of allowed patterns, called **modes**:

1. The whole string swinging as one arc, with a node at each end and one antinode in the middle. This is the lowest allowed frequency, called the **fundamental**.
2. The string in two halves swinging in opposite directions, with an extra node at the midpoint. Half the wavelength means twice the frequency.
3. The string in three sections, at three times the fundamental frequency.
4. And so on, without limit: four times, five times, six times.

This is the single most consequential fact in this entire article, so it is worth stating plainly. **A string does not vibrate at one frequency. It vibrates at a fundamental frequency and at every whole-number multiple of it, all at the same time.** The set of those frequencies is called the **harmonic series**, and Part 3 is largely about what follows from it.

#### What sets the fundamental frequency

For a stretched string, the fundamental frequency depends on exactly three things: the string's length, its tension, and its mass per unit length. To calculate it, work through these steps in order:

1. Divide the tension by the mass per unit length.
2. Take the square root of that result.
3. Separately, double the length.
4. Divide the result of step 2 by the result of step 3. That is the frequency.

Note that the square root applies only to tension divided by mass per unit length. The doubled length sits outside the square root. If you want everything under a single square root, the doubled length must itself be squared first, so the frequency also equals the square root of the tension divided by four times the length squared times the mass per unit length.

What each of the three factors does:

- Length - shorter string, higher pitch. Halve the length and you exactly double the frequency. This is what a fret does.
- Tension - tighter string, higher pitch. This is what a tuning peg does. Because the relationship involves a square root, you must *quadruple* the tension to double the frequency, which is why tuning is a fine adjustment rather than a coarse one.
- Mass per unit length - heavier string, lower pitch. This is why the low strings on a guitar are thick and wound with wire. Without that trick, the bass strings would need to be either absurdly long or so slack they would flop.

These three relationships, worked out in the 1600s by Marin Mersenne and studied much earlier in less formal terms, are the whole design logic of every stringed instrument ever built.

## Part 2: The mathematical toolkit

The mathematics needed for music theory is not advanced, but it is a particular selection. This part collects the ideas you will need before Part 3 puts them to work. If you already know ratios and logarithms, skim it.

### Ratios

A **ratio** is a comparison of two quantities by division. If one string vibrates at 200 Hz and another at 100 Hz, the ratio of their frequencies is 200 divided by 100, which is 2. We write that as "2 to 1", or in shorthand 2:1.

By convention, musical frequency ratios are written with the higher frequency first. That makes the ratio a number greater than 1, and it tells you what to multiply the lower note's frequency by to get the higher note. The fifth, doh up to soh, is written 3 to 2 because the upper note vibrates 3 times for every 2 vibrations of the lower note; multiply the lower frequency by 1.5 and you get the upper one. Writing it 2 to 3 would describe the same interval from the top down, as a multiplier of about 0.667. Neither is wrong, but mixing the two in one discussion causes confusion, so this article always puts the higher frequency first.

One place the flipped form does appear naturally is string length. Because a shorter string vibrates faster, the string for the upper note of a fifth is 2/3 the length of the string for the lower note. Frequency ratios and length ratios for the same interval are always upside down relative to each other.

Three properties of ratios matter here:

- Ratios ignore absolute size. 200 to 100 and 600 to 300 are the same ratio, namely 2 to 1. This is why a melody sounds like the same melody whether sung by a child or a bass, and why a capo, a clamp that shortens every guitar string by the same number of frets, moves everything up without changing the tune.
- Ratios can be reduced. 660 to 440 reduces to 3 to 2, because both numbers divide by 220. Musicians care intensely about what a ratio reduces to, because the size of the whole numbers involved turns out to predict how consonant an interval sounds.
- Ratios combine by multiplying. If B is 3/2 times A, and C is 3/2 times B, then C is 9/4 times A. Stacking musical intervals means multiplying their ratios, never adding them.

### Adding versus multiplying: why pitch is different from temperature

Here is the conceptual hurdle that trips up almost everyone meeting this material for the first time.

Our ears judge pitch by *ratio*, not by *difference*. Consider these two pairs:

- 100 Hz and 200 Hz - a difference of 100 Hz, a ratio of 2 to 1.
- 1,000 Hz and 1,100 Hz - also a difference of 100 Hz, but a ratio of only 1.1 to 1.

The first pair sounds like an enormous leap, an octave. The second pair sounds like a small step, less than two semitones. Equal frequency differences do not sound like equal musical distances. Equal frequency *ratios* do.

Mathematically, this is the difference between two kinds of sequence:

- Arithmetic sequence - each term is the previous term plus a fixed number. For example 100, 200, 300, 400. You get this by adding.
- Geometric sequence - each term is the previous term times a fixed number. For example 100, 200, 400, 800. You get this by multiplying.

Musical scales are geometric sequences of frequency, which is why they feel like arithmetic sequences to the listener. Our perception effectively takes the logarithm of the physical quantity. The same thing happens with loudness, as we saw with decibels, and with light, and with our sense of quantity in general. It seems to be a general feature of how animal senses handle large ranges.

### Exponents and roots

Since intervals stack by multiplication, stacking the same interval repeatedly means raising a number to a power. Going up an octave multiplies frequency by 2. Going up seven octaves multiplies it by 2 to the power of 7, which is 128.

Running that backwards requires roots. If you want to divide an octave into twelve equal steps, you need a number such that twelve copies of it, multiplied together, give exactly 2. That number is the twelfth root of 2, written as 2 to the power of one twelfth, and it equals approximately 1.059463. This unassuming number is the basis of every fret position on every guitar built in the last few centuries, and it will reappear in Part 3.

A useful general form: raising 2 to the power of a fraction gives you a fractional part of an octave. Two to the power of 7/12 is roughly 1.4983, which is very nearly 1.5, and that near-miss is going to cause a surprising amount of trouble.

### Logarithms and cents

A **logarithm** answers the question: what power do I need to raise this base to, in order to get that number? The logarithm of 8 to base 2 is 3, because 2 to the power of 3 is 8.

Logarithms are the tool that converts multiplying into adding. That is exactly the translation we want, because physics multiplies frequencies while perception adds intervals.

Musicians use a logarithmic unit called the **cent**. It is defined so that:

- One octave is exactly 1,200 cents.
- One semitone, in modern equal tuning, is exactly 100 cents.
- To convert a frequency ratio into cents, first take the base-2 logarithm of the ratio, then multiply that result by 1,200.

Cents are what make tuning discussions possible. Saying that one tuning system's doh-to-me interval is "14 cents sharp" compared to another is precise, and it is a size you can compare directly against other intervals, whereas comparing raw ratios like 81/64 against 5/4 gives you no feel for how big the discrepancy is. For calibration: most people notice a mistuning of about 5 to 10 cents on a sustained note, and trained musicians do better.

### Periodicity and common multiples

Two waves played together produce a combined waveform. If the two frequencies are in a ratio of small whole numbers, the combined pattern repeats quickly.

Take a 200 Hz tone and a 300 Hz tone, a ratio of 3 to 2. Start both at the beginning of a cycle at the same instant, and track when each one returns to that starting point. It is easiest in milliseconds, using the conversion from Part 1: period in milliseconds equals 1,000 divided by the frequency in hertz.

- 200 Hz - one cycle takes 1,000 divided by 200, which is 5 milliseconds. It is back at its start at 5, 10, 15, 20 milliseconds, and so on.
- 300 Hz - one cycle takes 1,000 divided by 300, which is about 3.33 milliseconds. It is back at its start at about 3.33, 6.67, 10, 13.33 milliseconds, and so on.

The first time both are back at their starting point together is 10 milliseconds, which is one hundredth of a second. By then the 200 Hz wave has done 2 cycles and the 300 Hz wave has done 3. From that moment the combined wave repeats exactly, so its period is 10 milliseconds and it has a tidy, strongly repeating shape. Its repetition rate is 100 times per second.

There is a shortcut. The combined wave repeats at a rate equal to the **greatest common divisor** of the two frequencies: the largest number that divides evenly into both. The greatest common divisor of 200 and 300 is 100, so the combined wave repeats 100 times per second, and one repetition takes 1 divided by 100 of a second.

A tempting mistake is to take the **least common multiple** of the two frequencies instead. The least common multiple of 200 and 300 is 600, but that 600 is a frequency, 600 cycles per second, not a length of time. It does mean something, though: 600 Hz is the lowest harmonic the two notes share. It is the third harmonic of the 200 Hz note and the second harmonic of the 300 Hz note. That shared harmonic comes back in Part 3 as one of the explanations for why this interval sounds consonant.

Now take 200 Hz against 283 Hz, a ratio of 283 to 200, which does not reduce. Their greatest common divisor is 1, so the combined pattern repeats only once per second, after 200 cycles of the lower tone and 283 cycles of the higher one. A full second is far too long for the ear to hear as a repeating shape. Physically the waves still add, but the result has no short-term repeating structure. Several theories of consonance, which we will get to, lean on exactly this distinction.

### Irrational numbers, and the impossibility built into music

An **irrational number** is one that cannot be written as a fraction of two whole numbers. The square root of 2 is the famous example, and the twelfth root of 2 is another.

This matters because of a collision that sits at the heart of tuning:

- The intervals that sound most consonant are simple whole-number ratios, like 2 to 1 and 3 to 2.
- A keyboard or a fretted instrument needs a fixed set of pitches that works no matter which note is chosen as doh.
- These two demands are mathematically incompatible. No stack of 3-to-2 ratios ever lands exactly on a stack of 2-to-1 ratios, because powers of 3 are never equal to powers of 2.

That last point can be proved in one line. Any power of 3 is odd; any power of 2 is even. They can never be equal. Therefore no number of fifths stacked on top of each other ever lands exactly on an octave. Part 3 shows what this does to tuning. Everything about tuning after that point is a negotiation over where to hide the error.

### Modular arithmetic: the clock face of pitch

Because we treat notes an octave apart as versions of the same note, pitch in Western music behaves like a clock. Twelve semitones bring you back to where you started, in the same way that twelve hours bring the hour hand back around.

**Modular arithmetic** is arithmetic on such a cycle: after reaching 12 you wrap back to 0. If you number the twelve notes 0 through 11, then:

- Changing key, which musicians call transposing, means adding the same number to every note number, wrapping around at 12. The scale positions 0, 2, 4, 5, 7, 9, 11 from the opening section, shifted up by 3, become 3, 5, 7, 8, 10, 0, 2: the same scale, with doh three semitones higher.
- Any pattern of note numbers keeps its shape under this shift. That is the arithmetic behind the fact that a tune stays the same tune in any key.
- A fifth, doh up to soh, is 7 semitones. Stacking fifths means repeatedly adding 7, which produces 0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5, and then back to 0. You visit all twelve notes before returning, because 7 and 12 share no common factor.

That last fact is not a musical coincidence; it is a fact about the numbers 7 and 12. Musicians arrange the twelve keys in this order, a sequence called the circle of fifths, and the arithmetic guarantees it reaches every key.

## Part 3: From physics to music

### Major and minor: a first look

The rest of this part explains *why* certain intervals sound the way they do. Before that, it helps to meet the intervals and scales themselves in a bit more detail.

#### Same name, different sizes

An interval's name counts scale notes, but the number of semitones inside it can vary. Doh up to me is a third containing 4 semitones. Ray up to fa is also a third, since it spans ray, me, fa, but it contains only 3 semitones, because the small me-to-fa step falls inside it. The larger version is called a **major third** and the smaller a **minor third**. Major and minor here simply mean larger and smaller.

Every interval within an octave, by semitone count:

- 1 semitone - minor second, the same as one semitone
- 2 semitones - major second, one whole step
- 3 semitones - minor third
- 4 semitones - major third
- 5 semitones - perfect fourth
- 6 semitones - tritone, exactly half an octave
- 7 semitones - perfect fifth
- 8 semitones - minor sixth
- 9 semitones - major sixth
- 10 semitones - minor seventh
- 11 semitones - major seventh
- 12 semitones - octave

Fourths, fifths and octaves are called **perfect** rather than major or minor. The name is old, from medieval theorists who regarded them as the purest, most stable intervals. Within the major scale, every fourth but one is 5 semitones and every fifth but one is 7. The exceptions are fa up to tee, a fourth, and tee up to fa, a fifth; both are 6 semitones, the tritone.

#### The major and minor scales

The doh-to-doh scale from the opening section is the **major scale**. Its steps, in semitones, run 2, 2, 1, 2, 2, 2, 1.

Now sing the same syllables but start and finish on lah: lah, tee, doh, ray, me, fa, soh, lah. Same seven notes, different home. Most listeners hear it as darker or sadder. This is the **natural minor scale**, and its steps run 2, 1, 2, 2, 1, 2, 2.

Measured from each scale's own starting note, here is what changes and what does not:

- The third - 4 semitones in major, 3 in minor. This is the defining difference, and it is where the scales get their names.
- The sixth and seventh - also one semitone lower in minor.
- The fourth and fifth - identical in both, 5 and 7 semitones. There is no such thing as a major or minor fifth. The fifth stays fixed while the third moves, which is part of why the fifth is called perfect.

#### Chords and triads

A **chord** is three or more notes sounded together. The most common kind is the **triad**: a starting note, the note a third above it, and the note a fifth above it. In other words, two thirds stacked on top of each other.

- Major triad - doh, me, soh. A major third on the bottom, 4 semitones, then a minor third on top, 3 semitones.
- Minor triad - lah, doh, me. A minor third on the bottom, 3 semitones, then a major third on top, 4 semitones.

Both triads span a perfect fifth, 7 semitones, from bottom to top. The only difference is which third sits underneath. That small reordering is the whole difference between a major chord and a minor chord.

With those names in hand, the rest of this part can explain where they come from.

### The harmonic series

Recall from Part 1 that a vibrating string produces a fundamental frequency plus every whole-number multiple of it. Take a low E string on a guitar, vibrating at about 82 Hz. It simultaneously produces:

1. 82 Hz, the fundamental, also called the first harmonic
2. 164 Hz, the second harmonic, which is exactly one octave above
3. 246 Hz, the third harmonic, an octave and a fifth above
4. 328 Hz, two octaves above
5. 410 Hz, two octaves and a major third above
6. 492 Hz, two octaves and a fifth above
7. 574 Hz, close to two octaves and a minor seventh, but noticeably flat compared to any note in our system
8. 656 Hz, three octaves above

The components above the fundamental are called **overtones** or **upper harmonics**. Be careful with the counting: the second harmonic is the first overtone, which is a standing trap in this vocabulary.

Notice what happens as you go up the series. The intervals between consecutive harmonics get smaller: the first step is an octave, the next a fifth, the next a fourth, the next a major third, then a minor third. The series lays out, in order, the intervals that Western music treats as most consonant. Nobody designed this. It falls out of the fact that the allowed modes of a string are whole-number multiples.

### Why harmonics matter

Harmonics do three jobs.

#### They create timbre

The **Fourier theorem** states that any repeating waveform, however complicated, can be built by adding sine waves whose frequencies are whole-number multiples of the repetition rate. Run that backwards and you get the key insight: the shape of a sound wave is determined by the recipe of harmonic amplitudes.

A clarinet is quiet in its even-numbered harmonics and strong in its odd ones, which is why it sounds hollow. A guitar has a rich spread of harmonics with the lower ones strongest. A flute is close to a pure sine wave. Same fundamental, different recipe, completely different instrument.

You control this directly when you play. Plucking a string near the bridge emphasises high harmonics and sounds bright and thin; plucking over the soundhole emphasises the fundamental and sounds round and warm. Physically, you are choosing which modes to excite: a mode with a node at your plucking point gets very little energy, and a mode with an antinode there gets a lot.

#### They define what note we hear

Play a note with a fundamental of 200 Hz and harmonics at 400, 600, 800 and 1,000 Hz, then remove the 200 Hz component entirely. You still hear a note at 200 Hz. This is the **missing fundamental** effect: the brain infers the pitch from the spacing of the harmonics rather than reading it off directly. It is why a small phone speaker, which physically cannot produce a 60 Hz bass note, still lets you hear the bass line.

#### They create relationships between notes

This is the one that builds the whole system, and it gets its own section.

### Consonance and dissonance

**Consonance** means two or more notes sounding stable and agreeable together. **Dissonance** means sounding tense, rough, or unresolved. Neither is a value judgement; music needs both, and the tension of a dissonance resolving into a consonance is one of the main engines of Western music.

There are three explanations for consonance. They are not rivals so much as three views of the same thing, and each captures something the others miss.

#### Explanation one: simple ratios

This is the oldest, credited to Pythagoras around 500 BCE, who is said to have noticed that strings whose lengths were in simple whole-number ratios sounded good together. The rule of thumb is that the simpler the ratio, the more consonant the interval:

- 2 to 1 - the octave. So consonant it barely registers as two different notes.
- 3 to 2 - the perfect fifth. Strong, open, stable.
- 4 to 3 - the perfect fourth. Stable, slightly less settled.
- 5 to 4 - the major third. Sweet, and the defining sound of a major chord.
- 6 to 5 - the minor third. The defining sound of a minor chord.
- 16 to 15 - the semitone. Sharply dissonant.
- 45 to 32 - the tritone. Historically the most restless interval in the system.

The pattern is unmistakable, but as an explanation it is incomplete. It describes rather than explains, and it fails to say why the ear should care about arithmetic.

#### Explanation two: shared harmonics

Here the harmonic series does the work. Two notes an octave apart, say 200 Hz and 400 Hz, produce these harmonics:

- Lower note - 200, 400, 600, 800, 1,000, 1,200
- Upper note - 400, 800, 1,200, 1,600, 2,000, 2,400

Every single harmonic of the upper note is already present in the lower note. Nothing new is introduced and nothing clashes. That is why an octave sounds like one note thickened rather than two notes combined.

A perfect fifth, 200 Hz and 300 Hz, overlaps at 600, 1,200, 1,800 and so on. Substantial agreement, some independence. Now take a dissonant pairing such as 200 Hz and 283 Hz: hardly any harmonics coincide, and several land uncomfortably close to each other without matching.

#### Explanation three: roughness and the critical band

This is the modern account, grounded in how the ear physically works. Inside the cochlea, different frequencies stimulate different positions along a membrane. Two frequencies that are far apart stimulate clearly separate regions and are heard as separate. Two frequencies that are very close stimulate overlapping regions, and the result is the beating we met in Part 1.

What happens between those extremes is the interesting part. When two tones differ by more than a few hertz but still fall within the same **critical band** - roughly the resolving width of one region of the cochlea - the beating is too fast to count and is perceived instead as a harsh buzzing quality called **roughness**. Roughness peaks when the separation is around a quarter of a critical band, and fades as the tones move further apart.

Now combine this with harmonics, and consonance falls out as a consequence rather than a rule. Two complex tones each bring along a whole stack of harmonics. If the fundamentals are in a simple ratio, most harmonic pairs either coincide exactly, producing no roughness, or sit comfortably far apart. If the fundamentals are in a complicated ratio, many harmonic pairs land close but not equal, and each of those pairs contributes roughness.

Two predictions support this account. First, consonance should depend on timbre, and it does: pure sine waves have no harmonics, and intervals between them sound far less clearly consonant or dissonant. Second, instruments with non-harmonic overtones should have a different consonance landscape, and they do - the tuned metallophones of Indonesian gamelan have overtones that are not whole-number multiples, and gamelan tuning systems are correspondingly unlike Western ones.

### The octave, and why it comes first

The 2-to-1 relationship is so strong that virtually every musical culture on Earth treats notes an octave apart as the same note with a different height. This is called **octave equivalence**, and it is why a man and a woman singing "the same note" are usually an octave apart and nobody thinks anything of it, and why our note names repeat every twelve semitones.

Octave equivalence sets the whole problem of tuning. We do not need to invent an unlimited ladder of pitches. We need to divide one octave sensibly, then repeat that division up and down. The only question is how to divide it.

### The fifth, and a circle that refuses to close

After the octave, the simplest ratio is 3 to 2, the perfect fifth. The obvious idea, and the one the Pythagoreans pursued, is to generate all your notes by stacking fifths and then folding the results back into a single octave by halving as needed.

Stack twelve fifths and something almost magical happens: you arrive back at a note that is almost exactly seven octaves above where you started. Almost.

- Twelve fifths - 3/2 raised to the power of 12, meaning twelve copies of 3/2 multiplied together. That equals 531,441 divided by 4,096, about 129.746.
- Seven octaves - 2 to the power of 7, which is exactly 128.
- The mismatch - about 1.0136 to 1, which is roughly 23.5 cents, nearly a quarter of a semitone.

That gap is the **Pythagorean comma**. It is not a measurement error or a limitation of old instruments. As shown in Part 2, powers of 3 are odd and powers of 2 are even, so the two can never meet. The comma is a mathematical certainty.

Everything that follows in the history of tuning is an argument about what to do with that quarter of a semitone.

### Four ways to divide an octave

A **temperament** is a scheme for choosing the exact pitches of a scale, and specifically for deciding which intervals to keep pure and which to deliberately mistune.

#### Pythagorean tuning

Build everything from pure 3-to-2 fifths, and dump the entire comma into one interval. The result: eleven beautiful fifths and one unusable one, nicknamed the **wolf fifth** because it howls. Fifths and fourths are flawless; major thirds come out at 81/64, which is 22 cents sharp of the pure 5/4 and noticeably harsh. This was fine for medieval music built on fourths, fifths and octaves, and became a problem as soon as thirds became central.

#### Just intonation

Choose every note to make simple ratios with the tonic. A major scale comes out as 1/1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2/1. Chords built on the home note are spectacularly pure - a major triad becomes a clean 4:5:6, with harmonics locking together audibly.

The catch is that the tuning is only correct for one key. The whole steps are not all the same size: 9/8 and 10/9 both appear, differing by about 22 cents. Move to a different key and intervals that were pure become badly out of tune. Singers and fretless string players do use just intonation, adjusting constantly by ear. It cannot be built into frets.

#### Meantone and well temperaments

Meantone temperament, dominant in Europe from roughly 1500 to 1700, narrows each fifth slightly in order to make major thirds pure or nearly so. It sounds gorgeous in common keys and progressively worse in remote ones, with a wolf fifth still lurking.

Well temperaments, from around 1700, distribute the comma unevenly so that every key is usable but each key has a slightly different character. This is the world Bach's *The Well-Tempered Clavier* belongs to. Its title is a claim that you can now play in all twenty-four keys, not a claim that they all sound identical.

#### Twelve-tone equal temperament

The modern solution, standard for guitars and pianos, is to give up on pure ratios almost entirely and divide the octave into twelve mathematically identical steps. Each semitone is the twelfth root of 2, about 1.059463.

How good is the compromise?

- Octave - exactly pure, by construction.
- Perfect fifth - 700 cents, against a pure 701.955. Two cents narrow, which is essentially inaudible.
- Perfect fourth - 500 cents against 498.04. Also fine.
- Major third - 400 cents against a pure 386.31. Nearly 14 cents sharp, which is genuinely audible as a slight restlessness if you listen for it.
- Minor third - 300 cents against 315.64. About 16 cents narrow.

The trade is explicit: every key is equally usable, no key is perfect, thirds take most of the damage. You can hear the cost if you compare a barbershop quartet, which tunes chords purely by ear, against the same chord on a piano. The piano chord is slightly busier. That slight busyness is the price of being able to modulate anywhere.

### Why twelve notes?

Twelve is not arbitrary, and it is not the only possible answer.

Here is the reasoning. We want a division of the octave into some number of equal steps, such that some whole number of those steps closely approximates the pure fifth, 3 to 2. The base-2 logarithm of 1.5 is about 0.58496. So we want a fraction with a small denominator close to 0.58496:

- 3/5 is 0.6 - five-note equal division, off by about 17 cents. Crude but recognisable.
- 4/7 is 0.5714 - seven notes, off by 16 cents the other way.
- 7/12 is 0.58333 - twelve notes, off by less than 2 cents. Excellent.
- 24/41 is 0.58537 - forty-one notes, off by half a cent. Better, and impractical.
- 31/53 is 0.584906 - fifty-three notes, nearly perfect fifths and excellent thirds too.

Twelve is the point where accuracy becomes very good while the number of notes stays manageable for hands, frets and keyboards. It also happens to deliver a usable major third as a bonus. Fifty-three-tone equal temperament is mathematically superior and nobody wants to fret it.

Other divisions do get used. Nineteen-tone equal temperament has lovely thirds and has been built into real instruments. Twenty-four-tone, dividing each semitone in two, is used in Arabic music and in some contemporary composition. Musicians working outside twelve notes are usually called microtonal composers.

### Why major and minor sound the way they do

The opening section of this part introduced the major and minor scales by their step patterns. With the harmonic series and the consonance explanations in hand, the patterns can now be explained rather than just described.

Why the major scale's pattern? Look at what it contains. Relative to doh, it includes the perfect fifth at 7 semitones, the perfect fourth at 5, and the major third at 4 - the three strongest consonances available after the octave. Those are exactly the intervals sitting lowest in the harmonic series. The major scale is, roughly, the harmonic series folded into one octave and rounded to the nearest note.

The minor scale keeps the fifth and the fourth but swaps the major third for a minor third. Play a major triad and it sits still. Play a minor triad and it leans.

Why does one sound happy and the other sad? Honestly, this is less settled than the rest of this article. Some of it is acoustic: the major third at 5 to 4 is a simpler ratio than the minor third at 6 to 5, and major-triad harmonics align more tightly. Some of it is that the major triad's notes appear as harmonics 4, 5 and 6 of a single fundamental, so a major chord is close to a naturally occurring sound while a minor chord is not. And a large part of it is cultural learning, reinforced by four centuries of composers using minor for laments. The emotional labels are much less universal across cultures than the acoustic facts are.

### Other scales

Seven notes out of twelve is a convention, not a law. Some of the alternatives:

- Major pentatonic - five notes, with step pattern 2, 2, 3, 2, 3. It is the major scale with the two half-step-forming notes removed, so nothing in it can clash. Found independently in Chinese, Celtic, West African and Native American traditions, which suggests something deep is going on.
- Minor pentatonic - five notes, 3, 2, 2, 3, 2. The backbone of blues, rock and most guitar soloing, and usually the first scale a guitarist learns.
- Blues scale - the minor pentatonic with an added flattened fifth, giving 3, 2, 1, 1, 3, 2. That extra note is the sourness in blues phrasing. In practice blues players bend between pitches, so the written scale is an approximation of something more fluid.
- The modes - the seven scales obtained by starting the major scale's pattern on each of its seven notes. In order they are Ionian (identical to major), Dorian, Phrygian, Lydian, Mixolydian, Aeolian (identical to natural minor) and Locrian. Same notes, different centre of gravity, strikingly different moods.
- Harmonic minor - natural minor with the seventh note raised a semitone, giving 2, 1, 2, 2, 1, 3, 1. That three-semitone gap near the top is unusual in Western scales and gives the scale its distinctive, slightly exotic pull.
- Melodic minor - raises both the sixth and seventh on the way up, smoothing the awkward gap. Classically it reverts to natural minor descending; jazz musicians generally use the ascending form throughout.
- Whole tone scale - six notes, every step a whole step. Perfectly symmetrical, with no half steps and therefore no natural home note, which is why it sounds unmoored. Debussy used it heavily.
- Octatonic or diminished scale - eight notes alternating whole and half steps. Also symmetrical, common in jazz and in twentieth-century composition.
- Chord - three or more notes sounded together.

Beyond the twelve-note world:

- Indian classical music uses ragas, which are richer than scales: a raga specifies ascending and descending note sets, characteristic phrases, ornaments and emphasis. The underlying pitch framework recognises shrutis, microtonal intervals finer than a semitone.
- Arabic and Turkish maqam systems use intervals of roughly three quarters of a tone, which simply do not exist on a standard guitar.
- Indonesian gamelan uses slendro and pelog, tuning systems that do not correspond to Western intervals and are tuned by ear per ensemble, so two gamelan orchestras are not interchangeable.

The shared lesson is that Western twelve-tone equal temperament is a particular, well-engineered solution to a genuine mathematical problem, not the natural order of things.

## Part 4: All of this, on a guitar

Everything above shows up physically on the instrument, which makes a guitar an unusually good laboratory.

### Where the frets are

Each fret raises the pitch by one semitone, which means multiplying the frequency by the twelfth root of 2. Since frequency is inversely proportional to length, each fret must multiply the vibrating length by 1 divided by that number, about 0.9439.

To find the distance from the nut to fret number n, work through these steps in order:

1. Divide n by 12.
2. Raise 2 to the power of the result of step 1.
3. Divide 1 by the result of step 2. This is the fraction of the string still vibrating when you hold down fret n.
4. Subtract the result of step 3 from 1. This is the fraction of the string between the nut and the fret.
5. Multiply the result of step 4 by the scale length.

For example, at the 12th fret: 12 divided by 12 is 1; 2 to the power of 1 is 2; 1 divided by 2 is one half; 1 minus one half is one half; so the 12th fret sits at half the scale length.

Some consequences:

- The twelfth fret sits at exactly half the scale length, because halving the length doubles the frequency, which is one octave.
- Fret spacing shrinks geometrically as you go up, which is why the high frets are cramped. It never reaches zero in theory; it just runs out of fingerboard.
- Old luthiers used the "rule of 18", placing each fret one eighteenth of the remaining length along. The exact figure is 17.817: subtract 0.9439 from 1, which gives 0.0561, then divide 1 by that result. The rule of 18 was a good approximation that goes slightly sharp up the neck.

### Touching the string: natural harmonics

Rest a finger lightly on the string directly above a fret without pressing down, pluck, and lift off. You are forcing a node at that point. Every mode that already has a node there survives; every mode that does not is killed. What you hear is the surviving harmonic.

- Twelfth fret, the halfway point - leaves the second harmonic, one octave above the open string.
- Seventh fret, one third of the way along - leaves the third harmonic, an octave and a fifth above.
- Fifth fret, one quarter of the way - leaves the fourth harmonic, two octaves above.
- Fourth fret, roughly one fifth - leaves the fifth harmonic, two octaves and a major third above.

Two things worth noticing. First, these are audible proof that the harmonic series is physically real and not a theoretical construct - you can isolate individual members of it with a fingertip. Second, the fifth-harmonic point does not sit exactly over the fourth fret, because that fret is placed by equal temperament while the harmonic is placed by pure physics. The gap you can feel there is the 14-cent discrepancy from Part 3, made tangible.

### Tuning by beats

The classic harmonic-tuning method: play the fifth-fret harmonic on one string and the seventh-fret harmonic on the next string up. In theory they are the same pitch, so you adjust until the beating stops.

In practice this method drifts slightly sharp across the instrument, and the reason is now predictable. Those harmonics are pure 2-to-1 and 3-to-2 ratios, but the frets are laid out in equal temperament, where the fifth is two cents narrow. Tuning by pure fifths across five strings accumulates roughly ten cents of error, which is audible. This is the Pythagorean comma showing up in a garage.

### Intonation, and why real strings misbehave

The mathematics above assumes an ideal string: perfectly flexible, with no thickness. Real strings are stiff, and stiffness makes the upper modes vibrate slightly faster than whole-number multiples. This is called **inharmonicity**, and it is worse for thick, short, stiff strings. It is why piano tuners use "stretched" tuning, deliberately tuning the top of the instrument sharp and the bottom flat to match the piano's own slightly stretched harmonics.

Pressing a string down also stretches it slightly, raising its pitch a little beyond what the geometry predicts. Guitars compensate by moving the saddle back a few millimetres, further for thicker strings, which is why an electric guitar's bridge saddles sit in a staggered line rather than a straight one.

### Why standard tuning has that one odd gap

Standard tuning is E, A, D, G, B, E from lowest to highest. The gaps are five semitones, five, five, four, five. Five of the six intervals are perfect fourths; the one between the third and second strings is a major third.

That irregularity is a deliberate compromise. All fourths would make chord shapes perfectly consistent across the neck, which is what bass guitars do, but it would put commonly needed notes out of reach of one hand. The major third shifts the upper strings so that standard open chords and the most common scale patterns fall under the fingers. The cost is that every shape changes when it crosses that pair of strings, which is the single most annoying fact in guitar fingering and the direct result of a decision about ergonomics rather than acoustics.

## Part 5: Where to go deeper

Threads worth pulling, if any of the above caught your interest:

- Fourier analysis - the mathematics of decomposing any signal into sine waves. It underpins audio compression, speech recognition and digital tuners, and it is the formal version of the harmonic recipe idea in Part 3.
- Psychoacoustics - the study of how hearing actually works, including critical bands, masking, and how MP3 compression exploits the fact that a loud sound hides a nearby quiet one.
- The history of temperament - the arguments over tuning from the sixteenth century onward. It reads as musical history but is really applied number theory.
- Microtonal music - composers and instrument builders working outside twelve notes per octave, including nineteen-tone and fifty-three-tone systems.
- Acoustics of instrument bodies - why a guitar's top, back and enclosed air have their own resonances, and how those shape the sound far more than the string alone.
- Non-Western music theory - ragas, maqamat, gamelan tuning, and rhythmic systems considerably more intricate than Western metre.
- Digital audio - sampling rates, the Nyquist limit, bit depth, and how a continuous pressure wave becomes a list of numbers and back again.

## Glossary of terms

### Physics and wave terms

- Amplitude - the size of a wave's disturbance, measured from the rest position. Perceived as loudness.
- Antinode - a point of maximum movement in a standing wave.
- Beats - a slow pulsing in loudness heard when two tones of nearly equal frequency sound together. The number of pulses per second equals the difference between the two frequencies.
- Constructive interference - the reinforcement that occurs when two waves align peak with peak.
- Critical band - the range of frequencies that stimulate overlapping regions of the inner ear and therefore are not fully separated by hearing.
- Cycle - one complete repetition of a wave's pattern, ending where it started.
- Decibel - a logarithmic unit of sound level. Adding 10 decibels multiplies sound power by ten.
- Destructive interference - the cancellation that occurs when one wave's peak aligns with another's trough.
- Envelope - how a sound's loudness changes over its lifetime, from attack through decay.
- Frequency - how many times a wave repeats its cycle each second, measured in hertz. A count, not a length of time. Perceived as pitch.
- Fundamental - the lowest frequency at which a system vibrates; also called the first harmonic.
- Harmonic - a frequency that is a whole-number multiple of the fundamental.
- Harmonic series - the complete set of whole-number multiples of a fundamental frequency.
- Hertz - the unit of frequency, abbreviated Hz. 200 Hz means the wave repeats itself 200 times every second.
- Inharmonicity - the tendency of real, stiff strings to produce overtones slightly higher than exact whole-number multiples.
- Longitudinal wave - a wave in which the medium moves back and forth along the direction of travel. Sound in air is longitudinal.
- Millisecond - one thousandth of a second, the usual unit for the period of a musical sound.
- Node - a point that remains stationary in a standing wave.
- Overtone - any harmonic above the fundamental. The first overtone is the second harmonic.
- Period - how long one complete cycle takes. Period in milliseconds equals 1,000 divided by the frequency in hertz, so a 200 Hz wave has a period of 5 milliseconds.
- Phase - the position of a wave within its cycle at a given instant. Inaudible alone, decisive when waves combine.
- Resonance - the tendency of a system to vibrate strongly when driven at one of its natural frequencies.
- Sine wave - the simplest oscillation, containing a single frequency and no harmonics.
- Standing wave - a stable vibration pattern formed when waves reflect and reinforce themselves, appearing to stay in place.
- Superposition - the principle that overlapping waves add together at each instant.
- Transverse wave - a wave in which the medium moves at right angles to the direction of travel. A vibrating string is transverse.
- Wavelength - the distance between successive peaks of a wave.

### Mathematical terms

- Arithmetic sequence - a sequence in which each term is the previous term plus a fixed amount.
- Cent - a logarithmic unit of pitch distance. One octave is 1,200 cents; one equal-tempered semitone is 100 cents.
- Exponent - the power to which a number is raised. Two to the power of 3 means two multiplied by itself three times.
- Geometric sequence - a sequence in which each term is the previous term multiplied by a fixed amount. Musical scales are geometric in frequency.
- Greatest common divisor - the largest number that divides evenly into two given numbers. Applied to two frequencies, it gives the rate at which their combined waveform repeats.
- Irrational number - a number that cannot be written as a fraction of two whole numbers. The twelfth root of 2 is one.
- Least common multiple - the smallest number that two given numbers both divide into. Applied to two frequencies, it gives the lowest harmonic the two notes share.
- Logarithm - the power to which a base must be raised to produce a given number. Logarithms convert multiplication into addition.
- Modular arithmetic - arithmetic on a repeating cycle, where counting past the end wraps around to the start. Pitch class behaves this way with a cycle of twelve.
- Ratio - a comparison of two quantities by division, written for example as 3 to 2 or 3:2.
- Root - the inverse of raising to a power. The twelfth root of 2 is the number such that twelve copies of it, multiplied together, give 2.

### Musical terms

- Chromatic scale - all twelve pitches within an octave.
- Chromatic scale - all twelve notes. Not really a scale so much as the complete supply.
- Consonance - the quality of notes sounding stable and agreeable together.
- Dissonance - the quality of notes sounding tense, rough, or unresolved.
- Equal temperament - a tuning system dividing the octave into equal steps, standardly twelve. Every semitone is the twelfth root of 2.
- Interval - the distance between two pitches, described either as a ratio or in semitones.
- Interval quality - whether an interval is major (the larger size), minor (the smaller size), or perfect. Fourths, fifths and octaves are perfect; seconds, thirds, sixths and sevenths are major or minor.
- Just intonation - a tuning system using pure whole-number frequency ratios, accurate in one key at the expense of others.
- Key - the choice of which pitch serves as the home note, doh, of a scale.
- Major scale - a seven-note scale with the step pattern whole, whole, half, whole, whole, whole, half.
- Major third - an interval of four semitones; pure ratio 5 to 4.
- Minor scale (natural) - a seven-note scale with the step pattern whole, half, whole, whole, half, whole, whole.
- Minor third - an interval of three semitones; pure ratio 6 to 5.
- Mode - a scale derived by starting a parent scale's pattern on a different one of its notes.
- Octave - an interval with a frequency ratio of 2 to 1, spanning twelve semitones.
- Octave equivalence - the perception that notes an octave apart are versions of the same note.
- Pentatonic scale - a five-note scale, most commonly the major or minor pentatonic.
- Perfect fifth - an interval of seven semitones; pure ratio 3 to 2.
- Perfect fourth - an interval of five semitones; pure ratio 4 to 3.
- Pitch - the perceived highness or lowness of a sound, determined chiefly by frequency.
- Pythagorean comma - the small gap, about 23.5 cents, between twelve pure fifths and seven octaves.
- Scale - an ordered selection of pitches used as the material for a piece of music.
- Semitone - the smallest interval in standard Western music, one twelfth of an octave, equal to 100 cents.
- Solfège - naming the notes of a scale by sung syllables: doh, ray, me, fa, soh, lah, tee. Also spelled do, re, mi, fa, sol, la, ti.
- Temperament - any systematic scheme for adjusting tuning, deciding which intervals stay pure and which absorb error.
- Timbre - the quality that distinguishes two instruments playing the same note at the same loudness. Determined by harmonic content and envelope.
- Tonic - the note a piece of music treats as home.
- Triad - a three-note chord, typically a root with a third and a fifth above it.
- Tritone - an interval of six semitones, exactly half an octave in equal temperament.
- Whole tone - an interval of two semitones.
- Wolf fifth - a badly out-of-tune fifth produced when a tuning system dumps the accumulated comma into a single interval.
