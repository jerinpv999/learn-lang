import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Stage from './Stage.jsx';
import { LANGS, LETTERS, SCENES, enFor } from './data.js';
import { WORDS } from './words.js';
import { COURSE } from './course.js';
import Numbers from './Numbers.jsx';
import Daily, { loadProgress } from './Daily.jsx';

const ALL = [
  ...SCENES.map((s) => ({ ...s, group: 'Everyday situations', label: s.title })),
  ...COURSE.map((c) => ({ ...c, group: '30-day course', label: `Day ${c.day} · ${c.title}` })),
];

const ACCENTS = { hi: '#D9782D', fr: '#2F5FD0', de: '#C23B2E' };

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
  const speak = useCallback((text, code, { rate = 1, pitch = 1, onEnd } = {}) => {
    if (!supported) { onEnd?.(); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = code; u.rate = rate; u.pitch = pitch;
    const v = voiceFor(code); if (v) u.voice = v;
    u.onend = () => onEnd?.(); u.onerror = () => onEnd?.();
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
            {g.items.map(([ch, name, tip]) => (
              <button key={ch} className={'letter' + (current?.char === ch ? ' on' : '')} onClick={() => onPick({ char: ch, name, tip })}>
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
          return <button key={o.en} className={'opt ' + state} onClick={() => choose(o)}>{o.en}</button>;
        })}
      </div>
      {picked && (
        <div className="quiz-foot">
          <span>{picked === round.q ? 'Correct.' : `It means “${round.q.en}”.`} Say it: <em>{round.q[lang].r}</em></span>
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
            <button className={'word' + (current?.en === w.en ? ' on' : '')} onClick={() => { onPick({ t: w[lang].t, en: w.en }); say(w[lang].t); }}>
              <span className="en">{w.en}</span>
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

/* ---------- Conversations ---------- */
function Conversation({ lang, scene, setScene, active, setActive, say, stop, showEn, setShowEn, showRom, setShowRom, heard, markHeard, rate }) {
  const [playing, setPlaying] = useState(false);
  const playRef = useRef(false);
  const sc = ALL[scene];
  const heardHere = sc.lines.filter((_, j) => heard[`${lang}:${sc.id}:${j}`]).length;

  const playLine = (i, chain) => {
    const l = sc.lines[i];
    setActive(i);
    markHeard(`${lang}:${sc.id}:${i}`);
    say(l[lang], { pitch: l.who === 'a' ? 1.15 : 0.85, rate, onEnd: () => {
      if (!chain || !playRef.current) return;
      if (i + 1 < sc.lines.length) setTimeout(() => playRef.current && playLine(i + 1, true), 450);
      else { playRef.current = false; setPlaying(false); }
    } });
  };
  const playAll = () => {
    if (playing) { playRef.current = false; setPlaying(false); stop(); return; }
    stop(); playRef.current = true; setPlaying(true); playLine(0, true);
  };
  useEffect(() => () => { playRef.current = false; }, []);
  useEffect(() => { playRef.current = false; setPlaying(false); stop(); }, [scene, lang, stop]);

  return (
    <div className="stack">
      <div className="row wrap pick">
        <label className="label" htmlFor="convo-pick">Conversation</label>
        <select id="convo-pick" value={scene} onChange={(e) => { setScene(Number(e.target.value)); setActive(0); }}>
          {['Everyday situations', '30-day course'].map((g) => (
            <optgroup key={g} label={g}>
              {ALL.map((s, i) => s.group === g && <option key={s.id} value={i}>{s.label}</option>)}
            </optgroup>
          ))}
        </select>
        <button className="ghost" disabled={scene === 0} onClick={() => { setScene(scene - 1); setActive(0); }} aria-label="Previous conversation">‹</button>
        <button className="ghost" disabled={scene === ALL.length - 1} onClick={() => { setScene(scene + 1); setActive(0); }} aria-label="Next conversation">›</button>
        <span className="meter" aria-label={`${heardHere} of ${sc.lines.length} lines heard`}>
          {sc.lines.map((_, j) => <i key={j} className={heard[`${lang}:${sc.id}:${j}`] ? 'f' : ''} />)}
        </span>
      </div>

      <div className="row between wrap">
        <div className="roles"><span className="dot a" />{sc.roles[0]}<span className="dot b" />{sc.roles[1]}</div>
        <div className="row wrap">
          <label className="toggle"><input id="show-en" type="checkbox" checked={showEn} onChange={(e) => setShowEn(e.target.checked)} /> English</label>
          {lang === 'hi' && <label className="toggle"><input id="show-rom" type="checkbox" checked={showRom} onChange={(e) => setShowRom(e.target.checked)} /> Romanised</label>}
          <button className="primary" onClick={playAll}>{playing ? 'Stop' : 'Play conversation'}</button>
        </div>
      </div>

      <ol className="dialog">
        {sc.lines.map((l, i) => (
          <li key={i} className={`line ${l.who}` + (active === i ? ' on' : '')}>
            <button onClick={() => { playRef.current = false; setPlaying(false); stop(); playLine(i, false); }} aria-label={`Play line ${i + 1}`}>
              <span className="who">{sc.roles[l.who === 'a' ? 0 : 1]}</span>
              <span className={'say' + (lang === 'hi' ? ' deva' : '')}>{l[lang]}</span>
              {lang === 'hi' && showRom && <span className="rom">{l.hiR}</span>}
              {showEn && <span className="tr">{enFor(l, lang)}</span>}
              <span className="spk"><SpeakIcon /></span>
            </button>
          </li>
        ))}
      </ol>
      <p className="hint">Tap any line to hear it. Drag the scene to look around.{lang === 'hi' && ' Hindi lines use masculine forms for “you” (करता हूँ); a woman would say करती हूँ.'}</p>
    </div>
  );
}

/* ---------- App ---------- */
export default function App() {
  const [lang, setLang] = useState(() => store.get('ll.lang', 'hi'));
  const [tab, setTab] = useState(() => store.get('ll.tab', 'daily'));
  const [scene, setScene] = useState(() => store.get('ll.scene', 0));
  const [numShow, setNumShow] = useState({ t: '2,34,56,789', en: '' });
  const [dailyShow, setDailyShow] = useState(null);
  const [active, setActive] = useState(0);
  const [letter, setLetter] = useState(null);
  const [word, setWord] = useState(null);
  const [showEn, setShowEn] = useState(true);
  const [showRom, setShowRom] = useState(true);
  const [slow, setSlow] = useState(false);
  const [heard, setHeard] = useState(() => store.get('ll.heard', {}));
  const { speak, stop, hasVoice, voicesLoaded, supported } = useSpeech();

  useEffect(() => store.set('ll.lang', lang), [lang]);
  useEffect(() => store.set('ll.tab', tab), [tab]);
  useEffect(() => store.set('ll.scene', scene), [scene]);
  useEffect(() => { document.documentElement.dataset.lang = lang; }, [lang]);
  useEffect(() => { setLetter(null); setWord(null); }, [lang]);

  const code = LANGS[lang].speech;
  const rate = slow ? 0.65 : 0.95;
  const say = useCallback((text, opts = {}) => { stop(); speak(text, code, { rate, ...opts }); }, [speak, stop, code, rate]);
  const markHeard = useCallback((k) => setHeard((h) => { if (h[k]) return h; const n = { ...h, [k]: 1 }; store.set('ll.heard', n); return n; }), []);

  const firstLetter = LETTERS[lang][0].items[0];
  const curLetter = letter || { char: firstLetter[0], name: firstLetter[1], tip: firstLetter[2] };
  const firstWord = WORDS[0].items[0];
  const curWord = word || { t: firstWord[lang].t, en: firstWord.en };
  const sc = ALL[scene] || ALL[0];
  const daysDone = Object.values(loadProgress(lang)).filter((p) => p.done).length;
  const onNumShow = useCallback((v) => setNumShow(v), []);
  const onDailyShow = useCallback((v) => setDailyShow(v), []);

  let stage;
  if (tab === 'daily' && dailyShow) {
    stage = dailyShow.mode === 'convo'
      ? { mode: 'convo', scene: { id: dailyShow.setting }, line: { who: dailyShow.who, [lang]: dailyShow.t, hiR: dailyShow.r } }
      : { mode: 'words', word: { t: dailyShow.t, en: dailyShow.mode === 'number' ? '' : dailyShow.en } };
  } else if (tab === 'numbers') stage = { mode: 'words', word: numShow };
  else if (tab === 'convo') stage = { mode: 'convo', scene: sc, line: sc.lines[active] };
  else stage = { mode: tab, letter: curLetter, word: curWord };

  return (
    <div className="app">
      <header className="top">
        <div className="brand">
          <span className="mark" aria-hidden="true">{LANGS[lang].greet.slice(0, 1)}</span>
          <div>
            <h1>Phrasewalk</h1>
            <p>Hindi, French and German from English · one hour a day for 30 days</p>
          </div>
        </div>
        <div className="langs" role="radiogroup" aria-label="Language to learn">
          {Object.entries(LANGS).map(([k, v]) => (
            <button key={k} role="radio" aria-checked={lang === k} className={'lang ' + k + (lang === k ? ' on' : '')} onClick={() => { stop(); setLang(k); }}>
              <span className={k === 'hi' ? 'deva' : ''}>{v.native}</span>
              <small>{v.name}</small>
            </button>
          ))}
        </div>
      </header>

      <nav className="tabs" role="tablist" aria-label="Lesson type">
        {[['daily', 'Daily hour'], ['letters', 'Letters'], ['words', 'Words'], ['numbers', 'Big numbers'], ['convo', 'Conversations']].map(([k, label]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => { stop(); setTab(k); }}>{label}</button>
        ))}
        <span className="spacer" />
        <label className="toggle"><input id="slow" type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} /> Slow speech</label>
        <span className="progress">{daysDone}/30 days done</span>
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
          <div className="stage">
            <Stage lang={lang} accent={ACCENTS[lang]} showSub={showRom} {...stage} />
          </div>
          <div className="caption">
            {tab === 'letters' && (
              <>
                <span className="label">Sounds like</span>
                <p><strong>{curLetter.name}</strong> · {curLetter.tip}</p>
                <button className="chip" onClick={() => say(curLetter.char)}><SpeakIcon /> Hear it</button>
              </>
            )}
            {tab === 'words' && (
              <>
                <span className="label">{curWord.en}</span>
                <p className={lang === 'hi' ? 'deva' : ''}><strong>{curWord.t}</strong></p>
                <button className="chip" onClick={() => say(curWord.t)}><SpeakIcon /> Hear it</button>
              </>
            )}
            {tab === 'numbers' && (
              <>
                <span className="label">Indian, French and German grouping differ</span>
                <p><strong>{numShow.t}</strong></p>
              </>
            )}
            {tab === 'daily' && dailyShow && (
              <>
                <span className="label">{dailyShow.mode === 'convo' ? `${dailyShow.title} · ${dailyShow.role}` : dailyShow.mode === 'number' ? 'Number' : 'Word'}</span>
                <p>{dailyShow.mode === 'number' ? `${dailyShow.en} in English digits` : dailyShow.en}</p>
              </>
            )}
            {tab === 'convo' && (
              <>
                <span className="label">{sc.label} · line {active + 1} of {sc.lines.length}</span>
                <p>{enFor(sc.lines[active], lang)}</p>
              </>
            )}
          </div>
        </div>

        <div className="panel">
          {tab === 'letters' && <Letters lang={lang} current={letter} onPick={(l) => { setLetter(l); say(l.char); }} />}
          {tab === 'words' && <Words lang={lang} say={say} current={word} onPick={setWord} />}
          {tab === 'numbers' && <Numbers lang={lang} say={(t, o = {}) => say(t, o)} onShow={onNumShow} />}
          {tab === 'daily' && <Daily key={lang} lang={lang} speak={speak} stop={stop} onShow={onDailyShow} showRom={showRom} setShowRom={setShowRom} />}
          {tab === 'convo' && (
            <Conversation lang={lang} scene={scene} setScene={setScene} active={active} setActive={setActive}
              say={(t, o) => speak(t, code, { rate, ...o })} stop={stop}
              showEn={showEn} setShowEn={setShowEn} showRom={showRom} setShowRom={setShowRom}
              heard={heard} markHeard={markHeard} rate={rate} />
          )}
        </div>
      </main>
    </div>
  );
}
