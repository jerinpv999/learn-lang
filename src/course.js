// 30-day course: one long conversation per day.
// Header: @day|setting|word category|title|role A|role B
// Line:   who|English|Hindi|Hindi romanised|French|German
// When the English differs per language (names, currency), write "Hindi version // French version // German version"
// or "Hindi version // French and German version".
const RAW = `
@1|small|People|Meeting your neighbour|Neighbour|You
a|Hello! Are you the new neighbour?|नमस्ते! क्या आप नए पड़ोसी हैं?|namaste! kyaa aap naye padosi hain?|Bonjour ! Vous êtes le nouveau voisin ?|Hallo! Sind Sie der neue Nachbar?
b|Yes, I moved in last week. My name is Alex.|हाँ, मैं पिछले हफ़्ते यहाँ आया। मेरा नाम एलेक्स है।|haan, main pichhle hafte yahaan aayaa. meraa naam Alex hai.|Oui, j'ai emménagé la semaine dernière. Je m'appelle Alex.|Ja, ich bin letzte Woche eingezogen. Ich heiße Alex.
a|Welcome! I'm Priya. I live on the second floor. // Welcome! I'm Claire. I live on the second floor. // Welcome! I'm Anna. I live on the second floor.|स्वागत है! मैं प्रिया हूँ। मैं दूसरी मंज़िल पर रहती हूँ।|svaagat hai! main Priya hoon. main doosri manzil par rehti hoon.|Bienvenue ! Moi, c'est Claire. J'habite au deuxième étage.|Willkommen! Ich bin Anna. Ich wohne im zweiten Stock.
b|Nice to meet you. Have you lived here long?|आपसे मिलकर ख़ुशी हुई। क्या आप यहाँ बहुत समय से रहती हैं?|aapse milkar khushi hui. kyaa aap yahaan bahut samay se rehti hain?|Enchanté. Vous habitez ici depuis longtemps ?|Freut mich. Wohnen Sie schon lange hier?
a|About ten years. It's a quiet, friendly building.|लगभग दस साल से। यह शांत और अच्छी बिल्डिंग है।|lagbhag das saal se. yah shaant aur achchhi building hai.|Depuis environ dix ans. C'est un immeuble calme et sympa.|Seit etwa zehn Jahren. Es ist ein ruhiges, freundliches Haus.
b|That's good to hear. What do you do?|यह सुनकर अच्छा लगा। आप क्या काम करती हैं?|yah sunkar achchhaa lagaa. aap kyaa kaam karti hain?|Ça fait plaisir à entendre. Qu'est-ce que vous faites dans la vie ?|Schön zu hören. Was machen Sie beruflich?
a|I'm a teacher at the school nearby. And you?|मैं पास वाले स्कूल में टीचर हूँ। और आप?|main paas vaale school mein teacher hoon. aur aap?|Je suis professeure à l'école d'à côté. Et vous ?|Ich bin Lehrerin an der Schule hier in der Nähe. Und Sie?
b|I work in IT. I'm also learning Hindi. // I work in IT. I'm also learning French. // I work in IT. I'm also learning German.|मैं आईटी में काम करता हूँ। मैं हिंदी भी सीख रहा हूँ।|main IT mein kaam kartaa hoon. main Hindi bhi seekh rahaa hoon.|Je travaille dans l'informatique. J'apprends aussi le français.|Ich arbeite in der IT. Ich lerne auch Deutsch.
a|Your Hindi is already good! // Your French is already good! // Your German is already good!|आपकी हिंदी तो पहले से अच्छी है!|aapki Hindi to pehle se achchhi hai!|Votre français est déjà très bien !|Ihr Deutsch ist schon sehr gut!
b|Thank you, but I speak slowly.|धन्यवाद, लेकिन मैं धीरे बोलता हूँ।|dhanyavaad, lekin main dheere boltaa hoon.|Merci, mais je parle lentement.|Danke, aber ich spreche langsam.
a|No problem. If you need anything, just knock on my door.|कोई बात नहीं। कुछ भी चाहिए तो मेरा दरवाज़ा खटखटा दीजिए।|koi baat nahin. kuchh bhi chaahiye to meraa darvaazaa khaṭkhaṭaa dijiye.|Pas de problème. Si vous avez besoin de quoi que ce soit, frappez à ma porte.|Kein Problem. Wenn Sie etwas brauchen, klopfen Sie einfach bei mir.
b|That's very kind. Where is the nearest supermarket?|आप बहुत भली हैं। सबसे पास सुपरमार्केट कहाँ है?|aap bahut bhali hain. sabse paas supermarket kahaan hai?|C'est très gentil. Où est le supermarché le plus proche ?|Das ist sehr nett. Wo ist der nächste Supermarkt?
a|Turn left at the corner. It's five minutes on foot.|कोने से बाएँ मुड़िए। पैदल पाँच मिनट है।|kone se baayen muḍiye. paidal paanch minaṭ hai.|Tournez à gauche au coin. C'est à cinq minutes à pied.|Biegen Sie an der Ecke links ab. Es sind fünf Minuten zu Fuß.
b|Thanks a lot. See you soon!|बहुत धन्यवाद। फिर मिलेंगे!|bahut dhanyavaad. phir milenge!|Merci beaucoup. À bientôt !|Vielen Dank. Bis bald!
a|See you! Have a nice evening.|फिर मिलेंगे! आपकी शाम अच्छी हो।|phir milenge! aapki shaam achchhi ho.|À bientôt ! Bonne soirée.|Bis bald! Schönen Abend noch.

@2|shop|Food & drink|Fruit and vegetables|Seller|You
a|Good morning! Fresh vegetables today. What would you like?|सुप्रभात! आज ताज़ी सब्ज़ियाँ हैं। क्या चाहिए?|suprabhaat! aaj taazi sabziyaan hain. kyaa chaahiye?|Bonjour ! Légumes frais aujourd'hui. Qu'est-ce qu'il vous faut ?|Guten Morgen! Heute frisches Gemüse. Was darf es sein?
b|How much are the tomatoes?|टमाटर कितने के हैं?|ṭamaaṭar kitne ke hain?|Combien coûtent les tomates ?|Was kosten die Tomaten?
a|Forty rupees a kilo. // Three euros a kilo.|चालीस रुपये किलो।|chaalees rupaye kilo.|Trois euros le kilo.|Drei Euro das Kilo.
b|I'll take two kilos. Are the mangoes sweet? // I'll take two kilos. Are the strawberries sweet?|दो किलो दे दीजिए। क्या आम मीठे हैं?|do kilo de dijiye. kyaa aam meeṭhe hain?|J'en prends deux kilos. Les fraises sont sucrées ?|Ich nehme zwei Kilo. Sind die Erdbeeren süß?
a|Very sweet! Try one.|बहुत मीठे हैं! एक चखकर देखिए।|bahut meeṭhe hain! ek chakhkar dekhiye.|Très sucrées ! Goûtez-en une.|Sehr süß! Probieren Sie mal eine.
b|Mmm, delicious. Half a kilo, please.|वाह, बहुत स्वादिष्ट। आधा किलो दीजिए।|vaah, bahut svaadisht. aadhaa kilo dijiye.|Mmm, délicieux. Un demi-kilo, s'il vous plaît.|Mmm, lecker. Ein halbes Kilo, bitte.
a|Anything else? Onions, potatoes?|और कुछ? प्याज़, आलू?|aur kuchh? pyaaz, aaloo?|Autre chose ? Des oignons, des pommes de terre ?|Sonst noch etwas? Zwiebeln, Kartoffeln?
b|One kilo of potatoes and some coriander. // One kilo of potatoes and some parsley.|एक किलो आलू और थोड़ा धनिया।|ek kilo aaloo aur thoḍaa dhaniyaa.|Un kilo de pommes de terre et un peu de persil.|Ein Kilo Kartoffeln und etwas Petersilie.
a|The coriander is free for you! // The parsley is free for you!|धनिया आपके लिए मुफ़्त है!|dhaniyaa aapke liye muft hai!|Le persil, je vous l'offre !|Die Petersilie schenke ich Ihnen!
b|Thank you! How much is it altogether?|धन्यवाद! कुल कितना हुआ?|dhanyavaad! kul kitnaa huaa?|Merci ! Ça fait combien en tout ?|Danke! Was macht das zusammen?
a|Two hundred and ten rupees. // Eleven euros fifty.|दो सौ दस रुपये।|do sau das rupaye.|Onze euros cinquante.|Elf Euro fünfzig.
b|Here is two hundred and fifty. // Here is twenty euros.|यह ढाई सौ लीजिए।|yah ḍhaai sau lijiye.|Voilà vingt euros.|Hier sind zwanzig Euro.
a|And forty rupees change. Do you have a bag? // And eight euros fifty change. Do you have a bag?|और चालीस रुपये वापस। आपके पास थैला है?|aur chaalees rupaye vaapas. aapke paas thailaa hai?|Et huit euros cinquante de monnaie. Vous avez un sac ?|Und acht Euro fünfzig zurück. Haben Sie eine Tasche?
b|Yes, I brought my own. See you next week!|हाँ, मैं अपना लाया हूँ। अगले हफ़्ते मिलते हैं!|haan, main apnaa laayaa hoon. agle hafte milte hain!|Oui, j'ai apporté le mien. À la semaine prochaine !|Ja, ich habe meine eigene dabei. Bis nächste Woche!

@3|bus|Transport|Which bus, which stop?|Traveller|Local
a|Excuse me, does this bus go to the hospital?|माफ़ कीजिए, क्या यह बस अस्पताल जाती है?|maaf kijiye, kyaa yah bas aspataal jaati hai?|Excusez-moi, ce bus va à l'hôpital ?|Entschuldigung, fährt dieser Bus zum Krankenhaus?
b|No, you need bus number forty-two.|नहीं, आपको बयालीस नंबर की बस लेनी होगी।|nahin, aapko bayaalees nambar ki bas leni hogi.|Non, il vous faut le bus quarante-deux.|Nein, Sie brauchen den Bus Nummer zweiundvierzig.
a|Where does it stop?|वह कहाँ रुकती है?|vah kahaan rukti hai?|Il s'arrête où ?|Wo hält er?
b|Across the road, in front of the bank.|सड़क के उस पार, बैंक के सामने।|saḍak ke us paar, bank ke saamne.|De l'autre côté de la rue, devant la banque.|Auf der anderen Straßenseite, vor der Bank.
a|How often does it come?|वह कितनी देर में आती है?|vah kitni der mein aati hai?|Il passe tous les combien ?|Wie oft fährt er?
b|Every ten minutes in the morning, but less often after eight at night.|सुबह हर दस मिनट में, पर रात आठ बजे के बाद कम आती है।|subah har das minaṭ mein, par raat aaṭh baje ke baad kam aati hai.|Toutes les dix minutes le matin, mais moins souvent après vingt heures.|Morgens alle zehn Minuten, aber nach acht Uhr abends seltener.
a|Do I need to buy a ticket before I get on?|क्या चढ़ने से पहले टिकट लेना होगा?|kyaa chaḍhne se pehle ṭikaṭ lenaa hogaa?|Je dois acheter un ticket avant de monter ?|Muss ich vor dem Einsteigen ein Ticket kaufen?
b|No, the conductor sells tickets on the bus. // No, you can buy one from the driver.|नहीं, कंडक्टर बस में टिकट देता है।|nahin, kanḍakṭar bas mein ṭikaṭ detaa hai.|Non, vous pouvez en acheter un auprès du chauffeur.|Nein, Sie können eins beim Fahrer kaufen.
a|How many stops is it to the hospital?|अस्पताल तक कितने स्टॉप हैं?|aspataal tak kitne sṭop hain?|Il y a combien d'arrêts jusqu'à l'hôpital ?|Wie viele Haltestellen sind es bis zum Krankenhaus?
b|Six or seven. Each stop is announced.|छह-सात। हर स्टॉप का नाम बोला जाता है।|chhah-saat. har sṭop kaa naam bolaa jaataa hai.|Six ou sept. Chaque arrêt est annoncé.|Sechs oder sieben. Jede Haltestelle wird angesagt.
a|Great. And how do I get back in the evening?|बढ़िया। और शाम को वापस कैसे आऊँ?|baḍhiyaa. aur shaam ko vaapas kaise aaoon?|Super. Et pour revenir le soir ?|Super. Und wie komme ich abends zurück?
b|Take the same bus from the other side.|उसी बस को दूसरी तरफ़ से पकड़िए।|usi bas ko doosri taraf se pakaḍiye.|Prenez le même bus de l'autre côté.|Nehmen Sie denselben Bus auf der anderen Seite.
a|Here it comes! Thank you so much.|लो, बस आ गई! बहुत शुक्रिया।|lo, bas aa gayi! bahut shukriyaa.|Le voilà ! Merci mille fois.|Da kommt er! Vielen herzlichen Dank.
b|You're welcome. Hold on tight, it's crowded!|कोई बात नहीं। कसकर पकड़िएगा, भीड़ है!|koi baat nahin. kaskar pakaḍiyegaa, bheeḍ hai!|Je vous en prie. Tenez-vous bien, il y a du monde !|Gern geschehen. Gut festhalten, er ist voll!

@4|restaurant|Describing|A full dinner|Waiter|Guest
a|Good evening. Do you have a reservation?|नमस्ते। क्या आपकी बुकिंग है?|namaste. kyaa aapki booking hai?|Bonsoir. Vous avez réservé ?|Guten Abend. Haben Sie reserviert?
b|Yes, a table for three, under the name Sharma. // Yes, a table for three, under the name Martin. // Yes, a table for three, under the name Weber.|हाँ, तीन लोगों की, शर्मा के नाम से।|haan, teen logon ki, Sharma ke naam se.|Oui, une table pour trois, au nom de Martin.|Ja, ein Tisch für drei, auf den Namen Weber.
a|Please follow me. Here is the menu.|मेरे साथ आइए। यह रहा मेन्यू।|mere saath aaiye. yah rahaa menu.|Suivez-moi, je vous prie. Voici la carte.|Folgen Sie mir bitte. Hier ist die Speisekarte.
b|What do you recommend?|आप क्या सुझाएँगे?|aap kyaa sujhaayenge?|Qu'est-ce que vous nous conseillez ?|Was empfehlen Sie?
a|The house special: chicken curry with rice. // The house special: duck with potatoes. // The house special: roast pork with dumplings.|हमारी ख़ास डिश: चिकन करी और चावल।|hamaari khaas dish: chicken curry aur chaaval.|La spécialité de la maison : le canard aux pommes de terre.|Die Spezialität des Hauses: Schweinebraten mit Knödeln.
b|Is there something vegetarian?|कुछ शाकाहारी है?|kuchh shaakaahaari hai?|Vous avez quelque chose de végétarien ?|Gibt es etwas Vegetarisches?
a|Yes, the spinach with paneer is very popular. // Yes, the vegetable gratin is very popular. // Yes, the cheese noodles are very popular.|हाँ, पालक पनीर बहुत पसंद किया जाता है।|haan, paalak paneer bahut pasand kiyaa jaataa hai.|Oui, le gratin de légumes a beaucoup de succès.|Ja, die Käsespätzle sind sehr beliebt.
b|Then one special, two vegetarian, and bread for everyone.|तो एक ख़ास डिश, दो शाकाहारी, और सबके लिए रोटी।|to ek khaas dish, do shaakaahaari, aur sabke liye roṭi.|Alors une spécialité, deux végétariens, et du pain pour tout le monde.|Dann einmal die Spezialität, zweimal vegetarisch und Brot für alle.
a|And to drink?|और पीने के लिए?|aur peene ke liye?|Et comme boisson ?|Und zu trinken?
b|A bottle of water and three fresh juices.|एक बोतल पानी और तीन ताज़ा जूस।|ek botal paani aur teen taazaa joos.|Une bouteille d'eau et trois jus de fruits frais.|Eine Flasche Wasser und drei frische Säfte.
a|How was everything?|सब कैसा लगा?|sab kaisaa lagaa?|Tout s'est bien passé ?|Hat alles geschmeckt?
b|Excellent! Could we see the dessert menu?|बहुत बढ़िया! क्या मीठे का मेन्यू मिल सकता है?|bahut baḍhiyaa! kyaa meeṭhe kaa menu mil saktaa hai?|Excellent ! On peut voir la carte des desserts ?|Ausgezeichnet! Können wir die Dessertkarte sehen?
a|Of course. Today we have mango ice cream. // Of course. Today we have chocolate mousse. // Of course. Today we have apple strudel.|ज़रूर। आज आम की आइसक्रीम है।|zaroor. aaj aam ki aaiskreem hai.|Bien sûr. Aujourd'hui, nous avons une mousse au chocolat.|Natürlich. Heute gibt es Apfelstrudel.
b|Three, please. And the bill afterwards.|तीन दीजिए। और उसके बाद बिल।|teen dijiye. aur uske baad bil.|Trois, s'il vous plaît. Et l'addition ensuite.|Dreimal, bitte. Und danach die Rechnung.
a|With pleasure.|ज़रूर, ख़ुशी से।|zaroor, khushi se.|Avec plaisir.|Sehr gern.

@5|office|Work|First day at work|Manager|You
a|Welcome to the team! Did you find the office easily?|टीम में आपका स्वागत है! ऑफ़िस आसानी से मिल गया?|ṭeem mein aapkaa svaagat hai! office aasaani se mil gayaa?|Bienvenue dans l'équipe ! Vous avez trouvé le bureau facilement ?|Willkommen im Team! Haben Sie das Büro gut gefunden?
b|Yes, thank you. I'm a little nervous.|हाँ, धन्यवाद। मैं थोड़ा घबराया हुआ हूँ।|haan, dhanyavaad. main thoḍaa ghabraayaa huaa hoon.|Oui, merci. Je suis un peu nerveux.|Ja, danke. Ich bin ein bisschen nervös.
a|That's normal. Let me show you around.|यह तो आम बात है। चलिए, मैं आपको सब दिखाती हूँ।|yah to aam baat hai. chaliye, main aapko sab dikhaati hoon.|C'est normal. Je vais vous faire visiter.|Das ist normal. Ich zeige Ihnen alles.
a|This is your desk, and here is your laptop.|यह आपकी डेस्क है, और यह आपका लैपटॉप।|yah aapki desk hai, aur yah aapkaa laptop.|Voici votre bureau, et voici votre ordinateur portable.|Das ist Ihr Schreibtisch, und hier ist Ihr Laptop.
b|What is the password for the Wi-Fi?|वाई-फ़ाई का पासवर्ड क्या है?|Wi-Fi kaa password kyaa hai?|Quel est le mot de passe du wifi ?|Wie lautet das WLAN-Passwort?
a|It's on the card next to the screen.|स्क्रीन के पास वाले कार्ड पर लिखा है।|screen ke paas vaale card par likhaa hai.|Il est sur la carte à côté de l'écran.|Es steht auf der Karte neben dem Bildschirm.
b|What time do we usually start and finish?|हम आमतौर पर कितने बजे शुरू और ख़त्म करते हैं?|ham aamtaur par kitne baje shuroo aur khatm karte hain?|On commence et on finit à quelle heure, d'habitude ?|Wann fangen wir normalerweise an und wann hören wir auf?
a|From nine to six, with an hour for lunch.|नौ से छह बजे तक, खाने के लिए एक घंटा।|nau se chhah baje tak, khaane ke liye ek ghanṭaa.|De neuf heures à dix-huit heures, avec une heure pour déjeuner.|Von neun bis achtzehn Uhr, mit einer Stunde Mittagspause.
a|Every Monday at ten we have a team meeting.|हर सोमवार दस बजे टीम मीटिंग होती है।|har somvaar das baje ṭeem meeṭing hoti hai.|Tous les lundis à dix heures, nous avons une réunion d'équipe.|Jeden Montag um zehn haben wir ein Teammeeting.
b|Who should I ask if I have questions?|अगर मेरे सवाल हों तो किससे पूछूँ?|agar mere savaal hon to kisse poochhoon?|À qui je m'adresse si j'ai des questions ?|Wen kann ich fragen, wenn ich Fragen habe?
a|Ask Ravi, he sits next to you. // Ask Julien, he sits next to you. // Ask Jonas, he sits next to you.|रवि से पूछिए, वे आपके बगल में बैठते हैं।|Ravi se poochhiye, ve aapke bagal mein baiṭhte hain.|Demandez à Julien, il est assis à côté de vous.|Fragen Sie Jonas, er sitzt neben Ihnen.
b|Thank you. Where is the kitchen?|धन्यवाद। किचन कहाँ है?|dhanyavaad. kichan kahaan hai?|Merci. Où est la cuisine ?|Danke. Wo ist die Küche?
a|At the end of the corridor. Tea and coffee are free.|गलियारे के आख़िर में। चाय-कॉफ़ी मुफ़्त है।|galiyaare ke aakhir mein. chaay-kofi muft hai.|Au bout du couloir. Le thé et le café sont gratuits.|Am Ende des Flurs. Tee und Kaffee sind kostenlos.
b|Perfect. I'm looking forward to working here.|बढ़िया। मैं यहाँ काम करने के लिए उत्सुक हूँ।|baḍhiyaa. main yahaan kaam karne ke liye utsuk hoon.|Parfait. J'ai hâte de travailler ici.|Perfekt. Ich freue mich auf die Arbeit hier.
a|We're happy to have you.|हमें ख़ुशी है कि आप हमारे साथ हैं।|hamen khushi hai ki aap hamaare saath hain.|Nous sommes contents de vous avoir parmi nous.|Wir freuen uns, dass Sie da sind.

@6|family|Family|How was your day?|Mum|Child
a|You're home late today. How was school?|आज देर से आए। स्कूल कैसा रहा?|aaj der se aaye. school kaisaa rahaa?|Tu rentres tard aujourd'hui. Comment ça s'est passé à l'école ?|Du bist heute spät. Wie war die Schule?
b|Good. We had a maths test.|अच्छा। हमारा गणित का टेस्ट था।|achchhaa. hamaaraa gaṇit kaa ṭesṭ thaa.|Bien. On a eu un contrôle de maths.|Gut. Wir hatten eine Mathearbeit.
a|Oh! Was it difficult?|अरे! मुश्किल था?|are! mushkil thaa?|Ah ! C'était difficile ?|Oh! War sie schwer?
b|A little. But I think I did well.|थोड़ा। पर मुझे लगता है अच्छा गया।|thoḍaa. par mujhe lagtaa hai achchhaa gayaa.|Un peu. Mais je crois que j'ai bien réussi.|Ein bisschen. Aber ich glaube, es lief gut.
a|Well done. Why are you late?|शाबाश। देर क्यों हुई?|shaabaash. der kyon hui?|Bravo. Pourquoi tu es en retard ?|Gut gemacht. Warum bist du so spät?
b|I played football with my friends after class.|क्लास के बाद मैं दोस्तों के साथ फ़ुटबॉल खेला।|klaas ke baad main doston ke saath fuṭbol khelaa.|J'ai joué au foot avec mes copains après les cours.|Ich habe nach dem Unterricht mit meinen Freunden Fußball gespielt.
a|Next time, send me a message, okay?|अगली बार मुझे मैसेज कर देना, ठीक है?|agli baar mujhe maisej kar denaa, ṭheek hai?|La prochaine fois, envoie-moi un message, d'accord ?|Schick mir nächstes Mal eine Nachricht, okay?
b|Sorry, my phone battery was dead.|माफ़ करना, मेरे फ़ोन की बैटरी ख़त्म हो गई थी।|maaf karnaa, mere fon ki baiṭari khatm ho gayi thi.|Désolé, mon téléphone n'avait plus de batterie.|Tut mir leid, mein Handyakku war leer.
a|All right. Wash your hands, dinner is almost ready.|ठीक है। हाथ धो लो, खाना लगभग तैयार है।|ṭheek hai. haath dho lo, khaanaa lagbhag taiyaar hai.|Bon. Lave-toi les mains, le dîner est presque prêt.|Na gut. Wasch dir die Hände, das Essen ist fast fertig.
b|Where is my sister?|दीदी कहाँ है?|didi kahaan hai?|Où est ma sœur ?|Wo ist meine Schwester?
a|She is at her friend's house. Dad will pick her up.|वह अपनी सहेली के घर है। पापा उसे ले आएँगे।|vah apni saheli ke ghar hai. paapaa use le aayenge.|Elle est chez son amie. Papa va aller la chercher.|Sie ist bei ihrer Freundin. Papa holt sie ab.
b|Can I watch TV after dinner?|क्या मैं खाने के बाद टीवी देख सकता हूँ?|kyaa main khaane ke baad TV dekh saktaa hoon?|Je peux regarder la télé après le dîner ?|Darf ich nach dem Essen fernsehen?
a|After your homework. Half an hour only.|होमवर्क के बाद। सिर्फ़ आधा घंटा।|homvark ke baad. sirf aadhaa ghanṭaa.|Après tes devoirs. Une demi-heure seulement.|Nach den Hausaufgaben. Nur eine halbe Stunde.
b|Okay, deal! You're the best, Mum.|ठीक है, पक्का! मम्मी, आप सबसे अच्छी हो!|ṭheek hai, pakkaa! mummy, aap sabse achchhi ho!|D'accord, marché conclu ! Tu es la meilleure, maman.|Okay, abgemacht! Du bist die Beste, Mama.

@7|friends|Time|Weekend plans|Friend|You
a|What are you doing this weekend?|इस वीकेंड क्या कर रहे हो?|is weekend kyaa kar rahe ho?|Tu fais quoi ce week-end ?|Was machst du am Wochenende?
b|Nothing special yet. Why?|अभी कुछ ख़ास नहीं। क्यों?|abhi kuchh khaas nahin. kyon?|Rien de spécial pour l'instant. Pourquoi ?|Noch nichts Besonderes. Warum?
a|Some of us are going to the mountains on Saturday. Want to come?|कुछ दोस्त शनिवार को पहाड़ों पर जा रहे हैं। चलोगे?|kuchh dost shanivaar ko pahaaḍon par jaa rahe hain. chaloge?|Quelques amis vont à la montagne samedi. Tu viens ?|Ein paar von uns fahren am Samstag in die Berge. Kommst du mit?
b|Sounds great! How are we getting there?|बढ़िया! वहाँ कैसे जाएँगे?|baḍhiyaa! vahaan kaise jaayenge?|Génial ! On y va comment ?|Klingt super! Wie kommen wir hin?
a|By car. We'll leave at six in the morning.|गाड़ी से। सुबह छह बजे निकलेंगे।|gaaḍi se. subah chhah baje niklenge.|En voiture. On part à six heures du matin.|Mit dem Auto. Wir fahren um sechs Uhr morgens los.
b|Six?! That's very early.|छह बजे?! बहुत जल्दी है।|chhah baje?! bahut jaldi hai.|Six heures ?! C'est très tôt.|Um sechs?! Das ist sehr früh.
a|I know, but the view at sunrise is amazing.|पता है, पर सूर्योदय का नज़ारा कमाल का होता है।|pataa hai, par sooryoday kaa nazaaraa kamaal kaa hotaa hai.|Je sais, mais la vue au lever du soleil est incroyable.|Ich weiß, aber die Aussicht bei Sonnenaufgang ist unglaublich.
b|Fine, I'll come. What should I bring?|ठीक है, मैं चलूँगा। क्या लेकर आऊँ?|ṭheek hai, main chaloongaa. kyaa lekar aaoon?|D'accord, je viens. J'apporte quoi ?|Na gut, ich komme mit. Was soll ich mitbringen?
a|Good shoes, a warm jacket and some snacks.|अच्छे जूते, गरम जैकेट और कुछ नाश्ता।|achchhe joote, garam jaikeṭ aur kuchh naashtaa.|De bonnes chaussures, une veste chaude et quelques en-cas.|Gute Schuhe, eine warme Jacke und ein paar Snacks.
b|Will it rain?|बारिश होगी क्या?|baarish hogi kyaa?|Il va pleuvoir ?|Wird es regnen?
a|The forecast says sunny, but cold in the evening.|मौसम का अनुमान है कि धूप रहेगी, पर शाम को ठंड होगी।|mausam kaa anumaan hai ki dhoop rahegi, par shaam ko ṭhanḍ hogi.|La météo annonce du soleil, mais il fera froid le soir.|Der Wetterbericht sagt Sonne, aber abends wird es kalt.
b|Can my cousin come too?|क्या मेरा कज़िन भी आ सकता है?|kyaa meraa kazin bhi aa saktaa hai?|Mon cousin peut venir aussi ?|Kann mein Cousin auch mitkommen?
a|Of course, there's one free seat.|हाँ, एक सीट ख़ाली है।|haan, ek seeṭ khaali hai.|Bien sûr, il reste une place.|Klar, es ist noch ein Platz frei.
b|Great. Text me the address, see you Saturday!|बढ़िया। पता मैसेज कर देना, शनिवार को मिलते हैं!|baḍhiyaa. pataa maisej kar denaa, shanivaar ko milte hain!|Super. Envoie-moi l'adresse, à samedi !|Super. Schick mir die Adresse, bis Samstag!

@8|train|Days & months|Train tickets and a delay|Traveller|Clerk
a|I'd like a ticket to Delhi for tomorrow morning. // I'd like a ticket to Paris for tomorrow morning. // I'd like a ticket to Berlin for tomorrow morning.|मुझे कल सुबह के लिए दिल्ली का एक टिकट चाहिए।|mujhe kal subah ke liye Dilli kaa ek ṭikaṭ chaahiye.|Je voudrais un billet pour Paris pour demain matin.|Ich hätte gern eine Fahrkarte nach Berlin für morgen früh.
b|There is a fast train at 7:15 and a slower one at 8:45.|सवा सात बजे एक तेज़ ट्रेन है और पौने नौ बजे एक धीमी।|savaa saat baje ek tez ṭren hai aur paune nau baje ek dheemi.|Il y a un train rapide à sept heures quinze et un plus lent à huit heures quarante-cinq.|Es gibt einen schnellen Zug um Viertel nach sieben und einen langsameren um Viertel vor neun.
a|How long does the fast train take?|तेज़ ट्रेन कितना समय लेती है?|tez ṭren kitnaa samay leti hai?|Le train rapide met combien de temps ?|Wie lange braucht der schnelle Zug?
b|Three and a half hours. The other one takes five.|साढ़े तीन घंटे। दूसरी पाँच घंटे लेती है।|saaḍhe teen ghanṭe. doosri paanch ghanṭe leti hai.|Trois heures et demie. L'autre en met cinq.|Dreieinhalb Stunden. Der andere braucht fünf.
a|The fast one, please. A window seat, if possible.|तेज़ वाली दीजिए। हो सके तो खिड़की वाली सीट।|tez vaali dijiye. ho sake to khiḍki vaali seeṭ.|Le rapide, s'il vous plaît. Une place côté fenêtre, si possible.|Den schnellen, bitte. Einen Fensterplatz, wenn möglich.
b|Window seat in coach C, seat twenty-four.|कोच सी में खिड़की वाली सीट, चौबीस नंबर।|koch C mein khiḍki vaali seeṭ, chaubees nambar.|Côté fenêtre, voiture C, place vingt-quatre.|Fensterplatz in Wagen C, Platz vierundzwanzig.
a|Thank you. Which platform?|धन्यवाद। कौन सा प्लेटफ़ॉर्म?|dhanyavaad. kaun saa pleṭfaarm?|Merci. Quelle voie ?|Danke. Welches Gleis?
b|Usually platform three, but check the board.|आमतौर पर तीन नंबर, पर बोर्ड पर देख लीजिए।|aamtaur par teen nambar, par borḍ par dekh lijiye.|En général la voie trois, mais vérifiez le panneau.|Normalerweise Gleis drei, aber schauen Sie auf die Anzeigetafel.
a|Excuse me, is the 7:15 train late?|माफ़ कीजिए, क्या सवा सात वाली ट्रेन लेट है?|maaf kijiye, kyaa savaa saat vaali ṭren leṭ hai?|Excusez-moi, le train de sept heures quinze est en retard ?|Entschuldigung, hat der Zug um Viertel nach sieben Verspätung?
b|Yes, about twenty minutes, because of fog.|हाँ, कोहरे की वजह से लगभग बीस मिनट।|haan, kohre ki vajah se lagbhag bees minaṭ.|Oui, d'environ vingt minutes, à cause du brouillard.|Ja, etwa zwanzig Minuten, wegen Nebel.
a|Is there a waiting room?|क्या यहाँ वेटिंग रूम है?|kyaa yahaan veṭing room hai?|Il y a une salle d'attente ?|Gibt es einen Warteraum?
b|Yes, next to the café, on the left.|हाँ, कैफ़े के बगल में, बाईं तरफ़।|haan, kaife ke bagal mein, baayin taraf.|Oui, à côté du café, sur la gauche.|Ja, neben dem Café, auf der linken Seite.
a|Will they announce the new time?|क्या नया समय बताया जाएगा?|kyaa nayaa samay bataayaa jaayegaa?|Ils vont annoncer la nouvelle heure ?|Wird die neue Zeit durchgesagt?
b|Yes, listen for the announcements and watch the screens.|हाँ, घोषणाएँ सुनते रहिए और स्क्रीन देखते रहिए।|haan, ghoshṇaayen sunte rahiye aur skreen dekhte rahiye.|Oui, écoutez les annonces et regardez les écrans.|Ja, achten Sie auf die Durchsagen und die Bildschirme.

@9|shop|Clothes|Clothes and returns|Assistant|Customer
b|Excuse me, I bought this jacket yesterday.|माफ़ कीजिए, मैंने यह जैकेट कल ख़रीदी थी।|maaf kijiye, maine yah jaikeṭ kal khareedi thi.|Excusez-moi, j'ai acheté cette veste hier.|Entschuldigung, ich habe diese Jacke gestern gekauft.
a|Yes? Is there a problem?|जी? कोई दिक़्क़त है?|ji? koi diqqat hai?|Oui ? Il y a un problème ?|Ja? Gibt es ein Problem?
b|It's too small. Can I exchange it?|यह बहुत छोटी है। क्या मैं इसे बदल सकता हूँ?|yah bahut chhoṭi hai. kyaa main ise badal saktaa hoon?|Elle est trop petite. Je peux l'échanger ?|Sie ist zu klein. Kann ich sie umtauschen?
a|Of course. Do you have the receipt?|ज़रूर। आपके पास रसीद है?|zaroor. aapke paas raseed hai?|Bien sûr. Vous avez le ticket de caisse ?|Natürlich. Haben Sie den Kassenbon?
b|Here it is.|यह रही।|yah rahi.|Le voici.|Hier ist er.
a|What size do you need?|आपको कौन सा साइज़ चाहिए?|aapko kaun saa saaiz chaahiye?|Quelle taille vous faut-il ?|Welche Größe brauchen Sie?
b|One size bigger. Large, I think.|एक साइज़ बड़ा। शायद लार्ज।|ek saaiz baḍaa. shaayad laarj.|Une taille au-dessus. Du L, je pense.|Eine Nummer größer. L, glaube ich.
a|I'm sorry, we don't have large in black. Only in grey or green.|माफ़ कीजिए, लार्ज काले में नहीं है। सिर्फ़ सलेटी या हरे में है।|maaf kijiye, laarj kaale mein nahin hai. sirf saleṭi yaa hare mein hai.|Désolée, nous n'avons plus de L en noir. Seulement en gris ou en vert.|Tut mir leid, L haben wir nicht in Schwarz. Nur in Grau oder Grün.
b|Can I try the grey one?|क्या मैं सलेटी वाली पहनकर देख सकता हूँ?|kyaa main saleṭi vaali pahankar dekh saktaa hoon?|Je peux essayer la grise ?|Kann ich die graue anprobieren?
a|The fitting room is over there.|ट्रायल रूम उधर है।|ṭraayal room udhar hai.|La cabine d'essayage est là-bas.|Die Umkleidekabine ist da drüben.
b|It fits well, but I prefer black. Can I get my money back?|ठीक आती है, पर मुझे काली पसंद है। क्या मुझे पैसे वापस मिल सकते हैं?|ṭheek aati hai, par mujhe kaali pasand hai. kyaa mujhe paise vaapas mil sakte hain?|Elle me va bien, mais je préfère le noir. Je peux être remboursé ?|Sie passt gut, aber ich mag Schwarz lieber. Kann ich mein Geld zurückbekommen?
a|Yes, within thirty days. Or we can order black for you.|हाँ, तीस दिन के अंदर। या हम आपके लिए काली मँगवा सकते हैं।|haan, tees din ke andar. yaa ham aapke liye kaali mangvaa sakte hain.|Oui, sous trente jours. Ou nous pouvons la commander en noir.|Ja, innerhalb von dreißig Tagen. Oder wir bestellen sie Ihnen in Schwarz.
b|How long would that take?|उसमें कितना समय लगेगा?|usmen kitnaa samay lagegaa?|Ça prendrait combien de temps ?|Wie lange würde das dauern?
a|Three to five days. We'll call you when it arrives.|तीन से पाँच दिन। आने पर हम आपको फ़ोन करेंगे।|teen se paanch din. aane par ham aapko fon karenge.|De trois à cinq jours. On vous appellera quand elle arrivera.|Drei bis fünf Tage. Wir rufen Sie an, wenn sie da ist.
b|Perfect, let's do that.|बढ़िया, ऐसा ही कीजिए।|baḍhiyaa, aisaa hi kijiye.|Parfait, faisons comme ça.|Perfekt, machen wir das so.

@10|office|Verbs|The project deadline|Manager|You
a|Let's start. Where are we with the new website?|शुरू करते हैं। नई वेबसाइट का काम कहाँ तक पहुँचा?|shuroo karte hain. nayi vebsaaiṭ kaa kaam kahaan tak pahunchaa?|Commençons. Où en est le nouveau site web ?|Fangen wir an. Wie weit sind wir mit der neuen Website?
b|The design is finished. We are testing the pages now.|डिज़ाइन पूरा हो गया है। अभी हम पेज टेस्ट कर रहे हैं।|dizaain pooraa ho gayaa hai. abhi ham pej ṭesṭ kar rahe hain.|Le design est terminé. Nous testons les pages en ce moment.|Das Design ist fertig. Wir testen gerade die Seiten.
a|The client wants to launch on the fifteenth. Is that possible?|क्लाइंट पंद्रह तारीख़ को लॉन्च करना चाहता है। क्या यह मुमकिन है?|klaainṭ pandrah taareekh ko lonch karnaa chaahtaa hai. kyaa yah mumkin hai?|Le client veut lancer le site le quinze. C'est possible ?|Der Kunde will am Fünfzehnten starten. Ist das möglich?
b|It will be difficult. We found some bugs on the payment page.|मुश्किल होगा। पेमेंट पेज में कुछ गड़बड़ियाँ मिली हैं।|mushkil hogaa. pemenṭ pej mein kuchh gaḍbaḍiyaan mili hain.|Ce sera difficile. Nous avons trouvé des bugs sur la page de paiement.|Das wird schwierig. Wir haben Fehler auf der Bezahlseite gefunden.
a|How many days do you need?|आपको कितने दिन चाहिए?|aapko kitne din chaahiye?|Il vous faut combien de jours ?|Wie viele Tage brauchen Sie?
b|If Neha helps us, five days. Otherwise eight. // If Sophie helps us, five days. Otherwise eight. // If Lena helps us, five days. Otherwise eight.|अगर नेहा मदद करे तो पाँच दिन। वरना आठ।|agar Neha madad kare to paanch din. varnaa aaṭh.|Si Sophie nous aide, cinq jours. Sinon, huit.|Wenn Lena uns hilft, fünf Tage. Sonst acht.
a|I'll ask her today. What else is blocking you?|मैं आज ही उससे बात करती हूँ। और क्या रुकावट है?|main aaj hi usse baat karti hoon. aur kyaa rukaavaṭ hai?|Je lui demande aujourd'hui. Qu'est-ce qui vous bloque encore ?|Ich frage sie heute. Was hält Sie sonst noch auf?
b|We are still waiting for the photos from the client.|हम अब भी क्लाइंट से फ़ोटो का इंतज़ार कर रहे हैं।|ham ab bhi klaainṭ se foṭo kaa intazaar kar rahe hain.|Nous attendons toujours les photos du client.|Wir warten noch auf die Fotos vom Kunden.
a|I'll call them after this meeting.|मैं इस मीटिंग के बाद उन्हें फ़ोन करती हूँ।|main is meeṭing ke baad unhen fon karti hoon.|Je les appelle après cette réunion.|Ich rufe ihn nach diesem Meeting an.
b|Thank you. Should we work on Saturday?|धन्यवाद। क्या हमें शनिवार को काम करना चाहिए?|dhanyavaad. kyaa hamen shanivaar ko kaam karnaa chaahiye?|Merci. Est-ce qu'on doit travailler samedi ?|Danke. Sollen wir am Samstag arbeiten?
a|Only if it's really necessary. Health comes first.|सिर्फ़ अगर बहुत ज़रूरी हो। सेहत पहले है।|sirf agar bahut zaroori ho. sehat pehle hai.|Seulement si c'est vraiment nécessaire. La santé d'abord.|Nur wenn es wirklich nötig ist. Die Gesundheit geht vor.
b|Okay. I'll send you an update every evening.|ठीक है। मैं आपको हर शाम अपडेट भेजूँगा।|ṭheek hai. main aapko har shaam apḍeṭ bhejoongaa.|D'accord. Je vous envoie un point chaque soir.|Okay. Ich schicke Ihnen jeden Abend ein Update.
a|Great. Good work, everyone.|बहुत अच्छा। सबने अच्छा काम किया।|bahut achchhaa. sabne achchhaa kaam kiyaa.|Très bien. Bon travail, tout le monde.|Sehr gut. Gute Arbeit, alle zusammen.

@11|clinic|Body & health|At the doctor|Doctor|Patient
a|Please sit down. What seems to be the problem?|बैठिए। क्या तकलीफ़ है?|baiṭhiye. kyaa takleef hai?|Asseyez-vous. Qu'est-ce qui ne va pas ?|Setzen Sie sich bitte. Was fehlt Ihnen?
b|I have had a headache and a fever for two days.|मुझे दो दिन से सिरदर्द और बुख़ार है।|mujhe do din se sirdard aur bukhaar hai.|J'ai mal à la tête et de la fièvre depuis deux jours.|Ich habe seit zwei Tagen Kopfschmerzen und Fieber.
a|Do you have a cough or a sore throat?|खाँसी या गले में दर्द है?|khaansi yaa gale mein dard hai?|Vous toussez ? Vous avez mal à la gorge ?|Haben Sie Husten oder Halsschmerzen?
b|A little cough, and my whole body aches.|थोड़ी खाँसी है, और बदन दर्द है।|thoḍi khaansi hai, aur badan dard hai.|Je tousse un peu, et j'ai des courbatures.|Ein bisschen Husten, und mir tut alles weh.
a|Let me check your temperature... thirty-eight and a half degrees.|ज़रा बुख़ार देख लूँ... साढ़े अड़तीस डिग्री।|zaraa bukhaar dekh loon... saaḍhe aḍtees ḍigri.|Je vais prendre votre température... trente-huit cinq.|Ich messe mal Fieber... achtunddreißig Komma fünf.
b|Is it serious?|क्या यह गंभीर है?|kyaa yah gambheer hai?|C'est grave ?|Ist es schlimm?
a|No, it looks like the flu. You need rest and lots of water.|नहीं, फ़्लू लग रहा है। आपको आराम और ख़ूब पानी चाहिए।|nahin, floo lag rahaa hai. aapko aaraam aur khoob paani chaahiye.|Non, ça ressemble à une grippe. Il vous faut du repos et beaucoup d'eau.|Nein, es sieht nach Grippe aus. Sie brauchen Ruhe und viel Wasser.
a|Take this medicine three times a day, after meals.|यह दवा दिन में तीन बार, खाने के बाद लीजिए।|yah davaa din mein teen baar, khaane ke baad lijiye.|Prenez ce médicament trois fois par jour, après les repas.|Nehmen Sie dieses Medikament dreimal täglich nach dem Essen.
b|For how many days?|कितने दिन तक?|kitne din tak?|Pendant combien de jours ?|Wie viele Tage lang?
a|Five days. If the fever doesn't go down, come back on Friday.|पाँच दिन। अगर बुख़ार न उतरे तो शुक्रवार को फिर आइए।|paanch din. agar bukhaar na utre to shukravaar ko phir aaiye.|Cinq jours. Si la fièvre ne baisse pas, revenez vendredi.|Fünf Tage. Wenn das Fieber nicht sinkt, kommen Sie am Freitag wieder.
b|Can I go to work tomorrow?|क्या मैं कल काम पर जा सकता हूँ?|kyaa main kal kaam par jaa saktaa hoon?|Je peux aller travailler demain ?|Kann ich morgen arbeiten gehen?
a|No, stay home for at least three days. I'll write you a sick note.|नहीं, कम से कम तीन दिन घर पर रहिए। मैं आपको ऑफ़िस के लिए पर्ची लिख देता हूँ।|nahin, kam se kam teen din ghar par rahiye. main aapko office ke liye parchi likh detaa hoon.|Non, restez chez vous au moins trois jours. Je vous fais un arrêt de travail.|Nein, bleiben Sie mindestens drei Tage zu Hause. Ich schreibe Sie krank.
b|Thank you, doctor.|धन्यवाद, डॉक्टर साहब।|dhanyavaad, ḍokṭar saahab.|Merci, docteur.|Danke, Herr Doktor.
a|Get well soon!|जल्दी ठीक हो जाइए!|jaldi ṭheek ho jaaiye!|Bon rétablissement !|Gute Besserung!

@12|friends|Feelings|Planning a surprise party|Friend|You
a|Rahul's birthday is next Friday. Shall we throw a surprise party? // Lucas's birthday is next Friday. Shall we throw a surprise party? // Max's birthday is next Friday. Shall we throw a surprise party?|अगले शुक्रवार राहुल का जन्मदिन है। सरप्राइज़ पार्टी करें?|agle shukravaar Rahul kaa janmdin hai. sarpraaiz paarṭi karen?|L'anniversaire de Lucas, c'est vendredi prochain. On lui fait une fête surprise ?|Max hat nächsten Freitag Geburtstag. Machen wir eine Überraschungsparty?
b|Great idea! Where?|बढ़िया आइडिया! कहाँ?|baḍhiyaa aaiḍiyaa! kahaan?|Excellente idée ! Où ça ?|Tolle Idee! Wo?
a|At my flat. It's big enough for fifteen people.|मेरे फ़्लैट पर। पंद्रह लोगों के लिए काफ़ी बड़ा है।|mere flaiṭ par. pandrah logon ke liye kaafi baḍaa hai.|Chez moi. C'est assez grand pour quinze personnes.|Bei mir. Die Wohnung ist groß genug für fünfzehn Leute.
b|I can make the cake. What flavour does he like?|केक मैं बना सकता हूँ। उसे कौन सा फ़्लेवर पसंद है?|kek main banaa saktaa hoon. use kaun saa flevar pasand hai?|Je peux faire le gâteau. Il aime quel parfum ?|Ich kann den Kuchen backen. Welche Sorte mag er?
a|Chocolate, definitely.|चॉकलेट, पक्का।|choklet, pakkaa.|Chocolat, évidemment.|Schokolade, auf jeden Fall.
b|Who will invite the others?|बाक़ी लोगों को कौन बुलाएगा?|baaqi logon ko kaun bulaayegaa?|Qui invite les autres ?|Wer lädt die anderen ein?
a|I'll make a group chat, but don't tell him!|मैं एक ग्रुप चैट बना दूँगा, पर उसे मत बताना!|main ek grup chaiṭ banaa doongaa, par use mat bataanaa!|Je crée un groupe de discussion, mais ne lui dis rien !|Ich mache einen Gruppenchat, aber verrate ihm nichts!
b|My lips are sealed. What about a present?|मेरे होंठ सिले हैं। तोहफ़े का क्या?|mere honṭh sile hain. tohfe kaa kyaa?|Motus et bouche cousue. Et pour le cadeau ?|Ich schweige wie ein Grab. Und das Geschenk?
a|Everyone gives five hundred rupees, and we buy him headphones. // Everyone gives ten euros, and we buy him headphones.|सब पाँच-पाँच सौ रुपये दें, और हम उसके लिए हेडफ़ोन ले लें।|sab paanch-paanch sau rupaye den, aur ham uske liye heḍfon le len.|Chacun donne dix euros, et on lui achète un casque.|Jeder gibt zehn Euro, und wir kaufen ihm Kopfhörer.
b|Perfect. How do we get him to your place?|बढ़िया। उसे तुम्हारे घर कैसे लाएँगे?|baḍhiyaa. use tumhaare ghar kaise laayenge?|Parfait. Comment on le fait venir chez toi ?|Perfekt. Wie bekommen wir ihn zu dir?
a|You invite him for dinner at eight. We'll all be hiding.|तुम उसे आठ बजे खाने पर बुलाओ। हम सब छिपे रहेंगे।|tum use aaṭh baje khaane par bulaao. ham sab chhipe rahenge.|Tu l'invites à dîner à vingt heures. On sera tous cachés.|Du lädst ihn um acht zum Essen ein. Wir verstecken uns alle.
b|Ha! He'll be so surprised.|हा! वह बहुत हैरान होगा।|haa! vah bahut hairaan hogaa.|Ha ! Il va être tellement surpris.|Ha! Er wird so überrascht sein.
a|Let's meet at seven to decorate.|सजाने के लिए सात बजे मिलते हैं।|sajaane ke liye saat baje milte hain.|Rendez-vous à dix-neuf heures pour décorer.|Treffen wir uns um sieben zum Dekorieren.

@13|hotel|Travel|Checking in at a hotel|Receptionist|Guest
a|Good evening, welcome. How can I help you?|शुभ संध्या, स्वागत है। मैं आपकी क्या मदद कर सकती हूँ?|shubh sandhyaa, svaagat hai. main aapki kyaa madad kar sakti hoon?|Bonsoir et bienvenue. Que puis-je faire pour vous ?|Guten Abend, willkommen. Wie kann ich Ihnen helfen?
b|I have a booking for two nights.|मेरी दो रातों की बुकिंग है।|meri do raaton ki buking hai.|J'ai une réservation pour deux nuits.|Ich habe eine Reservierung für zwei Nächte.
a|May I see your passport, please?|क्या मैं आपका पासपोर्ट देख सकती हूँ?|kyaa main aapkaa paasporṭ dekh sakti hoon?|Je peux voir votre passeport, s'il vous plaît ?|Darf ich bitte Ihren Reisepass sehen?
b|Here you are.|यह लीजिए।|yah lijiye.|Le voici.|Bitte schön.
a|Thank you. Your room is five hundred and twelve, on the fifth floor.|धन्यवाद। आपका कमरा पाँच सौ बारह है, पाँचवीं मंज़िल पर।|dhanyavaad. aapkaa kamraa paanch sau baarah hai, paanchvin manzil par.|Merci. Votre chambre est la cinq cent douze, au cinquième étage.|Danke. Ihr Zimmer ist die Fünfhundertzwölf im fünften Stock.
b|Is breakfast included?|क्या नाश्ता शामिल है?|kyaa naashtaa shaamil hai?|Le petit-déjeuner est compris ?|Ist das Frühstück inklusive?
a|Yes, from seven to ten in the restaurant downstairs.|हाँ, सात से दस बजे तक, नीचे रेस्टोरेंट में।|haan, saat se das baje tak, neeche resṭoranṭ mein.|Oui, de sept heures à dix heures, au restaurant en bas.|Ja, von sieben bis zehn Uhr im Restaurant unten.
b|Is there Wi-Fi in the room?|क्या कमरे में वाई-फ़ाई है?|kyaa kamre mein vaai-faai hai?|Il y a le wifi dans la chambre ?|Gibt es WLAN im Zimmer?
a|Yes, it's free. The password is on your key card.|हाँ, मुफ़्त है। पासवर्ड आपके की-कार्ड पर है।|haan, muft hai. paasvarḍ aapke kee-kaarḍ par hai.|Oui, il est gratuit. Le mot de passe est sur votre carte.|Ja, kostenlos. Das Passwort steht auf Ihrer Schlüsselkarte.
b|Could I have a wake-up call at six tomorrow?|क्या कल सुबह छह बजे मुझे जगाने के लिए फ़ोन कर सकते हैं?|kyaa kal subah chhah baje mujhe jagaane ke liye fon kar sakte hain?|Je pourrais avoir un réveil à six heures demain ?|Könnten Sie mich morgen um sechs wecken?
a|Of course. Do you need a taxi to the airport too?|ज़रूर। क्या आपको एयरपोर्ट के लिए टैक्सी भी चाहिए?|zaroor. kyaa aapko eyarporṭ ke liye ṭaiksi bhi chaahiye?|Bien sûr. Vous avez aussi besoin d'un taxi pour l'aéroport ?|Selbstverständlich. Brauchen Sie auch ein Taxi zum Flughafen?
b|Not tomorrow, but on Sunday at nine, please.|कल नहीं, रविवार को नौ बजे, प्लीज़।|kal nahin, ravivaar ko nau baje, pleez.|Pas demain, mais dimanche à neuf heures, s'il vous plaît.|Morgen nicht, aber am Sonntag um neun, bitte.
a|Noted. The lift is on your right. Enjoy your stay!|नोट कर लिया। लिफ़्ट आपकी दाईं तरफ़ है। आपका ठहरना सुखद हो!|noṭ kar liyaa. lifṭ aapki daayin taraf hai. aapkaa ṭhaharnaa sukhad ho!|C'est noté. L'ascenseur est sur votre droite. Bon séjour !|Notiert. Der Aufzug ist rechts. Einen schönen Aufenthalt!

@14|family|Weather & nature|Grandpa's stories|Grandpa|Grandchild
b|Grandpa, what was life like when you were young?|दादाजी, जब आप जवान थे तब ज़िंदगी कैसी थी?|daadaaji, jab aap javaan the tab zindagi kaisi thi?|Papi, c'était comment la vie quand tu étais jeune ?|Opa, wie war das Leben, als du jung warst?
a|Very different. We had no phones and no television.|बहुत अलग। न फ़ोन था, न टीवी।|bahut alag. na fon thaa, na TV.|Très différente. On n'avait ni téléphone ni télévision.|Ganz anders. Wir hatten kein Telefon und keinen Fernseher.
b|Really? What did you do in the evenings?|सच में? शाम को आप क्या करते थे?|sach mein? shaam ko aap kyaa karte the?|C'est vrai ? Vous faisiez quoi le soir ?|Wirklich? Was habt ihr abends gemacht?
a|We sat together, told stories and sang songs.|हम साथ बैठते, कहानियाँ सुनाते और गाने गाते थे।|ham saath baiṭhte, kahaaniyaan sunaate aur gaane gaate the.|On s'asseyait ensemble, on racontait des histoires et on chantait.|Wir saßen zusammen, erzählten Geschichten und sangen Lieder.
b|Where did you grow up?|आप कहाँ बड़े हुए?|aap kahaan baḍe hue?|Tu as grandi où ?|Wo bist du aufgewachsen?
a|In a small village near the river. I walked four kilometres to school every day.|नदी के पास एक छोटे से गाँव में। मैं रोज़ चार किलोमीटर पैदल स्कूल जाता था।|nadi ke paas ek chhoṭe se gaanv mein. main roz chaar kilomeeṭar paidal skool jaataa thaa.|Dans un petit village au bord de la rivière. Je marchais quatre kilomètres pour aller à l'école tous les jours.|In einem kleinen Dorf am Fluss. Ich bin jeden Tag vier Kilometer zur Schule gelaufen.
b|Four kilometres! Weren't you tired?|चार किलोमीटर! आप थकते नहीं थे?|chaar kilomeeṭar! aap thakte nahin the?|Quatre kilomètres ! Tu n'étais pas fatigué ?|Vier Kilometer! Warst du nicht müde?
a|Sometimes, but we walked with friends, so it was fun. In the rain it was an adventure!|कभी-कभी, पर हम दोस्तों के साथ चलते थे, तो मज़ा आता था। बारिश में तो पूरा रोमांच था!|kabhi-kabhi, par ham doston ke saath chalte the, to mazaa aataa thaa. baarish mein to pooraa romaanch thaa!|Parfois, mais on marchait avec des copains, alors c'était amusant. Sous la pluie, c'était une aventure !|Manchmal, aber wir sind mit Freunden gegangen, also hat es Spaß gemacht. Im Regen war es ein Abenteuer!
b|How did you meet Grandma?|आप दादी से कैसे मिले?|aap daadi se kaise mile?|Comment tu as rencontré mamie ?|Wie hast du Oma kennengelernt?
a|At a wedding in nineteen sixty-eight. She was wearing a red sari. // At a wedding in nineteen sixty-eight. She was wearing a red dress.|उन्नीस सौ अड़सठ में एक शादी में। उसने लाल साड़ी पहनी थी।|unnees sau aḍsaṭh mein ek shaadi mein. usne laal saaḍi pahni thi.|À un mariage, en mille neuf cent soixante-huit. Elle portait une robe rouge.|Auf einer Hochzeit, neunzehnhundertachtundsechzig. Sie trug ein rotes Kleid.
b|That's so romantic!|कितना रोमांटिक!|kitnaa romaanṭik!|C'est tellement romantique !|Wie romantisch!
a|She was the most beautiful person there. She still is.|वह वहाँ सबसे सुंदर थी। आज भी है।|vah vahaan sabse sundar thi. aaj bhi hai.|C'était la plus belle. Elle l'est toujours.|Sie war die Schönste dort. Das ist sie immer noch.
b|Tell me more tomorrow, Grandpa!|दादाजी, कल और सुनाइएगा!|daadaaji, kal aur sunaaiyegaa!|Tu m'en raconteras plus demain, papi !|Erzähl mir morgen mehr, Opa!

@15|bus|Places|I missed my stop|Passenger|Driver
a|Excuse me, have we passed the museum stop?|माफ़ कीजिए, क्या म्यूज़ियम वाला स्टॉप निकल गया?|maaf kijiye, kyaa myooziyam vaalaa sṭop nikal gayaa?|Excusez-moi, on a dépassé l'arrêt du musée ?|Entschuldigung, sind wir schon am Museum vorbei?
b|Yes, two stops ago.|हाँ, दो स्टॉप पहले।|haan, do sṭop pehle.|Oui, il y a deux arrêts.|Ja, vor zwei Haltestellen.
a|Oh no! I wasn't paying attention.|अरे नहीं! मेरा ध्यान नहीं था।|are nahin! meraa dhyaan nahin thaa.|Oh non ! Je ne faisais pas attention.|Oh nein! Ich habe nicht aufgepasst.
b|Don't worry. Get off at the next stop and cross the street.|चिंता मत कीजिए। अगले स्टॉप पर उतरिए और सड़क पार कीजिए।|chintaa mat kijiye. agle sṭop par utariye aur saḍak paar kijiye.|Ne vous inquiétez pas. Descendez au prochain arrêt et traversez la rue.|Keine Sorge. Steigen Sie an der nächsten Haltestelle aus und gehen Sie über die Straße.
a|Do I need a new ticket to go back?|क्या वापस जाने के लिए नया टिकट लेना होगा?|kyaa vaapas jaane ke liye nayaa ṭikaṭ lenaa hogaa?|Il me faut un nouveau ticket pour revenir ?|Brauche ich ein neues Ticket für die Rückfahrt?
b|No, your ticket is valid for one hour.|नहीं, आपका टिकट एक घंटे तक चलेगा।|nahin, aapkaa ṭikaṭ ek ghanṭe tak chalegaa.|Non, votre ticket est valable une heure.|Nein, Ihr Ticket gilt eine Stunde.
a|Which bus should I take back?|वापस कौन सी बस लूँ?|vaapas kaun si bas loon?|Quel bus je dois prendre pour revenir ?|Welchen Bus nehme ich zurück?
b|Any bus. They all stop at the museum.|कोई भी। सब म्यूज़ियम पर रुकती हैं।|koi bhi. sab myooziyam par rukti hain.|N'importe lequel. Ils s'arrêtent tous au musée.|Jeden. Alle halten am Museum.
a|Or can I walk? How far is it?|या मैं पैदल जा सकता हूँ? कितना दूर है?|yaa main paidal jaa saktaa hoon? kitnaa door hai?|Ou je peux y aller à pied ? C'est à quelle distance ?|Oder kann ich laufen? Wie weit ist es?
b|About fifteen minutes. Walk straight on, past the park.|लगभग पंद्रह मिनट। सीधे चलिए, पार्क के आगे से।|lagbhag pandrah minaṭ. seedhe chaliye, paark ke aage se.|Environ quinze minutes. Allez tout droit, après le parc.|Ungefähr fünfzehn Minuten. Immer geradeaus, am Park vorbei.
a|Thank you! When does the museum close?|धन्यवाद! म्यूज़ियम कब बंद होता है?|dhanyavaad! myooziyam kab band hotaa hai?|Merci ! Le musée ferme à quelle heure ?|Danke! Wann schließt das Museum?
b|At five, and it's closed on Mondays.|पाँच बजे, और सोमवार को बंद रहता है।|paanch baje, aur somvaar ko band rahtaa hai.|À dix-sept heures, et il est fermé le lundi.|Um siebzehn Uhr, und montags ist es geschlossen.
a|Lucky it's Tuesday. Thanks for your help!|अच्छा है आज मंगलवार है। मदद के लिए शुक्रिया!|achchhaa hai aaj mangalvaar hai. madad ke liye shukriyaa!|Heureusement qu'on est mardi. Merci pour votre aide !|Zum Glück ist heute Dienstag. Danke für Ihre Hilfe!

@16|restaurant|Food & drink|Allergies and a complaint|Waiter|Guest
b|Excuse me, I have a nut allergy. Are there nuts in this dish?|माफ़ कीजिए, मुझे मेवों से एलर्जी है। क्या इस डिश में मेवे हैं?|maaf kijiye, mujhe mevon se elarji hai. kyaa is dish mein meve hain?|Excusez-moi, je suis allergique aux fruits à coque. Il y en a dans ce plat ?|Entschuldigung, ich habe eine Nussallergie. Sind Nüsse in diesem Gericht?
a|Let me ask the chef... Yes, there are cashews in the sauce.|मैं शेफ़ से पूछता हूँ... हाँ, ग्रेवी में काजू हैं।|main shef se poochhtaa hoon... haan, grevi mein kaaju hain.|Je vais demander au chef... Oui, il y a des noix de cajou dans la sauce.|Ich frage den Koch... Ja, in der Soße sind Cashewkerne.
b|Can he make it without nuts?|क्या वे इसे बिना मेवों के बना सकते हैं?|kyaa ve ise binaa mevon ke banaa sakte hain?|Il peut le préparer sans ?|Kann er es ohne Nüsse zubereiten?
a|Yes, no problem. I'll tell the kitchen.|हाँ, कोई दिक़्क़त नहीं। मैं किचन में बता देता हूँ।|haan, koi diqqat nahin. main kichan mein bataa detaa hoon.|Oui, pas de souci. Je préviens la cuisine.|Ja, kein Problem. Ich sage in der Küche Bescheid.
b|Excuse me, this soup is cold.|माफ़ कीजिए, यह सूप ठंडा है।|maaf kijiye, yah soop ṭhanḍaa hai.|Excusez-moi, cette soupe est froide.|Entschuldigung, die Suppe ist kalt.
a|I'm very sorry. I'll bring you a hot one right away.|माफ़ी चाहता हूँ। मैं अभी गरम ले आता हूँ।|maafi chaahtaa hoon. main abhi garam le aataa hoon.|Je suis vraiment désolé. Je vous en apporte une chaude tout de suite.|Das tut mir sehr leid. Ich bringe Ihnen sofort eine heiße.
b|Also, we have been waiting forty minutes for the main course.|और हम मेन कोर्स के लिए चालीस मिनट से इंतज़ार कर रहे हैं।|aur ham men kors ke liye chaalees minaṭ se intazaar kar rahe hain.|Et nous attendons le plat principal depuis quarante minutes.|Außerdem warten wir seit vierzig Minuten auf das Hauptgericht.
a|The kitchen is very busy tonight. Just five more minutes.|आज रात किचन में बहुत भीड़ है। बस पाँच मिनट और।|aaj raat kichan mein bahut bheeḍ hai. bas paanch minaṭ aur.|La cuisine est débordée ce soir. Encore cinq minutes.|Die Küche ist heute Abend sehr voll. Nur noch fünf Minuten.
b|Okay, but please hurry. Our child is hungry.|ठीक है, पर जल्दी कीजिए। हमारा बच्चा भूखा है।|ṭheek hai, par jaldi kijiye. hamaaraa bachchaa bhookhaa hai.|D'accord, mais dépêchez-vous, s'il vous plaît. Notre enfant a faim.|Okay, aber bitte beeilen Sie sich. Unser Kind hat Hunger.
a|Here you are. The desserts are on the house tonight.|यह लीजिए। आज मीठा हमारी तरफ़ से।|yah lijiye. aaj meeṭhaa hamaari taraf se.|Voilà. Les desserts sont offerts ce soir.|Bitte schön. Die Desserts gehen heute aufs Haus.
b|That's very kind. Thank you for your understanding.|आप बहुत भले हैं। समझने के लिए धन्यवाद।|aap bahut bhale hain. samajhne ke liye dhanyavaad.|C'est très gentil. Merci de votre compréhension.|Das ist sehr nett. Danke für Ihr Verständnis.
a|Thank you for your patience. Enjoy your meal.|आपके धैर्य के लिए धन्यवाद। खाने का आनंद लीजिए।|aapke dhairya ke liye dhanyavaad. khaane kaa aanand lijiye.|Merci pour votre patience. Bon appétit.|Danke für Ihre Geduld. Guten Appetit.

@17|office|Questions|A job interview|Interviewer|Candidate
a|Thank you for coming. Please tell me about yourself.|आने के लिए धन्यवाद। अपने बारे में बताइए।|aane ke liye dhanyavaad. apne baare mein bataaiye.|Merci d'être venu. Parlez-moi de vous.|Danke, dass Sie gekommen sind. Erzählen Sie mir etwas über sich.
b|I studied economics, and I have worked in sales for six years.|मैंने अर्थशास्त्र पढ़ा है, और छह साल से सेल्स में काम कर रहा हूँ।|maine arthshaastra paḍhaa hai, aur chhah saal se sels mein kaam kar rahaa hoon.|J'ai étudié l'économie et je travaille dans la vente depuis six ans.|Ich habe Wirtschaft studiert und arbeite seit sechs Jahren im Vertrieb.
a|Why do you want to work with us?|आप हमारे साथ क्यों काम करना चाहते हैं?|aap hamaare saath kyon kaam karnaa chaahte hain?|Pourquoi voulez-vous travailler chez nous ?|Warum möchten Sie bei uns arbeiten?
b|Your company is growing fast, and I like your products.|आपकी कंपनी तेज़ी से बढ़ रही है, और मुझे आपके प्रोडक्ट पसंद हैं।|aapki kampani tezi se baḍh rahi hai, aur mujhe aapke proḍakṭ pasand hain.|Votre entreprise grandit vite, et j'aime vos produits.|Ihr Unternehmen wächst schnell, und ich mag Ihre Produkte.
a|What is your biggest strength?|आपकी सबसे बड़ी ख़ूबी क्या है?|aapki sabse baḍi khoobi kyaa hai?|Quelle est votre plus grande qualité ?|Was ist Ihre größte Stärke?
b|I listen to customers carefully and I stay calm under pressure.|मैं ग्राहकों की बात ध्यान से सुनता हूँ और दबाव में शांत रहता हूँ।|main graahakon ki baat dhyaan se suntaa hoon aur dabaav mein shaant rahtaa hoon.|J'écoute attentivement les clients et je reste calme sous pression.|Ich höre Kunden genau zu und bleibe unter Druck ruhig.
a|And a weakness?|और कोई कमी?|aur koi kami?|Et un défaut ?|Und eine Schwäche?
b|Sometimes I take on too much work. I am learning to say no.|कभी-कभी मैं बहुत ज़्यादा काम ले लेता हूँ। मैं ना कहना सीख रहा हूँ।|kabhi-kabhi main bahut zyaadaa kaam le letaa hoon. main naa kahnaa seekh rahaa hoon.|Parfois, j'accepte trop de travail. J'apprends à dire non.|Manchmal übernehme ich zu viel Arbeit. Ich lerne, Nein zu sagen.
a|Where do you see yourself in five years?|पाँच साल बाद आप ख़ुद को कहाँ देखते हैं?|paanch saal baad aap khud ko kahaan dekhte hain?|Où vous voyez-vous dans cinq ans ?|Wo sehen Sie sich in fünf Jahren?
b|Leading a small team, and still learning every day.|एक छोटी टीम का नेतृत्व करते हुए, और रोज़ कुछ नया सीखते हुए।|ek chhoṭi ṭeem kaa netritva karte hue, aur roz kuchh nayaa seekhte hue.|À la tête d'une petite équipe, et toujours en train d'apprendre.|Als Leiter eines kleinen Teams, und immer noch jeden Tag lernend.
a|Do you have any questions for us?|क्या आपके कोई सवाल हैं?|kyaa aapke koi savaal hain?|Avez-vous des questions ?|Haben Sie Fragen an uns?
b|Yes. What does a normal day look like in this role?|हाँ। इस पद पर एक आम दिन कैसा होता है?|haan. is pad par ek aam din kaisaa hotaa hai?|Oui. À quoi ressemble une journée type à ce poste ?|Ja. Wie sieht ein normaler Tag in dieser Position aus?
a|Mornings with clients, afternoons with the team. We will call you by Friday.|सुबह ग्राहकों के साथ, दोपहर टीम के साथ। हम शुक्रवार तक आपको फ़ोन करेंगे।|subah graahakon ke saath, dopahar ṭeem ke saath. ham shukravaar tak aapko fon karenge.|Le matin avec les clients, l'après-midi avec l'équipe. Nous vous appellerons d'ici vendredi.|Vormittags mit Kunden, nachmittags mit dem Team. Wir rufen Sie bis Freitag an.
b|Thank you for your time.|आपके समय के लिए धन्यवाद।|aapke samay ke liye dhanyavaad.|Merci pour votre temps.|Vielen Dank für Ihre Zeit.

@18|train|Travel|A long journey with a stranger|Passenger|You
a|Is this your first time travelling to the south?|क्या आप पहली बार दक्षिण जा रहे हैं?|kyaa aap pahli baar dakshiṇ jaa rahe hain?|C'est la première fois que vous allez dans le sud ?|Fahren Sie zum ersten Mal in den Süden?
b|Yes, I'm visiting my sister. She lives by the sea.|हाँ, मैं अपनी बहन से मिलने जा रहा हूँ। वह समुद्र के पास रहती है।|haan, main apni bahan se milne jaa rahaa hoon. vah samudra ke paas rahti hai.|Oui, je rends visite à ma sœur. Elle habite au bord de la mer.|Ja, ich besuche meine Schwester. Sie wohnt am Meer.
a|How lovely. I travel this route every month for work.|कितना अच्छा। मैं काम के लिए हर महीने इसी रास्ते से जाता हूँ।|kitnaa achchhaa. main kaam ke liye har maheene isi raaste se jaataa hoon.|Que c'est bien. Moi, je fais ce trajet tous les mois pour le travail.|Wie schön. Ich fahre diese Strecke jeden Monat beruflich.
b|What do you do?|आप क्या करते हैं?|aap kyaa karte hain?|Vous faites quoi ?|Was machen Sie?
a|I'm an engineer. I inspect bridges.|मैं इंजीनियर हूँ। मैं पुलों की जाँच करता हूँ।|main injeeniyar hoon. main pulon ki jaanch kartaa hoon.|Je suis ingénieur. J'inspecte des ponts.|Ich bin Ingenieur. Ich prüfe Brücken.
b|That sounds interesting. And a bit scary!|दिलचस्प लगता है। और थोड़ा डरावना भी!|dilchasp lagtaa hai. aur thoḍaa ḍaraavnaa bhi!|Ça a l'air intéressant. Et un peu effrayant !|Das klingt interessant. Und ein bisschen beängstigend!
a|Look out of the window. We are crossing the river now.|खिड़की से बाहर देखिए। हम अभी नदी पार कर रहे हैं।|khiḍki se baahar dekhiye. ham abhi nadi paar kar rahe hain.|Regardez par la fenêtre. Nous traversons le fleuve.|Schauen Sie aus dem Fenster. Wir überqueren gerade den Fluss.
b|Wow, it's huge! Is it the longest river in the country?|वाह, कितनी बड़ी है! क्या यह देश की सबसे लंबी नदी है?|vaah, kitni baḍi hai! kyaa yah desh ki sabse lambi nadi hai?|Waouh, il est immense ! C'est le plus long fleuve du pays ?|Wow, ist der riesig! Ist das der längste Fluss des Landes?
a|One of the longest. In the rainy season it is twice as wide.|सबसे लंबी नदियों में से एक। बारिश के मौसम में यह दोगुनी चौड़ी हो जाती है।|sabse lambi nadiyon mein se ek. baarish ke mausam mein yah doguni chauḍi ho jaati hai.|L'un des plus longs. À la saison des pluies, il est deux fois plus large.|Einer der längsten. In der Regenzeit ist er doppelt so breit.
b|Do you know when we arrive?|आपको पता है हम कब पहुँचेंगे?|aapko pataa hai ham kab pahunchenge?|Vous savez à quelle heure on arrive ?|Wissen Sie, wann wir ankommen?
a|At six tomorrow morning, if there is no delay.|कल सुबह छह बजे, अगर देरी न हुई तो।|kal subah chhah baje, agar deri na hui to.|Demain à six heures du matin, s'il n'y a pas de retard.|Morgen früh um sechs, wenn es keine Verspätung gibt.
b|Is there a dining car on this train?|क्या इस ट्रेन में पैंट्री कार है?|kyaa is ṭren mein painṭri kaar hai?|Il y a une voiture-restaurant dans ce train ?|Gibt es in diesem Zug einen Speisewagen?
a|Yes, two coaches back. Shall we get some tea?|हाँ, दो डिब्बे पीछे। चलिए चाय पीते हैं?|haan, do ḍibbe peechhe. chaliye chaay peete hain?|Oui, deux voitures plus loin. On va prendre un thé ?|Ja, zwei Wagen weiter hinten. Wollen wir einen Tee trinken?
b|Good idea. It's my treat.|अच्छा विचार। मेरी तरफ़ से।|achchhaa vichaar. meri taraf se.|Bonne idée. C'est moi qui invite.|Gute Idee. Ich lade Sie ein.

@19|office|Money & shopping|At the bank: big numbers|Bank clerk|Customer
b|Good morning. I'd like to open a savings account.|सुप्रभात। मुझे बचत खाता खोलना है।|suprabhaat. mujhe bachat khaataa kholnaa hai.|Bonjour. Je voudrais ouvrir un compte d'épargne.|Guten Morgen. Ich möchte ein Sparkonto eröffnen.
a|Certainly. Do you have ID and proof of address?|ज़रूर। क्या आपके पास पहचान पत्र और पते का सबूत है?|zaroor. kyaa aapke paas pahchaan patra aur pate kaa saboot hai?|Bien sûr. Vous avez une pièce d'identité et un justificatif de domicile ?|Gern. Haben Sie einen Ausweis und einen Adressnachweis?
b|Yes, here they are.|हाँ, ये रहे।|haan, ye rahe.|Oui, les voici.|Ja, hier sind sie.
a|How much would you like to deposit today?|आज आप कितने पैसे जमा करना चाहेंगे?|aaj aap kitne paise jamaa karnaa chaahenge?|Combien souhaitez-vous déposer aujourd'hui ?|Wie viel möchten Sie heute einzahlen?
b|Twenty-five thousand rupees. // Two thousand five hundred euros.|पच्चीस हज़ार रुपये।|pachchees hazaar rupaye.|Deux mille cinq cents euros.|Zweitausendfünfhundert Euro.
a|The interest rate is three and a half percent a year.|ब्याज दर साढ़े तीन प्रतिशत सालाना है।|byaaj dar saaḍhe teen pratishat saalaanaa hai.|Le taux d'intérêt est de trois virgule cinq pour cent par an.|Der Zinssatz beträgt drei Komma fünf Prozent pro Jahr.
b|Is there a minimum balance?|क्या न्यूनतम बैलेंस रखना ज़रूरी है?|kyaa nyoontam bailens rakhnaa zaroori hai?|Il y a un solde minimum ?|Gibt es einen Mindestbetrag auf dem Konto?
a|Yes, ten thousand rupees. // Yes, five hundred euros.|हाँ, दस हज़ार रुपये।|haan, das hazaar rupaye.|Oui, cinq cents euros.|Ja, fünfhundert Euro.
b|I also want to ask about a home loan.|मैं होम लोन के बारे में भी पूछना चाहता हूँ।|main hom lon ke baare mein bhi poochhnaa chaahtaa hoon.|Je voudrais aussi me renseigner sur un prêt immobilier.|Ich möchte mich auch nach einem Immobilienkredit erkundigen.
a|How much do you need?|आपको कितना चाहिए?|aapko kitnaa chaahiye?|De combien avez-vous besoin ?|Wie viel brauchen Sie?
b|About forty-five lakh rupees, that is 45,00,000, over fifteen years. // About two hundred and fifty thousand euros, over twenty years.|लगभग पैंतालीस लाख रुपये, पंद्रह साल के लिए।|lagbhag paintaalees laakh rupaye, pandrah saal ke liye.|Environ deux cent cinquante mille euros, sur vingt ans.|Ungefähr zweihundertfünfzigtausend Euro, auf zwanzig Jahre.
a|That's possible with your salary. The monthly payment would be about forty-two thousand rupees. // That's possible with your salary. The monthly payment would be about one thousand three hundred euros.|आपकी तनख़्वाह के हिसाब से मुमकिन है। मासिक किस्त लगभग बयालीस हज़ार रुपये होगी।|aapki tankhvaah ke hisaab se mumkin hai. maasik kist lagbhag bayaalees hazaar rupaye hogi.|C'est possible avec votre salaire. La mensualité serait d'environ mille trois cents euros.|Mit Ihrem Gehalt ist das möglich. Die Monatsrate läge bei etwa eintausenddreihundert Euro.
b|Can you give me all of this in writing?|क्या आप यह सब लिखकर दे सकते हैं?|kyaa aap yah sab likhkar de sakte hain?|Vous pouvez me donner tout ça par écrit ?|Können Sie mir das alles schriftlich geben?
a|Of course. Here is a summary, and my card.|ज़रूर। यह रहा सारांश, और मेरा कार्ड।|zaroor. yah rahaa saaraansh, aur meraa kaarḍ.|Bien sûr. Voici un récapitulatif, et ma carte.|Selbstverständlich. Hier ist eine Übersicht und meine Karte.

@20|family|Home|Renting a flat|Landlord|Tenant
a|This is the living room. It gets a lot of sunlight.|यह बैठक है। इसमें बहुत धूप आती है।|yah baiṭhak hai. ismen bahut dhoop aati hai.|Voici le salon. Il est très lumineux.|Das ist das Wohnzimmer. Es ist sehr hell.
b|It's lovely. How many bedrooms are there?|बहुत अच्छा है। कितने बेडरूम हैं?|bahut achchhaa hai. kitne beḍroom hain?|Il est très joli. Il y a combien de chambres ?|Sehr schön. Wie viele Schlafzimmer gibt es?
a|Two bedrooms, a kitchen and one bathroom.|दो बेडरूम, एक रसोई और एक बाथरूम।|do beḍroom, ek rasoi aur ek baathroom.|Deux chambres, une cuisine et une salle de bains.|Zwei Schlafzimmer, eine Küche und ein Bad.
b|What is the rent?|किराया कितना है?|kiraayaa kitnaa hai?|Quel est le loyer ?|Wie hoch ist die Miete?
a|Eighteen thousand a month, plus electricity. // Nine hundred euros a month, plus bills.|अठारह हज़ार महीना, बिजली अलग से।|aṭhaarah hazaar maheenaa, bijli alag se.|Neuf cents euros par mois, plus les charges.|Neunhundert Euro im Monat, plus Nebenkosten.
b|And the deposit?|और सिक्योरिटी डिपॉज़िट?|aur sikyoriṭi ḍipoziṭ?|Et la caution ?|Und die Kaution?
a|Two months' rent.|दो महीने का किराया।|do maheene kaa kiraayaa.|Deux mois de loyer.|Zwei Monatsmieten.
b|Is the flat furnished?|क्या फ़्लैट में फ़र्नीचर है?|kyaa flaiṭ mein farneechar hai?|L'appartement est meublé ?|Ist die Wohnung möbliert?
a|Partly. There is a bed, a sofa and a fridge.|थोड़ा-बहुत। एक पलंग, एक सोफ़ा और फ़्रिज है।|thoḍaa-bahut. ek palang, ek sofaa aur frij hai.|En partie. Il y a un lit, un canapé et un frigo.|Teilweise. Es gibt ein Bett, ein Sofa und einen Kühlschrank.
b|Are pets allowed? I have a small dog.|क्या पालतू जानवर रख सकते हैं? मेरे पास एक छोटा कुत्ता है।|kyaa paaltoo jaanvar rakh sakte hain? mere paas ek chhoṭaa kuttaa hai.|Les animaux sont acceptés ? J'ai un petit chien.|Sind Haustiere erlaubt? Ich habe einen kleinen Hund.
a|A small dog is fine, if it's quiet.|छोटा कुत्ता चलेगा, अगर वह शांत रहे।|chhoṭaa kuttaa chalegaa, agar vah shaant rahe.|Un petit chien, ça va, s'il est calme.|Ein kleiner Hund ist in Ordnung, wenn er ruhig ist.
b|When can I move in?|मैं कब से रह सकता हूँ?|main kab se rah saktaa hoon?|Je peux emménager quand ?|Wann kann ich einziehen?
a|From the first of next month.|अगले महीने की पहली तारीख़ से।|agle maheene ki pahli taareekh se.|À partir du premier du mois prochain.|Ab dem Ersten des nächsten Monats.
b|I'll take it! Can we sign the contract this week?|मैं ले लेता हूँ! क्या हम इस हफ़्ते एग्रीमेंट पर साइन कर सकते हैं?|main le letaa hoon! kyaa ham is hafte egreemenṭ par saain kar sakte hain?|Je le prends ! On peut signer le bail cette semaine ?|Ich nehme sie! Können wir den Vertrag diese Woche unterschreiben?
a|Yes, come on Thursday at five.|हाँ, गुरुवार को पाँच बजे आइए।|haan, guruvaar ko paanch baje aaiye.|Oui, venez jeudi à dix-sept heures.|Ja, kommen Sie am Donnerstag um fünf.

@21|friends|Verbs|Hobbies and films|Friend|You
a|What do you like to do in your free time?|ख़ाली समय में तुम्हें क्या करना पसंद है?|khaali samay mein tumhen kyaa karnaa pasand hai?|Qu'est-ce que tu aimes faire pendant ton temps libre ?|Was machst du gern in deiner Freizeit?
b|I love cooking, and I play the guitar.|मुझे खाना बनाना बहुत पसंद है, और मैं गिटार बजाता हूँ।|mujhe khaanaa banaanaa bahut pasand hai, aur main giṭaar bajaataa hoon.|J'adore cuisiner, et je joue de la guitare.|Ich koche sehr gern und spiele Gitarre.
a|Really? Since when?|सच में? कब से?|sach mein? kab se?|C'est vrai ? Depuis quand ?|Echt? Seit wann?
b|Since I was twelve. And you?|बारह साल की उम्र से। और तुम?|baarah saal ki umr se. aur tum?|Depuis mes douze ans. Et toi ?|Seit ich zwölf bin. Und du?
a|I read a lot, and I go running every morning.|मैं बहुत पढ़ता हूँ, और रोज़ सुबह दौड़ने जाता हूँ।|main bahut paḍhtaa hoon, aur roz subah dauḍne jaataa hoon.|Je lis beaucoup, et je cours tous les matins.|Ich lese viel und gehe jeden Morgen joggen.
b|What kind of books do you like?|तुम्हें किस तरह की किताबें पसंद हैं?|tumhen kis tarah ki kitaaben pasand hain?|Tu aimes quel genre de livres ?|Was für Bücher magst du?
a|Mostly crime novels. They are exciting.|ज़्यादातर जासूसी उपन्यास। वे रोमांचक होते हैं।|zyaadaatar jaasoosi upanyaas. ve romaanchak hote hain.|Surtout des romans policiers. C'est passionnant.|Meistens Krimis. Die sind spannend.
b|Have you seen the new film at the cinema?|क्या तुमने सिनेमा में नई फ़िल्म देखी?|kyaa tumne sinemaa mein nayi film dekhi?|Tu as vu le nouveau film au cinéma ?|Hast du den neuen Film im Kino gesehen?
a|Not yet. Is it good?|अभी नहीं। अच्छी है?|abhi nahin. achchhi hai?|Pas encore. Il est bien ?|Noch nicht. Ist er gut?
b|It's fantastic, but a bit long. Almost three hours.|शानदार है, पर थोड़ी लंबी। लगभग तीन घंटे।|shaandaar hai, par thoḍi lambi. lagbhag teen ghanṭe.|Il est génial, mais un peu long. Presque trois heures.|Er ist fantastisch, aber etwas lang. Fast drei Stunden.
a|Three hours! I'll need a lot of popcorn.|तीन घंटे! मुझे बहुत सारा पॉपकॉर्न चाहिए होगा।|teen ghanṭe! mujhe bahut saaraa popkorn chaahiye hogaa.|Trois heures ! Il me faudra beaucoup de pop-corn.|Drei Stunden! Da brauche ich viel Popcorn.
b|Let's go together on Sunday. I'd watch it again.|रविवार को साथ चलते हैं। मैं फिर से देख लूँगा।|ravivaar ko saath chalte hain. main phir se dekh loongaa.|Allons-y ensemble dimanche. Je le reverrais bien.|Lass uns am Sonntag zusammen gehen. Ich würde ihn noch mal sehen.
a|Deal. And after that, you cook dinner for me!|पक्का। और उसके बाद तुम मेरे लिए खाना बनाओगे!|pakkaa. aur uske baad tum mere liye khaanaa banaaoge!|Marché conclu. Et après, tu me prépares à dîner !|Abgemacht. Und danach kochst du für mich!
b|Ha, okay. I'll make my famous biryani. // Ha, okay. I'll make my famous pasta.|हा, ठीक है। मैं अपनी मशहूर बिरयानी बनाऊँगा।|haa, ṭheek hai. main apni mashhoor biryaani banaaoongaa.|Ha, d'accord. Je ferai mes fameuses pâtes.|Ha, okay. Ich mache meine berühmten Nudeln.

@22|airport|Transport|Airport check-in|Agent|Passenger
a|Good morning. Where are you flying today?|सुप्रभात। आज आप कहाँ जा रहे हैं?|suprabhaat. aaj aap kahaan jaa rahe hain?|Bonjour. Quelle est votre destination aujourd'hui ?|Guten Morgen. Wohin fliegen Sie heute?
b|To London. Here is my passport and ticket.|लंदन। यह रहा मेरा पासपोर्ट और टिकट।|Landan. yah rahaa meraa paasporṭ aur ṭikaṭ.|À Londres. Voici mon passeport et mon billet.|Nach London. Hier sind mein Reisepass und mein Ticket.
a|How many bags are you checking in?|आप कितने बैग चेक-इन कर रहे हैं?|aap kitne baig chek-in kar rahe hain?|Combien de bagages enregistrez-vous ?|Wie viele Gepäckstücke geben Sie auf?
b|One suitcase, and this small bag as hand luggage.|एक सूटकेस, और यह छोटा बैग साथ में।|ek sooṭkes, aur yah chhoṭaa baig saath mein.|Une valise, et ce petit sac en bagage à main.|Einen Koffer und diese kleine Tasche als Handgepäck.
a|Please put the suitcase on the scale... It's twenty-six kilos.|सूटकेस तराज़ू पर रखिए... छब्बीस किलो है।|sooṭkes taraazoo par rakhiye... chhabbees kilo hai.|Posez la valise sur la balance, s'il vous plaît... Elle fait vingt-six kilos.|Stellen Sie den Koffer bitte auf die Waage... Er wiegt sechsundzwanzig Kilo.
a|The limit is twenty-three. You'll have to pay extra or take something out.|सीमा तेईस किलो है। आपको अतिरिक्त पैसे देने होंगे या कुछ निकालना होगा।|seemaa teees kilo hai. aapko atirikt paise dene honge yaa kuchh nikaalnaa hogaa.|La limite est de vingt-trois. Vous devez payer un supplément ou enlever quelque chose.|Die Grenze liegt bei dreiundzwanzig. Sie müssen zuzahlen oder etwas herausnehmen.
b|I'll take out these books and carry them.|मैं ये किताबें निकालकर हाथ में ले लेता हूँ।|main ye kitaaben nikaalkar haath mein le letaa hoon.|Je vais sortir ces livres et les garder avec moi.|Ich nehme diese Bücher heraus und trage sie.
a|Twenty-two point eight. Perfect.|बाईस दशमलव आठ। बढ़िया।|baaees dashamlav aaṭh. baḍhiyaa.|Vingt-deux kilos huit. Parfait.|Zweiundzwanzig Komma acht. Perfekt.
b|Can I have an aisle seat?|क्या मुझे गलियारे वाली सीट मिल सकती है?|kyaa mujhe galiyaare vaali seeṭ mil sakti hai?|Je peux avoir une place côté couloir ?|Kann ich einen Platz am Gang bekommen?
a|Yes, seat 31C. Boarding starts at 10:40 at gate 18.|हाँ, सीट इकतीस सी। बोर्डिंग दस बजकर चालीस मिनट पर, गेट अठारह से।|haan, seeṭ iktees C. borḍing das bajkar chaalees minaṭ par, geṭ aṭhaarah se.|Oui, place trente et un C. L'embarquement commence à dix heures quarante, porte dix-huit.|Ja, Platz einunddreißig C. Das Boarding beginnt um zehn Uhr vierzig an Gate achtzehn.
b|Is the flight on time?|क्या फ़्लाइट समय पर है?|kyaa flaaiṭ samay par hai?|Le vol est à l'heure ?|Ist der Flug pünktlich?
a|Yes. Please be at the gate thirty minutes before boarding.|हाँ। बोर्डिंग से तीस मिनट पहले गेट पर पहुँच जाइए।|haan. borḍing se tees minaṭ pehle geṭ par pahunch jaaiye.|Oui. Soyez à la porte trente minutes avant l'embarquement.|Ja. Bitte seien Sie dreißig Minuten vor dem Boarding am Gate.
b|Where is security?|सिक्योरिटी चेक कहाँ है?|sikyoriṭi chek kahaan hai?|Où est le contrôle de sécurité ?|Wo ist die Sicherheitskontrolle?
a|Straight ahead and up the escalator. Have a good flight!|सीधे आगे जाकर एस्केलेटर से ऊपर। आपकी यात्रा शुभ हो!|seedhe aage jaakar eskeleṭar se oopar. aapki yaatraa shubh ho!|Tout droit, puis l'escalator. Bon vol !|Geradeaus und die Rolltreppe hoch. Guten Flug!

@23|shop|Colours|Bargaining at the market|Seller|Buyer
b|How much is this scarf?|यह स्कार्फ़ कितने का है?|yah skaarf kitne kaa hai?|Combien coûte ce foulard ?|Was kostet dieser Schal?
a|Eight hundred rupees. It's pure silk. // Forty euros. It's pure silk.|आठ सौ रुपये। शुद्ध रेशम है।|aaṭh sau rupaye. shuddh resham hai.|Quarante euros. C'est de la soie pure.|Vierzig Euro. Das ist reine Seide.
b|That's too expensive. I'll give you five hundred. // That's too expensive. I'll give you twenty-five.|बहुत महँगा है। मैं पाँच सौ दूँगा।|bahut mahangaa hai. main paanch sau doongaa.|C'est trop cher. Je vous en donne vingt-cinq.|Das ist zu teuer. Ich gebe Ihnen fünfundzwanzig.
a|Five hundred? No, no. Seven hundred for you. // Twenty-five? No, no. Thirty-five for you.|पाँच सौ? नहीं, नहीं। आपके लिए सात सौ।|paanch sau? nahin, nahin. aapke liye saat sau.|Vingt-cinq ? Non, non. Pour vous, trente-cinq.|Fünfundzwanzig? Nein, nein. Für Sie fünfunddreißig.
b|I saw the same one in the next shop for six hundred. // I saw the same one in the next shop for thirty.|मैंने बगल वाली दुकान में यही छह सौ में देखा।|maine bagal vaali dukaan mein yahi chhah sau mein dekhaa.|J'ai vu le même dans la boutique d'à côté pour trente.|Ich habe denselben im Laden nebenan für dreißig gesehen.
a|Not the same quality! Feel how soft it is.|वैसी क्वालिटी नहीं होगी! छूकर देखिए, कितना मुलायम है।|vaisi kvaaliṭi nahin hogi! chhookar dekhiye, kitnaa mulaayam hai.|Pas la même qualité ! Touchez, comme c'est doux.|Nicht dieselbe Qualität! Fühlen Sie mal, wie weich.
b|It is soft. Do you have it in blue?|मुलायम तो है। क्या यह नीले में है?|mulaayam to hai. kyaa yah neele mein hai?|C'est vrai qu'il est doux. Vous l'avez en bleu ?|Er ist wirklich weich. Haben Sie ihn in Blau?
a|Blue, red, yellow, purple... whatever you like.|नीला, लाल, पीला, बैंगनी... जो आपको पसंद हो।|neelaa, laal, peelaa, baingani... jo aapko pasand ho.|Bleu, rouge, jaune, violet... comme vous voulez.|Blau, Rot, Gelb, Lila... was Sie möchten.
b|If I buy two, what's the price?|अगर मैं दो लूँ तो क्या दाम होगा?|agar main do loon to kyaa daam hogaa?|Si j'en prends deux, c'est combien ?|Wenn ich zwei nehme, was kostet das?
a|Two for twelve hundred. Final price. // Two for sixty. Final price.|दो बारह सौ में। आख़िरी दाम।|do baarah sau mein. aakhiri daam.|Deux pour soixante. Dernier prix.|Zwei für sechzig. Letzter Preis.
b|Eleven hundred, and it's a deal. // Fifty-five, and it's a deal.|ग्यारह सौ, और सौदा पक्का।|gyaarah sau, aur saudaa pakkaa.|Cinquante-cinq, et c'est d'accord.|Fünfundfünfzig, und wir sind uns einig.
a|Okay, okay. Only because you're smiling!|ठीक है, ठीक है। सिर्फ़ इसलिए क्योंकि आप मुस्कुरा रहे हैं!|ṭheek hai, ṭheek hai. sirf isliye kyonki aap muskuraa rahe hain!|Bon, d'accord. Seulement parce que vous souriez !|Na gut, na gut. Nur weil Sie so nett lächeln!
b|Blue and red, please. Can you wrap them as a gift?|नीला और लाल दीजिए। क्या आप इन्हें गिफ़्ट पैक कर देंगे?|neelaa aur laal dijiye. kyaa aap inhen gifṭ paik kar denge?|Le bleu et le rouge, s'il vous plaît. Vous pouvez faire un paquet cadeau ?|Blau und Rot, bitte. Können Sie sie als Geschenk einpacken?
a|Of course. Come again!|ज़रूर। फिर आइएगा!|zaroor. phir aaiyegaa!|Bien sûr. Revenez nous voir !|Natürlich. Kommen Sie wieder!

@24|office|Numbers|Asking for a raise|Manager|You
b|Do you have ten minutes? I'd like to talk about my salary.|क्या आपके पास दस मिनट हैं? मैं अपनी तनख़्वाह के बारे में बात करना चाहता हूँ।|kyaa aapke paas das minaṭ hain? main apni tankhvaah ke baare mein baat karnaa chaahtaa hoon.|Vous avez dix minutes ? J'aimerais parler de mon salaire.|Haben Sie zehn Minuten? Ich möchte über mein Gehalt sprechen.
a|Of course, please sit down.|ज़रूर, बैठिए।|zaroor, baiṭhiye.|Bien sûr, asseyez-vous.|Natürlich, setzen Sie sich.
b|I've been here two years, and I now manage three clients alone.|मुझे यहाँ दो साल हो गए हैं, और अब मैं अकेले तीन क्लाइंट संभालता हूँ।|mujhe yahaan do saal ho gaye hain, aur ab main akele teen klaainṭ sambhaaltaa hoon.|Je suis là depuis deux ans, et je gère maintenant trois clients seul.|Ich bin seit zwei Jahren hier und betreue jetzt drei Kunden allein.
a|That's true. Your work has been excellent.|यह सच है। आपका काम बहुत अच्छा रहा है।|yah sach hai. aapkaa kaam bahut achchhaa rahaa hai.|C'est vrai. Votre travail est excellent.|Das stimmt. Ihre Arbeit war ausgezeichnet.
b|Last year our team's sales grew by eighteen percent.|पिछले साल हमारी टीम की बिक्री अठारह प्रतिशत बढ़ी।|pichhle saal hamaari ṭeem ki bikri aṭhaarah pratishat baḍhi.|L'année dernière, les ventes de notre équipe ont augmenté de dix-huit pour cent.|Letztes Jahr ist der Umsatz unseres Teams um achtzehn Prozent gestiegen.
a|What are you asking for?|आप क्या चाहते हैं?|aap kyaa chaahte hain?|Que demandez-vous ?|Was stellen Sie sich vor?
b|A raise of fifteen percent. That's about nine lakh a year. // A raise of fifteen percent. That's about fifty-two thousand euros a year.|पंद्रह प्रतिशत बढ़ोतरी। यानी सालाना लगभग नौ लाख।|pandrah pratishat baḍhotri. yaani saalaanaa lagbhag nau laakh.|Une augmentation de quinze pour cent. Soit environ cinquante-deux mille euros par an.|Eine Gehaltserhöhung von fünfzehn Prozent. Das wären etwa zweiundfünfzigtausend Euro im Jahr.
a|Fifteen is a lot. The budget is tight this year.|पंद्रह बहुत ज़्यादा है। इस साल बजट कम है।|pandrah bahut zyaadaa hai. is saal bajaṭ kam hai.|Quinze, c'est beaucoup. Le budget est serré cette année.|Fünfzehn ist viel. Das Budget ist dieses Jahr knapp.
a|I can offer ten percent now, and another review in six months.|मैं अभी दस प्रतिशत दे सकती हूँ, और छह महीने बाद फिर समीक्षा।|main abhi das pratishat de sakti hoon, aur chhah maheene baad phir sameekshaa.|Je peux vous proposer dix pour cent maintenant, et on en reparle dans six mois.|Ich kann Ihnen jetzt zehn Prozent anbieten und in sechs Monaten noch einmal darüber sprechen.
b|Could we say twelve, plus one extra day working from home each week?|क्या बारह हो सकता है, साथ में हफ़्ते में एक दिन और घर से काम?|kyaa baarah ho saktaa hai, saath mein hafte mein ek din aur ghar se kaam?|On pourrait dire douze, plus un jour de télétravail en plus par semaine ?|Können wir uns auf zwölf einigen, plus einen zusätzlichen Tag Homeoffice pro Woche?
a|Twelve percent and the extra day. I think we can agree on that.|बारह प्रतिशत और एक दिन अतिरिक्त। मुझे लगता है इस पर बात बन सकती है।|baarah pratishat aur ek din atirikt. mujhe lagtaa hai is par baat ban sakti hai.|Douze pour cent et le jour en plus. Je pense qu'on peut se mettre d'accord.|Zwölf Prozent und der zusätzliche Tag. Ich denke, darauf können wir uns einigen.
b|Thank you. I really appreciate it.|धन्यवाद। मैं इसकी क़द्र करता हूँ।|dhanyavaad. main iski qadr kartaa hoon.|Merci. Je vous en suis reconnaissant.|Danke. Das weiß ich sehr zu schätzen.
a|I'll confirm it by email this week.|मैं इस हफ़्ते ईमेल से पक्का कर दूँगी।|main is hafte eemel se pakkaa kar doongi.|Je vous le confirme par e-mail cette semaine.|Ich bestätige es Ihnen diese Woche per E-Mail.

@25|family|Family|Planning a wedding|Mum|Daughter
b|Mum, we've chosen a date for the wedding!|मम्मी, हमने शादी की तारीख़ तय कर ली है!|mummy, hamne shaadi ki taareekh tay kar li hai!|Maman, on a choisi une date pour le mariage !|Mama, wir haben ein Datum für die Hochzeit!
a|Finally! When is it?|आख़िरकार! कब है?|aakhirkaar! kab hai?|Enfin ! C'est quand ?|Endlich! Wann ist sie?
b|The twelfth of February next year.|अगले साल बारह फ़रवरी।|agle saal baarah farvari.|Le douze février de l'année prochaine.|Am zwölften Februar nächsten Jahres.
a|How many guests are you inviting?|कितने मेहमानों को बुला रहे हो?|kitne mehmaanon ko bulaa rahe ho?|Vous invitez combien de personnes ?|Wie viele Gäste ladet ihr ein?
b|We want a small wedding. Maybe one hundred and fifty people. // We want a small wedding. Maybe eighty people.|हम छोटी शादी चाहते हैं। शायद डेढ़ सौ लोग।|ham chhoṭi shaadi chaahte hain. shaayad ḍeḍh sau log.|Nous voulons un petit mariage. Peut-être quatre-vingts personnes.|Wir wollen eine kleine Hochzeit. Vielleicht achtzig Leute.
a|Small? Your father's family alone is a hundred people! // Small? Your father's family alone is fifty people!|छोटी? अकेले तुम्हारे पापा का परिवार ही सौ लोगों का है!|chhoṭi? akele tumhaare paapaa kaa parivaar hi sau logon kaa hai!|Petit ? La famille de ton père, à elle seule, c'est cinquante personnes !|Klein? Allein die Familie deines Vaters sind fünfzig Leute!
b|I know, I know. We'll make the list together.|पता है, पता है। हम साथ में लिस्ट बनाएँगे।|pataa hai, pataa hai. ham saath mein lisṭ banaayenge.|Je sais, je sais. On fera la liste ensemble.|Ich weiß, ich weiß. Wir machen die Liste zusammen.
a|Have you found a venue?|कोई जगह देखी?|koi jagah dekhi?|Vous avez trouvé une salle ?|Habt ihr schon einen Ort gefunden?
b|Yes, a garden near the lake. It's beautiful.|हाँ, झील के पास एक बगीचा। बहुत सुंदर है।|haan, jheel ke paas ek bageechaa. bahut sundar hai.|Oui, un jardin près du lac. C'est magnifique.|Ja, einen Garten am See. Er ist wunderschön.
a|And the food? You know your grandmother has opinions!|और खाना? तुम्हें पता है तुम्हारी दादी की अपनी राय होगी!|aur khaanaa? tumhen pataa hai tumhaari daadi ki apni raay hogi!|Et le repas ? Tu sais que ta grand-mère a son avis sur tout !|Und das Essen? Du weißt, deine Oma hat da ihre eigene Meinung!
b|We'll ask her to choose the sweets. She'll love that. // We'll ask her to choose the desserts. She'll love that.|हम मिठाइयाँ उन्हीं से चुनवाएँगे। उन्हें अच्छा लगेगा।|ham miṭhaaiyaan unhin se chunvaayenge. unhen achchhaa lagegaa.|On lui demandera de choisir les desserts. Elle va adorer.|Wir lassen sie die Desserts aussuchen. Das wird ihr gefallen.
a|Clever girl. I'm so happy for you both.|समझदार बेटी। मैं तुम दोनों के लिए बहुत ख़ुश हूँ।|samajhdaar beṭi. main tum donon ke liye bahut khush hoon.|Maligne, ma fille. Je suis tellement heureuse pour vous deux.|Kluges Mädchen. Ich freue mich so für euch beide.
b|Thank you, Mum. Will you help me choose my outfit? // Thank you, Mum. Will you help me choose the dress?|धन्यवाद, मम्मी। मेरा लहंगा चुनने में मदद करोगी?|dhanyavaad, mummy. meraa lahangaa chunne mein madad karogi?|Merci, maman. Tu m'aideras à choisir la robe ?|Danke, Mama. Hilfst du mir, das Kleid auszusuchen?
a|I've been waiting for this question for years!|मैं इस सवाल का सालों से इंतज़ार कर रही थी!|main is savaal kaa saalon se intazaar kar rahi thi!|J'attends cette question depuis des années !|Auf diese Frage warte ich seit Jahren!

@26|restaurant|Money & shopping|Team dinner and the bill|Colleague|You
a|To a great year! Cheers, everyone!|शानदार साल के नाम! चीयर्स!|shaandaar saal ke naam! cheeyars!|À cette belle année ! Santé, tout le monde !|Auf ein tolles Jahr! Prost, alle zusammen!
b|Cheers! This place is wonderful. Who found it?|चीयर्स! यह जगह कमाल की है। किसने ढूँढी?|cheeyars! yah jagah kamaal ki hai. kisne ḍhoonḍhi?|Santé ! Cet endroit est génial. Qui l'a trouvé ?|Prost! Das Lokal ist wunderbar. Wer hat es gefunden?
a|Our boss. She comes here every Friday.|हमारी बॉस ने। वे हर शुक्रवार यहाँ आती हैं।|hamaari bos ne. ve har shukravaar yahaan aati hain.|Notre cheffe. Elle vient ici tous les vendredis.|Unsere Chefin. Sie kommt jeden Freitag hierher.
b|Should we order a few dishes to share?|क्या कुछ डिश मँगवाएँ, सबके बाँटने के लिए?|kyaa kuchh dish mangvaayen, sabke baanṭne ke liye?|On commande quelques plats à partager ?|Sollen wir ein paar Gerichte zum Teilen bestellen?
a|Good idea. Something spicy, something mild, and a salad.|अच्छा विचार। कुछ तीखा, कुछ हल्का, और एक सलाद।|achchhaa vichaar. kuchh teekhaa, kuchh halkaa, aur ek salaad.|Bonne idée. Quelque chose d'épicé, quelque chose de doux, et une salade.|Gute Idee. Etwas Scharfes, etwas Mildes und einen Salat.
b|The bill is here. It's seven thousand eight hundred in total. // The bill is here. It's three hundred and twelve euros in total.|बिल आ गया। कुल सात हज़ार आठ सौ है।|bil aa gayaa. kul saat hazaar aaṭh sau hai.|Voilà l'addition. Ça fait trois cent douze euros en tout.|Die Rechnung ist da. Insgesamt dreihundertzwölf Euro.
a|We are six people, so that's thirteen hundred each. // We are six people, so that's fifty-two euros each.|हम छह लोग हैं, तो हर एक का तेरह सौ।|ham chhah log hain, to har ek kaa terah sau.|On est six, donc ça fait cinquante-deux euros chacun.|Wir sind sechs, also zweiundfünfzig Euro pro Person.
b|Should we leave a tip?|क्या टिप छोड़ें?|kyaa ṭip chhoḍen?|On laisse un pourboire ?|Sollen wir Trinkgeld geben?
a|Yes, about ten percent. The service was excellent.|हाँ, लगभग दस प्रतिशत। सर्विस बहुत अच्छी थी।|haan, lagbhag das pratishat. sarvis bahut achchhi thi.|Oui, environ dix pour cent. Le service était excellent.|Ja, ungefähr zehn Prozent. Der Service war ausgezeichnet.
b|Can I pay by card? I don't have cash.|क्या मैं कार्ड से दे सकता हूँ? मेरे पास कैश नहीं है।|kyaa main kaarḍ se de saktaa hoon? mere paas kaish nahin hai.|Je peux payer par carte ? Je n'ai pas de liquide.|Kann ich mit Karte zahlen? Ich habe kein Bargeld.
a|Pay for everyone by card, and we'll send you the money.|सबका कार्ड से दे दो, हम तुम्हें पैसे भेज देंगे।|sabkaa kaarḍ se de do, ham tumhen paise bhej denge.|Paie pour tout le monde par carte, et on te rembourse.|Zahl für alle mit Karte, und wir überweisen dir das Geld.
b|Okay. Everyone, please send it today!|ठीक है। सब लोग आज ही भेज देना!|ṭheek hai. sab log aaj hi bhej denaa!|D'accord. Tout le monde, envoyez-le aujourd'hui, s'il vous plaît !|Okay. Alle bitte heute noch überweisen!
a|Promise. Thanks for organising, it was a great evening.|पक्का। इंतज़ाम के लिए धन्यवाद, शाम बहुत अच्छी रही।|pakkaa. intazaam ke liye dhanyavaad, shaam bahut achchhi rahi.|Promis. Merci d'avoir organisé, c'était une super soirée.|Versprochen. Danke fürs Organisieren, es war ein toller Abend.

@27|clinic|Body & health|At the pharmacy|Pharmacist|Customer
b|Hello. Do you have something for a sore throat?|नमस्ते। गले की ख़राश के लिए कुछ है?|namaste. gale ki kharaash ke liye kuchh hai?|Bonjour. Vous avez quelque chose pour le mal de gorge ?|Hallo. Haben Sie etwas gegen Halsschmerzen?
a|Yes. Is it for an adult or a child?|हाँ। बड़े के लिए या बच्चे के लिए?|haan. baḍe ke liye yaa bachche ke liye?|Oui. C'est pour un adulte ou un enfant ?|Ja. Ist es für einen Erwachsenen oder ein Kind?
b|For me.|मेरे लिए।|mere liye.|Pour moi.|Für mich.
a|These lozenges work well. Take one every three hours.|ये गोलियाँ अच्छा असर करती हैं। हर तीन घंटे में एक चूसिए।|ye goliyaan achchhaa asar karti hain. har teen ghanṭe mein ek choosiye.|Ces pastilles sont efficaces. Prenez-en une toutes les trois heures.|Diese Lutschtabletten helfen gut. Nehmen Sie alle drei Stunden eine.
b|Do I need a prescription?|क्या डॉक्टर की पर्ची चाहिए?|kyaa ḍokṭar ki parchi chaahiye?|Il faut une ordonnance ?|Brauche ich ein Rezept?
a|No, you can buy them without one.|नहीं, ये बिना पर्ची के मिलती हैं।|nahin, ye binaa parchi ke milti hain.|Non, elles sont en vente libre.|Nein, die sind rezeptfrei.
b|Are there any side effects?|क्या कोई साइड इफ़ेक्ट हैं?|kyaa koi saaiḍ ifekṭ hain?|Il y a des effets secondaires ?|Gibt es Nebenwirkungen?
a|Not usually. But don't take more than eight a day.|आमतौर पर नहीं। पर दिन में आठ से ज़्यादा मत लीजिए।|aamtaur par nahin. par din mein aaṭh se zyaadaa mat lijiye.|En général non. Mais n'en prenez pas plus de huit par jour.|Normalerweise nicht. Aber nehmen Sie nicht mehr als acht pro Tag.
b|I also need sunscreen and plasters.|मुझे सनस्क्रीन और बैंडेज भी चाहिए।|mujhe sanskreen aur bainḍej bhi chaahiye.|Il me faut aussi de la crème solaire et des pansements.|Ich brauche auch Sonnencreme und Pflaster.
a|The sunscreen is on the shelf behind you, and the plasters are here.|सनस्क्रीन आपके पीछे वाली शेल्फ़ पर है, बैंडेज यहाँ हैं।|sanskreen aapke peechhe vaali shelf par hai, bainḍej yahaan hain.|La crème solaire est sur l'étagère derrière vous, les pansements sont ici.|Die Sonnencreme ist im Regal hinter Ihnen, die Pflaster sind hier.
b|And if my throat doesn't get better?|और अगर गला ठीक न हो तो?|aur agar galaa ṭheek na ho to?|Et si la gorge ne va pas mieux ?|Und wenn der Hals nicht besser wird?
a|If it lasts more than three days, or you get a fever, see a doctor.|अगर तीन दिन से ज़्यादा रहे, या बुख़ार आए, तो डॉक्टर को दिखाइए।|agar teen din se zyaadaa rahe, yaa bukhaar aaye, to ḍokṭar ko dikhaaiye.|Si ça dure plus de trois jours, ou si vous avez de la fièvre, consultez un médecin.|Wenn es länger als drei Tage dauert oder Sie Fieber bekommen, gehen Sie zum Arzt.
b|Thank you. How much is everything?|धन्यवाद। सब मिलाकर कितना हुआ?|dhanyavaad. sab milaakar kitnaa huaa?|Merci. Ça fait combien en tout ?|Danke. Was macht das alles zusammen?
a|Four hundred and sixty-five rupees. Get well soon. // Eighteen euros forty. Get well soon.|चार सौ पैंसठ रुपये। जल्दी ठीक हो जाइए।|chaar sau painsaṭh rupaye. jaldi ṭheek ho jaaiye.|Dix-huit euros quarante. Bon rétablissement.|Achtzehn Euro vierzig. Gute Besserung.

@28|friends|Feelings|A friend needs advice|Friend|You
a|You look worried. Is everything okay?|तुम परेशान लग रहे हो। सब ठीक है?|tum pareshaan lag rahe ho. sab ṭheek hai?|Tu as l'air inquiet. Tout va bien ?|Du siehst besorgt aus. Ist alles in Ordnung?
b|Not really. I got a job offer in another city.|सच कहूँ तो नहीं। मुझे दूसरे शहर में नौकरी का ऑफ़र मिला है।|sach kahoon to nahin. mujhe doosre shahar mein naukri kaa ofar milaa hai.|Pas vraiment. J'ai reçu une offre d'emploi dans une autre ville.|Nicht wirklich. Ich habe ein Jobangebot in einer anderen Stadt bekommen.
a|But that's great news! Why are you worried?|पर यह तो अच्छी ख़बर है! परेशान क्यों हो?|par yah to achchhi khabar hai! pareshaan kyon ho?|Mais c'est une super nouvelle ! Pourquoi tu t'inquiètes ?|Aber das ist doch eine tolle Nachricht! Warum machst du dir Sorgen?
b|The salary is better, but all my friends and family are here.|तनख़्वाह बेहतर है, पर मेरे सारे दोस्त और परिवार यहीं हैं।|tankhvaah behtar hai, par mere saare dost aur parivaar yahin hain.|Le salaire est meilleur, mais tous mes amis et ma famille sont ici.|Das Gehalt ist besser, aber alle meine Freunde und meine Familie sind hier.
a|I understand. That's a difficult decision.|मैं समझता हूँ। यह मुश्किल फ़ैसला है।|main samajhtaa hoon. yah mushkil faislaa hai.|Je comprends. C'est une décision difficile.|Ich verstehe. Das ist eine schwierige Entscheidung.
b|What would you do in my place?|मेरी जगह तुम होते तो क्या करते?|meri jagah tum hote to kyaa karte?|Qu'est-ce que tu ferais à ma place ?|Was würdest du an meiner Stelle tun?
a|I would write down the pros and cons.|मैं फ़ायदे और नुक़सान लिख लेता।|main faayde aur nuqsaan likh letaa.|J'écrirais les avantages et les inconvénients.|Ich würde die Vor- und Nachteile aufschreiben.
a|And ask yourself: where will you learn more?|और ख़ुद से पूछो: तुम कहाँ ज़्यादा सीखोगे?|aur khud se poochho: tum kahaan zyaadaa seekhoge?|Et demande-toi : où est-ce que tu apprendras le plus ?|Und frag dich: Wo wirst du mehr lernen?
b|Probably in the new job. The team is very good.|शायद नई नौकरी में। टीम बहुत अच्छी है।|shaayad nayi naukri mein. ṭeem bahut achchhi hai.|Probablement dans le nouveau poste. L'équipe est très bonne.|Wahrscheinlich im neuen Job. Das Team ist sehr gut.
a|The city is only three hours away by train. You can visit often.|शहर ट्रेन से सिर्फ़ तीन घंटे दूर है। तुम अक्सर आ सकते हो।|shahar ṭren se sirf teen ghanṭe door hai. tum aksar aa sakte ho.|La ville n'est qu'à trois heures de train. Tu pourras revenir souvent.|Die Stadt ist nur drei Stunden mit dem Zug entfernt. Du kannst oft zu Besuch kommen.
b|You're right. And you could visit me too.|तुम सही हो। और तुम भी मुझसे मिलने आ सकते हो।|tum sahi ho. aur tum bhi mujhse milne aa sakte ho.|Tu as raison. Et toi aussi, tu pourrais venir me voir.|Du hast recht. Und du könntest mich auch besuchen.
a|Of course! I'll be your first guest.|बिल्कुल! मैं तुम्हारा पहला मेहमान बनूँगा।|bilkul! main tumhaaraa pahlaa mehmaan banoongaa.|Bien sûr ! Je serai ton premier invité.|Natürlich! Ich werde dein erster Gast.
b|Thank you. I feel much better now.|धन्यवाद। अब मुझे बहुत हल्का महसूस हो रहा है।|dhanyavaad. ab mujhe bahut halkaa mahsoos ho rahaa hai.|Merci. Je me sens beaucoup mieux maintenant.|Danke. Jetzt geht es mir viel besser.
a|That's what friends are for.|दोस्त इसीलिए तो होते हैं।|dost isiliye to hote hain.|C'est à ça que servent les amis.|Dafür sind Freunde doch da.

@29|bus|Questions|A strike: taking a taxi|Traveller|Taxi driver
a|Excuse me, why are there no buses today?|माफ़ कीजिए, आज बसें क्यों नहीं चल रहीं?|maaf kijiye, aaj basen kyon nahin chal raheen?|Excusez-moi, pourquoi il n'y a pas de bus aujourd'hui ?|Entschuldigung, warum fahren heute keine Busse?
b|There is a strike until tomorrow evening.|कल शाम तक हड़ताल है।|kal shaam tak haḍtaal hai.|Il y a une grève jusqu'à demain soir.|Es wird bis morgen Abend gestreikt.
a|Oh no. I have an important meeting at eleven. Are you free?|अरे नहीं। ग्यारह बजे मेरी ज़रूरी मीटिंग है। क्या आप ख़ाली हैं?|are nahin. gyaarah baje meri zaroori meeṭing hai. kyaa aap khaali hain?|Oh non. J'ai une réunion importante à onze heures. Vous êtes libre ?|Oh nein. Ich habe um elf ein wichtiges Meeting. Sind Sie frei?
b|Yes. Where are you going?|हाँ। कहाँ जाना है?|haan. kahaan jaanaa hai?|Oui. Vous allez où ?|Ja. Wohin möchten Sie?
a|To the business park, near the airport.|बिज़नेस पार्क, एयरपोर्ट के पास।|biznes paark, eyarporṭ ke paas.|Au parc d'affaires, près de l'aéroport.|Zum Gewerbepark, in der Nähe des Flughafens.
b|That's about twenty-five kilometres. With traffic, forty minutes.|लगभग पच्चीस किलोमीटर है। ट्रैफ़िक के साथ चालीस मिनट।|lagbhag pachchees kilomeeṭar hai. ṭraifik ke saath chaalees minaṭ.|C'est à environ vingt-cinq kilomètres. Avec la circulation, quarante minutes.|Das sind ungefähr fünfundzwanzig Kilometer. Mit Verkehr vierzig Minuten.
a|How much will it cost?|कितना किराया लगेगा?|kitnaa kiraayaa lagegaa?|Ça coûtera combien ?|Was wird das kosten?
b|Around six hundred rupees, by the meter. // Around fifty euros, by the meter.|मीटर से लगभग छह सौ रुपये।|meeṭar se lagbhag chhah sau rupaye.|Environ cinquante euros, au compteur.|Ungefähr fünfzig Euro, nach Taxameter.
a|Fine. Can you take the highway? It's faster.|ठीक है। क्या आप हाईवे से चलेंगे? वह तेज़ है।|ṭheek hai. kyaa aap haaive se chalenge? vah tez hai.|D'accord. Vous pouvez prendre l'autoroute ? C'est plus rapide.|Gut. Können Sie die Autobahn nehmen? Das geht schneller.
b|Today everyone is taking the highway. I know a shortcut.|आज सब हाईवे से जा रहे हैं। मुझे एक छोटा रास्ता पता है।|aaj sab haaive se jaa rahe hain. mujhe ek chhoṭaa raastaa pataa hai.|Aujourd'hui, tout le monde prend l'autoroute. Je connais un raccourci.|Heute nehmen alle die Autobahn. Ich kenne eine Abkürzung.
a|Great, I trust you. Can I pay by phone?|बढ़िया, मुझे आप पर भरोसा है। क्या मैं फ़ोन से पेमेंट कर सकता हूँ?|baḍhiyaa, mujhe aap par bharosaa hai. kyaa main fon se pemenṭ kar saktaa hoon?|Super, je vous fais confiance. Je peux payer avec mon téléphone ?|Super, ich vertraue Ihnen. Kann ich mit dem Handy zahlen?
b|Yes, of course. Please fasten your seat belt.|हाँ, बिल्कुल। सीट बेल्ट लगा लीजिए।|haan, bilkul. seeṭ belṭ lagaa lijiye.|Oui, bien sûr. Attachez votre ceinture, s'il vous plaît.|Ja, natürlich. Bitte schnallen Sie sich an.
b|Here we are. Quarter to eleven. You're on time!|लीजिए, पहुँच गए। पौने ग्यारह। आप समय पर हैं!|lijiye, pahunch gaye. paune gyaarah. aap samay par hain!|Nous voilà. Onze heures moins le quart. Vous êtes à l'heure !|Da sind wir. Viertel vor elf. Sie sind pünktlich!
a|Thank you so much! Keep the change.|बहुत-बहुत धन्यवाद! बाक़ी पैसे रख लीजिए।|bahut-bahut dhanyavaad! baaqi paise rakh lijiye.|Merci infiniment ! Gardez la monnaie.|Vielen Dank! Stimmt so.

@30|small|Greetings|Looking back on 30 days|Teacher|You
a|You have practised every day for a month. How do you feel?|आपने पूरे एक महीने रोज़ अभ्यास किया है। कैसा लग रहा है?|aapne poore ek maheene roz abhyaas kiyaa hai. kaisaa lag rahaa hai?|Tu t'es entraîné tous les jours pendant un mois. Comment tu te sens ?|Du hast einen Monat lang jeden Tag geübt. Wie fühlst du dich?
b|Proud, and a little surprised. I understand much more now.|गर्व महसूस हो रहा है, और थोड़ी हैरानी भी। अब मैं बहुत ज़्यादा समझता हूँ।|garv mahsoos ho rahaa hai, aur thoḍi hairaani bhi. ab main bahut zyaadaa samajhtaa hoon.|Fier, et un peu surpris. Je comprends beaucoup plus maintenant.|Stolz und ein bisschen überrascht. Ich verstehe jetzt viel mehr.
a|What was the most difficult part?|सबसे मुश्किल क्या था?|sabse mushkil kyaa thaa?|Qu'est-ce qui a été le plus difficile ?|Was war am schwierigsten?
b|The big numbers! Lakh and crore confused me at first. // The big numbers! Seventy, eighty and ninety confused me at first. // The big numbers! Saying the units before the tens confused me at first.|बड़ी संख्याएँ! शुरू में लाख और करोड़ से मैं उलझ जाता था।|baḍi sankhyaayen! shuroo mein laakh aur karoḍ se main ulajh jaataa thaa.|Les grands nombres ! Soixante-dix, quatre-vingts et quatre-vingt-dix m'ont perturbé au début.|Die großen Zahlen! Dass die Einer vor den Zehnern kommen, hat mich am Anfang verwirrt.
a|And now?|और अब?|aur ab?|Et maintenant ?|Und jetzt?
b|Now I can read prices, dates and even my salary.|अब मैं दाम, तारीख़ें और अपनी तनख़्वाह भी पढ़ सकता हूँ।|ab main daam, taareekhen aur apni tankhvaah bhi paḍh saktaa hoon.|Maintenant je sais lire les prix, les dates et même mon salaire.|Jetzt kann ich Preise, Daten und sogar mein Gehalt lesen.
a|Which conversation did you enjoy most?|आपको कौन सी बातचीत सबसे अच्छी लगी?|aapko kaun si baatcheet sabse achchhi lagi?|Quelle conversation as-tu préférée ?|Welches Gespräch hat dir am besten gefallen?
b|Grandpa's story about the wedding. It was so sweet.|दादाजी की शादी वाली कहानी। बहुत प्यारी थी।|daadaaji ki shaadi vaali kahaani. bahut pyaari thi.|L'histoire du grand-père et du mariage. Elle était si touchante.|Opas Geschichte von der Hochzeit. Sie war so süß.
a|What will you do next?|आगे आप क्या करेंगे?|aage aap kyaa karenge?|Et maintenant, tu vas faire quoi ?|Was machst du als Nächstes?
b|I will start again from day one, without the English.|मैं पहले दिन से फिर शुरू करूँगा, बिना अंग्रेज़ी के।|main pahle din se phir shuroo karoongaa, binaa angrezi ke.|Je vais recommencer depuis le premier jour, sans l'anglais.|Ich fange wieder bei Tag eins an, ohne Englisch.
a|Excellent idea. And try to speak with real people every week.|बहुत अच्छा विचार। और हर हफ़्ते असली लोगों से बात करने की कोशिश कीजिए।|bahut achchhaa vichaar. aur har hafte asli logon se baat karne ki koshish kijiye.|Excellente idée. Et essaie de parler avec de vraies personnes chaque semaine.|Sehr gute Idee. Und versuch, jede Woche mit echten Menschen zu sprechen.
b|I will. Mistakes are part of learning.|ज़रूर। ग़लतियाँ सीखने का हिस्सा हैं।|zaroor. galtiyaan seekhne kaa hissaa hain.|Promis. Les erreurs font partie de l'apprentissage.|Mache ich. Fehler gehören zum Lernen dazu.
a|Exactly. Congratulations on thirty days!|बिल्कुल। तीस दिन पूरे होने की बधाई!|bilkul. tees din poore hone ki badhaai!|Exactement. Félicitations pour ces trente jours !|Genau. Herzlichen Glückwunsch zu dreißig Tagen!
b|Thank you! See you tomorrow, for day thirty-one.|धन्यवाद! कल मिलते हैं, इकतीसवें दिन।|dhanyavaad! kal milte hain, ikteesven din.|Merci ! À demain, pour le jour trente et un.|Danke! Bis morgen, zu Tag einunddreißig.
`;

function parse(raw) {
  const days = [];
  let cur = null;
  for (const line of raw.split('\n')) {
    const s = line.trim();
    if (!s) continue;
    const p = s.split('|');
    if (s.startsWith('@')) {
      const n = Number(p[0].slice(1));
      cur = { day: n, id: 'd' + n, setting: p[1], words: p[2], title: p[3], roles: [p[4], p[5]], lines: [] };
      days.push(cur);
    } else {
      const e = p[1].split(' // ');
      const en = e.length === 1 ? e[0] : e.length === 2 ? { hi: e[0], fr: e[1], de: e[1] } : { hi: e[0], fr: e[1], de: e[2] };
      cur.lines.push({ who: p[0], en, hi: p[2], hiR: p[3], fr: p[4], de: p[5] });
    }
  }
  return days;
}

export const COURSE = parse(RAW);
