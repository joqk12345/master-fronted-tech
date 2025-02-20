# ABC notation

### Key Points
- ABCjs is a JavaScript library for rendering ABC music notation on web pages, ideal for beginners interested in creating music online.
- ABC notation is a text-based system for writing music, easy to learn even for those new to music ("music whites").
- Start with simple tunes like "Twinkle Twinkle Little Star" and progress to advanced features like chords and lyrics.
- You can embed ABCjs in websites for sharing music, creating players, or generating sheet music for personal use.

### What is ABC Notation and ABCjs?
ABC notation is a simple, text-based way to write music, perfect for folk and traditional tunes. It uses letters like "c" for notes and symbols like "|" for bar lines, making it accessible for beginners. ABCjs, on the other hand, is a tool that turns this text into visual sheet music on web pages, letting you see and share your music online.

For example, to write "Twinkle Twinkle Little Star," you’d use:
```
X:1
T:Twinkle Twinkle Little Star
K:C
M:4/4
L:1/4
c c g g a a g | f f e e d d c | ...
```
ABCjs then renders this into a musical score you can view in a browser.

### Getting Started with ABCjs
To use ABCjs, include the library in your HTML, add a div for the music, and call a function to render your ABC notation. Here’s a basic setup:
- Add the library: `<script src="path/to/abcjs-basic.js"></script>`
- Create a div: `<div id="paper"></div>`
- Use JavaScript: `ABCJS.startRendering("paper", your_abc_string);`

For "Twinkle Twinkle Little Star," your web page would look like:
```html
<html>
  <head>
    <script type="text/javascript" src="path/to/abcjs-basic.js"></script>
  </head>
  <body onload="load()">
    <div id="paper"></div>
    <script>
      function load() {
        var abc = "X:1\nT:Twinkle Twinkle Little Star\nK:C\nM:4/4\nL:1/4\nc c g g a a g | f f e e d d c | ...";
        ABCJS.startRendering("paper", abc);
      }
    </script>
  </body>
</html>
```
This lets you see the music on your web page instantly.

### Advanced Features and Applications
As you get comfortable, explore adding chords (e.g., `!C!c` for a C chord above a note), lyrics (using `W:`), or different clefs (e.g., `K:C clef=bass` for bass clef). You can use ABCjs for:
- Creating a music player with playback features.
- Embedding sheet music in blogs or websites for sharing.
- Generating printable sheet music for personal practice.

It’s surprising how quickly you can go from writing simple tunes to sharing interactive music online, all without deep music theory knowledge.

---

### Comprehensive Guide to Learning ABCjs: From Basics to Advanced with Application Scenarios

This guide provides a detailed exploration of ABC notation and the ABCjs JavaScript library, tailored for beginners ("music whites") interested in creating and rendering music online. It covers the fundamentals, advanced features, and practical applications, ensuring a thorough understanding for users new to music notation and web development.

#### Introduction to ABC Notation

ABC notation is a text-based music notation system, designed by Chris Walshaw, particularly popular for folk and traditional music. It is comprehensible by both humans and computers, using characters like letters, digits, and punctuation marks to represent musical elements. This system is ideal for beginners due to its simplicity and the ability to render it into standard notation with tools like ABCjs, a JavaScript library developed by Gregory Dyke and Paul Rosen.

The notation is divided into two main parts: the header and the body. The header sets up essential musical parameters such as the key, time signature, and default note length, while the body contains the actual notes and other musical elements like bar lines and accidentals.

#### Header and Body Basics

The header includes several fields, each starting with a letter followed by a colon. Key fields include:

- **X:** Tune number, used for identification in tune libraries (optional).
- **T:** Title of the tune, printed at the top of the score; a secondary T: can be used for alternative names, printed smaller underneath.
- **K:** Key of the music, e.g., "C" for C major, "Dm" for D minor, setting sharps and flats at the start of the stave.
- **M:** Meter or time signature, e.g., "4/4" for common time, "6/8" for jigs.
- **L:** Default note length, e.g., "1/4" for quarter notes, "1/8" for eighth notes.

The body represents the music itself, with notes denoted by letters a-g for the lower octave and A-G for the higher octave, adjusted with apostrophes (' for higher) or commas (, for lower) for further octaves. Accidentals are marked with ^ for sharp, _ for flat, and = for natural. Note lengths can be modified within the body using numbers (e.g., 2c for a half note if L:1/4) or fractions (e.g., c/2 for an eighth note if L:1/4). Bar lines are denoted by |, and spaces between notes determine beaming, with adjacent notes without spaces beamed together.

#### Writing a Simple Tune: Example with "Twinkle Twinkle Little Star"

To illustrate, let’s write "Twinkle Twinkle Little Star" in ABC notation. This tune is in C major, 4/4 time, with each note as a quarter note. The complete ABC string is:

```
X:1
T:Twinkle Twinkle Little Star
K:C
M:4/4
L:1/4
c c g g a a g | f f e e d d c | g g f f e e d | c c g g a a g | f f e e d d c | g g f f e e d | c c g g a a g | f f e e d d c ||
```

This notation starts with the header setting the tune number, title, key (C major), meter (4/4), and default note length (quarter notes). The body lists the notes in groups separated by bar lines, with each note written separately to reflect quarter note durations, matching the melody’s rhythm.

#### Introducing ABCjs: Rendering ABC Notation on Web Pages

ABCjs is a JavaScript library that facilitates rendering ABC notation into visual sheet music within web browsers. It supports displaying standard music notation and generating MIDI files for playback, requiring only basic JavaScript knowledge for implementation. There are two main flavors: the basic version, where you call functions to render, and the plugin version, which automatically renders all ABC on page load.

For beginners, the basic version is recommended for control and learning. To use ABCjs, you need to include the library in your HTML, typically via a script tag pointing to the ABCjs file (e.g., from a CDN or local path), and have a div element where the music will be rendered. The rendering is done by calling `ABCJS.startRendering(divId, abcString)`, where `divId` is the ID of the div and `abcString` is the ABC notation string.

#### Setting Up Your Web Page: Practical Implementation

Here’s how to set up a web page to render "Twinkle Twinkle Little Star" using ABCjs:

```html
<html>
  <head>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/abcjs@6.0.0/dist/abcjs-basic.min.js"></script>
  </head>
  <body onload="load()">
    <div id="paper"></div>
    <script type="text/javascript">
      function load() {
        var abc = "X:1\nT:Twinkle Twinkle Little Star\nK:C\nM:4/4\nL:1/4\nc c g g a a g | f f e e d d c | g g f f e e d | c c g g a a g | f f e e d d c | g g f f e e d | c c g g a a g | f f e e d d c ||";
        ABCJS.startRendering("paper", abc);
      }
    </script>
  </body>
</html>
```

In this example, we include the ABCjs library from a CDN, create a div with ID "paper," and use the `onload` event to call a `load` function that renders the ABC string into the div. The `\n` in the ABC string represents new lines, ensuring proper formatting.

#### Advanced Features of ABC Notation and ABCjs Integration

ABC notation supports advanced features that enhance musical expression, which can be rendered using ABCjs. These include:

- **Chords:** Denoted by placing the chord name in exclamation marks before a note, e.g., `!C!c` displays a C major chord above the note c. This is useful for accompanying melodies with harmony.
- **Lyrics:** Added using the `W:` field after the music line, e.g., `W:Twinkle, Twinkle Little Star`, allowing synchronization with the melody for songs.
- **Different Clefs:** Specified in the `K:` field with a `clef` parameter, e.g., `K:C clef=bass` for bass clef, catering to different instruments or vocal ranges.

These features can be integrated into the ABC string and rendered by ABCjs, expanding the complexity and utility of the music displayed.

#### Application Scenarios: Practical Uses of ABCjs

ABCjs offers versatile applications for music creation and sharing, particularly for beginners and hobbyists:

- **Creating a Simple Music Player:** ABCjs includes synth capabilities for audio playback, allowing users to create interactive music players. By adding playback controls, users can listen to their compositions directly in the browser, enhancing the learning experience.
- **Embedding in a Blog or Website:** Musicians and educators can embed sheet music in blogs or websites, making it easy to share compositions without needing to generate images. This is ideal for music tutorials, songbooks, or community forums, with the music rendering client-side for efficiency.
- **Generating Sheet Music for Personal Use:** Users can generate and print sheet music for personal practice, leveraging ABCjs’s rendering to create professional-looking scores. This is particularly useful for composing and practicing new tunes, with the ability to export or print for offline use.

These scenarios demonstrate the library’s flexibility, enabling users to move from simple notation to interactive, shareable music experiences.

#### Detailed Implementation Notes

The implementation details reveal the library’s ease of use and extensibility. For instance, installation can be done via npm (`npm install -D abcjs`) for developers using package managers, or via script tags for simpler web pages. The basic flavor allows dynamic rendering, while the plugin version is suited for static content with existing ABC notation, rendering on page load without additional JavaScript calls.

The documentation, available at [https://paulrosen.github.io/abcjs/](https://paulrosen.github.io/abcjs/), provides further examples and API details, though some functions like `startRendering` versus `renderAbc` may vary by version, with `startRendering` confirmed in examples like [basic.html](https://cdn.rawgit.com/paulrosen/abcjs/main/examples/basic.html). Users are encouraged to explore the [list of examples](https://cdn.rawgit.com/paulrosen/abcjs/main/examples/toc.html) for practical setups, such as editors and synth demos, to enhance functionality.

#### Supporting Resources and Technical Considerations

For learning ABC notation, resources like [Integrated Musicianship ABC Notation Tutorial](https://intmus.github.io/abc-tutorial.html) offer interactive examples, recommending Chrome for full functionality. The [How To Read and Write abc music notation](https://www.thecelticroom.org/abc-music-notation/abc-notation-read-and-write.html) page provides detailed explanations of header codes and note representation, crucial for beginners. For ABCjs specifics, the GitHub repository [https://github.com/paulrosen/abcjs](https://github.com/paulrosen/abcjs) hosts technical information and version updates, with community support for documentation and testing.

Technical considerations include ensuring browser compatibility, with Chrome noted for complete support, and potential updates like version 7.0.0 planning size reductions and improved synth APIs. Users should check for breaking changes in updates, such as SVG structure modifications in version 6.3.0, impacting CSS-dependent code.

#### Conclusion

This guide provides a comprehensive pathway from learning ABC notation to leveraging ABCjs for rendering and sharing music online. Starting with simple tunes like "Twinkle Twinkle Little Star," users can progress to advanced features and practical applications, making music creation accessible and engaging. The integration of ABCjs into web pages opens up possibilities for interactive music experiences, suitable for personal, educational, and community use.

### Key Citations
- [ABC notation standard at abcnotation.com](https://abcnotation.com/wiki/abc:standard)
- [ABCjs documentation at paulrosen.github.io](https://paulrosen.github.io/abcjs/)
- [Integrated Musicianship ABC Notation Tutorial](https://intmus.github.io/abc-tutorial.html)
- [How To Read and Write abc music notation at thecelticroom.org](https://www.thecelticroom.org/abc-music-notation/abc-notation-read-and-write.html)
- [ABCjs GitHub repository](https://github.com/paulrosen/abcjs)
- [ABCjs basic example at cdn.rawgit.com](https://cdn.rawgit.com/paulrosen/abcjs/main/examples/basic.html)
- [List of ABCjs examples at cdn.rawgit.com](https://cdn.rawgit.com/paulrosen/abcjs/main/examples/toc.html)