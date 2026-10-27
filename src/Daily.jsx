import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { COURSE } from './course.js';
import { WORDS, meaningOf } from './words.js';
import { SCENES, LANGS, enFor } from './data.js';
import { readNumber, formatNum, seeded, pickNumber } from './numbers.js';

export const GOAL = 3600; // one hour, in seconds
const EN = 'en-IN';
const INTERVALS = [1, 2, 4, 7, 14, 21, 28]; // review days back, spaced out

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
};

export const loadProgress = (lang) => store.get(`ll.d60.${lang}`, {});

function estMs(step) {
  if (step.k === 'gap') return step.ms;
  const per = step.code === EN ? 58 : 72;
  return (step.text.length * per) / step.rate + 450;
}

function convoShow(conv, i, lang) {
  const l = conv.lines[i];
  return {
    mode: 'convo', setting: conv.setting || conv.id, who: l.who, t: l[lang], r: lang === 'hi' ? l.hiR : '',
    en: enFor(l, lang), role: conv.roles[l.who === 'a' ? 0 : 1], title: conv.title, n: i + 1, total: conv.lines.length,
  };
}

function maker(lang, o) {
  const code = LANGS[lang].speech;
  const steps = [];
  const say = (text, show, opt = {}) => steps.push({ k: 'say', text, code: opt.code || code, rate: opt.rate || o.rate, pitch: opt.pitch || 1, show });
  const gap = (ms, show) => steps.push({ k: 'gap', ms, show });
  const pitch = (who) => (who === 'a' ? 1.12 : 0.88);
  const shadow = (t) => Math.max(1800, t.length * 85);
  return { steps, say, gap, pitch, shadow, slow: o.rate * 0.72, tr: lang === 'eng' ? 'hi-IN' : EN };
}

function wordRound(m, items, lang, full) {
  for (const w of items) {
    const show = { mode: 'word', t: w[lang].t, r: w[lang].r, en: meaningOf(w, lang) };
    m.say(w[lang].t, show);
    if (full) {
      m.gap(800); m.say(meaningOf(w, lang), show, { code: m.tr }); m.gap(600);
      m.say(w[lang].t, show, { rate: m.slow }); m.gap(m.shadow(w[lang].t) + 600);
    } else {
      m.gap(2200, show); m.say(meaningOf(w, lang), show, { code: m.tr }); m.gap(700);
    }
  }
}

function convoPass(m, conv, lang, withEn) {
  conv.lines.forEach((l, i) => {
    const s = convoShow(conv, i, lang);
    m.say(l[lang], s, { pitch: m.pitch(l.who) });
    if (withEn) { m.gap(450); m.say(enFor(l, lang), s, { code: m.tr }); }
    m.gap(650);
  });
  m.gap(1800);
}

const numberMax = (d) => (d < 3 ? 100 : d < 7 ? 10000 : d < 12 ? 1e6 : d < 20 ? 1e8 : 1e10);

/** The fixed part of a day's session, as named segments. d is 0-based. */
export function buildSegments(d, lang, o) {
  const day = COURSE[d];
  const segs = [];
  const seg = (id, title, desc, fill) => { const m = maker(lang, o); fill(m); segs.push({ id, title, desc, steps: m.steps }); };

  const cats = [...new Set([day.words, COURSE[d - 1]?.words].filter(Boolean))];
  const items = cats.flatMap((c) => WORDS.find((w) => w.cat === c)?.items || []);
  seg('words', `Warm-up words: ${cats.join(' + ')}`, 'Hear each word and its meaning, then repeat it in the pause.', (m) => {
    wordRound(m, items, lang, true);
    wordRound(m, items, lang, false);
  });

  const max = numberMax(d);
  seg('numbers', 'Numbers drill', `Up to ${formatNum(Math.min(max, 1e10), lang)}. Read the digits and try to say them before you hear them.`, (m) => {
    const r = seeded((d + 1) * 7919 + lang.charCodeAt(0));
    for (let i = 0; i < 24; i++) {
      const n = pickNumber(r, i % 4 === 0 ? Math.max(100, max / 100) : max);
      const rd = readNumber(n, lang);
      const eng = lang === 'eng';
      const show = { mode: 'number', t: formatNum(n, lang), words: rd.text, r: rd.r, en: eng ? `${formatNum(n, 'hi')} (Indian grouping)` : formatNum(n, 'en') };
      m.gap(2200, show); m.say(rd.text, show); m.gap(1000);
      m.say(rd.text, show, { rate: m.slow }); m.gap(600);
      m.say(eng ? readNumber(n, 'hi').text : formatNum(n, 'en'), show, { code: m.tr }); m.gap(900);
    }
  });

  seg('listen', `New conversation: ${day.title}`, 'Each line in the language, then in English.', (m) => convoPass(m, day, lang, o.english));

  seg('shadow', 'Repeat after me', 'Each line twice, the second time slowly. Say it aloud in the pauses.', (m) => {
    day.lines.forEach((l, i) => {
      const s = convoShow(day, i, lang);
      m.say(l[lang], s, { pitch: m.pitch(l.who) }); m.gap(m.shadow(l[lang]), s);
      m.say(l[lang], s, { pitch: m.pitch(l.who), rate: m.slow }); m.gap(m.shadow(l[lang]), s);
      if (o.english) m.say(enFor(l, lang), s, { code: m.tr });
      m.gap(700);
    });
  });

  seg('natural', 'Natural listening ×3', 'The whole conversation three times, with no English.', (m) => {
    for (let p = 0; p < 3; p++) convoPass(m, day, lang, false);
  });

  const prev = INTERVALS.map((k) => d - k).filter((i) => i >= 0);
  if (prev.length) {
    seg('review', `Review: day ${prev.map((i) => i + 1).join(', ')}`, 'Earlier conversations, spaced out so they stick.', (m) => {
      for (const i of prev) convoPass(m, COURSE[i], lang, o.english);
    });
  }
  return segs;
}

/** Free listening after the plan: conversations and word rounds, cycling until the hour is up. */
function freeBlock(d, lang, o, b) {
  const m = maker(lang, o);
  const pool = [...COURSE.slice(0, d + 1).reverse(), ...SCENES];
  const kind = b % 3;
  const k = Math.floor(b / 3);
  if (kind === 1) {
    const cats = [...new Set(COURSE.slice(0, d + 1).map((c) => c.words).concat(['Greetings', 'Questions']))];
    const cat = WORDS.find((w) => w.cat === cats[k % cats.length]);
    wordRound(m, cat.items, lang, false);
  } else {
    convoPass(m, pool[k % pool.length], lang, kind === 0 && o.english);
  }
  return m.steps;
}

const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function Daily({ lang, speak, stop, onShow, onWord, showRom, setShowRom }) {
  const [progress, setProgress] = useState(() => loadProgress(lang));
  const firstOpen = () => { const p = loadProgress(lang); const i = COURSE.findIndex((c) => !p[c.day]?.done); return i < 0 ? 0 : i; };
  const [d, setD] = useState(firstOpen);
  const [english, setEnglish] = useState(() => store.get('ll.d60.en', true));
  const [slow, setSlow] = useState(() => store.get('ll.d60.slow', false));
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(null);
  const [idx, setIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [justDone, setJustDone] = useState(false);
  const [showScript, setShowScript] = useState(false);

  const o = useMemo(() => ({ english, rate: slow ? 0.75 : 0.95 }), [english, slow]);
  const plan = useMemo(() => {
    const segs = buildSegments(d, lang, o);
    const flat = []; const starts = [];
    segs.forEach((s) => { starts.push(flat.length); flat.push(...s.steps); s.ms = s.steps.reduce((a, x) => a + estMs(x), 0); });
    return { segs, flat, starts };
  }, [d, lang, o]);
  const free = useRef({ steps: [], blocks: 0 });
  useEffect(() => { free.current = { steps: [], blocks: 0 }; }, [plan]);

  const stepAt = useCallback((i) => {
    if (i < plan.flat.length) return plan.flat[i];
    const f = free.current;
    while (f.steps.length <= i - plan.flat.length) f.steps.push(...freeBlock(d, lang, o, f.blocks++));
    return f.steps[i - plan.flat.length];
  }, [plan, d, lang, o]);

  // refs used by the running loop
  const token = useRef(0);
  const idxRef = useRef(0);
  const elRef = useRef(0);
  const doneRef = useRef(false);
  const waitRes = useRef(null);
  const lock = useRef(null);
  const playingRef = useRef(false);

  const save = useCallback((extra = {}) => {
    const day = COURSE[d].day;
    const p = loadProgress(lang);
    p[day] = { e: Math.floor(elRef.current), i: idxRef.current, done: doneRef.current || !!p[day]?.done, ...extra };
    store.set(`ll.d60.${lang}`, p);
    setProgress(p);
  }, [d, lang]);

  // load a day's saved position
  useEffect(() => {
    const p = loadProgress(lang);
    setProgress(p);
    const s = p[COURSE[d].day] || {};
    idxRef.current = s.i || 0; elRef.current = s.e || 0; doneRef.current = !!s.done;
    setIdx(idxRef.current); setElapsed(elRef.current); setJustDone(false);
    const first = stepAt(idxRef.current);
    const show = first?.show || convoShow(COURSE[d], 0, lang);
    setCur(show); onShow(show);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d, lang]);

  useEffect(() => { store.set('ll.d60.en', english); }, [english]);
  useEffect(() => { store.set('ll.d60.slow', slow); }, [slow]);

  const releaseLock = () => { try { lock.current?.release(); } catch { /* ignore */ } lock.current = null; };
  const takeLock = async () => { try { lock.current = await navigator.wakeLock?.request('screen'); } catch { lock.current = null; } };

  const pause = useCallback(() => {
    token.current++;
    stop();
    waitRes.current?.(); waitRes.current = null;
    playingRef.current = false;
    setPlaying(false);
    releaseLock();
    save();
  }, [stop, save]);

  const sayP = (st) => new Promise((res) => {
    let done = false;
    const fin = () => { if (!done) { done = true; clearTimeout(t); res(); } };
    const t = setTimeout(fin, estMs(st) * 3 + 4000); // safety net if the browser never reports the end
    speak(st.text, st.code, { rate: st.rate, pitch: st.pitch, onEnd: fin, onWord: st.code === LANGS[lang].speech && st.show?.mode !== 'number' ? onWord : undefined });
  });
  const waitP = (ms) => new Promise((res) => { const t = setTimeout(res, ms); waitRes.current = () => { clearTimeout(t); res(); }; });

  const run = useCallback(async (my) => {
    while (token.current === my) {
      const i = idxRef.current;
      const st = stepAt(i);
      if (st.show) { setCur(st.show); onShow(st.show); }
      if (st.k === 'say') await sayP(st); else await waitP(st.ms);
      if (token.current !== my) return;
      idxRef.current = i + 1; setIdx(i + 1);
      if (!doneRef.current && elRef.current >= GOAL) {
        doneRef.current = true; setJustDone(true); save({ done: true });
        pause();
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepAt, onShow, save, pause]);

  const play = () => {
    stop();
    const my = ++token.current;
    playingRef.current = true; setPlaying(true); setJustDone(false);
    takeLock();
    run(my);
  };

  // listening clock
  useEffect(() => {
    if (!playing) return;
    let n = 0;
    const t = setInterval(() => {
      elRef.current += 1; setElapsed(elRef.current);
      if (++n % 10 === 0) save();
    }, 1000);
    const vis = () => { if (document.visibilityState === 'visible' && !lock.current) takeLock(); };
    document.addEventListener('visibilitychange', vis);
    return () => { clearInterval(t); document.removeEventListener('visibilitychange', vis); };
  }, [playing, save]);

  // stop and save (under the old day) when leaving the tab or switching language, day or options
  useEffect(() => () => {
    if (!playingRef.current) return;
    token.current++; stop(); waitRes.current?.(); waitRes.current = null; releaseLock();
    playingRef.current = false; setPlaying(false); save();
  }, [d, lang, o, save, stop]);

  const jump = (i) => {
    const wasPlaying = playing;
    if (wasPlaying) pause();
    idxRef.current = i; setIdx(i); save();
    const st = stepAt(i); if (st?.show) { setCur(st.show); onShow(st.show); }
    if (wasPlaying) setTimeout(play, 50);
  };

  const segIdx = plan.starts.findLastIndex((s) => idx >= s);
  const inFree = idx >= plan.flat.length;
  const planMs = plan.segs.reduce((a, s) => a + s.ms, 0);
  const pct = Math.min(100, (elapsed / GOAL) * 100);
  const day = COURSE[d];
  const doneCount = COURSE.filter((c) => progress[c.day]?.done).length;
  const deva = lang === 'hi' ? ' deva' : '';

  return (
    <div className="stack daily">
      <div className="row between wrap">
        <div>
          <span className="label">30-day plan · {doneCount} of 30 days complete</span>
          <h2 className="dayh">Day {day.day}: {day.title}</h2>
        </div>
      </div>

      <div className="days" role="list" aria-label="Days">
        {COURSE.map((c, i) => {
          const p = progress[c.day];
          const part = p && !p.done ? Math.min(1, (p.e || 0) / GOAL) : 0;
          return (
            <button key={c.id} role="listitem"
              className={'daycell' + (i === d ? ' on' : '') + (p?.done ? ' done' : '')}
              style={part ? { '--part': `${Math.round(part * 100)}%` } : undefined}
              onClick={() => setD(i)} title={`Day ${c.day}: ${c.title}${p ? ` · ${mmss(p.e || 0)} listened` : ''}`}>
              {c.day}
            </button>
          );
        })}
      </div>

      <div className="player">
        <div className="clock">
          <span className="time">{mmss(elapsed)}</span><span className="of"> / 60:00</span>
        </div>
        <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={60} aria-valuenow={Math.floor(elapsed / 60)} aria-label="Minutes listened today">
          <i style={{ width: pct + '%' }} />
        </div>
        <div className="row wrap">
          <button className="primary big" onClick={playing ? pause : play}>{playing ? 'Pause' : elapsed > 0 ? 'Continue' : 'Start the hour'}</button>
          <button className="ghost" onClick={() => jump(idx + 1)} >Skip line</button>
          <button className="ghost" onClick={() => jump(0)}>Restart day</button>
        </div>
        <div className="row wrap">
          <label className="toggle"><input id="d-en" type="checkbox" checked={english} onChange={(e) => setEnglish(e.target.checked)} /> {lang === 'eng' ? 'Hindi meaning after each line' : 'English after each line'}</label>
          <label className="toggle"><input id="d-slow" type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} /> Slower voice</label>
          {lang === 'hi' && <label className="toggle"><input id="d-rom" type="checkbox" checked={showRom} onChange={(e) => setShowRom(e.target.checked)} /> Romanised</label>}
        </div>
        {justDone && <p className="notice good">Day {day.day} complete: a full hour of listening. Come back tomorrow for day {Math.min(30, day.day + 1)}.</p>}
        {progress[day.day]?.done && !justDone && <p className="hint">You finished this day. You can keep listening for extra practice.</p>}
      </div>

      <p className="label">Now: {inFree ? 'Free listening' : plan.segs[segIdx]?.title}</p>

      <ol className="segs">
        {plan.segs.map((s, i) => {
          const state = idx >= (plan.starts[i + 1] ?? plan.flat.length) ? 'done' : i === segIdx && !inFree ? 'cur' : '';
          return (
            <li key={s.id} className={state}>
              <button onClick={() => jump(plan.starts[i])}>
                <span className="st">{s.title}</span>
                <span className="mins">~{Math.max(1, Math.round(s.ms / 60000))} min</span>
                <span className="sd">{s.desc}</span>
              </button>
            </li>
          );
        })}
        <li className={inFree ? 'cur' : ''}>
          <button onClick={() => jump(plan.flat.length)}>
            <span className="st">Free listening until 60:00</span>
            <span className="mins">~{Math.max(0, Math.round((GOAL * 1000 - planMs) / 60000))} min</span>
            <span className="sd">Today's and earlier conversations, plus word rounds, in rotation.</span>
          </button>
        </li>
      </ol>

      <details className="script" open={showScript} onToggle={(e) => setShowScript(e.currentTarget.open)}>
        <summary>Read today's conversation ({day.lines.length} lines)</summary>
        <ol className="dialog">
          {day.lines.map((l, i) => (
            <li key={i} className={`line ${l.who}`}>
              <button onClick={() => speak(l[lang], LANGS[lang].speech, { rate: o.rate, pitch: l.who === 'a' ? 1.12 : 0.88 })}>
                <span className="who">{day.roles[l.who === 'a' ? 0 : 1]}</span>
                <span className={'say' + deva}>{l[lang]}</span>
                {lang === 'hi' && showRom && <span className="rom">{l.hiR}</span>}
                <span className="tr">{enFor(l, lang)}</span>
              </button>
            </li>
          ))}
        </ol>
      </details>

      <p className="hint">
        Keep this page open with the screen on while you listen. The browser stops speaking if the page is hidden or the phone locks.
        {lang === 'hi' && ' Hindi lines use masculine forms for “you” (करता हूँ); a woman would say करती हूँ.'}
      </p>
    </div>
  );
}
