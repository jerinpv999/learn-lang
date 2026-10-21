// Course content. Every lesson is written from English into Hindi, French and German.

export const LANGS = {
  hi: { name: 'Hindi', native: 'हिन्दी', speech: 'hi-IN', greet: 'नमस्ते' },
  fr: { name: 'French', native: 'Français', speech: 'fr-FR', greet: 'Bonjour' },
  de: { name: 'German', native: 'Deutsch', speech: 'de-DE', greet: 'Hallo' },
};

// [character, name/romanization, tip]
export const LETTERS = {
  hi: [
    {
      group: 'Vowels · स्वर',
      items: [
        ['अ', 'a', 'short "a" as in about'], ['आ', 'aa', 'long "a" as in father'],
        ['इ', 'i', 'short "i" as in sit'], ['ई', 'ee', 'long "ee" as in see'],
        ['उ', 'u', 'short "u" as in put'], ['ऊ', 'oo', 'long "oo" as in pool'],
        ['ऋ', 'ri', '"ri" as in rhythm'], ['ए', 'e', '"ay" as in day'],
        ['ऐ', 'ai', '"ae" as in bat'], ['ओ', 'o', '"o" as in go'],
        ['औ', 'au', '"aw" as in saw'], ['अं', 'an', 'nasal "an"'], ['अः', 'ah', 'breathy "ah"'],
      ],
    },
    {
      group: 'Consonants · व्यंजन',
      items: [
        ['क', 'ka', 'k as in skin'], ['ख', 'kha', 'k with a puff of air'], ['ग', 'ga', 'g as in go'],
        ['घ', 'gha', 'g with a breath'], ['ङ', 'nga', 'ng as in sing'],
        ['च', 'cha', 'ch as in chin'], ['छ', 'chha', 'ch with a puff of air'], ['ज', 'ja', 'j as in jam'],
        ['झ', 'jha', 'j with a breath'], ['ञ', 'nya', 'ny as in canyon'],
        ['ट', 'ṭa', 'hard t, tongue curled back'], ['ठ', 'ṭha', 'hard t with a puff'], ['ड', 'ḍa', 'hard d, tongue curled back'],
        ['ढ', 'ḍha', 'hard d with a breath'], ['ण', 'ṇa', 'hard n, tongue curled back'],
        ['त', 'ta', 'soft t, tongue on teeth'], ['थ', 'tha', 'soft t with a puff'], ['द', 'da', 'soft d, tongue on teeth'],
        ['ध', 'dha', 'soft d with a breath'], ['न', 'na', 'n as in no'],
        ['प', 'pa', 'p as in spin'], ['फ', 'pha', 'p with a puff of air'], ['ब', 'ba', 'b as in bat'],
        ['भ', 'bha', 'b with a breath'], ['म', 'ma', 'm as in man'],
        ['य', 'ya', 'y as in yes'], ['र', 'ra', 'lightly tapped r'], ['ल', 'la', 'l as in love'],
        ['व', 'va', 'between v and w'], ['श', 'sha', 'sh as in shop'], ['ष', 'ṣa', 'sh, tongue curled back'],
        ['स', 'sa', 's as in sun'], ['ह', 'ha', 'h as in hat'],
      ],
    },
  ],
  fr: [
    {
      group: "L'alphabet",
      items: [
        ['A', 'a', 'ah'], ['B', 'bé', 'bay'], ['C', 'cé', 'say'], ['D', 'dé', 'day'], ['E', 'e', 'uh'],
        ['F', 'effe', 'eff'], ['G', 'gé', 'zhay'], ['H', 'ache', 'ash (always silent in words)'], ['I', 'i', 'ee'],
        ['J', 'ji', 'zhee'], ['K', 'ka', 'kah'], ['L', 'elle', 'ell'], ['M', 'emme', 'emm'], ['N', 'enne', 'enn'],
        ['O', 'o', 'oh'], ['P', 'pé', 'pay'], ['Q', 'qu', 'kü (lips rounded)'], ['R', 'erre', 'air, rolled in the throat'],
        ['S', 'esse', 'ess'], ['T', 'té', 'tay'], ['U', 'u', 'say "ee" with rounded lips'], ['V', 'vé', 'vay'],
        ['W', 'double vé', 'doo-bluh vay'], ['X', 'ixe', 'eeks'], ['Y', 'i grec', 'ee grek'], ['Z', 'zède', 'zed'],
      ],
    },
    {
      group: 'Accents',
      items: [
        ['é', 'e accent aigu', 'ay, as in café'], ['è', 'e accent grave', 'eh, as in mère'],
        ['ê', 'e accent circonflexe', 'eh, as in fête'], ['à', 'a accent grave', 'ah, as in là'],
        ['ç', 'c cédille', 'soft s, as in français'], ['ô', 'o accent circonflexe', 'oh, as in hôtel'],
        ['ù', 'u accent grave', 'only in où (where)'], ['ë', 'e tréma', 'said separately, as in Noël'],
      ],
    },
  ],
  de: [
    {
      group: 'Das Alphabet',
      items: [
        ['A', 'ah', 'ah'], ['B', 'beh', 'bay'], ['C', 'tseh', 'tsay'], ['D', 'deh', 'day'], ['E', 'eh', 'ay'],
        ['F', 'eff', 'eff'], ['G', 'geh', 'gay (hard g)'], ['H', 'hah', 'hah'], ['I', 'ih', 'ee'],
        ['J', 'jott', 'yot (J sounds like y)'], ['K', 'kah', 'kah'], ['L', 'ell', 'ell'], ['M', 'emm', 'emm'],
        ['N', 'enn', 'enn'], ['O', 'oh', 'oh'], ['P', 'peh', 'pay'], ['Q', 'kuh', 'koo'], ['R', 'err', 'air, from the throat'],
        ['S', 'ess', 'ess'], ['T', 'teh', 'tay'], ['U', 'uh', 'oo'], ['V', 'fau', 'fow (V sounds like f)'],
        ['W', 'weh', 'vay (W sounds like v)'], ['X', 'iks', 'iks'], ['Y', 'üpsilon', 'ÜP-see-lon'], ['Z', 'tsett', 'tset (Z sounds like ts)'],
      ],
    },
    {
      group: 'Umlaute & ß',
      items: [
        ['Ä', 'a-Umlaut', 'eh, as in Käse'], ['Ö', 'o-Umlaut', 'say "ay" with rounded lips'],
        ['Ü', 'u-Umlaut', 'say "ee" with rounded lips'], ['ß', 'Eszett', 'a sharp double s, as in Straße'],
      ],
    },
  ],
};

// Conversations. Each line: who ('a' | 'b'), en (string or per-language object), hi, hiR, fr, de.
const L = (who, en, hi, hiR, fr, de) => ({ who, en, hi, hiR, fr, de });

export const SCENES = [
  {
    id: 'shop', title: 'At the shop', roles: ['Shopkeeper', 'Customer'],
    lines: [
      L('b', 'Hello, how much is this shirt?', 'नमस्ते, यह शर्ट कितने की है?', 'namaste, yah shirt kitne ki hai?', 'Bonjour, combien coûte cette chemise ?', 'Guten Tag, wie viel kostet dieses Hemd?'),
      L('a', { hi: 'It is five hundred rupees.', fr: 'It is twenty euros.', de: 'It is twenty euros.' }, 'यह पाँच सौ रुपये की है।', 'yah paanch sau rupaye ki hai.', 'Elle coûte vingt euros.', 'Es kostet zwanzig Euro.'),
      L('b', 'Do you have it in blue?', 'क्या यह नीले रंग में है?', 'kya yah neele rang mein hai?', "Vous l'avez en bleu ?", 'Haben Sie das in Blau?'),
      L('a', 'Yes. What size?', 'हाँ। कौन सा साइज़?', 'haan. kaun sa size?', 'Oui. Quelle taille ?', 'Ja. Welche Größe?'),
      L('b', 'Medium, please.', 'मीडियम दीजिए।', 'medium dijiye.', "Médium, s'il vous plaît.", 'Medium, bitte.'),
      L('a', 'Here you go. Anything else?', 'यह लीजिए। और कुछ?', 'yah lijiye. aur kuchh?', 'Voilà. Autre chose ?', 'Bitte schön. Sonst noch etwas?'),
      L('b', 'No, thank you. Can I pay by card?', 'नहीं, धन्यवाद। क्या मैं कार्ड से पैसे दे सकता हूँ?', 'nahin, dhanyavaad. kya main card se paise de sakta hoon?', 'Non, merci. Je peux payer par carte ?', 'Nein, danke. Kann ich mit Karte zahlen?'),
      L('a', 'Of course.', 'ज़रूर।', 'zaroor.', 'Bien sûr.', 'Natürlich.'),
    ],
  },
  {
    id: 'small', title: 'Small talk', roles: ['Visitor', 'Local'],
    lines: [
      L('a', "Nice weather today, isn't it?", 'आज मौसम अच्छा है, है ना?', 'aaj mausam achchha hai, hai na?', "Il fait beau aujourd'hui, non ?", 'Schönes Wetter heute, oder?'),
      L('b', 'Yes, very nice. Where are you from?', 'हाँ, बहुत अच्छा। आप कहाँ से हैं?', 'haan, bahut achchha. aap kahaan se hain?', "Oui, très beau. Vous venez d'où ?", 'Ja, sehr schön. Woher kommen Sie?'),
      L('a', "I'm from England. And you?", 'मैं इंग्लैंड से हूँ। और आप?', 'main England se hoon. aur aap?', "Je viens d'Angleterre. Et vous ?", 'Ich komme aus England. Und Sie?'),
      L('b', "I'm from here. Do you like it?", 'मैं यहीं का हूँ। आपको यहाँ अच्छा लग रहा है?', 'main yahin ka hoon. aapko yahaan achchha lag raha hai?', 'Je suis d\'ici. Ça vous plaît ?', 'Ich bin von hier. Gefällt es Ihnen?'),
      L('a', 'Very much! The food is wonderful.', 'बहुत! खाना बहुत बढ़िया है।', 'bahut! khaana bahut badhiya hai.', 'Beaucoup ! La cuisine est délicieuse.', 'Sehr! Das Essen ist wunderbar.'),
      L('b', 'Nice to meet you.', 'आपसे मिलकर अच्छा लगा।', 'aapse milkar achchha laga.', 'Ravi de vous rencontrer.', 'Freut mich, Sie kennenzulernen.'),
    ],
  },
  {
    id: 'office', title: 'At the office', roles: ['Colleague', 'You'],
    lines: [
      L('a', 'Good morning! How was your weekend?', 'सुप्रभात! आपका वीकेंड कैसा रहा?', 'suprabhaat! aapka weekend kaisa raha?', "Bonjour ! Comment s'est passé ton week-end ?", 'Guten Morgen! Wie war dein Wochenende?'),
      L('b', 'Good, thanks. Is the meeting at ten?', 'अच्छा था, धन्यवाद। क्या मीटिंग दस बजे है?', 'achchha tha, dhanyavaad. kya meeting das baje hai?', 'Bien, merci. La réunion est à dix heures ?', 'Gut, danke. Ist das Meeting um zehn?'),
      L('a', 'No, it moved to eleven.', 'नहीं, अब वह ग्यारह बजे है।', 'nahin, ab vah gyaarah baje hai.', 'Non, elle a été déplacée à onze heures.', 'Nein, es wurde auf elf verschoben.'),
      L('b', 'Can you send me the report?', 'क्या आप मुझे रिपोर्ट भेज सकते हैं?', 'kya aap mujhe report bhej sakte hain?', "Tu peux m'envoyer le rapport ?", 'Kannst du mir den Bericht schicken?'),
      L('a', "Sure, I'll email it now.", 'ज़रूर, मैं अभी ईमेल करता हूँ।', 'zaroor, main abhi email karta hoon.', "Bien sûr, je te l'envoie tout de suite.", 'Klar, ich schicke ihn dir gleich per E-Mail.'),
      L('b', "Thanks. Let's have tea after the meeting.", 'धन्यवाद। मीटिंग के बाद चाय पीते हैं।', 'dhanyavaad. meeting ke baad chaay peete hain.', 'Merci. On prend un thé après la réunion ?', 'Danke. Lass uns nach dem Meeting einen Tee trinken.'),
    ],
  },
  {
    id: 'bus', title: 'At the bus station', roles: ['Traveller', 'Helper'],
    lines: [
      L('a', 'Excuse me, which bus goes to the city centre?', 'माफ़ कीजिए, सिटी सेंटर के लिए कौन सी बस जाती है?', 'maaf kijiye, city centre ke liye kaun si bas jaati hai?', 'Excusez-moi, quel bus va au centre-ville ?', 'Entschuldigung, welcher Bus fährt ins Stadtzentrum?'),
      L('b', 'Number twelve. It comes every fifteen minutes.', 'बारह नंबर। हर पंद्रह मिनट में आती है।', 'baarah number. har pandrah minat mein aati hai.', 'Le numéro douze. Il passe toutes les quinze minutes.', 'Die Nummer zwölf. Er kommt alle fünfzehn Minuten.'),
      L('a', 'Where do I buy a ticket?', 'टिकट कहाँ से लूँ?', 'ticket kahaan se loon?', "Où est-ce que j'achète un ticket ?", 'Wo kaufe ich eine Fahrkarte?'),
      L('b', 'From the driver, or at that machine.', 'ड्राइवर से, या उस मशीन से।', 'driver se, ya us machine se.', 'Au chauffeur, ou à ce distributeur.', 'Beim Fahrer oder an dem Automaten dort.'),
      L('a', 'How long does it take?', 'कितना समय लगता है?', 'kitna samay lagta hai?', 'Combien de temps dure le trajet ?', 'Wie lange dauert die Fahrt?'),
      L('b', 'About twenty minutes.', 'लगभग बीस मिनट।', 'lagbhag bees minat.', 'Environ vingt minutes.', 'Ungefähr zwanzig Minuten.'),
      L('a', 'Thank you very much!', 'बहुत-बहुत धन्यवाद!', 'bahut-bahut dhanyavaad!', 'Merci beaucoup !', 'Vielen Dank!'),
    ],
  },
  {
    id: 'train', title: 'On the train', roles: ['Traveller', 'Clerk'],
    lines: [
      L('a', { hi: 'One ticket to Delhi, please.', fr: 'One ticket to Lyon, please.', de: 'One ticket to Munich, please.' }, 'दिल्ली का एक टिकट दीजिए।', 'Dilli ka ek ticket dijiye.', "Un billet pour Lyon, s'il vous plaît.", 'Eine Fahrkarte nach München, bitte.'),
      L('b', 'One way or return?', 'एक तरफ़ा या आने-जाने का?', 'ek tarfa ya aane-jaane ka?', 'Aller simple ou aller-retour ?', 'Einfach oder hin und zurück?'),
      L('a', 'Return. What time is the next train?', 'आने-जाने का। अगली ट्रेन कितने बजे है?', 'aane-jaane ka. agli train kitne baje hai?', 'Aller-retour. À quelle heure est le prochain train ?', 'Hin und zurück. Wann fährt der nächste Zug?'),
      L('b', 'At half past three, from platform four.', 'साढ़े तीन बजे, प्लेटफ़ॉर्म चार से।', 'saadhe teen baje, platform chaar se.', 'À quinze heures trente, voie quatre.', 'Um halb vier, von Gleis vier.'),
      L('a', 'Is this seat free?', 'क्या यह सीट खाली है?', 'kya yah seat khaali hai?', 'Cette place est libre ?', 'Ist dieser Platz frei?'),
      L('b', 'Yes, please sit down.', 'हाँ, बैठिए।', 'haan, baithiye.', 'Oui, asseyez-vous.', 'Ja, bitte setzen Sie sich.'),
      L('a', 'When do we arrive?', 'हम कब पहुँचेंगे?', 'hum kab pahunchenge?', 'On arrive à quelle heure ?', 'Wann kommen wir an?'),
      L('b', 'In about two hours.', 'करीब दो घंटे में।', 'kareeb do ghante mein.', 'Dans deux heures environ.', 'In etwa zwei Stunden.'),
    ],
  },
  {
    id: 'friends', title: 'With friends', roles: ['Friend', 'You'],
    lines: [
      L('a', 'Hey! Long time no see!', 'अरे! बहुत दिनों बाद मिले!', 'are! bahut dinon baad mile!', 'Salut ! Ça fait longtemps !', 'Hey! Lange nicht gesehen!'),
      L('b', 'I know! How are you?', 'हाँ यार! कैसे हो?', 'haan yaar! kaise ho?', 'Oui ! Comment ça va ?', "Stimmt! Wie geht's dir?"),
      L('a', "I'm great. Want to watch a movie tonight?", 'मैं बढ़िया हूँ। आज रात फ़िल्म देखने चलें?', 'main badhiya hoon. aaj raat film dekhne chalen?', 'Super bien. Tu veux voir un film ce soir ?', 'Super. Willst du heute Abend einen Film sehen?'),
      L('b', 'Sure! What time?', 'हाँ, ज़रूर! कितने बजे?', 'haan, zaroor! kitne baje?', 'Carrément ! À quelle heure ?', 'Klar! Um wie viel Uhr?'),
      L('a', "Seven o'clock. I'll pick you up.", 'सात बजे। मैं तुम्हें लेने आऊँगा।', 'saat baje. main tumhen lene aaoonga.', 'À sept heures. Je passe te prendre.', 'Um sieben. Ich hole dich ab.'),
      L('b', 'Perfect, see you then!', 'बढ़िया, फिर मिलते हैं!', 'badhiya, phir milte hain!', 'Parfait, à tout à l\'heure !', 'Perfekt, bis dann!'),
    ],
  },
  {
    id: 'family', title: 'With family', roles: ['Mum', 'Child'],
    lines: [
      L('a', 'Dinner is ready! Come and eat.', 'खाना तैयार है! आओ, खा लो।', 'khaana taiyaar hai! aao, kha lo.', 'Le dîner est prêt ! Venez manger.', 'Das Essen ist fertig! Kommt essen.'),
      L('b', 'Coming, Mum! What did you make?', 'आ रहा हूँ, माँ! क्या बनाया है?', 'aa raha hoon, maa! kya banaaya hai?', "J'arrive, maman ! Qu'est-ce que tu as préparé ?", 'Ich komme, Mama! Was hast du gekocht?'),
      L('a', 'Rice, lentils and vegetables.', 'दाल, चावल और सब्ज़ी।', 'daal, chaaval aur sabzi.', 'Du riz, des lentilles et des légumes.', 'Reis, Linsen und Gemüse.'),
      L('b', 'How was your day?', 'आपका दिन कैसा रहा?', 'aapka din kaisa raha?', "Ta journée s'est bien passée ?", 'Wie war dein Tag?'),
      L('a', 'Busy, but good. Did you finish your homework?', 'व्यस्त था, पर अच्छा था। होमवर्क पूरा किया?', 'vyast tha, par achchha tha. homework poora kiya?', 'Chargée, mais bien. Tu as fini tes devoirs ?', 'Viel los, aber gut. Hast du deine Hausaufgaben gemacht?'),
      L('b', "Yes. After dinner I'll call Grandma.", 'हाँ। खाने के बाद मैं दादी को फ़ोन करूँगा।', 'haan. khaane ke baad main daadi ko phone karoonga.', "Oui. Après le dîner, j'appelle mamie.", 'Ja. Nach dem Essen rufe ich Oma an.'),
    ],
  },
  {
    id: 'restaurant', title: 'At the restaurant', roles: ['Waiter', 'Guest'],
    lines: [
      L('a', 'Good evening. A table for two?', 'नमस्ते। दो लोगों के लिए टेबल?', 'namaste. do logon ke liye table?', 'Bonsoir. Une table pour deux ?', 'Guten Abend. Ein Tisch für zwei?'),
      L('b', 'Yes, please. Can we see the menu?', 'हाँ जी। मेन्यू मिल सकता है?', 'haan ji. menu mil sakta hai?', "Oui, s'il vous plaît. On peut voir la carte ?", 'Ja, bitte. Können wir die Speisekarte sehen?'),
      L('a', 'Of course. What would you like to drink?', 'ज़रूर। आप क्या पीना पसंद करेंगे?', 'zaroor. aap kya peena pasand karenge?', 'Bien sûr. Que souhaitez-vous boire ?', 'Natürlich. Was möchten Sie trinken?'),
      L('b', "Two waters. And I'll have the soup. Is it spicy?", 'दो पानी। और मुझे सूप चाहिए। क्या वह तीखा है?', 'do paani. aur mujhe soup chaahiye. kya vah teekha hai?', "Deux eaux. Et pour moi, la soupe. C'est épicé ?", 'Zwei Wasser. Und ich nehme die Suppe. Ist sie scharf?'),
      L('a', 'Just a little.', 'बस थोड़ा सा।', 'bas thoda sa.', 'Juste un peu.', 'Nur ein bisschen.'),
      L('b', 'The bill, please.', 'बिल ले आइए, प्लीज़।', 'bill le aaiye, please.', "L'addition, s'il vous plaît.", 'Die Rechnung, bitte.'),
      L('a', 'Here it is. Thank you, come again!', 'यह रहा। धन्यवाद, फिर आइएगा!', 'yah raha. dhanyavaad, phir aaiyega!', 'La voici. Merci, à bientôt !', 'Hier, bitte. Danke, bis zum nächsten Mal!'),
    ],
  },
];

export const enFor = (line, lang) => (typeof line.en === 'string' ? line.en : line.en[lang]);
