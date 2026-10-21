// The big reading panel: shows the current letter, word, number or sentence,
// and lights up a sentence word by word as it is spoken.
export const splitWords = (t) => (t || '').split(/\s+/).filter(Boolean);
export const bareWord = (w) => w.replace(/^[«“"'(¿¡]+|[.,!?;:…»”"')।]+$/g, '');

function SpeakIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
      <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function Display({ focus, wordIdx, lang, reveal, setReveal, showRom, onSay, onWordByWord, onWord }) {
  const deva = lang === 'hi' ? ' deva' : '';
  if (!focus) return <div className="display empty"><p>Choose something to learn.</p></div>;
  const words = splitWords(focus.t);
  const rom = splitWords(focus.r);
  const romAligned = rom.length === words.length;
  const isLine = focus.kind === 'line';
  const size = focus.kind === 'letter' ? 'xl' : focus.kind === 'word' ? (focus.t.length > 14 ? 'l' : 'xl') : focus.kind === 'number' ? 'l' : words.length > 12 ? 's' : 'm';
  const state = (i) => (wordIdx < 0 ? '' : i < wordIdx ? ' past' : i === wordIdx ? ' now' : reveal ? ' hidden' : ' future');

  return (
    <div className={'display k-' + focus.kind + (focus.who ? ' who-' + focus.who : '')}>
      <div className="d-head">
        <span className="label">{focus.label}</span>
        {focus.role && <span className={'role ' + focus.who}>{focus.role}</span>}
      </div>

      <div className={'d-main size-' + size + deva} lang={lang}>
        {isLine || focus.kind === 'word'
          ? words.map((w, i) => (
            <button key={i} className={'w' + state(i)} onClick={() => onWord(bareWord(w))} title="Hear this word">{w}</button>
          ))
          : <span className="whole">{focus.t}</span>}
      </div>

      {focus.words && <p className={'d-words' + deva}>{focus.words}</p>}
      {lang === 'hi' && showRom && focus.r && (
        <p className="d-rom">
          {romAligned ? rom.map((w, i) => <span key={i} className={'rw' + state(i)}>{w} </span>) : focus.r}
        </p>
      )}
      {focus.en && <p className="d-en">{focus.en}</p>}
      {focus.tip && <p className="d-tip">{focus.tip}</p>}

      <div className="d-actions">
        <button className="primary" onClick={onSay}><SpeakIcon /> Listen</button>
        {isLine && <button className="ghost" onClick={onWordByWord}>Word by word</button>}
        {isLine && (
          <label className="toggle"><input id="reveal" type="checkbox" checked={reveal} onChange={(e) => setReveal(e.target.checked)} /> Reveal as spoken</label>
        )}
      </div>
    </div>
  );
}
