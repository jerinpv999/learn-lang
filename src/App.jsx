import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { LANGS, LETTERS } from './data.js';
import { WORDS, meaningOf } from './words.js';
import Numbers from './Numbers.jsx';
import Daily, { loadProgress } from './Daily.jsx';
import Course, { loadCourse } from './Course.jsx';
import Display, { splitWords, bareWord } from './Display.jsx';
import { ALL_LESSON_IDS } from './curriculum.js';

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
};

/* ---------- speech ---------- */
function useSpeech() {
  const [voices, setVoices] = useState([]);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  useEffect(() => {
    if (!supported) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener?.('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', load);
  }, [supported]);
  const voiceFor = useCallback((code) => {
    const base = code.slice(0, 2);
    return voices.find((v) => v.lang === code) || voices.find((v) => v.lang?.replace('_', '-').startsWith(base));
  }, [voices]);
  // onWord(i) reports which word is being spoken: from the browser's word events when it sends them,
  // otherwise from an estimate based on elapsed time.
  const speak = useCallback((text, code, { rate = 1, pitch = 1, onEnd, onWord } = {}) => {
    if (!supported) { onEnd?.(); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = code; u.rate = rate; u.pitch = pitch;
    const v = voiceFor(code); if (v) u.voice = v;
    let timer = null;
    if (onWord) {
      const starts = []; let p = 0;
      for (const w of text.split(/\s+/).filter(Boolean)) { const i = text.indexOf(w, p); starts.push(i); p = i + w.length; }
      const idxAt = (c) => { let k = 0; for (let j = 0; j < starts.length; j++) if (starts[j] <= c) k = j; return k; };
      let real = false;
      u.onboundary = (e) => { if (e.name && e.name !== 'word') return; real = true; onWord(idxAt(e.charIndex)); };
      u.onstart = () => {
        onWord(0);
        const t0 = performance.now();
        const est = Math.max(500, (text.length * (code.startsWith('hi') ? 80 : 68)) / rate);
        timer = setInterval(() => {
          if (real) { clearInterval(timer); return; }
          onWord(idxAt(Math.floor(Math.min(0.999, (performance.now() - t0) / est) * text.length)));
        }, 90);
      };
    }
    const done = () => { clearInterval(timer); onEnd?.(); };
    u.onend = done; u.onerror = done;
    window.speechSynthesis.speak(u);
  }, [supported, voiceFor]);
  const stop = useCallback(() => { if (supported) window.speechSynthesis.cancel(); }, [supported]);
  return { supported, speak, stop, hasVoice: (code) => !!voiceFor(code), voicesLoaded: voices.length > 0 };
}

function SpeakIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
      <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Letters ---------- */
function Letters({ lang, onPick, current }) {
  return (
    <div className="stack">
      {LETTERS[lang].map((g) => (
        <section key={g.group}>
          <h3 className="label">{g.group}</h3>
          <div className="letters">
            {g.items.map(([ch, name, tip, sayIt]) => (
              <button key={ch + name} className={'letter' + (current?.char === ch && current?.name === name ? ' on' : '')} onClick={() => onPick({ char: ch, name, tip, say: sayIt })}>
                <span className={'glyph' + (lang === 'hi' ? ' deva' : '')}>{ch}</span>
                <span className="lname">{name}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ---------- Words + practice quiz ---------- */
function shuffle(a) { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

function Quiz({ lang, say, onClose }) {
  const pool = useMemo(() => WORDS.flatMap((c) => c.items), []);
  const make = useCallback(() => {
    const q = pool[Math.floor(Math.random() * pool.length)];
    const opts = shuffle([q, ...shuffle(pool.filter((p) => p !== q)).slice(0, 3)]);
    return { q, opts };
  }, [pool]);
  const [round, setRound] = useState(make);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const choose = (o) => {
    if (picked) return;
    setPicked(o);
    const ok = o === round.q;
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1 }));
    say(round.q[lang].t);
  };
  return (
    <div className="quiz">
      <div className="quiz-head">
        <span className="label">Practice · {score.right}/{score.total} correct</span>
        <button className="ghost" onClick={onClose}>Back to word list</button>
      </div>
      <p className="quiz-q">What does <strong className={lang === 'hi' ? 'deva' : ''}>{round.q[lang].t}</strong> mean?</p>
      <button className="chip" onClick={() => say(round.q[lang].t)}><SpeakIcon /> Hear it</button>
      <div className="quiz-opts">
        {round.opts.map((o) => {
          const state = picked ? (o === round.q ? 'right' : o === picked ? 'wrong' : '') : '';
          return <button key={o.en} className={'opt ' + state} onClick={() => choose(o)}>{meaningOf(o, lang)}</button>;
        })}
      </div>
      {picked && (
        <div className="quiz-foot">
          <span>{picked === round.q ? 'Correct.' : `It means “${meaningOf(round.q, lang)}”.`}{round.q[lang].r && <> Say it: <em>{round.q[lang].r}</em></>}</span>
          <button className="primary" onClick={() => { setRound(make()); setPicked(null); }}>Next word</button>
        </div>
      )}
    </div>
  );
}

function Words({ lang, say, onPick, current }) {
  const [cat, setCat] = useState(0);
  const [quiz, setQuiz] = useState(false);
  if (quiz) return <Quiz lang={lang} say={say} onClose={() => setQuiz(false)} />;
  return (
    <div className="stack">
      <div className="row between wrap">
        <div className="seg" role="tablist" aria-label="Word category">
          {WORDS.map((c, i) => (
            <button key={c.cat} role="tab" aria-selected={cat === i} className={cat === i ? 'on' : ''} onClick={() => setCat(i)}>{c.cat}</button>
          ))}
        </div>
        <button className="primary" onClick={() => setQuiz(true)}>Practice quiz</button>
      </div>
      <ul className="words">
        {WORDS[cat].items.map((w) => (
          <li key={w.en}>
            <button className={'word' + (current === w.en ? ' on' : '')} onClick={() => onPick(w)}>
              <span className="en">{meaningOf(w, lang)}</span>
              <span className={'tgt' + (lang === 'hi' ? ' deva' : '')}>{w[lang].t}</span>
              <span className="pr">{w[lang].r}</span>
              <span className="spk"><SpeakIcon /></span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- App ---------- */
export default function App() {
  const [lang, setLang] = useState(() => store.get('ll.lang', 'hi'));
  const [tab, setTab] = useState(() => store.get('ll.tab', 'course'));
  const [focus, setFocusRaw] = useState(null);
  const [wordIdx, setWordIdx] = useState(-1);
  const [reveal, setReveal] = useState(() => store.get('ll.reveal', false));
  const [letter, setLetter] = useState(null);
  const [word, setWord] = useState(null);
  const [showRom, setShowRom] = useState(true);
  const [slow, setSlow] = useState(false);
  const { speak, stop, hasVoice, voicesLoaded, supported } = useSpeech();
  const tok = useRef(0);

  useEffect(() => store.set('ll.lang', lang), [lang]);
  useEffect(() => store.set('ll.tab', tab), [tab]);
  useEffect(() => store.set('ll.reveal', reveal), [reveal]);
  useEffect(() => { document.documentElement.dataset.lang = lang; }, [lang]);
  useEffect(() => { setLetter(null); setWord(null); }, [lang]);

  const code = LANGS[lang].speech;
  const rate = slow ? 0.65 : 0.95;

  const setFocus = useCallback((f) => { tok.current++; setFocusRaw(f); setWordIdx(-1); }, []);
  const halt = useCallback(() => { tok.current++; stop(); }, [stop]);

  /** Show something in the big panel and speak it, lighting up each word. Resolves when speech ends. */
  const sayFocus = useCallback((f, opts = {}) => new Promise((res) => {
    stop();
    const my = ++tok.current;
    setFocusRaw(f); setWordIdx(-1);
    const n = splitWords(f.t).length;
    speak(f.say || f.t, code, {
      rate, ...opts,
      onWord: f.kind === 'number' ? undefined : (i) => { if (tok.current === my) setWordIdx(i); },
      onEnd: () => { if (tok.current === my) setWordIdx(n); res(); },
    });
  }), [speak, stop, code, rate]);

  /** Speak a sentence one word at a time with a short pause between words. */
  const wordByWord = useCallback(async (f) => {
    stop();
    const my = ++tok.current;
    setFocusRaw(f); setWordIdx(-1);
    const ws = splitWords(f.t);
    for (let i = 0; i < ws.length; i++) {
      if (tok.current !== my) return;
      setWordIdx(i);
      await new Promise((r) => speak(bareWord(ws[i]), code, { rate: rate * 0.85, onEnd: r }));
      await new Promise((r) => setTimeout(r, 380));
    }
    if (tok.current === my) setWordIdx(ws.length);
  }, [speak, stop, code, rate]);

  const sayWord = useCallback((w) => { halt(); speak(w, code, { rate: rate * 0.85 }); }, [halt, speak, code, rate]);
  const say = useCallback((text, opts = {}) => { stop(); speak(text, code, { rate, ...opts }); }, [speak, stop, code, rate]);

  // Daily hour drives the panel itself
  const onDailyShow = useCallback((s) => {
    setFocusRaw({
      kind: s.mode === 'convo' ? 'line' : s.mode === 'number' ? 'number' : 'word',
      t: s.t, r: s.r, en: s.mode === 'number' ? `${s.en} in digits` : s.en, words: s.words, who: s.who, role: s.role,
      label: s.mode === 'convo' ? `${s.title} · line ${s.n} of ${s.total}` : s.mode === 'number' ? 'Number' : 'Word',
    });
    setWordIdx(-1);
  }, []);
  const onDailyWord = useCallback((i) => setWordIdx(i), []);
  const onNumShow = useCallback((v) => setFocus({ kind: 'number', t: v.t, words: v.words, r: v.r, say: v.words, label: 'Big numbers' }), [setFocus]);

  // default panel content for the simple tabs
  useEffect(() => {
    if (tab === 'letters') {
      const it = LETTERS[lang][0].items[0];
      setFocus({ kind: 'letter', t: it[0], en: it[1], tip: it[2], label: 'Letter · sounds like' });
    } else if (tab === 'words') {
      const w = WORDS[0].items[0];
      setFocus({ kind: 'word', t: w[lang].t, r: w[lang].r, en: meaningOf(w, lang), label: WORDS[0].cat });
    }
  }, [tab, lang, setFocus]);

  const daysDone = Object.values(loadProgress(lang)).filter((p) => p.done).length;
  const lessonsDone = Object.values(loadCourse(lang)).filter((p) => p.done).length;

  return (
    <div className="app">
      <header className="top">
        <div className="brand">
          <span className="mark" aria-hidden="true">{LANGS[lang].greet.slice(0, 1)}</span>
          <div>
            <h1>Phrasewalk</h1>
            <p>Hindi, French and German from English · Spoken English for Hindi speakers</p>
          </div>
        </div>
        <div className="langs" role="radiogroup" aria-label="Language to learn">
          {Object.entries(LANGS).map(([k, v]) => (
            <button key={k} role="radio" aria-checked={lang === k} className={'lang ' + k + (lang === k ? ' on' : '')} onClick={() => { halt(); setLang(k); }}>
              <span className={k === 'hi' ? 'deva' : ''}>{v.native}</span>
              <small>{v.name}</small>
            </button>
          ))}
        </div>
      </header>

      <nav className="tabs" role="tablist" aria-label="Section">
        {[['course', 'Course'], ['daily', 'Daily hour'], ['letters', 'Letters'], ['words', 'Words'], ['numbers', 'Big numbers']].map(([k, label]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => { halt(); setTab(k); }}>{label}</button>
        ))}
        <span className="spacer" />
        <label className="toggle"><input id="slow" type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} /> Slow speech</label>
        <span className="progress">{lessonsDone}/{ALL_LESSON_IDS.length} lessons · {daysDone}/30 days</span>
      </nav>

      {(!supported || (voicesLoaded && !hasVoice(code))) && (
        <p className="notice">
          {supported
            ? `This device has no ${LANGS[lang].name} voice installed, so audio may sound wrong. Add one in your system's speech or language settings.`
            : 'This browser cannot speak text aloud. Try Chrome, Edge or Safari.'}
        </p>
      )}

      <main className="grid">
        <div className="stage-wrap">
          <Display focus={focus} wordIdx={wordIdx} lang={lang} reveal={reveal} setReveal={setReveal} showRom={showRom}
            onSay={() => (focus ? sayFocus(focus) : null)} onWordByWord={() => focus && wordByWord(focus)} onWord={sayWord} />
        </div>

        <div className="panel">
          {tab === 'course' && <Course lang={lang} sayFocus={sayFocus} wordByWord={wordByWord} setFocus={setFocus} stop={halt} showRom={showRom} setShowRom={setShowRom} />}
          {tab === 'letters' && <Letters lang={lang} current={letter} onPick={(l) => { setLetter(l); sayFocus({ kind: 'letter', t: l.char, say: l.say || l.char, en: l.name, tip: l.say ? `${l.tip} Listen: ${l.say}.` : l.tip, label: 'Letter · sounds like' }); }} />}
          {tab === 'words' && <Words lang={lang} say={say} current={word} onPick={(w) => { setWord(w.en); sayFocus({ kind: 'word', t: w[lang].t, r: w[lang].r, en: meaningOf(w, lang), label: 'Word' }); }} />}
          {tab === 'numbers' && <Numbers lang={lang} say={(t, o = {}) => say(t, o)} onShow={onNumShow} />}
          {tab === 'daily' && <Daily key={lang} lang={lang} speak={speak} stop={stop} onShow={onDailyShow} onWord={onDailyWord} showRom={showRom} setShowRom={setShowRom} />}
        </div>
      </main>
    </div>
  );
}
