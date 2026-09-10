import type { Guide } from "@/lib/types";

/** Editorial guides & itineraries built around real Thessaloniki landmarks. */
export const guides: Guide[] = [
  {
    slug: "unesco-monuments-of-thessaloniki",
    title: { el: "Τα Μνημεία UNESCO της Θεσσαλονίκης", en: "The UNESCO Monuments of Thessaloniki" },
    excerpt: {
      el: "Οδηγός στα Παλαιοχριστιανικά και Βυζαντινά Μνημεία που έκαναν τη Θεσσαλονίκη Μνημείο Παγκόσμιας Κληρονομιάς.",
      en: "A guide to the Paleochristian and Byzantine monuments that made Thessaloniki a World Heritage Site.",
    },
    body: {
      el: `Η Θεσσαλονίκη είναι ένα **ζωντανό μουσείο** χριστιανικής τέχνης και αρχιτεκτονικής. Το 1988 η UNESCO ενέταξε **15 Παλαιοχριστιανικά και Βυζαντινά Μνημεία** της πόλης στον Κατάλογο Μνημείων Παγκόσμιας Κληρονομιάς: αναγνωρίζοντας μια αδιάσπαστη πορεία **έντεκα αιώνων**, από τον 4ο ως τον 15ο. Δεν χρειάζεται να τα δεις όλα· με μισή έως μία μέρα καλύπτεις τα σημαντικότερα, όλα σχεδόν με τα πόδια.\n\n## Τι είναι τα Μνημεία UNESCO\nΠρόκειται για ναούς, ένα μοναστήρι, ένα λουτρό και τα τείχη της πόλης, που μαζί δείχνουν την εξέλιξη της βυζαντινής αρχιτεκτονικής και ψηφιδωτής τέχνης. Πολλά είναι ακόμη **ενεργοί ναοί**.\n\n## Από πού να ξεκινήσεις\nΞεκίνα από τη **Ροτόντα**, το επιβλητικό ρωμαϊκό οικοδόμημα του 4ου αιώνα με τα εξαιρετικά παλαιοχριστιανικά ψηφιδωτά στον τρούλο. Λίγα μέτρα πιο κάτω, στην Εγνατία, στέκει η **Αψίδα του Γαλερίου** (η «Καμάρα»).\n\n## Οι μεγάλες εκκλησίες του κέντρου\nΟ **Άγιος Δημήτριος**, αφιερωμένος στον πολιούχο, είναι η μεγαλύτερη εκκλησία της πόλης· μην παραλείψεις την υπόγεια **κρύπτη**. Σε απόσταση περιπάτου: η **Αγία Σοφία** (8ος αι.) με την Ανάληψη στον τρούλο, η **Αχειροποίητος** (5ος αι.) και η ολόπλινθη **Παναγία Χαλκέων** (1028).\n\n## Άνω Πόλη\nΑνηφόρισε στην **Άνω Πόλη** για τη **Μονή Βλατάδων** (το μόνο εν λειτουργία βυζαντινό μοναστήρι) και τα **βυζαντινά τείχη**, με την καλύτερη θέα στην πόλη και ιδανικό ηλιοβασίλεμα.\n\n## Πρακτικές συμβουλές\nΟι ναοί είναι χώροι λατρείας: φόρα ευπρεπή ενδυμασία και σεβάσου τις ώρες των ακολουθιών. Οι περισσότεροι στο κέντρο συνδυάζονται σε έναν περίπατο 2–3 ωρών· άφησε την Άνω Πόλη για ξεχωριστό μισό απόγευμα.`,
      en: `Thessaloniki is a **living museum** of Christian art and architecture. In 1988 UNESCO inscribed **15 Paleochristian and Byzantine monuments** on the World Heritage List: recognising an unbroken story of **eleven centuries**, from the 4th to the 15th. You don't need to see them all; half a day to a day covers the most important, almost all on foot.\n\n## What the UNESCO monuments are\nThey are churches, a monastery, a bath and the city walls, which together trace the evolution of Byzantine architecture and mosaic art. Many are still **working churches**.\n\n## Where to start\nBegin at the **Rotunda**, the imposing 4th-century Roman structure with outstanding early-Christian mosaics in the dome. A few metres downhill on Egnatia stands the **Arch of Galerius** (the "Kamara").\n\n## The great churches of the centre\nThe **Church of Saint Demetrios**, dedicated to the patron saint, is the city's largest; don't miss the underground **crypt**. Within walking distance: **Hagia Sophia** (8th c.) with the Ascension in its dome, the **Acheiropoietos** (5th c.) and the all-brick **Panagia Chalkeon** (1028).\n\n## Ano Poli\nClimb up to the **Upper Town** for **Vlatades Monastery** (the only working Byzantine monastery) and the **Byzantine walls**, with the finest view over the city and a perfect sunset.\n\n## Practical tips\nThe churches are places of worship: dress modestly and respect service times. Most in the centre link into a 2–3 hour walk; save Ano Poli for a separate half-afternoon.`,
    },
    category: "tips",
    cover: {
      url: "/photos/agios-dimitrios.webp",
      alt: {
        el: "Ο Ναός του Αγίου Δημητρίου φωτισμένος το σούρουπο, μνημείο UNESCO της Θεσσαλονίκης",
        en: "The Church of Saint Demetrios lit at dusk, a UNESCO monument of Thessaloniki",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-05",
    updatedAt: "2026-09-08",
    relatedPlaces: ["rotunda", "agios-dimitrios", "hagia-sophia", "vlatadon-monastery", "byzantine-walls"],
    featured: true,
  },
  {
    slug: "3-days-in-thessaloniki",
    title: { el: "3 Ημέρες στη Θεσσαλονίκη", en: "3 Days in Thessaloniki" },
    excerpt: {
      el: "Ένα ισορροπημένο τριήμερο πρόγραμμα: κέντρο, ιστορία, Άνω Πόλη και θάλασσα.",
      en: "A balanced three-day plan: the centre, history, the Upper Town and the sea.",
    },
    body: {
      el: `Τρεις μέρες είναι ο ιδανικός χρόνος για μια πρώτη, ουσιαστική γνωριμία με τη Θεσσαλονίκη: αρκετός για τα μνημεία, τη θάλασσα και τη ζωή της πόλης, χωρίς βιασύνη. Το πρόγραμμα είναι σχεδιασμένο ώστε να γίνεται σχεδόν όλο **με τα πόδια**.\n\n## Ημέρα 1: Το κέντρο & τα ρωμαϊκά/βυζαντινά\nΠρωινός καφές στην **Πλατεία Αριστοτέλους**. Περπάτησε προς την **Αρχαία Αγορά** και τον **Άγιο Δημήτριο** με την κρύπτη του. Κατέβα στη **Ροτόντα** και την **Αψίδα του Γαλερίου**. Μεσημέρι στις αγορές **Μοδιάνο/Καπάνι** για μεζέδες, βράδυ ποτό στη **Βαλαωρίτου** ή δείπνο στα **Λαδάδικα**.\n\n## Ημέρα 2: Άνω Πόλη & θέα\nΑφιέρωσε το πρωί στην **Άνω Πόλη**: **βυζαντινά τείχη**, **Μονή Βλατάδων** και **Επταπύργιο**, με πανοραμική θέα στον Θερμαϊκό. Κάτσε για μεσημεριανό σε παραδοσιακή ταβέρνα με θέα και κράτησε τον **Πύργο Τριγωνίου** για το ηλιοβασίλεμα.\n\n## Ημέρα 3: Θάλασσα & μουσεία\nΠεριπάτησε τη **Νέα Παραλία** ως τις «**Ομπρέλες**», ανέβα στον **Λευκό Πύργο** και κλείσε με το **Αρχαιολογικό Μουσείο** ή το **Μουσείο Βυζαντινού Πολιτισμού**, που βρίσκονται δίπλα-δίπλα.\n\n## Έχεις παραπάνω χρόνο;\nΠρόσθεσε μια εκδρομή: **Βεργίνα**, **Όλυμπος** ή μπάνιο στη **Χαλκιδική**: όλα σε λιγότερο από 1,5 ώρα.`,
      en: `Three days is the sweet spot for a first, meaningful visit to Thessaloniki: enough for the monuments, the sea and the life of the city, without rushing. The plan is designed to be done almost entirely **on foot**.\n\n## Day 1: The centre & the Roman/Byzantine city\nMorning coffee on **Aristotelous Square**. Walk to the **Ancient Agora** and the **Church of Saint Demetrios** with its crypt. Head down to the **Rotunda** and the **Arch of Galerius**. Lunch on meze in the **Modiano/Kapani** markets, evening drinks in **Valaoritou** or dinner in **Ladadika**.\n\n## Day 2: Ano Poli & views\nSpend the morning in the **Upper Town**: the **Byzantine walls**, **Vlatades Monastery** and the **Heptapyrgion**, with panoramic views over the gulf. Have lunch at a traditional taverna with a view and save the **Trigoniou Tower** for sunset.\n\n## Day 3: Sea & museums\nStroll the **waterfront** to the "**Umbrellas**", go up the **White Tower** and finish with the **Archaeological Museum** or the **Museum of Byzantine Culture**, which stand side by side.\n\n## Got more time?\nAdd a day trip: **Vergina**, **Mount Olympus** or a swim in **Chalkidiki**: all under 1.5 hours away.`,
    },
    category: "itinerary",
    cover: {
      url: "/photos/aristotelous-square.webp",
      alt: {
        el: "Η Πλατεία Αριστοτέλους στο σούρουπο, αφετηρία για τρεις μέρες στη Θεσσαλονίκη",
        en: "Aristotelous Square at dusk, the starting point for three days in Thessaloniki",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-04",
    updatedAt: "2026-09-08",
    relatedPlaces: ["aristotelous-square", "white-tower", "byzantine-walls", "archaeological-museum"],
    featured: true,
  },
  {
    slug: "roman-thessaloniki-walk",
    title: { el: "Η Ρωμαϊκή Θεσσαλονίκη με τα Πόδια", en: "Roman Thessaloniki on Foot" },
    excerpt: {
      el: "Ένας σύντομος περίπατος στο ρωμαϊκό συγκρότημα εξουσίας του 4ου αιώνα.",
      en: "A short walk through the 4th-century Roman complex of power.",
    },
    body: {
      el: `Λίγες πόλεις έχουν τόσο συμπυκνωμένη ρωμαϊκή ιστορία στο κέντρο τους. Στις αρχές του **4ου αιώνα**, ο αυτοκράτορας **Γαλέριος** έκανε τη Θεσσαλονίκη έδρα του και έχτισε ένα ολόκληρο **ανακτορικό συγκρότημα**, μεγάλο μέρος του σώζεται και είναι επισκέψιμο σε μια εύκολη βόλτα.\n\n## Η διαδρομή (≈1,5 χλμ.)\n1. **Αψίδα του Γαλερίου** (Καμάρα), στην Εγνατία. Η θριαμβική αψίδα με τα ανάγλυφα των νικών του.\n2. **Ροτόντα**, λίγα μέτρα πιο πάνω. Το μνημειακό κυκλικό οικοδόμημα με τα ψηφιδωτά.\n3. **Ανάκτορα του Γαλερίου** στην πλατεία **Ναυαρίνου**. Ο ιδιωτικός χώρος του αυτοκράτορα.\n4. **Αρχαία (Ρωμαϊκή) Αγορά** στην πλατεία Δικαστηρίων: το διοικητικό κέντρο, με ωδείο και κρυπτοστοά.\n\n## Χρόνος & συμβουλές\nΌλα βρίσκονται σε απόσταση **10–15 λεπτών με τα πόδια** μεταξύ τους. Υπολόγισε 2–3 ώρες με τις στάσεις. Κλείσε με έναν καφέ στη Ναυαρίνου, μια από τις πιο ζωντανές πλατείες της πόλης.`,
      en: `Few cities have so much Roman history packed into their centre. In the early **4th century**, Emperor **Galerius** made Thessaloniki his seat and built an entire **palace complex**, much of it survives and is walkable in one easy loop.\n\n## The route (≈1.5 km)\n1. **Arch of Galerius** (Kamara), on Egnatia. The triumphal arch with reliefs of his victories.\n2. **Rotunda**, a few metres uphill. The monumental circular building with its mosaics.\n3. **Palace of Galerius** on **Navarinou** Square. The emperor's private quarters.\n4. **Roman Forum (Ancient Agora)** on Dikastirion Square: the administrative centre, with an odeon and cryptoporticus.\n\n## Time & tips\nEverything is a **10–15 minute walk** apart. Allow 2–3 hours with stops. Finish with a coffee on Navarinou, one of the city's liveliest squares.`,
    },
    category: "itinerary",
    cover: {
      url: "/photos/arch-of-galerius.webp",
      alt: {
        el: "Η Αψίδα του Γαλερίου στην Εγνατία, αφετηρία της ρωμαϊκής διαδρομής",
        en: "The Arch of Galerius on Egnatia Street, the start of the Roman walk",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-03",
    updatedAt: "2026-09-08",
    relatedPlaces: ["arch-of-galerius", "rotunda", "roman-forum"],
  },
  {
    slug: "thessaloniki-neighbourhoods",
    title: { el: "Οι Γειτονιές της Θεσσαλονίκης", en: "The Neighbourhoods of Thessaloniki" },
    excerpt: {
      el: "Κέντρο, Λαδάδικα, Άνω Πόλη, Νέα Παραλία, Καλαμαριά, ποια ταιριάζει σε εσάς.",
      en: "Centre, Ladadika, Ano Poli, Waterfront, Kalamaria, which one suits you.",
    },
    body: {
      el: `Η γειτονιά που θα διαλέξεις καθορίζει την εμπειρία σου στη Θεσσαλονίκη. Να ένας σύντομος οδηγός για να βρεις ποια σου ταιριάζει, για διαμονή αλλά και για το πώς θα περάσεις τη μέρα σου.\n\n## Κέντρο\nΤα μνημεία, η αγορά και η Αριστοτέλους σε απόσταση περιπάτου. **Ιδανικό για:** πρώτη φορά, αξιοθέατα, ψώνια.\n\n## Λαδάδικα\nΙστορικά πλακόστρωτα, ταβέρνες και μπαρ δίπλα στο λιμάνι. **Ιδανικό για:** φαγητό, νυχτερινή ζωή, ατμόσφαιρα.\n\n## Άνω Πόλη\nΒυζαντινά τείχη, γραφικά σοκάκια και η καλύτερη θέα. **Ιδανικό για:** ιστορία, ρομαντικές βόλτες, ηλιοβασίλεμα.\n\n## Νέα Παραλία\nΟ παραλιακός πεζόδρομος για περπάτημα, ποδήλατο και ηλιοβασίλεμα, με τα μεγάλα μουσεία δίπλα. **Ιδανικό για:** χαλάρωση, θέα στη θάλασσα.\n\n## Βαλαωρίτου\nΠρώην βιομηχανική ζώνη, σήμερα το επίκεντρο της εναλλακτικής νυχτερινής ζωής. **Ιδανικό για:** ποτό, νεανική/underground σκηνή.\n\n## Καλαμαριά\nΠαραθαλάσσια, ήσυχη, με μαρίνα και ψαροταβέρνες. **Ιδανικό για:** οικογένειες, πιο ήρεμη διαμονή.\n\n> Δες αναλυτικά κάθε περιοχή στη σελίδα **Περιοχές**: με χάρτη, αξιοθέατα και προτάσεις.`,
      en: `The neighbourhood you choose shapes your whole experience of Thessaloniki. Here's a quick guide to find the one that fits you, for where to stay and for how to spend your day.\n\n## City center\nThe monuments, the market and Aristotelous within walking distance. **Best for:** first-timers, sightseeing, shopping.\n\n## Ladadika\nHistoric cobbled streets, tavernas and bars next to the port. **Best for:** food, nightlife, atmosphere.\n\n## Ano Poli\nByzantine walls, picturesque lanes and the best views. **Best for:** history, romantic strolls, sunset.\n\n## Waterfront\nThe seaside promenade for walking, cycling and sunsets, with the major museums beside it. **Best for:** relaxing, sea views.\n\n## Valaoritou\nA former industrial zone, now the epicentre of the alternative nightlife. **Best for:** drinks, a young/underground scene.\n\n## Kalamaria\nSeaside, quiet, with a marina and fish tavernas. **Best for:** families, a calmer stay.\n\n> See each area in detail on the **Areas** page: with a map, sights and recommendations.`,
    },
    category: "areas",
    cover: {
      url: "/photos/byzantine-walls.webp",
      alt: {
        el: "Τα βυζαντινά τείχη πάνω από την Άνω Πόλη, με τις γειτονιές της Θεσσαλονίκης να απλώνονται ως τη θάλασσα",
        en: "The Byzantine walls above the Upper Town, Thessaloniki's neighbourhoods spreading down to the sea",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-08",
    relatedPlaces: ["byzantine-walls", "aristotelous-square", "nea-paralia"],
  },
  {
    slug: "getting-around-thessaloniki",
    title: { el: "Μετακινήσεις στη Θεσσαλονίκη", en: "Getting Around Thessaloniki" },
    excerpt: {
      el: "Μετρό, λεωφορεία, ταξί και με τα πόδια, πώς να κινηθείς εύκολα στην πόλη.",
      en: "Metro, buses, taxis and on foot, how to move around the city easily.",
    },
    body: {
      el: `Η καλή είδηση για τον επισκέπτη: η Θεσσαλονίκη είναι σε μεγάλο βαθμό **περπατήσιμη**. Το ιστορικό κέντρο, η αγορά, η Αριστοτέλους και η παραλία καλύπτονται άνετα με τα πόδια, οπότε συνήθως **δεν χρειάζεσαι αυτοκίνητο** μέσα στην πόλη.\n\n## Μετρό\nΗ πρώτη γραμμή του μετρό λειτουργεί και διασχίζει την πόλη με σύγχρονους, αυτόματους συρμούς: η πιο γρήγορη επιλογή στον κεντρικό άξονα, χωρίς κίνηση.\n\n## Λεωφορεία\nΕκτεταμένο δίκτυο αστικών λεωφορείων συνδέει τις γειτονιές, την Άνω Πόλη και τα προάστια (π.χ. Καλαμαριά). Χρήσιμο για ανηφόρες όπως προς την Άνω Πόλη.\n\n## Ταξί & εφαρμογές\nΕύκολα διαθέσιμα, με τα χαρακτηριστικά **μπλε-άσπρα** οχήματα· λειτουργούν και εφαρμογές κλήσης.\n\n## Ποδήλατο & περπάτημα\nΗ **Νέα Παραλία** έχει ποδηλατόδρομο και είναι ιδανική για βόλτα ή τρέξιμο δίπλα στη θάλασσα.\n\n## Από/προς άλλες πόλεις\nΗ πόλη συνδέεται με τρένο και υπεραστικά λεωφορεία (ΚΤΕΛ) με την Αθήνα και τη Βόρεια Ελλάδα, και με το **αεροδρόμιο «Μακεδονία» (SKG)**.\n\n> Για ακριβή δρομολόγια και τιμές εισιτηρίων, συμβουλέψου πάντα τις επίσημες πηγές των μέσων.`,
      en: `Good news for visitors: Thessaloniki is largely **walkable**. The historic centre, the market, Aristotelous and the seafront are all comfortably covered on foot, so you usually **don't need a car** in the city.\n\n## Metro\nThe city's first metro line is in operation, crossing the city with modern, driverless trains: the fastest option along the central axis, with no traffic.\n\n## Buses\nAn extensive urban bus network connects the neighbourhoods, Ano Poli and the suburbs (e.g. Kalamaria). Handy for climbs such as up to the Upper Town.\n\n## Taxis & apps\nEasy to find, in the characteristic **blue-and-white** livery; ride-hailing apps also operate.\n\n## Cycling & walking\nThe **waterfront** has a cycle path and is perfect for a ride or run by the sea.\n\n## To/from other cities\nThe city is linked by train and intercity buses (KTEL) to Athens and northern Greece, and by **Makedonia Airport (SKG)**.\n\n> For exact schedules and ticket prices, always check the official transport sources.`,
    },
    category: "tips",
    cover: {
      url: "/photos/aristotelous-square.webp",
      alt: {
        el: "Η Πλατεία Αριστοτέλους, το κεντρικό σημείο αναφοράς για τις μετακινήσεις στην πόλη",
        en: "Aristotelous Square, the central reference point for getting around the city",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-09",
  },
  {
    slug: "thessaloniki-from-the-airport",
    title: { el: "Από το Αεροδρόμιο στην Πόλη", en: "From the Airport to the City" },
    excerpt: {
      el: "Πώς να φτάσεις στο κέντρο από το αεροδρόμιο «Μακεδονία» (SKG).",
      en: "How to reach the centre from Thessaloniki Airport \"Makedonia\" (SKG).",
    },
    body: {
      el: `Το αεροδρόμιο **«Μακεδονία» (SKG)** είναι η πύλη εισόδου στη Θεσσαλονίκη, βρίσκεται περίπου **13 χλμ. νοτιοανατολικά** της πόλης, κοντά στη Θέρμη. Να οι τρόποι για να φτάσεις στο κέντρο.\n\n## Λεωφορείο\nΑστικά δρομολόγια συνδέουν το αεροδρόμιο με το **κέντρο** και τον **σταθμό ΚΤΕΛ/τρένου**. Η πιο οικονομική επιλογή· ιδανική αν ταξιδεύεις ελαφρά.\n\n## Ταξί\nΈξω από τις αφίξεις υπάρχει πιάτσα. Η διαδρομή προς το κέντρο διαρκεί συνήθως **20–30 λεπτά** ανάλογα με την κίνηση. Η πιο γρήγορη και άνετη «πόρτα-πόρτα» λύση.\n\n## Transfer / ιδιωτική μεταφορά\nΒολική επιλογή, ειδικά με **αποσκευές, παρέα ή βραδινή άφιξη**, προκαθορισμένη τιμή και οδηγός που σε περιμένει. Δες τις καταχωρήσεις στην κατηγορία **Υπηρεσίες**.\n\n## Ενοικίαση αυτοκινήτου\nΓραφεία ενοικιάσεων υπάρχουν στο αεροδρόμιο· χρήσιμο μόνο αν σκοπεύεις για εκδρομές (Χαλκιδική, Όλυμπος), μέσα στην πόλη δεν το χρειάζεσαι.\n\n> Για τρέχοντα δρομολόγια και τιμές, δες πάντα τις επίσημες πηγές.`,
      en: `**Makedonia Airport (SKG)** is Thessaloniki's gateway: about **13 km southeast** of the city, near Thermi. Here are your options for reaching the centre.\n\n## Bus\nCity bus routes connect the airport with the **centre** and the **bus/train station**. The most economical option; ideal if you travel light.\n\n## Taxi\nThere is a rank outside arrivals. The trip to the centre usually takes **20–30 minutes** depending on traffic: the fastest, most comfortable door-to-door option.\n\n## Transfer / private ride\nConvenient, especially with **luggage, a group or a late arrival**. A fixed price and a driver waiting for you. See the listings under **Services**.\n\n## Car rental\nRental desks are at the airport; useful only if you plan day trips (Chalkidiki, Olympus); you won't need a car in the city.\n\n> For current schedules and prices, always check the official sources.`,
    },
    category: "tips",
    cover: {
      url: "/photos/white-tower.webp",
      alt: {
        el: "Ο Λευκός Πύργος στην παραλία, το πρώτο σημείο αναφοράς όταν φτάνεις στην πόλη",
        en: "The White Tower on the waterfront, the first landmark you reach in the city",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-09",
  },
  {
    slug: "romantic-weekend-thessaloniki",
    title: { el: "Ρομαντικό Σαββατοκύριακο", en: "A Romantic Weekend" },
    excerpt: {
      el: "Δύο μέρες για ζευγάρια: θέα, ηλιοβασίλεμα, καλό φαγητό και βόλτες.",
      en: "Two days for couples: views, sunsets, good food and strolls.",
    },
    body: {
      el: `Η Θεσσαλονίκη είναι πόλη-ρομάντζο: θέα στη θάλασσα, ηλιοβασιλέματα πάνω από τον Όλυμπο, καλό φαγητό και ατμοσφαιρικά σοκάκια. Να ένα ιδανικό διήμερο για δύο.\n\n## Ημέρα 1: Θάλασσα & ηλιοβασίλεμα\nΞεκινήστε με καφέ στην **Πλατεία Αριστοτέλους** και χαλαρή βόλτα στη **Νέα Παραλία** μέχρι τις «**Ομπρέλες**». Το απόγευμα ανεβείτε στην **Άνω Πόλη** και κρατήστε τον **Πύργο Τριγωνίου** για το ηλιοβασίλεμα με θέα σε όλη την πόλη. Δείπνο σε ταβέρνα με θέα ή στα **Λαδάδικα**.\n\n## Ημέρα 2: Ιστορία & rooftop\nΠρωινό με θέα, επίσκεψη στη **Ροτόντα** και τον **Λευκό Πύργο**. Το βράδυ, cocktails σε ένα από τα **rooftop bar** της πόλης. Η πιο ρομαντική κατακλείδα.\n\n## Πού να μείνετε\nΓια το κατάλληλο κατάλυμα, δείτε τις **ρομαντικές επιλογές** στην κατηγορία Διαμονή: μπουτίκ ξενοδοχεία και δωμάτια με θέα.`,
      en: `Thessaloniki is a city made for romance: sea views, sunsets over Mount Olympus, great food and atmospheric lanes. Here's an ideal two days for a couple.\n\n## Day 1: Sea & sunset\nStart with coffee on **Aristotelous Square** and a relaxed walk along the **waterfront** to the "**Umbrellas**". In the afternoon head up to **Ano Poli** and save the **Trigoniou Tower** for sunset, with a view over the whole city. Dinner at a taverna with a view or in **Ladadika**.\n\n## Day 2: History & rooftop\nBreakfast with a view, then visit the **Rotunda** and the **White Tower**. In the evening, cocktails at one of the city's **rooftop bars**. The most romantic finale.\n\n## Where to stay\nFor the right base, see the **romantic options** under Accommodation — boutique hotels and rooms with a view.`,
    },
    category: "itinerary",
    cover: {
      url: "/photos/byzantine-walls.webp",
      alt: {
        el: "Ηλιοβασίλεμα από τα βυζαντινά τείχη της Άνω Πόλης, με θέα σε όλη τη Θεσσαλονίκη",
        en: "Sunset from the Byzantine walls of the Upper Town, looking out over all of Thessaloniki",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-07",
    updatedAt: "2026-09-09",
    relatedPlaces: ["aristotelous-square", "nea-paralia", "white-tower", "rotunda"],
  },
  {
    slug: "free-things-to-do-thessaloniki",
    title: { el: "Δωρεάν Πράγματα να Κάνεις", en: "Free Things to Do" },
    excerpt: {
      el: "Η Θεσσαλονίκη προσφέρει πολλά χωρίς εισιτήριο, να μερικά.",
      en: "Thessaloniki offers plenty with no ticket, here are a few.",
    },
    body: {
      el: `Η Θεσσαλονίκη είναι από τις πιο οικονομικές πόλεις για επισκέπτη — και πολλά από τα καλύτερά της είναι **εντελώς δωρεάν**. Να μερικές ιδέες που δεν κοστίζουν τίποτα.\n\n## Βόλτες & θέα\n- Περπάτημα στη **Νέα Παραλία** και φωτογραφία στις «**Ομπρέλες**».\n- Ανάβαση στα **Βυζαντινά Τείχη** της Άνω Πόλης. Η καλύτερη θέα στην πόλη.\n- **Ηλιοβασίλεμα** από τον Πύργο Τριγωνίου.\n\n## Ιστορία & πολιτισμός\n- Θαυμασμός της **Αψίδας του Γαλερίου** και των μνημείων εξωτερικά.\n- Οι περισσότεροι **βυζαντινοί ναοί** (Άγιος Δημήτριος, Αγία Σοφία) έχουν ελεύθερη είσοδο.\n\n## Ζωή της πόλης\n- Βόλτα στις σκεπαστές αγορές **Μοδιάνο** και **Καπάνι**.\n- Καφές (ή μπουγάτσα!) και *people-watching* στην **Αριστοτέλους**.\n\n> Πολλά **μουσεία** έχουν μέρες/ώρες ελεύθερης εισόδου — δες τους επίσημους ιστότοπους.`,
      en: `Thessaloniki is one of the most affordable cities to visit — and many of its best experiences are **completely free**. Here are some ideas that cost nothing.\n\n## Walks & views\n- A walk along the **waterfront** and a photo at the "**Umbrellas**".\n- Climbing the **Byzantine Walls** of the Upper Town. The best view over the city.\n- **Sunset** from the Trigoniou Tower.\n\n## History & culture\n- Admiring the **Arch of Galerius** and the monuments from outside.\n- Most **Byzantine churches** (Agios Dimitrios, Hagia Sophia) are free to enter.\n\n## City life\n- Wandering the covered **Modiano** and **Kapani** markets.\n- Coffee (or bougatsa!) and people-watching on **Aristotelous Square**.\n\n> Many **museums** have free-entry days/hours· check their official sites.`,
    },
    category: "tips",
    cover: {
      url: "/photos/arch-of-galerius.webp",
      alt: {
        el: "Η Αψίδα του Γαλερίου, ελεύθερα επισκέψιμη όλο το εικοσιτετράωρο",
        en: "The Arch of Galerius, free to visit around the clock",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-07",
    updatedAt: "2026-09-09",
    relatedPlaces: ["nea-paralia", "byzantine-walls", "arch-of-galerius"],
  },
];
