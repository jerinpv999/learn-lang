import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LEVELS, LESSONS, findLesson, ALL_LESSON_IDS } from './curriculum.js';
import { WORDS, meaningOf } from './words.js';
import { enFor } from './data.js';
import { splitWords } from './Display.jsx';

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
};
export const loadCourse = (lang) => store.get(`ll.course.${lang}`, {});

function shuffle(a) { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

export function lineFocus(lesson, i, lang) {
  const l = lesson.lines[i];
  return {
    kind: 'line', t: l[lang], r: lang === 'hi' ? l.hiR : '', en: enFor(l, lang), who: l.who,
    role: lesson.roles[l.who === 'a' ? 0 : 1], label: `${lesson.title} · line ${i + 1} of ${lesson.lines.length}`,
  };
}
const pitch = (who) => (who === 'a' ? 1.12 : 0.88);

/* ---------- course map ---------- */
function CourseMap({ lang, progress, onOpen }) {
  const [lv, setLv] = useState(() => store.get('ll.level', 0));
  useEffect(() => store.set('ll.level', lv), [lv]);
  const level = LEVELS[lv];
  const next = ALL_LESSON_IDS.find((id) => !progress[id]?.done);
  const nextInfo = next && findLesson(next);

  return (
    <div className="stack">
      {nextInfo && (
        <button className="continue" onClick={() => onOpen(next)}>
          <span className="label">Continue · {nextInfo.level.name} · {nextInfo.unit.title}</span>
          <strong>{nextInfo.lesson.title}</strong>
          <span className="go">Start lesson →</span>
        </button>
      )}

      <div className="levels" role="tablist" aria-label="Level">
        {LEVELS.map((l, i) => {
          const ids = l.units.flatMap((u) => u.lessons);
          const done = ids.filter((id) => progress[id]?.done).length;
          return (
            <button key={l.id} role="tab" aria-selected={lv === i} className={'level' + (lv === i ? ' on' : '')} onClick={() => setLv(i)}>
              <span className="lv-name">{l.name}</span>
              <span className="lv-cefr">{l.cefr}</span>
              <span className="lv-bar"><i style={{ width: `${(done / ids.length) * 100}%` }} /></span>
              <span className="lv-count">{done}/{ids.length} lessons</span>
            </button>
          );
        })}
      </div>
      <p className="hint">{level.blurb}</p>

      {level.units.map((u) => {
        const unitNo = Number(u.id.slice(1));
        return (
          <section key={u.id} className="unit">
            <h3 className="unit-h"><span className="unit-no">Unit {unitNo}</span> {u.title}</h3>
            <p className="unit-g">Grammar: {u.grammar[lang].title}</p>
            <ol className="lessons">
              {u.lessons.map((id, i) => {
                const les = LESSONS[id];
                const p = progress[id];
                return (
                  <li key={id}>
                    <button className={'lesson' + (p?.done ? ' done' : '') + (id === next ? ' next' : '')} onClick={() => onOpen(id)}>
                      <span className="l-no">{unitNo}.{i + 1}</span>
                      <span className="l-title">{les.title}</span>
                      <span className="l-meta">{les.lines.length} lines · {les.words}</span>
                      <span className="l-state">{p?.done ? `✓ ${p.best ?? ''}${p.best != null ? '%' : ''}` : id === next ? 'Next' : ''}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}

/* ---------- practice ---------- */
function makeExercises(lesson, lang) {
  const all = lesson.lines.map((l, i) => ({ l, i }));
  const buildable = shuffle(all.filter(({ l }) => { const n = splitWords(l[lang]).length; return n >= 3 && n <= 14; })).slice(0, 3);
  const meaning = shuffle(all.filter((x) => !buildable.includes(x))).slice(0, 6 - buildable.length);
  const pick = [];
  for (let k = 0; k < 6; k++) { const src = k % 2 === 0 ? buildable : meaning; const x = src.shift() || buildable.shift() || meaning.shift(); if (x) pick.push(x); }
  return pick.map(({ l, i }, k) => {
    if (k % 2 === 0 && splitWords(l[lang]).length <= 14) {
      const words = splitWords(l[lang]);
      return { type: 'build', i, words, tiles: shuffle(words.map((w, j) => ({ w, j }))) };
    }
    const others = shuffle(lesson.lines.filter((x) => x !== l)).slice(0, 3).map((x) => enFor(x, lang));
    return { type: 'meaning', i, answer: enFor(l, lang), options: shuffle([enFor(l, lang), ...others]) };
  });
}

function Practice({ lesson, lang, sayFocus, onFinish }) {
  const [ex] = useState(() => makeExercises(lesson, lang));
  const [k, setK] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [picked, setPicked] = useState(null);
  const [result, setResult] = useState(null);
  const [right, setRight] = useState(0);
  const cur = ex[k];
  const deva = lang === 'hi' ? ' deva' : '';

  useEffect(() => { setPlaced([]); setPicked(null); setResult(null); }, [k]);
  useEffect(() => { if (cur?.type === 'meaning') sayFocus({ ...lineFocus(lesson, cur.i, lang), en: '' }); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [k]);

  if (!cur) {
    const pct = Math.round((right / ex.length) * 100);
    return (
      <div className="done-card">
        <span className="label">Practice complete</span>
        <p className="score">{right} of {ex.length} correct · {pct}%</p>
        <button className="primary" onClick={() => onFinish(pct)}>Finish lesson</button>
      </div>
    );
  }

  const check = (ok) => {
    setResult(ok ? 'right' : 'wrong');
    if (ok) setRight((r) => r + 1);
    sayFocus(lineFocus(lesson, cur.i, lang));
  };

  return (
    <div className="stack practice">
      <span className="label">Exercise {k + 1} of {ex.length} · {right} correct</span>
      {cur.type === 'build' ? (
        <>
          <p className="ex-q">Build the sentence: <strong>{enFor(lesson.lines[cur.i], lang)}</strong></p>
          <div className={'answer-row' + deva} aria-label="Your sentence">
            {placed.length === 0 && <span className="muted">Tap the words below in order.</span>}
            {placed.map((t, n) => (
              <button key={n} className="tile placed" disabled={!!result} onClick={() => setPlaced(placed.filter((_, m) => m !== n))}>{t.w}</button>
            ))}
          </div>
          <div className={'tiles' + deva}>
            {cur.tiles.map((t) => {
              const used = placed.some((p) => p.j === t.j);
              return <button key={t.j} className="tile" disabled={used || !!result} onClick={() => setPlaced([...placed, t])}>{t.w}</button>;
            })}
          </div>
          {!result && <button className="primary" disabled={placed.length !== cur.words.length} onClick={() => check(placed.map((p) => p.w).join(' ') === cur.words.join(' '))}>Check</button>}
        </>
      ) : (
        <>
          <p className="ex-q">What does this mean? Listen, then choose.</p>
          <p className={'ex-line' + deva}>{lesson.lines[cur.i][lang]}</p>
          <div className="quiz-opts">
            {cur.options.map((o) => (
              <button key={o} className={'opt ' + (picked ? (o === cur.answer ? 'right' : o === picked ? 'wrong' : '') : '')}
                onClick={() => { if (picked) return; setPicked(o); check(o === cur.answer); }}>{o}</button>
            ))}
          </div>
        </>
      )}
      {result && (
        <div className="quiz-foot">
          <span className={'verdict ' + result}>{result === 'right' ? 'Correct.' : 'Not quite.'} <span className={deva.trim()}>{lesson.lines[cur.i][lang]}</span></span>
          <button className="primary" onClick={() => setK(k + 1)}>{k + 1 < ex.length ? 'Next' : 'See score'}</button>
        </div>
      )}
    </div>
  );
}

/* ---------- lesson ---------- */
const STEPS = [['grammar', 'Grammar'], ['words', 'Key words'], ['listen', 'Listen'], ['study', 'Line by line'], ['practice', 'Practice']];

function Lesson({ id, lang, progress, sayFocus, wordByWord, setFocus, stop, showRom, setShowRom, onBack, onDone, onOpen }) {
  const info = findLesson(id);
  const { lesson, unit, level, index } = info;
  const [step, setStep] = useState(0);
  const [showEn, setShowEn] = useState(true);
  const [active, setActive] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [studyI, setStudyI] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [practiceKey, setPracticeKey] = useState(0);
  const run = useRef(0);
  const deva = lang === 'hi' ? ' deva' : '';
  const words = useMemo(() => WORDS.find((w) => w.cat === lesson.words)?.items || [], [lesson.words]);
  const g = unit.grammar[lang];
  const pos = ALL_LESSON_IDS.indexOf(id);
  const nextId = ALL_LESSON_IDS[pos + 1];

  const halt = useCallback(() => { run.current++; setPlaying(false); stop(); }, [stop]);
  useEffect(() => () => { run.current++; }, []);
  useEffect(() => { halt(); setActive(-1); setShowMeaning(false); }, [step, halt]);
  useEffect(() => {
    if (STEPS[step][0] === 'study') { setFocus(lineFocus(lesson, studyI, lang)); }
    else if (STEPS[step][0] === 'grammar') setFocus({ kind: 'word', t: unit.title, en: g.title, label: `${level.name} · Unit ${unit.id.slice(1)}` });
    else if (STEPS[step][0] === 'listen' || STEPS[step][0] === 'practice') setFocus(lineFocus(lesson, 0, lang));
    else if (words[0]) setFocus({ kind: 'word', t: words[0][lang].t, r: words[0][lang].r, en: meaningOf(words[0], lang), label: lesson.words });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, studyI, lang]);

  const playLine = (i, opts = {}) => { setActive(i); return sayFocus(lineFocus(lesson, i, lang), { pitch: pitch(lesson.lines[i].who), ...opts }); };
  const playAll = async () => {
    if (playing) { halt(); return; }
    const my = ++run.current; setPlaying(true);
    for (let i = 0; i < lesson.lines.length; i++) {
      await playLine(i);
      if (run.current !== my) return;
      await new Promise((r) => setTimeout(r, 450));
      if (run.current !== my) return;
    }
    setPlaying(false);
  };
  const playWords = async () => {
    if (playing) { halt(); return; }
    const my = ++run.current; setPlaying(true);
    for (const w of words) {
      await sayFocus({ kind: 'word', t: w[lang].t, r: w[lang].r, en: meaningOf(w, lang), label: lesson.words });
      if (run.current !== my) return;
      await new Promise((r) => setTimeout(r, 1400));
      if (run.current !== my) return;
    }
    setPlaying(false);
  };

  return (
    <div className="stack lessonview">
      <div className="row between wrap">
        <button className="ghost" onClick={() => { halt(); onBack(); }}>← All lessons</button>
        <span className="label">{level.name} {level.cefr} · Unit {unit.id.slice(1)} · Lesson {index + 1} of {unit.lessons.length}</span>
      </div>
      <h2 className="lesson-h">{lesson.title}</h2>

      <ol className="steps" aria-label="Lesson steps">
        {STEPS.map(([sid, label], i) => (
          <li key={sid}><button className={(step === i ? 'on' : '') + (i < step ? ' past' : '')} onClick={() => setStep(i)}><span>{i + 1}</span> {label}</button></li>
        ))}
      </ol>

      {STEPS[step][0] === 'grammar' && (
        <section className="grammar">
          <h3>{g.title}</h3>
          <ul>{g.points.map((p) => <li key={p} className={deva.trim()}>{p}</li>)}</ul>
          <p className="hint">This unit’s grammar appears in every lesson of “{unit.title}”. Listen for it in the conversation.</p>
          <button className="primary" onClick={() => setStep(1)}>Next: key words →</button>
        </section>
      )}

      {STEPS[step][0] === 'words' && (
        <section className="stack">
          <div className="row between wrap">
            <span className="label">{lesson.words} · {words.length} words</span>
            <button className="primary" onClick={playWords}>{playing ? 'Stop' : 'Play all words'}</button>
          </div>
          <ul className="words">
            {words.map((w) => (
              <li key={w.en}>
                <button className="word" onClick={() => { halt(); sayFocus({ kind: 'word', t: w[lang].t, r: w[lang].r, en: meaningOf(w, lang), label: lesson.words }); }}>
                  <span className="en">{meaningOf(w, lang)}</span>
                  <span className={'tgt' + deva}>{w[lang].t}</span>
                  <span className="pr">{w[lang].r}</span>
                </button>
              </li>
            ))}
          </ul>
          <button className="primary" onClick={() => setStep(2)}>Next: listen →</button>
        </section>
      )}

      {STEPS[step][0] === 'listen' && (
        <section className="stack">
          <div className="row between wrap">
            <div className="roles"><span className="dot a" />{lesson.roles[0]}<span className="dot b" />{lesson.roles[1]}</div>
            <div className="row wrap">
              <label className="toggle"><input id="l-en" type="checkbox" checked={showEn} onChange={(e) => setShowEn(e.target.checked)} /> {lang === 'eng' ? 'Hindi meaning' : 'English'}</label>
              {lang === 'hi' && <label className="toggle"><input id="l-rom" type="checkbox" checked={showRom} onChange={(e) => setShowRom(e.target.checked)} /> Romanised</label>}
              <button className="primary" onClick={playAll}>{playing ? 'Stop' : 'Play conversation'}</button>
            </div>
          </div>
          <ol className="dialog">
            {lesson.lines.map((l, i) => (
              <li key={i} className={`line ${l.who}` + (active === i ? ' on' : '')}>
                <button onClick={() => { halt(); playLine(i); }}>
                  <span className="who">{lesson.roles[l.who === 'a' ? 0 : 1]}</span>
                  <span className={'say' + deva}>{l[lang]}</span>
                  {lang === 'hi' && showRom && <span className="rom">{l.hiR}</span>}
                  {showEn && <span className="tr">{enFor(l, lang)}</span>}
                </button>
              </li>
            ))}
          </ol>
          <p className="hint">{lang === 'eng' ? 'First listen with the Hindi meaning, then switch it off and listen again. Repeat each line aloud.' : 'First listen with English, then switch English off and listen again.'}</p>
          <button className="primary" onClick={() => setStep(3)}>Next: line by line →</button>
        </section>
      )}

      {STEPS[step][0] === 'study' && (
        <section className="stack study">
          <span className="label">Line {studyI + 1} of {lesson.lines.length}</span>
          <p className="hint">Study each line in the big panel: listen, go word by word, tap any word to hear it, say it aloud, then check the meaning.</p>
          <div className="row wrap">
            <button className="primary" onClick={() => playLine(studyI)}>Listen</button>
            <button className="ghost" onClick={() => playLine(studyI, { rate: 0.6 })}>Slowly</button>
            <button className="ghost" onClick={() => wordByWord(lineFocus(lesson, studyI, lang))}>Word by word</button>
            <button className="ghost" onClick={() => setShowMeaning((v) => !v)}>{showMeaning ? 'Hide' : 'Show'} meaning</button>
          </div>
          {showMeaning && <p className="meaning">{enFor(lesson.lines[studyI], lang)}</p>}
          <div className="row between">
            <button className="ghost" disabled={studyI === 0} onClick={() => { setShowMeaning(false); setStudyI(studyI - 1); }}>← Previous</button>
            {studyI + 1 < lesson.lines.length
              ? <button className="primary" onClick={() => { setShowMeaning(false); setStudyI(studyI + 1); }}>Next line →</button>
              : <button className="primary" onClick={() => setStep(4)}>Next: practice →</button>}
          </div>
        </section>
      )}

      {STEPS[step][0] === 'practice' && (
        <Practice key={practiceKey} lesson={lesson} lang={lang} sayFocus={sayFocus}
          onFinish={(pct) => {
            onDone(id, pct);
            if (nextId) onOpen(nextId); else onBack();
            setPracticeKey((x) => x + 1);
          }} />
      )}

      {progress[id]?.done && <p className="hint">You completed this lesson{progress[id].best != null ? ` with ${progress[id].best}%` : ''}. Repeat it any time.</p>}
      {lang === 'hi' && <p className="hint">Hindi lines use masculine forms for the learner (करता हूँ); a woman would say करती हूँ.</p>}
    </div>
  );
}

export default function Course({ lang, sayFocus, wordByWord, setFocus, stop, showRom, setShowRom }) {
  const [progress, setProgress] = useState(() => loadCourse(lang));
  const [open, setOpen] = useState(() => store.get('ll.lesson', null));
  useEffect(() => setProgress(loadCourse(lang)), [lang]);
  useEffect(() => store.set('ll.lesson', open), [open]);
  useEffect(() => {
    if (!open) setFocus({ kind: 'word', t: { hi: 'नमस्ते', fr: 'Bonjour', de: 'Hallo', eng: 'Hello' }[lang], en: lang === 'eng' ? 'एक पाठ चुनिए और शुरू कीजिए · Choose a lesson to begin' : 'Choose a lesson to begin', label: 'Course' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lang]);

  const onDone = (id, pct) => {
    const p = loadCourse(lang);
    p[id] = { done: true, best: Math.max(pct, p[id]?.best ?? 0) };
    store.set(`ll.course.${lang}`, p);
    setProgress(p);
  };

  if (open && LESSONS[open]) {
    return <Lesson key={open + lang} id={open} lang={lang} progress={progress} sayFocus={sayFocus} wordByWord={wordByWord}
      setFocus={setFocus} stop={stop} showRom={showRom} setShowRom={setShowRom}
      onBack={() => setOpen(null)} onDone={onDone} onOpen={setOpen} />;
  }
  return <CourseMap lang={lang} progress={progress} onOpen={setOpen} />;
}
