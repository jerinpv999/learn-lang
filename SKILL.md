---
name: "phrasewalk-language-course"
description: "Build or extend Phrasewalk, the React app for learning languages from English: add languages, levels, lessons, words, grammar or number rules."
---

# Phrasewalk language course

Phrasewalk is a React (Vite) app that teaches languages from English, from beginner to advanced. It covers Hindi, French and German. There is no 3D: a large reading panel shows the current letter, word, number or sentence, and lights up sentences word by word as they are spoken. Audio uses the browser's Web Speech API.

The app has five tabs:

- **Course** (opens first): 3 levels → 12 units → 50 lessons.
- **Daily hour**: a 60-minute listening session for each of 30 days.
- **Letters**: the alphabet.
- **Words**: the word bank.
- **Big numbers**: a number reader and lessons.

Use this skill when the user wants to create the app from scratch, add content, add a language or level, or change how a lesson works.

## Project layout

```
index.html            Google Fonts: Bricolage Grotesque, Atkinson Hyperlegible, Noto Sans Devanagari
vite.config.js        react() + viteSingleFile(): `npm run build` makes one self-contained dist/index.html
src/main.jsx          mounts <App/>
src/App.jsx           shell, tabs, language switch, useSpeech (word tracking), sayFocus, wordByWord, Letters/Words/Quiz views
src/Display.jsx       big reading panel; splitWords/bareWord helpers; word states past/now/future/hidden
src/Course.jsx        course map, Lesson (5 steps), Practice (build the sentence, choose the meaning), progress
src/curriculum.js     LEVELS → units {id, title, lessons[], grammar{hi,fr,de:{title, points[]}}}, LESSONS map, findLesson, ALL_LESSON_IDS
src/data.js           LANGS (name, native, speech code), LETTERS, SCENES (8 short everyday scenes), enFor()
src/course.js         30 beginner/intermediate conversations (ids d1–d30), plus the exported parse()
src/advanced.js       12 advanced conversations (ids a1–a12), parsed with the same parse()
src/words.js          word bank, pipe-delimited text that is parsed at load
src/numbers.js        readNumber(n, lang, {year}), formatNum, LADDER, seeded RNG, pickNumber
src/Numbers.jsx       number reader, place-value table, rules, listening test
src/Daily.jsx         builds and plays the 60-minute session (uses d1–d30), with timer and saved progress
src/styles.css        tokens with light and dark themes; the accent colour changes per language through :root[data-lang]
```

Pinned dependency versions: react 18.3.1, react-dom 18.3.1, vite 5.4.10, @vitejs/plugin-react 4.3.3, vite-plugin-singlefile 2.0.3. The app no longer uses three.js or React Three Fiber.

## Course structure (curriculum.js)

- **Beginner (A1–A2):** units 1–4.
- **Intermediate (A2–B1):** units 5–9.
- **Advanced (B2–C1):** units 10–12.
- Each unit lists lesson ids in order (base scene ids such as `shop`, then `dN`, then `aN`) and gives one grammar point per language: a title plus about 4 short points, each with real examples in the target language.
- `SCENE_WORDS` gives each base scene its word category.
- Every lesson id must exist in `LESSONS`, and every lesson must be in exactly one unit.

Each lesson has 5 steps:

1. **Grammar:** the unit's note.
2. **Key words:** the lesson's word category, with "Play all".
3. **Listen:** the whole conversation, with English and romanised toggles.
4. **Line by line:** one line in the big panel, with Listen, Slowly, Word by word and Show meaning.
5. **Practice:** 6 exercises alternating "build the sentence" (lines of 3–14 words) and "choose the meaning".

Finishing a lesson saves `{done, best}` in `ll.course.<lang>` and opens the next lesson. Wrap every storage access in try/catch.

## Speech and the big panel

- `speak(text, code, {rate, pitch, onEnd, onWord})` reports which word is being spoken. It uses the browser's `onboundary` events when they fire, and otherwise estimates from elapsed time (about 68 ms per character, 80 for Hindi).
- `sayFocus(focus, opts)` puts a focus `{kind: letter|word|line|number, t, r, en, words, say, who, role, label, tip}` in the panel, speaks it and resolves when done. A token counter discards callbacks from cancelled speech.
- `wordByWord(focus)` speaks each word separately with a short pause.
- "Reveal as spoken" hides the words that haven't been spoken yet.
- Tapping any word in the panel speaks that word.

## Content formats

Keep content in these compact text formats. Do not rewrite them as JSON.

### Words (src/words.js)

```
#Category name
English|हिन्दी|Hindi romanised|French|French sound|German|German sound
```

- Give French and German nouns their article (le/la/l', der/die/das).
- Write the sound hints as English-style respellings with the stressed syllable in capitals, e.g. `bon-ZHOOR`, `GOO-ten MOR-gen`.

### Conversations (src/course.js, src/advanced.js)

```
@n|setting|word category|Title|Role A|Role B
who|English|Hindi|Hindi romanised|French|German
```

- `who` is `a` or `b`. Role A speaks at a higher pitch than role B.
- `setting` is a label only (shop, small, office, bus, train, friends, family, restaurant, clinic, hotel, airport).
- `word category` must exactly match a `#Category` in words.js. That category's words are used in the lesson's key-words step and the daily warm-up.
- When the English differs per language (names, currency, cities), separate the versions with ` // `: `Hindi // French and German` or `Hindi // French // German`. Use rupees and Indian names for Hindi, euros and local names for French and German.
- Beginner lessons have 6–15 short lines with natural back-and-forth that includes numbers, times and prices. Advanced lessons have 12–14 longer lines with opinions, connectors, the subjunctive and the passive.
- Romanise Hindi word for word, so that the romanised line highlights in step with the Devanagari.
- Hindi uses masculine forms for the learner. Mention this in the UI hint.
- Never put `|` inside the text.

### Everyday scenes (src/data.js)

These use `L(who, en, hi, hiR, fr, de)`. In `en`, a string means the same English for every language; an object `{hi, fr, de}` gives a different English line per language.

### Adding a level or unit

Write the conversations in a new file using `parse`, and give their ids a prefix. Add them to `LESSONS`, then add units to `LEVELS` with grammar for every language.

## Adding a new language

1. Add the language to `LANGS` with its BCP-47 speech code. Add its `LETTERS` groups and an accent colour (`:root[data-lang="xx"]` in the light and both dark theme blocks).
2. Add a column to every words.js line and every conversation line, update the parsers, and add `grammar.xx` to every unit.
3. Add a `xx(n, year)` converter to numbers.js that returns `{parts:[{value,t,r?}]}` and wire it into `readNumber`. Add `RULES.xx` and `LEVELS.xx` in Numbers.jsx, and a locale to `formatNum`.
4. If the script is not Latin, load a suitable Noto font, add a font class like `.deva`, and add a romanised field the same way Hindi has `hiR`.

## How the daily hour works (Daily.jsx)

- `buildSegments(d, lang, opts)` builds the day as steps (`say` or `gap`), in this order:
  1. Warm-up words: today's and yesterday's categories, a full round then a quick round.
  2. 24 numbers, with the maximum growing by day (`numberMax`).
  3. The conversation with English after each line.
  4. Repeat-after-me, with pauses for speaking.
  5. The conversation three times with no English.
  6. Review of days d−1, 2, 4, 7, 14, 21 and 28.
- `freeBlock` then cycles conversations and word rounds until the timer reaches `GOAL` (3600 seconds).
- Number drills use `seeded()`, so a saved position still lines up with the same steps after a reload.
- Progress is stored per language in localStorage under `ll.d60.<lang>` as `{day: {e, i, done}}`.
- The current item goes to the big panel through `onShow`, and spoken-word progress through `onWord`.
- Speech uses a watchdog timeout because `onend` sometimes never fires. While playing, the page requests a screen wake lock. Tell users to keep the screen on.

## Verify before you deliver

1. Run a node script that imports curriculum.js, words.js and numbers.js. Check that:
   - every lesson id in `LEVELS` exists in `LESSONS`, and no lesson is left out of a unit;
   - every line has all fields and `who` is a or b;
   - every lesson's word category exists in words.js;
   - every unit has grammar for every language;
   - the Hindi 0–99 lists have exactly 100 entries;
   - `readNumber` gives the right words for 21, 71, 80, 81, 91, 100, 101, 200, 201, 1000, 21000, 80000, 1000000, 2000000, 23456789 and 10^9, and that years read correctly (1994 → उन्नीस सौ चौरानवे / neunzehnhundertvierundneunzig).
2. Run `npx vite build`.
3. Take one headless look. Install playwright-core only for the check (uninstall it afterwards) and use `/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell`; the full Chrome binary no longer supports old headless mode.
   - Open a lesson, its line-by-line step and its practice step, then visit the other tabs.
   - Use precise selectors such as `.levels >> text=Advanced`, because plain text selectors also match the header.
   - Check for page errors and that `scrollWidth` is 390 or less at phone width. The only expected error is the Google Fonts load failing when offline.

## Publish as an artifact

Remove the skeleton tags from `dist/index.html`: the doctype, html, head and body tags, plus the charset and viewport metas. Then move `<title>Phrasewalk</title>` and `<meta name="claude:viewport-fit-sides" content="cover">` to the top. Publish with the Artifact tool. Reuse the same file path, or the existing URL, to update the same artifact. Also zip the source (README, index.html, package files, vite.config.js, src) and send it to the user.

## Language quality

- Write natural, everyday speech: polite आप/vous/Sie with strangers and at work, and तुम/tu/du with friends and family.
- Use local time conventions:
  - Hindi: सवा, साढ़े, पौने, डेढ़, ढाई.
  - French: the 24-hour clock in announcements.
  - German: Viertel nach / Viertel vor / halb.
- Write French numbers in the traditional spelling (quatre-vingts, deux cents, mille never pluralised).
- Write German numbers below a million as one word.