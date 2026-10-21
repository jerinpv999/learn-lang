// Turns digits into words: Hindi (Indian lakh/crore system), French and German.
export const MAX_NUMBER = 999999999999; // just under one trillion (99 kharab / 999 milliards)

const HI = 'शून्य एक दो तीन चार पाँच छह सात आठ नौ दस ग्यारह बारह तेरह चौदह पंद्रह सोलह सत्रह अठारह उन्नीस बीस इक्कीस बाईस तेईस चौबीस पच्चीस छब्बीस सत्ताईस अट्ठाईस उनतीस तीस इकतीस बत्तीस तैंतीस चौंतीस पैंतीस छत्तीस सैंतीस अड़तीस उनतालीस चालीस इकतालीस बयालीस तैंतालीस चवालीस पैंतालीस छियालीस सैंतालीस अड़तालीस उनचास पचास इक्यावन बावन तिरपन चौवन पचपन छप्पन सत्तावन अट्ठावन उनसठ साठ इकसठ बासठ तिरसठ चौंसठ पैंसठ छियासठ सड़सठ अड़सठ उनहत्तर सत्तर इकहत्तर बहत्तर तिहत्तर चौहत्तर पचहत्तर छिहत्तर सतहत्तर अठहत्तर उन्यासी अस्सी इक्यासी बयासी तिरासी चौरासी पचासी छियासी सत्तासी अट्ठासी नवासी नब्बे इक्यानवे बानवे तिरानवे चौरानवे पचानवे छियानवे सत्तानवे अट्ठानवे निन्यानवे'.split(' ');
const HIR = 'shoonya ek do teen chaar paanch chhah saat aaṭh nau das gyaarah baarah terah chaudah pandrah solah satrah aṭhaarah unnees bees ikkees baaees teees chaubees pachchees chhabbees sattaaees aṭṭhaaees untees tees iktees battees taintees chauntees paintees chhattees saintees aḍtees untaalees chaalees iktaalees bayaalees taintaalees chavaalees paintaalees chhiyaalees saintaalees aḍtaalees unchaas pachaas ikyaavan baavan tirpan chauvan pachpan chhappan sattaavan aṭṭhaavan unsaṭh saaṭh iksaṭh baasaṭh tirsaṭh chaunsaṭh painsaṭh chhiyaasaṭh saḍsaṭh aḍsaṭh unhattar sattar ikhattar bahattar tihattar chauhattar pachhattar chhihattar sathattar aṭhhattar unyaasi assi ikyaasi bayaasi tiraasi chauraasi pachaasi chhiyaasi sattaasi aṭṭhaasi navaasi nabbe ikyaanave baanave tiraanave chauraanave pachaanave chhiyaanave sattaanave aṭṭhaanave ninyaanave'.split(' ');
export const HINDI_0_99 = HI.map((w, i) => ({ n: i, t: w, r: HIR[i] }));

const HI_UNITS = [
  [1e11, 'खरब', 'kharab'], [1e9, 'अरब', 'arab'], [1e7, 'करोड़', 'karoḍ'],
  [1e5, 'लाख', 'laakh'], [1e3, 'हज़ार', 'hazaar'], [100, 'सौ', 'sau'],
];

function hindi(n, year) {
  if (n === 0) return { parts: [{ value: 0, t: HI[0], r: HIR[0] }] };
  const parts = [];
  let rem = n;
  if (year && n >= 1100 && n <= 1999) {
    const h = Math.floor(n / 100);
    parts.push({ value: h * 100, t: `${HI[h]} सौ`, r: `${HIR[h]} sau` });
    rem = n % 100;
  } else {
    for (const [v, w, r] of HI_UNITS) {
      const q = Math.floor(rem / v);
      if (q > 0) { parts.push({ value: q * v, t: `${HI[q]} ${w}`, r: `${HIR[q]} ${r}` }); rem %= v; }
    }
  }
  if (rem > 0) parts.push({ value: rem, t: HI[rem], r: HIR[rem] });
  return { parts };
}

/* ---------- French ---------- */
const FU = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize'];
const FT = { 2: 'vingt', 3: 'trente', 4: 'quarante', 5: 'cinquante', 6: 'soixante' };
function fr99(n, final = true) {
  if (n < 17) return FU[n];
  if (n < 20) return 'dix-' + FU[n - 10];
  if (n < 70) { const t = Math.floor(n / 10), u = n % 10; return FT[t] + (u === 0 ? '' : u === 1 ? ' et un' : '-' + FU[u]); }
  if (n < 80) { const r = n - 60; return 'soixante' + (r === 11 ? ' et onze' : '-' + fr99(r)); }
  const r = n - 80;
  if (r === 0) return final ? 'quatre-vingts' : 'quatre-vingt';
  return 'quatre-vingt-' + fr99(r);
}
function fr999(n, final = true) {
  const h = Math.floor(n / 100), r = n % 100;
  if (h === 0) return fr99(r, final);
  const head = h === 1 ? 'cent' : FU[h] + ' cent' + (r === 0 && final ? 's' : '');
  return r ? head + ' ' + fr99(r, final) : head;
}
function french(n) {
  if (n === 0) return { parts: [{ value: 0, t: 'zéro' }] };
  const parts = [];
  const bil = Math.floor(n / 1e9), mil = Math.floor((n % 1e9) / 1e6), th = Math.floor((n % 1e6) / 1e3), r = n % 1000;
  if (bil) parts.push({ value: bil * 1e9, t: `${fr999(bil)} milliard${bil > 1 ? 's' : ''}` });
  if (mil) parts.push({ value: mil * 1e6, t: `${fr999(mil)} million${mil > 1 ? 's' : ''}` });
  if (th) parts.push({ value: th * 1e3, t: th === 1 ? 'mille' : `${fr999(th, false)} mille` });
  if (r) parts.push({ value: r, t: fr999(r) });
  return { parts };
}

/* ---------- German ---------- */
const GU = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
const GT = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
function de99(n) {
  if (n < 20) return GU[n];
  const t = Math.floor(n / 10), u = n % 10;
  return (u ? (u === 1 ? 'ein' : GU[u]) + 'und' : '') + GT[t];
}
function de999(n) {
  const h = Math.floor(n / 100), r = n % 100;
  return (h ? (h === 1 ? 'ein' : GU[h]) + 'hundert' : '') + (r ? de99(r) : '');
}
const ein = (s) => s.replace(/eins$/, 'ein');
function german(n, year) {
  if (n === 0) return { parts: [{ value: 0, t: 'null' }], joinTight: false };
  if (year && n >= 1100 && n <= 1999) {
    const h = Math.floor(n / 100), r = n % 100;
    const parts = [{ value: h * 100, t: de99(h) + 'hundert' }];
    if (r) parts.push({ value: r, t: de99(r) });
    return { parts, tightFrom: 0 };
  }
  const parts = [];
  const bil = Math.floor(n / 1e9), mil = Math.floor((n % 1e9) / 1e6), th = Math.floor((n % 1e6) / 1e3), r = n % 1000;
  if (bil) parts.push({ value: bil * 1e9, t: bil === 1 ? 'eine Milliarde' : `${ein(de999(bil))} Milliarden` });
  if (mil) parts.push({ value: mil * 1e6, t: mil === 1 ? 'eine Million' : `${ein(de999(mil))} Millionen` });
  const tightFrom = parts.length; // everything under a million is written as one word
  if (th) parts.push({ value: th * 1e3, t: ein(de999(th)) + 'tausend' });
  if (r) parts.push({ value: r, t: de999(r) });
  return { parts, tightFrom };
}

/** Read a whole number aloud. Returns { text, r (Hindi romanised), parts }. */
export function readNumber(n, lang, { year = false } = {}) {
  if (lang === 'hi') {
    const { parts } = hindi(n, year);
    return { text: parts.map((p) => p.t).join(' '), r: parts.map((p) => p.r).join(' '), parts };
  }
  if (lang === 'fr') {
    const { parts } = french(n);
    return { text: parts.map((p) => p.t).join(' '), r: '', parts };
  }
  const { parts, tightFrom = parts.length } = german(n, year);
  const loose = parts.slice(0, tightFrom).map((p) => p.t);
  const tight = parts.slice(tightFrom).map((p) => p.t).join('');
  return { text: [...loose, tight].filter(Boolean).join(' '), r: '', parts };
}

/** Digits grouped the local way: 12,34,567 · 1 234 567 · 1.234.567 */
export function formatNum(n, lang) {
  const loc = { hi: 'en-IN', fr: 'fr-FR', de: 'de-DE', en: 'en-US' }[lang] || 'en-US';
  try { return n.toLocaleString(loc).replace(/ | /g, ' '); } catch { return String(n); }
}

/** Place-value ladder for the lesson table. */
export const LADDER = [
  { n: 100, en: 'hundred' }, { n: 1000, en: 'thousand' }, { n: 10000, en: 'ten thousand' },
  { n: 100000, en: 'hundred thousand' }, { n: 1000000, en: 'million' }, { n: 10000000, en: 'ten million' },
  { n: 100000000, en: 'hundred million' }, { n: 1000000000, en: 'billion' }, { n: 100000000000, en: 'hundred billion' },
];

/** Deterministic random number generator, so a day's drill is the same every time. */
export function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A realistic number below max: sometimes exact, often rounded like a price or salary. */
export function pickNumber(rand, max) {
  const digits = Math.max(1, Math.floor(Math.log10(max)));
  const len = 1 + Math.floor(rand() * digits);
  let n = Math.floor(Math.pow(10, len - 1) + rand() * (Math.pow(10, len) - Math.pow(10, len - 1)));
  if (len > 3 && rand() < 0.6) {
    const keep = 2 + Math.floor(rand() * 2);
    const f = Math.pow(10, Math.max(0, len - keep));
    n = Math.round(n / f) * f;
  }
  return Math.min(n, max);
}
