# Phrasewalk

A React + React Three Fiber app for learning Hindi, French and German from English.

- **Letters**: Devanagari vowels and consonants, the French alphabet and accents, the German alphabet with umlauts and ß. Each letter appears on a spinning 3D block with a pronunciation tip.
- **Words**: greetings, numbers, everyday words and question words, with pronunciation and a practice quiz.
- **Big numbers**: a reader for any number up to 999,999,999,999 (Indian lakh/crore, French, German), place-value table, rules and a listening test.
- **Conversations**: 8 everyday scenes plus 30 longer course conversations, acted out in 3D.
- **Daily hour**: a 60-minute listening session for each of 30 days (words, numbers, new conversation, repeat-after-me, review, free listening) with a timer and saved progress.

Audio uses the browser's built-in speech (Web Speech API). For Hindi, the device needs a Hindi voice installed.

## Run
    npm install
    npm run dev      # local dev server
    npm run build    # single self-contained dist/index.html

## Files
- src/data.js – letters and the 8 everyday scenes
- src/words.js – the word bank (21 categories)
- src/course.js – the 30-day conversations
- src/numbers.js – number-to-words for Hindi, French, German
- src/Daily.jsx – the 60-minute daily session player
- src/Numbers.jsx – the big-numbers screen
- src/Stage.jsx – the React Three Fiber scenes
- src/App.jsx – interface, speech and quiz
- src/styles.css – styling, light and dark themes
# learn-lang
