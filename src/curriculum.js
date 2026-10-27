// Course structure: levels → units → lessons. Each unit teaches one grammar point per language.
import { SCENES } from './data.js';
import { COURSE } from './course.js';
import { ADVANCED } from './advanced.js';

const SCENE_WORDS = {
  shop: 'Money & shopping', small: 'Greetings', bus: 'Transport', train: 'Transport',
  restaurant: 'Food & drink', family: 'Family', office: 'Work', friends: 'Time',
};

export const LESSONS = Object.fromEntries([
  ...SCENES.map((s) => [s.id, { ...s, setting: s.id, words: SCENE_WORDS[s.id] }]),
  ...COURSE,
  ...ADVANCED,
].map((x) => (Array.isArray(x) ? x : [x.id, x])));

const U = (id, title, lessons, grammar) => ({ id, title, lessons, grammar });

export const LEVELS = [
  {
    id: 'beginner', name: 'Beginner', cefr: 'A1–A2',
    blurb: 'Greet people, ask for things, get around and talk about your day.',
    units: [
      U('u1', 'Hello and first needs', ['small', 'shop', 'd1', 'd2'], {
        hi: { title: 'Saying “I am” and choosing “you”', points: [
          'The verb comes at the end of the sentence: मैं टीचर हूँ = “I teacher am”.',
          'होना (to be): मैं … हूँ, आप … हैं, तुम … हो, वह … है, हम … हैं.',
          'Use आप for strangers, elders and at work; तुम for friends; तू only for very close family.',
          'Questions that need a yes or no start with क्या: क्या आप नए पड़ोसी हैं?',
        ] },
        fr: { title: 'être and choosing tu or vous', points: [
          'être (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.',
          'No article before a job: Je suis professeure (not “une professeure”).',
          'Use vous for strangers, shopkeepers and at work; tu for friends, family and children.',
          'Je m’appelle Alex = “I call myself Alex”, the normal way to give your name.',
        ] },
        de: { title: 'sein and choosing du or Sie', points: [
          'sein (to be): ich bin, du bist, er/sie ist, wir sind, Sie sind, sie sind.',
          'No article before a job: Ich bin Lehrerin.',
          'Sie (always with a capital S) is polite; du is for friends, family and children.',
          'Ich heiße Alex is the normal way to give your name.',
        ] },
      }),
      U('u2', 'Getting around', ['bus', 'train', 'd3', 'd8', 'd15'], {
        hi: { title: 'Asking questions', points: [
          'The question word goes just before the verb: बस कहाँ रुकती है? (Where does the bus stop?)',
          'Key words: कहाँ where, कब when, कितना/कितने how much/many, कौन सा which, कैसे how.',
          'कितने बजे? = at what time? Answer with बजे: सात बजे, सवा सात बजे (7:15), पौने नौ बजे (8:45).',
          'Verbs agree with the subject’s gender: बस जाती है (bus is feminine), ट्रेन आती है.',
        ] },
        fr: { title: 'Three ways to ask a question', points: [
          'Just raise your voice: Il s’arrête où ?',
          'Add est-ce que: Est-ce que je dois acheter un ticket ?',
          'Swap verb and subject (formal): Où s’arrête-t-il ?',
          'Key words: où, quand, combien, quel/quelle, comment. Times: à sept heures quinze.',
        ] },
        de: { title: 'Asking questions', points: [
          'With a question word, the verb comes second: Wo hält der Bus?',
          'Yes/no questions start with the verb: Fährt dieser Bus zum Krankenhaus?',
          'Key words: wo, wann, wie viel, welcher/welche/welches, wie.',
          'Times: um Viertel nach sieben (7:15), um Viertel vor neun (8:45), um halb vier (3:30).',
        ] },
      }),
      U('u3', 'Food and family', ['restaurant', 'family', 'd4', 'd6'], {
        hi: { title: 'Wanting and asking politely', points: [
          'चाहिए means “is needed”: मुझे पानी चाहिए = “to me, water is needed” (I want water).',
          'Polite requests end in -इए: दीजिए (please give), लाइए (please bring), बैठिए (please sit).',
          'Adjectives ending in -आ change with gender: अच्छा खाना, अच्छी चाय, अच्छे लोग.',
          'With friends and children use the तुम form: आओ, खा लो, हाथ धो लो.',
        ] },
        fr: { title: 'Ordering and “some”', points: [
          'Je voudrais (I would like) is the polite way to order.',
          '“Some” changes with gender: du pain, de la soupe, de l’eau, des légumes.',
          'After a negative it becomes de: Je n’ai pas de pain.',
          'Talking to family uses tu: Lave-toi les mains, viens manger.',
        ] },
        de: { title: 'Ordering and noun gender', points: [
          'Ich hätte gern … or Ich nehme … are the usual ways to order.',
          'Every noun has a gender: der Tee, die Suppe, das Wasser. Learn the article with the word.',
          'After nehmen/haben, der becomes den and ein becomes einen: Ich nehme einen Tee.',
          'Commands to family use du: Wasch dir die Hände!',
        ] },
      }),
      U('u4', 'Work and weekends', ['office', 'friends', 'd5', 'd7', 'd9'], {
        hi: { title: 'The present tense', points: [
          'Habits: stem + ता/ती/ते + हूँ/है/हैं: मैं काम करता हूँ (a man), मैं काम करती हूँ (a woman).',
          'Happening now: stem + रहा/रही/रहे + हूँ: मैं हिंदी सीख रहा हूँ.',
          'Days take को: सोमवार को (on Monday), शनिवार को.',
          'The app uses masculine forms for the learner; women change -ता/-रहा to -ती/-रही.',
        ] },
        fr: { title: 'The present tense of -er verbs', points: [
          'travailler: je travaille, tu travailles, il travaille, nous travaillons, vous travaillez, ils travaillent.',
          'French has one present for “I work” and “I am working”.',
          'le lundi = every Monday; lundi = this Monday.',
          'Useful irregular verbs: aller (je vais), faire (je fais), avoir (j’ai).',
        ] },
        de: { title: 'The present tense and verb position', points: [
          'arbeiten: ich arbeite, du arbeitest, er arbeitet, wir arbeiten, Sie arbeiten.',
          'The verb is always the second idea: Am Montag haben wir ein Meeting.',
          'Separable verbs split: anfangen → Wir fangen um neun an.',
          'am Samstag = on Saturday; samstags = every Saturday.',
        ] },
      }),
    ],
  },
  {
    id: 'intermediate', name: 'Intermediate', cefr: 'A2–B1',
    blurb: 'Handle problems, tell stories about the past, deal with money and give advice.',
    units: [
      U('u5', 'Problems and plans', ['d10', 'd11', 'd12', 'd13'], {
        hi: { title: 'Future, can and must', points: [
          'Future: stem + ऊँगा/एगा/एँगे: मैं भेजूँगा, वह आएगा, हम मिलेंगे.',
          'Can: stem + सकना: मैं जा सकता हूँ, क्या आप भेज सकते हैं?',
          'Have to: infinitive + होगा: टिकट लेना होगा (you will have to buy a ticket).',
          'Should: मुझे … चाहिए with an infinitive: हमें काम करना चाहिए.',
        ] },
        fr: { title: 'Future, pouvoir and devoir', points: [
          'Near future: aller + infinitive: Je vais appeler le client.',
          'Simple future: j’appellerai, on se verra, vous recevrez.',
          'pouvoir (can) and devoir (must) + infinitive: Je peux payer ? Vous devez rester chez vous.',
          'Il faut + infinitive = it is necessary to: Il faut beaucoup d’eau.',
        ] },
        de: { title: 'Future and modal verbs', points: [
          'The present + a time word often means future: Ich rufe morgen an.',
          'werden + infinitive for plans and predictions: Er wird überrascht sein.',
          'Modal verbs send the main verb to the end: Ich kann morgen nicht arbeiten.',
          'müssen (must), können (can), sollen (should), dürfen (may), wollen (want).',
        ] },
      }),
      U('u6', 'Stories and people', ['d14', 'd16', 'd17', 'd18'], {
        hi: { title: 'Talking about the past', points: [
          'Used to: stem + ता था/ती थी/ते थे: हम कहानियाँ सुनाते थे.',
          'Simple past of action verbs takes ने, and the verb agrees with the object: मैंने किताब पढ़ी.',
          'Verbs of movement have no ने: मैं गाँव में बड़ा हुआ, वह आई.',
          'Years are read in hundreds: उन्नीस सौ अड़सठ (1968).',
        ] },
        fr: { title: 'Passé composé and imparfait', points: [
          'Passé composé for completed events: J’ai étudié, j’ai rencontré.',
          'Movement verbs use être: Je suis allé, elle est venue.',
          'Imparfait for background and habits: On s’asseyait ensemble, elle portait une robe rouge.',
          'Both often appear together: Je marchais quand j’ai vu…',
        ] },
        de: { title: 'Perfekt and Präteritum', points: [
          'Spoken past is the Perfekt: Ich habe studiert, ich habe gespielt.',
          'Movement uses sein: Ich bin gelaufen, wir sind gefahren.',
          'Stories often use the Präteritum: war, hatte, saßen, trug, erzählten.',
          'The past participle goes to the end: Ich habe den Roman gelesen.',
        ] },
      }),
      U('u7', 'Money and home', ['d19', 'd20', 'd21', 'd22', 'd23'], {
        hi: { title: 'Comparing and big numbers', points: [
          'Comparison uses से: यह उससे सस्ता है (this is cheaper than that).',
          'Superlative uses सबसे: सबसे पास, सबसे लंबी नदी.',
          'Fraction words: साढ़े तीन प्रतिशत (3.5%), डेढ़ सौ (150), ढाई सौ (250).',
          'Money: पच्चीस हज़ार, पैंतालीस लाख, दो करोड़.',
        ] },
        fr: { title: 'Comparing and percentages', points: [
          'plus … que, moins … que, aussi … que: moins cher que, plus rapide que.',
          'Superlative: le/la plus … : le supermarché le plus proche.',
          'Decimals use a comma: trois virgule cinq pour cent (3,5 %).',
          'Big numbers: deux mille cinq cents, deux cent cinquante mille.',
        ] },
        de: { title: 'Comparing and percentages', points: [
          'Comparative -er + als: billiger als, größer als.',
          'Superlative: am …sten or der/die/das …ste: am besten, der nächste Supermarkt.',
          'Decimals use a comma: drei Komma fünf Prozent (3,5 %).',
          'Numbers below a million are one word: zweitausendfünfhundert.',
        ] },
      }),
      U('u8', 'Negotiating and celebrating', ['d24', 'd25', 'd26', 'd27'], {
        hi: { title: 'Very polite forms and conditions', points: [
          'Extra-polite future request: फिर आइएगा, कल और सुनाइएगा.',
          'Conditions: अगर … तो: अगर नेहा मदद करे तो पाँच दिन.',
          'क्या … हो सकता है? softens a request: क्या बारह हो सकता है?',
          'Respect plural for one person: दादी … वे हैं, उन्हें अच्छा लगेगा.',
        ] },
        fr: { title: 'The conditional for politeness', points: [
          'Conditional softens requests: Je voudrais, Pourriez-vous, On pourrait dire douze ?',
          'Si + present, then present/future/imperative: Si ça dure plus de trois jours, consultez un médecin.',
          'Soit = “that is to say”: Soit environ cinquante-deux mille euros.',
          'Agreeing politely: Je pense qu’on peut se mettre d’accord.',
        ] },
        de: { title: 'Konjunktiv II for politeness', points: [
          'Polite forms: Ich hätte gern, Könnten Sie, Das wären etwa …',
          'wenn sends the verb to the end: Wenn es länger dauert, gehen Sie zum Arzt.',
          'After a wenn-clause the main clause starts with its verb: …, gehen Sie zum Arzt.',
          'Agreeing: Darauf können wir uns einigen.',
        ] },
      }),
      U('u9', 'Advice and reflection', ['d28', 'd29', 'd30'], {
        hi: { title: 'Giving advice and imagining', points: [
          'Hypothetical: होते तो … करते: मेरी जगह तुम होते तो क्या करते?',
          'Advice: तुम्हें … चाहिए: तुम्हें फ़ायदे और नुक़सान लिखने चाहिए.',
          'Telling a friend to do something: पूछो, लिखो, देखो.',
          'Feeling: मुझे हल्का महसूस हो रहा है (I feel lighter / better).',
        ] },
        fr: { title: 'Advice with the conditional', points: [
          'À ta place, je + conditional: À ta place, j’écrirais les avantages.',
          'Tu devrais (you should): Tu devrais accepter.',
          'Imperative with tu: Demande-toi, essaie, viens.',
          'Reflexive verbs: se sentir → Je me sens mieux.',
        ] },
        de: { title: 'Advice with würde and sollte', points: [
          'würde + infinitive at the end: Ich würde die Vor- und Nachteile aufschreiben.',
          'Du solltest (you should): Du solltest das Angebot annehmen.',
          'Imperative with du: Frag dich, versuch es, komm.',
          'an meiner Stelle = in my place.',
        ] },
      }),
    ],
  },
  {
    id: 'advanced', name: 'Advanced', cefr: 'B2–C1',
    blurb: 'Argue a point, handle complaints and negotiations, discuss health, books, history and society.',
    units: [
      U('u10', 'Opinions and arguments', ['a1', 'a2', 'a3', 'a4'], {
        hi: { title: 'Linking ideas and giving opinions', points: [
          'Opinion openers: मेरे ख़याल से, मुझे लगता है कि, आपकी राय में.',
          'Balancing: एक तरफ़ … दूसरी तरफ़; हालाँकि (although); फिर भी (even so).',
          'Cause and purpose: इसलिए (so), क्योंकि (because), ताकि (so that).',
          'Passive with जाना: दर्ज किया गया, पेड़ लगाए जाएँगे.',
        ] },
        fr: { title: 'Connectors and the subjunctive', points: [
          'À mon avis, je trouve que, d’un côté … d’un autre côté.',
          'Subjunctive after pour que and à condition que: pour que moins de gens aient besoin d’une voiture.',
          'Passive: a été retardée, seraient plantés.',
          'Connectors: pourtant, donc, alors que, même si.',
        ] },
        de: { title: 'Connectors and word order', points: [
          'Meiner Meinung nach is followed directly by the verb: Meiner Meinung nach bist du mutiger.',
          'dass, weil, wenn, obwohl, damit send the verb to the end: …, weil der Artikel nicht vorrätig war.',
          'Einerseits … andererseits for balancing; deshalb and trotzdem take the verb next.',
          'Passive with werden: Die Schulen wurden geschlossen.',
        ] },
      }),
      U('u11', 'Health, feelings and relationships', ['a5', 'a6', 'a7', 'a8'], {
        hi: { title: 'Compound verbs and wishes', points: [
          'Compound verbs add nuance: कर देना (do for someone), ले लेना, हो जाना (become).',
          'Wishes and requests use the subjunctive: मैं चाहता हूँ कि आप रोज़ चलें.',
          'Possibility: हो सकता है वे न चाहें (it may be she does not want to).',
          'Would-have: वे कुछ भी कर देतीं (she would have done anything).',
        ] },
        fr: { title: 'The subjunctive after feelings and wishes', points: [
          'J’aimerais que vous marchiez, il est important que vous déléguiez.',
          'J’ai peur que ce soit trop pour toi.',
          'Past conditional: elle aurait tout fait pour nous.',
          'Pronoun en: Je ne pourrai pas le lâcher / j’en doute / parlons-en.',
        ] },
        de: { title: 'Reflexive verbs and relative clauses', points: [
          'Reflexive verbs: sich Sorgen machen, sich fühlen, sich verändern.',
          'Relative clauses send the verb to the end: das Dorf, das ich mir anschaue.',
          'Konjunktiv II past: sie hätte alles für uns getan.',
          'Es fällt mir schwer, … = I find it hard to …',
        ] },
      }),
      U('u12', 'Culture, society and formal speech', ['a9', 'a10', 'a11', 'a12'], {
        hi: { title: 'Formal Hindi and the passive', points: [
          'Formal words from Sanskrit sit beside everyday ones: धन्यवाद / शुक्रिया, संग्रहालय / म्यूज़ियम.',
          'Passive: बनाया गया था (was built), बना दिया गया (was turned into).',
          'न कि (and not): जो हम करते हैं, न कि जो हम कहते हैं.',
          'Speeches open with प्रिय साथियो and close with … के नाम! (a toast).',
        ] },
        fr: { title: 'Formal register and the passive', points: [
          'Passive with être: il a été construit au quatorzième siècle.',
          'On raconte que … = people say that …',
          'Formal invitations: Je vous invite à lever vos verres.',
          'Ce dont je suis le plus fier, c’est … = what I am proudest of is …',
        ] },
        de: { title: 'Formal register and the genitive', points: [
          'Passive with werden: sie wurde gebaut, in ein Museum umgewandelt.',
          'Genitive: das Ende des Flurs, der Tag des Festes, eines Krieges.',
          'Formal address: Liebe Kolleginnen und Kollegen …',
          'nicht …, sondern … = not …, but rather …: nicht auf das Wachstum, sondern auf die Menschen.',
        ] },
      }),
    ],
  },
];

// Spoken English grammar, written for Hindi speakers. Each unit ends with a common mistake to avoid.
const ENG = {
  u1: { title: 'I am, you are, he is', points: [
    'to be: I am, you are, he/she is, we are, they are (मैं हूँ, आप हैं, वह है, हम हैं, वे हैं).',
    'Use a or an before a job: I am a teacher. She is an engineer. Hindi does not need it; English does.',
    'In speech, join words: I’m, you’re, he’s, it’s, I’m not, isn’t, aren’t.',
    'Common mistake: “What is your good name?” Say “What’s your name?” or “May I know your name?”',
  ] },
  u2: { title: 'Asking questions', points: [
    'Question word + do/does + verb: Where does the bus stop? (not “Where the bus stops?”)',
    'Yes/no questions start with do, does, is, are or can: Does this bus go to the hospital? Is the train late?',
    'Time: seven fifteen or quarter past seven; eight forty-five or quarter to nine; half past three.',
    'Common mistake: “You are coming, no?” Say “You’re coming, aren’t you?” or simply “Are you coming?”',
  ] },
  u3: { title: 'Asking politely', points: [
    'I’d like … is softer than I want …: I’d like some water. Could I have the menu, please?',
    'English uses please and thank you far more than Hindi. Say them every time, even to waiters and drivers.',
    'some in positive sentences, any in questions and negatives: some bread, any milk?, no rice.',
    'Common mistake: “Give me one tea.” Say “Could I have a tea, please?”',
  ] },
  u4: { title: 'Present simple and present continuous', points: [
    'Habits: I work, she works (add -s for he, she, it). Right now: I am working, she is working.',
    'Verbs of knowing and having do not take -ing: I know, I understand, I have a car.',
    'on + day (on Monday), at + time (at nine), in + month or year (in May, in 2025).',
    'Common mistake: “I am having a doubt.” Say “I have a question.” And “He is knowing” → “He knows.”',
  ] },
  u5: { title: 'Future, can and must', points: [
    'will for decisions and promises: I’ll send it now. going to for plans: We’re going to the hills on Saturday.',
    'can / can’t for ability and permission: Can I pay by card? I can’t come tomorrow.',
    'have to / must for rules, should for advice: You have to buy a ticket. You should rest.',
    'Common mistake: “Prepone the meeting.” Most English speakers say “bring the meeting forward”.',
  ] },
  u6: { title: 'Talking about the past', points: [
    'Past simple for finished actions: I studied, I met her, she wore a red sari. Many verbs are irregular: go–went, see–saw, buy–bought.',
    'used to for old habits: We used to walk four kilometres to school.',
    'Present perfect links the past to now: I have worked here for six years. Have you finished the book?',
    'Common mistake: “I am working here since 2018.” Say “I have been working here since 2018.” Use for with a period: for six years.',
  ] },
  u7: { title: 'Comparing and big numbers', points: [
    'Short adjectives: cheap – cheaper – the cheapest. Long ones: more expensive, the most beautiful.',
    'International numbers: 4,500,000 = four and a half million. In India: 45,00,000 = forty-five lakh. Learn both.',
    'Say “and” after hundred: two hundred and fifty rupees. Decimals use point: three point five percent.',
    'Common mistake: “more better” → “better”; “too much good” → “very good” (too means more than you want).',
  ] },
  u8: { title: 'Polite requests and conditions', points: [
    'Could you …? Would you mind …? I was wondering if … make requests softer.',
    'If + present, will + verb: If Neha helps us, we’ll finish in five days.',
    'Saying no politely: I’m afraid that’s not possible. Unfortunately, the budget is tight this year.',
    'Common mistake: “Kindly do the needful.” Say exactly what you need: “Could you send the report today?”',
  ] },
  u9: { title: 'Advice and imagining', points: [
    'If I were you, I would … : If I were you, I’d write down the pros and cons.',
    'Advice: You should …, Why don’t you …?, It might be a good idea to …',
    'Feelings: I feel much better. I’m worried about … I’m proud of …',
    'Common mistake: “I am feeling bore.” Say “I’m bored” (how you feel) and “It’s boring” (the thing).',
  ] },
  u10: { title: 'Linking ideas and giving opinions', points: [
    'Opinions: In my opinion …, I think …, On the one hand … on the other hand …',
    'although, even so, therefore, so that, whereas join ideas: Although I’ll miss you, it’s a good idea.',
    'Passive for news: The hottest day was recorded yesterday. More trees will be planted.',
    'Common mistake: “Although it is hot, but I cycle.” Use only one: “Although it’s hot, I cycle.”',
  ] },
  u11: { title: 'Feelings, health and relationships', points: [
    'want / would like someone to do something: I’d like you to walk every day.',
    'should have / could have / would have for the past: She would have done anything for us.',
    'Phrasal verbs are everywhere in speech: take on, let go, cut down, look after, find out.',
    'Common mistake: “I have fever since two days.” Say “I’ve had a fever for two days.” And “discuss about” → “discuss”.',
  ] },
  u12: { title: 'Formal and public speaking', points: [
    'Openings: Good evening, everyone. Dear colleagues, thank you all for coming.',
    'Passive for history: It was built in the fourteenth century. It was turned into a museum.',
    'Emphasis: What I’m most proud of is not the growth, but the people.',
    'A toast: Please raise your glasses: to the team! Speak slowly and pause after each idea.',
  ] },
};
for (const lv of LEVELS) for (const u of lv.units) u.grammar.eng = ENG[u.id];

export const ALL_LESSON_IDS = LEVELS.flatMap((l) => l.units.flatMap((u) => u.lessons));
export function findLesson(id) {
  for (const lv of LEVELS) for (const u of lv.units) {
    const i = u.lessons.indexOf(id);
    if (i >= 0) return { level: lv, unit: u, index: i, lesson: LESSONS[id] };
  }
  return null;
}
