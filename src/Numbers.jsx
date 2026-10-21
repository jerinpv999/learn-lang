import { useEffect, useMemo, useState } from 'react';
import { readNumber, formatNum, LADDER, MAX_NUMBER, HINDI_0_99, pickNumber } from './numbers.js';

const RULES = {
  hi: [
    ['Commas follow the Indian system', 'The first comma comes after three digits from the right, then a comma every two digits: 1,00,000 is one lakh and 1,00,00,000 is one crore.'],
    ['Big units', 'सौ = 100 · हज़ार = 1,000 · लाख = 1,00,000 (100 thousand) · करोड़ = 1,00,00,000 (10 million) · अरब = 100 crore (1 billion).'],
    ['Read the biggest group first', '3,45,67,890 = तीन करोड़ पैंतालीस लाख सड़सठ हज़ार आठ सौ नब्बे. Each group is a number from 1 to 99 followed by its unit.'],
    ['Every number from 1 to 99 has its own word', 'Learn them ten at a time. उन- means “one less than”: उन्नीस (19) is one short of बीस (20), उनतीस (29) one short of तीस (30).'],
    ['Quarter and half words', 'सवा = +¼, साढ़े = +½, पौने = −¼, डेढ़ = 1½, ढाई = 2½. So साढ़े तीन सौ = 350, डेढ़ लाख = 1,50,000, पौने दो = 1¾.'],
    ['Years', '1994 is read in hundreds: उन्नीस सौ चौरानवे. From 2000: दो हज़ार पच्चीस (2025).'],
  ],
  fr: [
    ['Spaces between thousands, a comma for decimals', '1 234 567 is a number, 3,5 is three and a half. A full stop is never used for thousands.'],
    ['70, 80 and 90 are built from other numbers', '70 = soixante-dix (60 + 10), 80 = quatre-vingts (4 × 20), 90 = quatre-vingt-dix (4 × 20 + 10). In Belgium and Switzerland you will hear septante and nonante.'],
    ['“et un” only up to 71', '21 vingt et un, 31 trente et un … 71 soixante et onze. But 81 is quatre-vingt-un and 91 is quatre-vingt-onze.'],
    ['When vingt and cent take an -s', 'Only when multiplied and nothing follows: quatre-vingts, deux cents. But quatre-vingt-trois, deux cent un, and quatre-vingt mille.'],
    ['Mille never changes', 'deux mille, dix mille. And no “un” in front: 1 000 is just mille.'],
    ['Million and milliard are nouns', 'un million, deux millions, un milliard (10⁹). Before a noun add de: un million d’euros.'],
  ],
  de: [
    ['Dots between thousands, a comma for decimals', '1.234.567 is a number, 3,5 is three and a half (drei Komma fünf).'],
    ['Units before tens', '21 = einundzwanzig, literally “one-and-twenty”. Read 47 as “seven-and-forty”: siebenundvierzig.'],
    ['Below a million it is one word', '2.345 = zweitausenddreihundertfünfundvierzig. Break it into tausend · hundert · und to read it.'],
    ['Million and Milliarde are separate words', 'eine Million, zwei Millionen, eine Milliarde (10⁹). Careful: German “Billion” means 10¹², a trillion in English.'],
    ['eins at the end, ein inside', 'hunderteins (101), but einhundert, eintausend, einundzwanzig.'],
    ['Years', 'Before 2000 they are read in hundreds: 1994 = neunzehnhundertvierundneunzig. From 2000: zweitausendfünfundzwanzig.'],
  ],
};

const LEVELS = {
  hi: [[1000, 'Up to 1,000'], [100000, 'Up to 1 lakh'], [10000000, 'Up to 1 crore'], [1000000000, 'Up to 1 arab']],
  fr: [[1000, 'Up to 1 000'], [100000, 'Up to 100 000'], [10000000, 'Up to 10 millions'], [1000000000, 'Up to 1 milliard']],
  de: [[1000, 'Up to 1.000'], [100000, 'Up to 100.000'], [10000000, 'Up to 10 Millionen'], [1000000000, 'Up to 1 Milliarde']],
};

function SpeakIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
      <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function Numbers({ lang, say, onShow }) {
  const [raw, setRaw] = useState('23456789');
  const [asYear, setAsYear] = useState(false);
  const [level, setLevel] = useState(1);
  const [test, setTest] = useState(null);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState({ right: 0, total: 0 });
  const [showGrid, setShowGrid] = useState(false);

  const digits = raw.replace(/[^\d]/g, '');
  const n = digits ? Number(digits) : NaN;
  const valid = Number.isFinite(n) && n <= MAX_NUMBER;
  const canYear = valid && n >= 1100 && n <= 1999;
  const rd = useMemo(() => (valid ? readNumber(n, lang, { year: asYear && canYear }) : null), [n, lang, asYear, canYear, valid]);
  const deva = lang === 'hi' ? ' deva' : '';

  useEffect(() => {
    if (valid) onShow({ t: formatNum(n, lang), en: '' });
  }, [n, lang, valid, onShow]);

  const rand = () => Math.random;
  const newTest = () => {
    const max = LEVELS[lang][level][0];
    const v = pickNumber(rand(), max);
    setTest({ n: v, result: null });
    setGuess('');
    say(readNumber(v, lang).text);
  };
  const check = (e) => {
    e.preventDefault();
    if (!test || test.result) return;
    const g = Number(guess.replace(/[^\d]/g, ''));
    const ok = g === test.n;
    setTest({ ...test, result: ok ? 'right' : 'wrong' });
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1 }));
  };

  return (
    <div className="stack">
      <section className="numreader">
        <label className="label" htmlFor="num-in">Type any number</label>
        <div className="row wrap">
          <input id="num-in" className="numinput" inputMode="numeric" autoComplete="off" value={raw}
            onChange={(e) => setRaw(e.target.value.slice(0, 20))} placeholder="e.g. 4500000" />
          {LEVELS[lang].map(([max, label]) => (
            <button key={max} className="ghost" onClick={() => setRaw(String(pickNumber(Math.random, max)))}>{label.replace('Up to', 'Random ≤')}</button>
          ))}
        </div>
        {!valid && digits && <p className="err">Numbers up to {formatNum(MAX_NUMBER, lang)} only.</p>}
        {rd && (
          <div className="numout">
            <div className="numbig">{formatNum(n, lang)}</div>
            <p className={'numwords' + deva}>{rd.text}</p>
            {lang === 'hi' && <p className="rom">{rd.r}</p>}
            <div className="row wrap">
              <button className="primary" onClick={() => say(rd.text)}><SpeakIcon /> Hear it</button>
              <button className="chip" onClick={() => say(rd.text, { rate: 0.6 })}>Slowly</button>
              {canYear && (
                <label className="toggle"><input id="as-year" type="checkbox" checked={asYear} onChange={(e) => setAsYear(e.target.checked)} /> Read as a year</label>
              )}
            </div>
            {rd.parts.length > 1 && (
              <ol className="parts" aria-label="How it breaks down">
                {rd.parts.map((p, i) => (
                  <li key={i}>
                    <span className="pv">{formatNum(p.value, lang)}</span>
                    <span className={'pw' + deva}>{p.t}</span>
                    {p.r && <span className="pr">{p.r}</span>}
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </section>

      <section>
        <h3 className="label">Place values</h3>
        <div className="tablewrap">
          <table className="ladder">
            <thead><tr><th>Digits</th><th>Say it</th><th>English</th></tr></thead>
            <tbody>
              {LADDER.map((row) => {
                const w = readNumber(row.n, lang);
                return (
                  <tr key={row.n} onClick={() => { setRaw(String(row.n)); say(w.text); }} tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') { setRaw(String(row.n)); say(w.text); } }}>
                    <td className="num">{formatNum(row.n, lang)}</td>
                    <td className={deva.trim()}>{w.text}{lang === 'hi' && <small className="rom"> {w.r}</small>}</td>
                    <td className="muted">{row.en}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="label">How to read big numbers</h3>
        <dl className="rules">
          {RULES[lang].map(([h, b]) => (<div key={h}><dt>{h}</dt><dd className={deva.trim()}>{b}</dd></div>))}
        </dl>
        {lang === 'hi' && (
          <>
            <button className="ghost" onClick={() => setShowGrid((v) => !v)}>{showGrid ? 'Hide' : 'Show'} all numbers 0–99</button>
            {showGrid && (
              <div className="grid99">
                {HINDI_0_99.map((x) => (
                  <button key={x.n} onClick={() => say(x.t)} title={x.r}><b>{x.n}</b><span className="deva">{x.t}</span><small>{x.r}</small></button>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <section className="listen">
        <div className="row between wrap">
          <h3 className="label">Listening test · {score.right}/{score.total}</h3>
          <div className="seg">
            {LEVELS[lang].map(([, label], i) => (
              <button key={i} className={level === i ? 'on' : ''} onClick={() => setLevel(i)}>{label}</button>
            ))}
          </div>
        </div>
        <p className="hint">Hear a number, then type it in digits.</p>
        <form className="row wrap" onSubmit={check}>
          <button type="button" className="primary" onClick={newTest}>{test ? 'Next number' : 'Play a number'}</button>
          {test && <button type="button" className="chip" onClick={() => say(readNumber(test.n, lang).text)}><SpeakIcon /> Again</button>}
          {test && <input id="num-guess" className="numinput" inputMode="numeric" autoComplete="off" value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Type the digits" />}
          {test && <button type="submit" className="ghost">Check</button>}
        </form>
        {test?.result && (
          <p className={'verdict ' + test.result}>
            {test.result === 'right' ? 'Correct: ' : 'It was '}<strong>{formatNum(test.n, lang)}</strong>
            {' · '}<span className={deva.trim()}>{readNumber(test.n, lang).text}</span>
          </p>
        )}
      </section>
    </div>
  );
}
