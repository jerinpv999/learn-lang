# Phrasewalk

A React app for learning Hindi, French and German from English, from beginner to advanced.

- **Course**: 3 levels (Beginner A1–A2, Intermediate A2–B1, Advanced B2–C1), 12 units, 50 lessons. Each unit teaches one grammar point per language. Each lesson has 5 steps: grammar, key words, listen, line by line, practice (build the sentence, choose the meaning).
- **Big reading panel**: shows the current letter, word, number or sentence in large type. Sentences light up word by word as they are spoken; "Word by word" says each word separately; tap any word to hear it.
- **Daily hour**: a 60-minute listening session for each of 30 days, with a timer and saved progress.
- **Letters**, **Words** (318 words in 23 groups) and **Big numbers** (Indian lakh/crore, French, German).

Audio uses the browser's built-in speech (Web Speech API). For Hindi, the device needs a Hindi voice installed.

## Run
    npm install
    npm run dev      # local dev server
    npm run build    # single self-contained dist/index.html

## Files
- src/curriculum.js – levels, units, lesson order and grammar notes
- src/data.js – letters and the 8 everyday scenes
- src/course.js – 30 beginner/intermediate conversations (also used by the daily hour)
- src/advanced.js – 12 advanced conversations
- src/words.js – the word bank
- src/numbers.js – number-to-words for Hindi, French, German
- src/Course.jsx – course map, lesson steps and practice
- src/Display.jsx – the big reading panel
- src/Daily.jsx – the 60-minute daily session
- src/Numbers.jsx – the big-numbers screen
