// Word bank. Each line: English | Hindi | Hindi romanised | French | French sound | German | German sound
const RAW = `
#Greetings
Hello|नमस्ते|namaste|Bonjour|bon-ZHOOR|Hallo|HAH-loh
Good morning|सुप्रभात|suprabhaat|Bonjour|bon-ZHOOR|Guten Morgen|GOO-ten MOR-gen
Good evening|शुभ संध्या|shubh sandhya|Bonsoir|bon-SWAHR|Guten Abend|GOO-ten AH-bent
Good night|शुभ रात्रि|shubh raatri|Bonne nuit|bun NWEE|Gute Nacht|GOO-tuh nakht
Goodbye|अलविदा|alvidaa|Au revoir|oh ruh-VWAHR|Auf Wiedersehen|owf VEE-der-zay-en
See you soon|फिर मिलेंगे|phir milenge|À bientôt|ah byan-TOH|Bis bald|bis BALT
Thank you|धन्यवाद|dhanyavaad|Merci|mair-SEE|Danke|DAHN-kuh
Please|कृपया|kripayaa|S'il vous plaît|seel voo PLEH|Bitte|BIT-tuh
You're welcome|कोई बात नहीं|koi baat nahin|De rien|duh RYAN|Gern geschehen|gairn guh-SHAY-en
Yes|हाँ|haan|Oui|wee|Ja|yah
No|नहीं|nahin|Non|noh(n)|Nein|nine
Sorry / Excuse me|माफ़ कीजिए|maaf kijiye|Pardon|par-DOHN|Entschuldigung|ent-SHOOL-di-goong
How are you?|आप कैसे हैं?|aap kaise hain?|Comment ça va ?|koh-mahn sah VAH|Wie geht's?|vee GAYTS
I'm fine|मैं ठीक हूँ|main theek hoon|Je vais bien|zhuh vay BYAN|Mir geht's gut|meer gayts GOOT
Welcome|स्वागत है|svaagat hai|Bienvenue|byan-vuh-NÜ|Willkommen|vil-KOM-men
#Numbers
One|एक|ek|Un|uhn|Eins|ines
Two|दो|do|Deux|duh|Zwei|tsvy
Three|तीन|teen|Trois|trwah|Drei|dry
Four|चार|chaar|Quatre|katr|Vier|feer
Five|पाँच|paanch|Cinq|sank|Fünf|fünf
Six|छह|chhah|Six|sees|Sechs|zeks
Seven|सात|saat|Sept|set|Sieben|ZEE-ben
Eight|आठ|aaṭh|Huit|weet|Acht|akht
Nine|नौ|nau|Neuf|nuhf|Neun|noyn
Ten|दस|das|Dix|dees|Zehn|tsayn
Eleven|ग्यारह|gyaarah|Onze|ohnz|Elf|elf
Twelve|बारह|baarah|Douze|dooz|Zwölf|tsvölf
Twenty|बीस|bees|Vingt|van|Zwanzig|TSVAN-tsikh
Fifty|पचास|pachaas|Cinquante|san-KAHNT|Fünfzig|FÜNF-tsikh
Hundred|सौ|sau|Cent|sahn|Hundert|HOON-dert
Thousand|हज़ार|hazaar|Mille|meel|Tausend|TOW-zent
Hundred thousand|लाख|laakh|Cent mille|sahn MEEL|Hunderttausend|HOON-dert-tow-zent
Ten million|करोड़|karod|Dix millions|dee mee-LYOHN|Zehn Millionen|tsayn mil-YOH-nen
Half|आधा|aadhaa|La moitié|mwah-TYAY|Die Hälfte|HELF-tuh
One and a half|डेढ़|ḍeḍh|Un et demi|uhn ay duh-MEE|Anderthalb|AHN-der-talp
Two and a half|ढाई|ḍhaai|Deux et demi|duh ay duh-MEE|Zweieinhalb|TSVY-ine-halp
#People
Man|आदमी|aadmi|L'homme|lom|Der Mann|man
Woman|औरत|aurat|La femme|fahm|Die Frau|frow
Child|बच्चा|bachchaa|L'enfant|lahn-FAHN|Das Kind|kint
Boy|लड़का|laḍkaa|Le garçon|gar-SOHN|Der Junge|YOONG-uh
Girl|लड़की|laḍki|La fille|fee|Das Mädchen|MAYT-khen
Friend|दोस्त|dost|L'ami|lah-MEE|Der Freund|froynt
Neighbour|पड़ोसी|paḍosi|Le voisin|vwah-ZAN|Der Nachbar|NAKH-bar
Teacher|शिक्षक|shikshak|Le professeur|pro-feh-SUHR|Der Lehrer|LAY-rer
Doctor|डॉक्टर|ḍokṭar|Le médecin|mayd-SAN|Der Arzt|artst
Guest|मेहमान|mehmaan|L'invité|lan-vee-TAY|Der Gast|gast
Name|नाम|naam|Le nom|nohn|Der Name|NAH-muh
Person|व्यक्ति|vyakti|La personne|pair-SUN|Die Person|pair-ZOHN
#Family
Family|परिवार|parivaar|La famille|fah-MEE|Die Familie|fah-MEE-lee-uh
Mother|माँ|maa|La mère|mair|Die Mutter|MOO-ter
Father|पिता|pitaa|Le père|pair|Der Vater|FAH-ter
Brother|भाई|bhaai|Le frère|frair|Der Bruder|BROO-der
Sister|बहन|bahan|La sœur|suhr|Die Schwester|SHVES-ter
Son|बेटा|beṭaa|Le fils|fees|Der Sohn|zohn
Daughter|बेटी|beṭi|La fille|fee|Die Tochter|TOKH-ter
Grandfather|दादा|daadaa|Le grand-père|grahn-PAIR|Der Großvater|GROHS-fah-ter
Grandmother|दादी|daadi|La grand-mère|grahn-MAIR|Die Großmutter|GROHS-moo-ter
Husband|पति|pati|Le mari|mah-REE|Der Ehemann|AY-uh-man
Wife|पत्नी|patni|La femme|fahm|Die Ehefrau|AY-uh-frow
Uncle|चाचा|chaachaa|L'oncle|LOHN-kl|Der Onkel|ONG-kel
Aunt|चाची|chaachi|La tante|tahnt|Die Tante|TAN-tuh
Wedding|शादी|shaadi|Le mariage|mah-RYAZH|Die Hochzeit|HOKH-tsite
#Time
Today|आज|aaj|Aujourd'hui|oh-zhoor-DWEE|Heute|HOY-tuh
Tomorrow|कल|kal|Demain|duh-MAN|Morgen|MOR-gen
Yesterday|कल|kal (same word as tomorrow)|Hier|yair|Gestern|GES-tern
Morning|सुबह|subah|Le matin|mah-TAN|Der Morgen|MOR-gen
Afternoon|दोपहर|dopahar|L'après-midi|lah-preh-mee-DEE|Der Nachmittag|NAKH-mi-tahk
Evening|शाम|shaam|Le soir|swahr|Der Abend|AH-bent
Night|रात|raat|La nuit|nwee|Die Nacht|nakht
Hour|घंटा|ghanṭaa|L'heure|luhr|Die Stunde|SHTOON-duh
Minute|मिनट|minaṭ|La minute|mee-NÜT|Die Minute|mi-NOO-tuh
Week|हफ़्ता|haftaa|La semaine|suh-MEN|Die Woche|VOKH-uh
Month|महीना|maheenaa|Le mois|mwah|Der Monat|MOH-naht
Year|साल|saal|L'année|lah-NAY|Das Jahr|yahr
Now|अभी|abhi|Maintenant|mant-NAHN|Jetzt|yetst
Later|बाद में|baad mein|Plus tard|plü TAR|Später|SHPAY-ter
Early|जल्दी|jaldi|Tôt|toh|Früh|frü
Late|देर से|der se|Tard|tar|Spät|shpayt
#Days & months
Monday|सोमवार|somvaar|Lundi|lun-DEE|Montag|MOHN-tahk
Tuesday|मंगलवार|mangalvaar|Mardi|mar-DEE|Dienstag|DEENS-tahk
Wednesday|बुधवार|budhvaar|Mercredi|mair-kruh-DEE|Mittwoch|MIT-vokh
Thursday|गुरुवार|guruvaar|Jeudi|zhuh-DEE|Donnerstag|DON-ers-tahk
Friday|शुक्रवार|shukravaar|Vendredi|vahn-druh-DEE|Freitag|FRY-tahk
Saturday|शनिवार|shanivaar|Samedi|sam-DEE|Samstag|ZAMS-tahk
Sunday|रविवार|ravivaar|Dimanche|dee-MAHNSH|Sonntag|ZON-tahk
January|जनवरी|janvari|Janvier|zhahn-VYAY|Januar|YAH-noo-ar
February|फ़रवरी|farvari|Février|fay-vree-AY|Februar|FAY-broo-ar
March|मार्च|maarch|Mars|mars|März|merts
April|अप्रैल|aprail|Avril|ah-VREEL|April|ah-PRIL
May|मई|mai|Mai|meh|Mai|my
June|जून|joon|Juin|zhwan|Juni|YOO-nee
July|जुलाई|julaai|Juillet|zhwee-YAY|Juli|YOO-lee
August|अगस्त|agast|Août|oot|August|ow-GOOST
September|सितंबर|sitambar|Septembre|sep-TAHMBR|September|zep-TEM-ber
October|अक्टूबर|akṭoobar|Octobre|ok-TOBR|Oktober|ok-TOH-ber
November|नवंबर|navambar|Novembre|no-VAHMBR|November|no-VEM-ber
December|दिसंबर|disambar|Décembre|day-SAHMBR|Dezember|day-TSEM-ber
#Food & drink
Water|पानी|paani|L'eau|loh|Das Wasser|VAH-ser
Tea|चाय|chaay|Le thé|tay|Der Tee|tay
Coffee|कॉफ़ी|kofi|Le café|kah-FAY|Der Kaffee|KAH-fay
Milk|दूध|doodh|Le lait|leh|Die Milch|milkh
Bread|रोटी|roṭi|Le pain|pan|Das Brot|broht
Rice|चावल|chaaval|Le riz|ree|Der Reis|rice
Vegetables|सब्ज़ी|sabzi|Les légumes|lay-GÜM|Das Gemüse|guh-MÜ-zuh
Fruit|फल|phal|Le fruit|frwee|Das Obst|ohpst
Egg|अंडा|anḍaa|L'œuf|luhf|Das Ei|eye
Sugar|चीनी|cheeni|Le sucre|SÜKR|Der Zucker|TSOO-ker
Salt|नमक|namak|Le sel|sel|Das Salz|zalts
Breakfast|नाश्ता|naashtaa|Le petit-déjeuner|puh-TEE day-zhuh-NAY|Das Frühstück|FRÜ-shtük
Lunch|दोपहर का खाना|dopahar kaa khaanaa|Le déjeuner|day-zhuh-NAY|Das Mittagessen|MIT-tahk-es-sen
Dinner|रात का खाना|raat kaa khaanaa|Le dîner|dee-NAY|Das Abendessen|AH-bent-es-sen
Delicious|स्वादिष्ट|svaadisht|Délicieux|day-lee-SYUH|Lecker|LEK-er
Spicy|तीखा|teekhaa|Épicé|ay-pee-SAY|Scharf|sharf
#Colours
Red|लाल|laal|Rouge|roozh|Rot|roht
Blue|नीला|neelaa|Bleu|bluh|Blau|blow
Green|हरा|haraa|Vert|vair|Grün|grün
Yellow|पीला|peelaa|Jaune|zhohn|Gelb|gelp
Black|काला|kaalaa|Noir|nwahr|Schwarz|shvarts
White|सफ़ेद|safed|Blanc|blahn|Weiß|vice
Grey|सलेटी|saleṭi|Gris|gree|Grau|grow
Orange|नारंगी|naarangi|Orange|oh-RAHNZH|Orange|oh-RAHN-zhuh
Pink|गुलाबी|gulaabi|Rose|rohz|Rosa|ROH-zah
Purple|बैंगनी|baingani|Violet|vyoh-LAY|Lila|LEE-lah
Brown|भूरा|bhooraa|Marron|mah-ROHN|Braun|brown
#Places
House|घर|ghar|La maison|may-ZOHN|Das Haus|house
School|स्कूल|skool|L'école|lay-KOL|Die Schule|SHOO-luh
Hospital|अस्पताल|aspataal|L'hôpital|loh-pee-TAHL|Das Krankenhaus|KRAN-ken-house
Shop|दुकान|dukaan|Le magasin|mah-gah-ZAN|Der Laden|LAH-den
Market|बाज़ार|baazaar|Le marché|mar-SHAY|Der Markt|markt
Bank|बैंक|baink|La banque|bahnk|Die Bank|bank
Park|पार्क|paark|Le parc|park|Der Park|park
Street|सड़क|saḍak|La rue|rü|Die Straße|SHTRAH-suh
City|शहर|shahar|La ville|veel|Die Stadt|shtat
Village|गाँव|gaanv|Le village|vee-LAHZH|Das Dorf|dorf
Office|दफ़्तर|daftar|Le bureau|bü-ROH|Das Büro|bü-ROH
Left|बाएँ|baayen|À gauche|ah GOHSH|Links|links
Right|दाएँ|daayen|À droite|ah DRWAHT|Rechts|rekhts
Straight ahead|सीधे|seedhe|Tout droit|too DRWAH|Geradeaus|guh-rah-duh-OWS
#Transport
Bus|बस|bas|Le bus|büs|Der Bus|boos
Train|ट्रेन|ṭren|Le train|tran|Der Zug|tsook
Car|गाड़ी|gaaḍi|La voiture|vwah-TÜR|Das Auto|OW-toh
Taxi|टैक्सी|ṭaiksi|Le taxi|tak-SEE|Das Taxi|TAK-see
Bicycle|साइकिल|saaikil|Le vélo|vay-LOH|Das Fahrrad|FAR-raht
Plane|हवाई जहाज़|havaai jahaaz|L'avion|lah-VYOHN|Das Flugzeug|FLOOK-tsoyk
Ticket|टिकट|ṭikaṭ|Le billet|bee-YAY|Die Fahrkarte|FAR-kar-tuh
Station|स्टेशन|sṭeshan|La gare|gar|Der Bahnhof|BAHN-hohf
Bus stop|बस स्टॉप|bas sṭop|L'arrêt de bus|lah-REH duh büs|Die Haltestelle|HAL-tuh-shtel-luh
Platform|प्लेटफ़ॉर्म|pleṭfaarm|La voie|vwah|Das Gleis|glice
Driver|ड्राइवर|ḍraaivar|Le chauffeur|shoh-FUHR|Der Fahrer|FAH-rer
Delay|देरी|deri|Le retard|ruh-TAR|Die Verspätung|fer-SHPAY-toong
#Travel
Airport|हवाई अड्डा|havaai aḍḍaa|L'aéroport|lah-ay-roh-POR|Der Flughafen|FLOOK-hah-fen
Passport|पासपोर्ट|paasporṭ|Le passeport|pahs-POR|Der Reisepass|RYE-zuh-pas
Suitcase|सूटकेस|sooṭkes|La valise|vah-LEEZ|Der Koffer|KOF-fer
Hotel|होटल|hoṭal|L'hôtel|loh-TEL|Das Hotel|hoh-TEL
Room|कमरा|kamraa|La chambre|SHAHMBR|Das Zimmer|TSIM-mer
Key|चाबी|chaabi|La clé|klay|Der Schlüssel|SHLÜS-sel
Map|नक़्शा|naqshaa|La carte|kart|Die Karte|KAR-tuh
Trip|यात्रा|yaatraa|Le voyage|vwah-YAHZH|Die Reise|RYE-zuh
Booking|बुकिंग|buking|La réservation|ray-zair-vah-SYOHN|Die Reservierung|re-zer-VEER-oong
Arrival|आगमन|aagaman|L'arrivée|lah-ree-VAY|Die Ankunft|AN-koonft
Departure|प्रस्थान|prasthaan|Le départ|day-PAR|Die Abfahrt|AP-fart
#Work
Work|काम|kaam|Le travail|trah-VYE|Die Arbeit|AR-bite
Meeting|मीटिंग|meeṭing|La réunion|ray-ü-NYOHN|Das Meeting|MEE-ting
Boss|बॉस|bos|Le chef|shef|Der Chef|shef
Colleague|सहकर्मी|sahkarmi|Le collègue|koh-LEG|Der Kollege|ko-LAY-guh
Salary|तनख़्वाह|tankhvaah|Le salaire|sah-LAIR|Das Gehalt|guh-HALT
Computer|कंप्यूटर|kampyooṭar|L'ordinateur|lor-dee-nah-TUHR|Der Computer|kom-PYOO-ter
Report|रिपोर्ट|riporṭ|Le rapport|rah-POR|Der Bericht|buh-RIKHT
Customer|ग्राहक|graahak|Le client|klee-AHN|Der Kunde|KOON-duh
Company|कंपनी|kampani|L'entreprise|lahn-truh-PREEZ|Die Firma|FEER-mah
Job|नौकरी|naukri|L'emploi|lahm-PLWAH|Die Stelle|SHTEL-luh
Deadline|समय सीमा|samay seemaa|La date limite|daht lee-MEET|Die Frist|frist
#Body & health
Head|सिर|sir|La tête|tet|Der Kopf|kopf
Eye|आँख|aankh|L'œil|LUH-y|Das Auge|OW-guh
Ear|कान|kaan|L'oreille|loh-RAY|Das Ohr|ohr
Mouth|मुँह|munh|La bouche|boosh|Der Mund|moont
Hand|हाथ|haath|La main|man|Die Hand|hant
Foot|पैर|pair|Le pied|pyay|Der Fuß|foos
Stomach|पेट|peṭ|Le ventre|VAHNTR|Der Bauch|bowkh
Throat|गला|galaa|La gorge|gorzh|Der Hals|hals
Pain|दर्द|dard|La douleur|doo-LUHR|Der Schmerz|shmerts
Fever|बुख़ार|bukhaar|La fièvre|FYEVR|Das Fieber|FEE-ber
Medicine|दवा|davaa|Le médicament|may-dee-kah-MAHN|Das Medikament|me-di-ka-MENT
Sick|बीमार|beemaar|Malade|mah-LAHD|Krank|krank
Healthy|स्वस्थ|svasth|En bonne santé|ahn bun sahn-TAY|Gesund|guh-ZOONT
#Verbs
To eat|खाना|khaanaa|Manger|mahn-ZHAY|Essen|ES-sen
To drink|पीना|peenaa|Boire|bwahr|Trinken|TRING-ken
To go|जाना|jaanaa|Aller|ah-LAY|Gehen|GAY-en
To come|आना|aanaa|Venir|vuh-NEER|Kommen|KOM-men
To see|देखना|dekhnaa|Voir|vwahr|Sehen|ZAY-en
To speak|बोलना|bolnaa|Parler|par-LAY|Sprechen|SHPREKH-en
To understand|समझना|samajhnaa|Comprendre|kohm-PRAHNDR|Verstehen|fer-SHTAY-en
To want|चाहना|chaahnaa|Vouloir|voo-LWAHR|Wollen|VOL-len
To buy|ख़रीदना|khareednaa|Acheter|ash-TAY|Kaufen|KOW-fen
To pay|पैसे देना|paise denaa|Payer|pay-YAY|Bezahlen|buh-TSAH-len
To know|जानना|jaannaa|Savoir|sah-VWAHR|Wissen|VIS-sen
To learn|सीखना|seekhnaa|Apprendre|ah-PRAHNDR|Lernen|LAIR-nen
To read|पढ़ना|paḍhnaa|Lire|leer|Lesen|LAY-zen
To write|लिखना|likhnaa|Écrire|ay-KREER|Schreiben|SHRY-ben
To sleep|सोना|sonaa|Dormir|dor-MEER|Schlafen|SHLAH-fen
To work|काम करना|kaam karnaa|Travailler|trah-vah-YAY|Arbeiten|AR-by-ten
To help|मदद करना|madad karnaa|Aider|eh-DAY|Helfen|HEL-fen
To wait|इंतज़ार करना|intezaar karnaa|Attendre|ah-TAHNDR|Warten|VAR-ten
#Describing
Big|बड़ा|baḍaa|Grand|grahn|Groß|grohs
Small|छोटा|chhoṭaa|Petit|puh-TEE|Klein|kline
Good|अच्छा|achchhaa|Bon|bohn|Gut|goot
Bad|बुरा|buraa|Mauvais|moh-VEH|Schlecht|shlekht
Hot|गरम|garam|Chaud|shoh|Heiß|hice
Cold|ठंडा|ṭhanḍaa|Froid|frwah|Kalt|kalt
New|नया|nayaa|Nouveau|noo-VOH|Neu|noy
Old|पुराना|puraanaa|Vieux|vyuh|Alt|alt
Expensive|महँगा|mahangaa|Cher|shair|Teuer|TOY-er
Cheap|सस्ता|sastaa|Bon marché|bohn mar-SHAY|Billig|BIL-likh
Fast|तेज़|tez|Rapide|rah-PEED|Schnell|shnel
Slow|धीमा|dheemaa|Lent|lahn|Langsam|LANG-zahm
Beautiful|सुंदर|sundar|Beau|boh|Schön|shön
Easy|आसान|aasaan|Facile|fah-SEEL|Einfach|INE-fakh
Difficult|मुश्किल|mushkil|Difficile|dee-fee-SEEL|Schwierig|SHVEE-rikh
Near|पास|paas|Près|preh|Nah|nah
Far|दूर|door|Loin|lwan|Weit|vite
#Feelings
Happy|ख़ुश|khush|Heureux|uh-RUH|Glücklich|GLÜK-likh
Sad|उदास|udaas|Triste|treest|Traurig|TROW-rikh
Tired|थका हुआ|thakaa huaa|Fatigué|fah-tee-GAY|Müde|MÜ-duh
Hungry|भूखा|bhookhaa|Affamé|ah-fah-MAY|Hungrig|HOONG-rikh
Thirsty|प्यासा|pyaasaa|Assoiffé|ah-swah-FAY|Durstig|DOORS-tikh
Angry|ग़ुस्से में|gusse mein|En colère|ahn koh-LAIR|Wütend|VÜ-tent
Worried|परेशान|pareshaan|Inquiet|an-KYEH|Besorgt|buh-ZORKT
Nervous|घबराया हुआ|ghabraayaa huaa|Nerveux|nair-VUH|Nervös|ner-VÖS
Proud|गर्वित|garvit|Fier|fyair|Stolz|shtolts
Surprised|हैरान|hairaan|Surpris|sür-PREE|Überrascht|ü-ber-RASHT
Bored|ऊबा हुआ|oobaa huaa|Ennuyé|ahn-nwee-YAY|Gelangweilt|guh-LANG-vylt
Love|प्यार|pyaar|L'amour|lah-MOOR|Die Liebe|LEE-buh
#Weather & nature
Weather|मौसम|mausam|Le temps|tahn|Das Wetter|VET-ter
Sun|सूरज|sooraj|Le soleil|soh-LAY|Die Sonne|ZON-nuh
Rain|बारिश|baarish|La pluie|plwee|Der Regen|RAY-gen
Wind|हवा|havaa|Le vent|vahn|Der Wind|vint
Snow|बर्फ़|barf|La neige|nezh|Der Schnee|shnay
Cloud|बादल|baadal|Le nuage|nü-AHZH|Die Wolke|VOL-kuh
Tree|पेड़|peḍ|L'arbre|LARBR|Der Baum|bowm
River|नदी|nadi|La rivière|ree-VYAIR|Der Fluss|floos
Sea|समुद्र|samudra|La mer|mair|Das Meer|mayr
Mountain|पहाड़|pahaaḍ|La montagne|mohn-TAHN-yuh|Der Berg|bairk
Flower|फूल|phool|La fleur|fluhr|Die Blume|BLOO-muh
Lake|झील|jheel|Le lac|lak|Der See|zay
#Clothes
Shirt|कमीज़|kameez|La chemise|shuh-MEEZ|Das Hemd|hemt
Trousers|पैंट|painṭ|Le pantalon|pahn-tah-LOHN|Die Hose|HOH-zuh
Dress|ड्रेस|ḍres|La robe|rob|Das Kleid|klite
Shoes|जूते|joote|Les chaussures|shoh-SÜR|Die Schuhe|SHOO-uh
Jacket|जैकेट|jaikeṭ|La veste|vest|Die Jacke|YAK-kuh
Hat|टोपी|ṭopi|Le chapeau|shah-POH|Der Hut|hoot
Socks|मोज़े|moze|Les chaussettes|shoh-SET|Die Socken|ZOK-ken
Size|साइज़|saaiz|La taille|tye|Die Größe|GRÖ-suh
Scarf|स्कार्फ़|skaarf|Le foulard|foo-LAR|Der Schal|shahl
Bag|थैला|thailaa|Le sac|sak|Die Tasche|TASH-uh
To try on|पहनकर देखना|pahankar dekhnaa|Essayer|eh-say-YAY|Anprobieren|AN-pro-bee-ren
#Home
Door|दरवाज़ा|darvaazaa|La porte|port|Die Tür|tür
Window|खिड़की|khiḍki|La fenêtre|fuh-NETR|Das Fenster|FEN-ster
Kitchen|रसोई|rasoi|La cuisine|kwee-ZEEN|Die Küche|KÜ-khuh
Bedroom|बेडरूम|beḍroom|La chambre|SHAHMBR|Das Schlafzimmer|SHLAHF-tsim-mer
Bathroom|बाथरूम|baathroom|La salle de bains|sal duh BAN|Das Badezimmer|BAH-duh-tsim-mer
Bed|पलंग|palang|Le lit|lee|Das Bett|bet
Table|मेज़|mez|La table|TAHBL|Der Tisch|tish
Chair|कुर्सी|kursi|La chaise|shez|Der Stuhl|shtool
Rent|किराया|kiraayaa|Le loyer|lwah-YAY|Die Miete|MEE-tuh
Floor (storey)|मंज़िल|manzil|L'étage|lay-TAHZH|Der Stock|shtok
Light|बत्ती|batti|La lumière|lü-MYAIR|Das Licht|likht
Fridge|फ़्रिज|frij|Le frigo|free-GOH|Der Kühlschrank|KÜL-shrank
#Money & shopping
Money|पैसा|paisaa|L'argent|lar-ZHAHN|Das Geld|gelt
Price|दाम|daam|Le prix|pree|Der Preis|price
Cash|नक़द|naqad|Le liquide|lee-KEED|Das Bargeld|BAR-gelt
Card|कार्ड|kaarḍ|La carte|kart|Die Karte|KAR-tuh
Change (money back)|बाक़ी पैसे|baaqi paise|La monnaie|moh-NEH|Das Wechselgeld|VEK-sel-gelt
Receipt|रसीद|raseed|Le ticket de caisse|tee-KEH duh KESS|Der Kassenbon|KAS-sen-bon
Discount|छूट|chhooṭ|La réduction|ray-dük-SYOHN|Der Rabatt|rah-BAT
Bill|बिल|bil|L'addition|lah-dee-SYOHN|Die Rechnung|REKH-noong
Percent|प्रतिशत|pratishat|Pour cent|poor SAHN|Prozent|pro-TSENT
Loan|क़र्ज़|qarz|Le prêt|preh|Der Kredit|kre-DEET
Savings|बचत|bachat|L'épargne|lay-PARN-yuh|Die Ersparnisse|er-SHPAR-nis-suh
#Linking words
Because|क्योंकि|kyonki|Parce que|pars-KUH|Weil|vile
Therefore|इसलिए|isliye|Donc|donk|Deshalb|DES-halp
Even so|फिर भी|phir bhi|Pourtant|poor-TAHN|Trotzdem|TROTS-daym
Although|हालाँकि|haalaanki|Bien que|byan KUH|Obwohl|op-VOHL
Whereas|जबकि|jabki|Alors que|ah-LOR kuh|Während|VAIR-ent
In my opinion|मेरे ख़याल से|mere khayaal se|À mon avis|ah mohn nah-VEE|Meiner Meinung nach|MY-ner MY-noong nakh
On the one hand|एक तरफ़|ek taraf|D'un côté|duhn koh-TAY|Einerseits|INE-er-zites
On the other hand|दूसरी तरफ़|doosri taraf|D'un autre côté|duhn OHTR koh-TAY|Andererseits|AN-der-er-zites
For example|उदाहरण के लिए|udaaharaṇ ke liye|Par exemple|par eg-ZAHMPL|Zum Beispiel|tsoom BY-shpeel
Actually|असल में|asal mein|En fait|ahn FET|Eigentlich|EYE-gent-likh
So that|ताकि|taaki|Pour que|poor KUH|Damit|dah-MIT
Instead of|के बजाय|ke bajaay|Au lieu de|oh LYUH duh|Statt|shtat
Unfortunately|दुर्भाग्य से|durbhaagya se|Malheureusement|mal-uh-ruhz-MAHN|Leider|LY-der
Finally|आख़िरकार|aakhirkaar|Finalement|fee-nal-MAHN|Schließlich|SHLEES-likh
#Society & ideas
Environment|पर्यावरण|paryaavaraṇ|L'environnement|lahn-vee-ron-MAHN|Die Umwelt|OOM-velt
Climate|जलवायु|jalvaayu|Le climat|klee-MAH|Das Klima|KLEE-mah
Society|समाज|samaaj|La société|soh-syay-TAY|Die Gesellschaft|guh-ZEL-shaft
Government|सरकार|sarkaar|Le gouvernement|goo-vair-nuh-MAHN|Die Regierung|re-GEE-roong
Future|भविष्य|bhavishya|L'avenir|lahv-NEER|Die Zukunft|TSOO-koonft
History|इतिहास|itihaas|L'histoire|lees-TWAHR|Die Geschichte|guh-SHIKH-tuh
Culture|संस्कृति|sanskriti|La culture|kül-TÜR|Die Kultur|kool-TOOR
Tradition|परंपरा|parampraa|La tradition|trah-dee-SYOHN|Die Tradition|tra-di-TSYOHN
Opinion|राय|raay|L'opinion|loh-pee-NYOHN|Die Meinung|MY-noong
Decision|फ़ैसला|faislaa|La décision|day-see-ZYOHN|Die Entscheidung|ent-SHY-doong
Problem|समस्या|samasyaa|Le problème|proh-BLEM|Das Problem|pro-BLAYM
Solution|हल|hal|La solution|soh-lü-SYOHN|Die Lösung|LÖ-zoong
Experience|अनुभव|anubhav|L'expérience|lek-spay-RYAHNS|Die Erfahrung|er-FAH-roong
Responsibility|ज़िम्मेदारी|zimmedaari|La responsabilité|res-pohn-sah-bee-lee-TAY|Die Verantwortung|fer-ANT-vor-toong
#Questions
What?|क्या?|kyaa?|Quoi ?|kwah|Was?|vahs
Where?|कहाँ?|kahaan?|Où ?|oo|Wo?|voh
When?|कब?|kab?|Quand ?|kahn|Wann?|vahn
How?|कैसे?|kaise?|Comment ?|koh-MAHN|Wie?|vee
How much?|कितना?|kitnaa?|Combien ?|kohm-BYAN|Wie viel?|vee FEEL
How many?|कितने?|kitne?|Combien de… ?|kohm-BYAN duh|Wie viele?|vee FEE-luh
Who?|कौन?|kaun?|Qui ?|kee|Wer?|vair
Why?|क्यों?|kyon?|Pourquoi ?|poor-KWAH|Warum?|vah-ROOM
Which?|कौन सा?|kaun saa?|Quel ?|kel|Welcher?|VEL-kher
Where from?|कहाँ से?|kahaan se?|D'où ?|doo|Woher?|voh-HAIR
What time?|कितने बजे?|kitne baje?|À quelle heure ?|ah kel UHR|Um wie viel Uhr?|oom vee feel OOR
Can I…?|क्या मैं…?|kyaa main…?|Est-ce que je peux… ?|es-kuh zhuh PUH|Kann ich…?|kan ikh
`;

export const WORDS = [];
for (const line of RAW.split('\n')) {
  const s = line.trim();
  if (!s) continue;
  if (s.startsWith('#')) { WORDS.push({ cat: s.slice(1), items: [] }); continue; }
  const [en, hi, hiR, fr, frR, de, deR] = s.split('|');
  WORDS[WORDS.length - 1].items.push({ en, hi: { t: hi, r: hiR }, fr: { t: fr, r: frR }, de: { t: de, r: deR }, eng: { t: en, r: '' } });
}

/** What a word means to the learner: English for Hindi/French/German, Hindi for spoken English. */
export const meaningOf = (w, lang) => (lang === 'eng' ? w.hi.t : w.en);
