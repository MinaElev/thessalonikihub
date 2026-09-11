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
  {
    slug: "jewish-thessaloniki",
    title: { el: "Εβραϊκή Θεσσαλονίκη", en: "Jewish Thessaloniki" },
    excerpt: {
      el: "Επί 450 χρόνια η μεγαλύτερη κοινότητα της πόλης. Τι απέμεινε, και πού μπορείς ακόμη να τη συναντήσεις.",
      en: "For 450 years the city's largest community. What remains, and where you can still meet it.",
    },
    body: {
      el: `Για περίπου **450 χρόνια** η Θεσσαλονίκη ήταν μια πόλη όπου η κυρίαρχη γλώσσα του λιμανιού ήταν τα **λαντίνο**, τα μαγαζιά έκλειναν το Σάββατο και η εβραϊκή κοινότητα δεν ήταν μειονότητα αλλά το μεγαλύτερο κομμάτι του πληθυσμού. Την αποκαλούσαν **«Ιερουσαλήμ των Βαλκανίων»**. Σήμερα στην πόλη ζουν λιγότεροι από **2.000** Εβραίοι.

Αυτή η σελίδα δεν είναι διαδρομή αξιοθέατων. Είναι ο χάρτης μιας απουσίας, και των λίγων σημείων όπου μπορείς ακόμη να τη συναντήσεις.

## Πώς ήρθαν
Μετά την εκδίωξη από την Ισπανία το **1492**, χιλιάδες Σεφαραδίτες Εβραίοι βρήκαν καταφύγιο στην οθωμανική Θεσσαλονίκη. Έφεραν μαζί τους τη γλώσσα τους, τα τυπογραφεία τους και τις τέχνες τους. Μέσα σε λίγες δεκαετίες η κοινότητα έγινε η μεγαλύτερη της πόλης, και παρέμεινε έτσι για αιώνες.

Στις αρχές του 20ού αιώνα η πόλη είχε δεκάδες συναγωγές, εβραϊκά σχολεία, εφημερίδες, νοσοκομείο και ένα από τα μεγαλύτερα εβραϊκά νεκροταφεία της Ευρώπης.

## Δύο ρήγματα
Η **πυρκαγιά του 1917** ισοπέδωσε το κέντρο και άφησε άστεγους πάνω από 70.000 ανθρώπους, από τους οποίους περίπου **52.000 ήταν Εβραίοι**. Η ανοικοδόμηση δεν επέτρεψε την επιστροφή στην παλιά μορφή της συνοικίας, και η κοινότητα διασκορπίστηκε σε νέους οικισμούς.

Το **παλιό εβραϊκό νεκροταφείο**, με τάφους αιώνων, καταστράφηκε το 1942. Στη θέση του απλώνεται σήμερα η πανεπιστημιούπολη του **Αριστοτελείου**.

## 1943
Στις **15 Μαρτίου 1943** αναχώρησε από τον παλιό σιδηροδρομικό σταθμό το πρώτο τρένο. Μέχρι τις αρχές Ιουνίου είχαν εκτοπιστεί **48.974 άνθρωποι**, οι περισσότεροι από τη Θεσσαλονίκη, προς το **Άουσβιτς-Μπίρκεναου**.

Επέζησαν λιγότεροι από **2.000**.

Δεν υπάρχει τρόπος να γραφτεί αυτό το νούμερο ώστε να μη μοιάζει αφηρημένο. Είναι σχεδόν ολόκληρη η κοινότητα μιας πόλης, μέσα σε δώδεκα εβδομάδες.

## Πού μπορείς να τη συναντήσεις σήμερα
- **Εβραϊκό Μουσείο Θεσσαλονίκης**, στην οδό Αγίου Μηνά. Στεγάζεται σε ένα από τα λίγα κτίρια που γλίτωσαν από την πυρκαγιά του 1917 και αφηγείται την ιστορία της κοινότητας από την άφιξη ως τον εκτοπισμό.
- **Συναγωγή Μοναστηριωτών**, η μόνη προπολεμική συναγωγή που σώζεται από τις περισσότερες από τριάντα που λειτουργούσαν στην πόλη.
- **Μνημείο Ολοκαυτώματος** στην Πλατεία Ελευθερίας, από όπου το 1942 πέρασε η δημόσια ταπείνωση των ανδρών της κοινότητας.
- **Πλατεία Ελευθερίας** και ο **παλιός σιδηροδρομικός σταθμός**, τα δύο σημεία που σημαδεύουν την αρχή και το τέλος.

## Πώς να το επισκεφθείς
Δώσε του **μισή μέρα** και πήγαινέ το με τη σειρά: μουσείο, συναγωγή, μνημείο. Το Εβραϊκό Μουσείο έχει περιορισμένο ωράριο και η συναγωγή δεν είναι πάντα ανοιχτή σε επισκέπτες, οπότε **έλεγξε πριν πας** και, όπου χρειάζεται, ζήτησε ραντεβού.

Αν διαβάσεις μόνο ένα πράγμα πριν έρθεις, διάβασε για το τι υπήρχε εδώ πριν. Τα κτίρια που θα δεις είναι λίγα· αυτό που λείπει είναι το θέμα.`,
      en: `For roughly **450 years** Thessaloniki was a city where the language of the port was **Ladino**, the shops closed on Saturday, and the Jewish community was not a minority but the largest part of the population. It was called the **"Jerusalem of the Balkans"**. Fewer than **2,000** Jews live in the city today.

This page is not a sightseeing route. It is a map of an absence, and of the few places where you can still meet it.

## How they came
After the expulsion from Spain in **1492**, thousands of Sephardic Jews found refuge in Ottoman Thessaloniki. They brought their language, their printing presses and their trades. Within decades the community was the city's largest, and it stayed that way for centuries.

By the early twentieth century the city had dozens of synagogues, Jewish schools, newspapers, a hospital, and one of the largest Jewish cemeteries in Europe.

## Two ruptures
The **fire of 1917** levelled the centre and left more than 70,000 people homeless, of whom roughly **52,000 were Jews**. The rebuilding did not allow a return to the quarter as it had been, and the community was scattered across new settlements.

The **old Jewish cemetery**, with graves going back centuries, was destroyed in 1942. The campus of the **Aristotle University** stands on the site today.

## 1943
On **15 March 1943** the first train left the old railway station. By early June, **48,974 people** had been deported, most of them from Thessaloniki, to **Auschwitz-Birkenau**.

Fewer than **2,000** survived.

There is no way to write that number so that it stops looking abstract. It is very nearly an entire city's community, inside twelve weeks.

## Where you can meet it today
- The **Jewish Museum of Thessaloniki** on Agiou Mina Street, housed in one of the few buildings to survive the 1917 fire, telling the community's story from arrival to deportation.
- The **Monastirioton Synagogue**, the only pre-war synagogue still standing of the more than thirty that once served the city.
- The **Holocaust Memorial** on Eleftherias Square, where in 1942 the men of the community were publicly humiliated.
- **Eleftherias Square** and the **old railway station**: the two points that mark the beginning and the end.

## How to visit
Give it **half a day** and take it in order: museum, synagogue, memorial. The Jewish Museum keeps limited hours and the synagogue is not always open to visitors, so **check before you go** and arrange a visit where one is needed.

If you read one thing before you come, read about what stood here before. The buildings you will see are few; what is missing is the subject.`,
    },
    category: "history",
    cover: {
      url: "/photos/aristotelous-square.webp",
      alt: {
        el: "Η Πλατεία Αριστοτέλους, χτισμένη πάνω στη ζώνη που κάηκε το 1917",
        en: "Aristotelous Square, built over the zone destroyed by the 1917 fire",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    relatedPlaces: ["aristotelous-square", "agios-dimitrios"],
  },
  {
    slug: "ottoman-thessaloniki",
    title: { el: "Οθωμανική Θεσσαλονίκη", en: "Ottoman Thessaloniki" },
    excerpt: {
      el: "Πέντε αιώνες σε λουτρά, τζαμιά και μια σκεπαστή αγορά που δουλεύει ακόμη.",
      en: "Five centuries in bath-houses, mosques and a covered market still trading.",
    },
    body: {
      el: `Η Θεσσαλονίκη ήταν οθωμανική πόλη για σχεδόν **πέντε αιώνες**, από το 1430 ως το 1912. Δεν το καταλαβαίνεις αμέσως περπατώντας στην Τσιμισκή, αλλά αν ξέρεις πού να κοιτάξεις, η περίοδος αυτή είναι παντού: σε λουτρά, σε τζαμιά που έγιναν αίθουσες εκθέσεων, σε μια σκεπαστή αγορά που λειτουργεί ακόμη.

## Το λουτρό που άνοιξε πρώτο
Το **Μπέη Χαμάμ** στην Εγνατία χτίστηκε το **1444** και είναι το πρώτο οθωμανικό λουτρό της πόλης — και το μεγαλύτερο που σώζεται στην Ελλάδα. Λειτούργησε ως λουτρό ως το 1968, γι' αυτό και το ξέρουν πολλοί ως **«Λουτρά Παράδεισος»**. Σήμερα είναι επισκέψιμος χώρος με περιοδικές εκθέσεις.

## Το Αλατζά Ιμαρέτ
Ιδρύθηκε τον **Φεβρουάριο του 1484** από τον Ισχάκ Πασά. Ήταν ιμαρέτ, δηλαδή συγκρότημα με μαγειρείο για τους φτωχούς και ξενώνα — κοινωνική πρόνοια με οθωμανικούς όρους. Το όνομα «αλατζά» παραπέμπει στα πολύχρωμα πλακίδια του μιναρέ, που δεν σώζονται. Σήμερα φιλοξενεί πολιτιστικές εκδηλώσεις.

## Τα τζαμιά που άλλαξαν χρήση
Το **Χαμζά Μπέη Τζαμί** στη γωνία Εγνατίας και Βενιζέλου το ξέρουν οι Θεσσαλονικείς ως **«Αλκαζάρ»**, από τον κινηματογράφο που στεγάστηκε εκεί για δεκαετίες. Είναι από τα παλαιότερα οθωμανικά τζαμιά της πόλης.

Το **Γενί Τζαμί** στα Νέα Κάτω Τούμπα χτίστηκε στις αρχές του 20ού αιώνα από τον Ιταλό αρχιτέκτονα **Vitaliano Poselli** για τους Ντονμέ, τους εξισλαμισμένους απογόνους των οπαδών του Σαμπετάι Σεβί. Η αρχιτεκτονική του αναμειγνύει νεοκλασικά, αναγεννησιακά και ισλαμικά στοιχεία — ένα κτίριο που δεν μοιάζει με τίποτα άλλο στην πόλη.

Και η **Ροτόντα**: ρωμαϊκό κτίσμα του 4ου αιώνα, χριστιανικός ναός, μετά τζαμί. Ο μιναρές της στέκει ακόμη δίπλα της, ο μόνος που σώζεται στη Θεσσαλονίκη.

## Η αγορά
Το **Μπεζεστένι**, η σκεπαστή αγορά κοντά στην Αριστοτέλους, χτίστηκε τον 15ο αιώνα για το εμπόριο υφασμάτων. Λειτουργεί ακόμη ως αγορά, πέντε αιώνες μετά.

## Το σπίτι του Ατατούρκ
Ο **Μουσταφά Κεμάλ** γεννήθηκε στη Θεσσαλονίκη το **1881**. Το σπίτι όπου γεννήθηκε, δίπλα στο τουρκικό προξενείο, λειτουργεί ως μουσείο. Η επίσκεψη απαιτεί **ταυτότητα ή διαβατήριο** και ο έλεγχος είναι αυστηρός.

## Πώς να τα δεις
Ο Οργανισμός Τουρισμού Θεσσαλονίκης έχει χαρτογραφήσει **26 μνημεία** οθωμανικής διαδρομής και εκδίδει τρίγλωσσο οδηγό. Τα τέσσερα του κέντρου — Μπέη Χαμάμ, Χαμζά Μπέη, Μπεζεστένι, Αλατζά Ιμαρέτ — γίνονται σε **μία ώρα με τα πόδια**.

Τα ωράρια αλλάζουν και αρκετά μνημεία ανοίγουν μόνο για εκθέσεις, οπότε δες τις επίσημες ανακοινώσεις πριν πας.`,
      en: `Thessaloniki was an Ottoman city for nearly **five centuries**, from 1430 to 1912. You do not notice it immediately walking down Tsimiski, but if you know where to look the period is everywhere: in bath-houses, in mosques that became exhibition halls, in a covered market still trading.

## The bath that opened first
**Bey Hamam** on Egnatia was built in **1444** and is the city's first Ottoman bath — and the largest surviving in Greece. It worked as a bath until 1968, which is why many still call it the **"Paradise Baths"**. Today it is open to visitors and hosts temporary exhibitions.

## Alatza Imaret
Founded in **February 1484** by Ishak Pasha. An imaret was a complex with a kitchen for the poor and a hostel — Ottoman social welfare. The name "alatza" refers to the coloured tiles of its minaret, which no longer survive. It now hosts cultural events.

## The mosques that changed use
**Hamza Bey Mosque**, at the corner of Egnatia and Venizelou, is known to locals as the **"Alcazar"**, after the cinema that occupied it for decades. It is among the city's oldest Ottoman mosques.

**Yeni Cami** was built in the early twentieth century by the Italian architect **Vitaliano Poselli** for the Dönmeh, the Islamised descendants of the followers of Sabbatai Zevi. Its architecture mixes neoclassical, Renaissance and Islamic elements — a building unlike anything else in the city.

And the **Rotunda**: a 4th-century Roman structure, then a church, then a mosque. Its minaret still stands beside it, the only one surviving in Thessaloniki.

## The market
The **Bezesteni**, the covered market near Aristotelous, was built in the fifteenth century for the cloth trade. It is still a market, five centuries on.

## Atatürk's house
**Mustafa Kemal** was born in Thessaloniki in **1881**. The house where he was born, beside the Turkish consulate, is a museum. Entry requires **an ID card or passport** and security is strict.

## How to see them
The Thessaloniki Tourism Organisation has mapped **26 monuments** on an Ottoman route and publishes a trilingual guide. The four in the centre — Bey Hamam, Hamza Bey, the Bezesteni and Alatza Imaret — are **an hour's walk** apart.

Opening hours change and several monuments open only for exhibitions, so check the official announcements before you go.`,
    },
    category: "history",
    cover: {
      url: "/photos/rotunda.webp",
      alt: {
        el: "Η Ροτόντα με τον οθωμανικό μιναρέ της, τον μόνο που σώζεται στη Θεσσαλονίκη",
        en: "The Rotunda with its Ottoman minaret, the only one surviving in Thessaloniki",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    relatedPlaces: ["rotunda", "arch-of-galerius"],
  },
  {
    slug: "great-fire-of-1917",
    title: { el: "Η Μεγάλη Πυρκαγιά του 1917", en: "The Great Fire of 1917" },
    excerpt: {
      el: "Τριάντα δύο ώρες που ισοπέδωσαν το κέντρο και γέννησαν την πόλη που βλέπεις σήμερα.",
      en: "Thirty-two hours that levelled the centre and produced the city you see today.",
    },
    body: {
      el: `Αν αναρωτηθείς ποτέ γιατί το κέντρο της Θεσσαλονίκης μοιάζει σχεδιασμένο ενώ η Άνω Πόλη μοιάζει τυχαία, η απάντηση είναι μία: **η πυρκαγιά του 1917**. Μέσα σε περίπου **32 ώρες** κάηκε το μεγαλύτερο μέρος της παλιάς πόλης, και ό,τι βλέπεις σήμερα ανάμεσα στην Εγνατία και τη θάλασσα σχεδιάστηκε από το μηδέν μετά από αυτήν.

## Τι έγινε
Η φωτιά ξεκίνησε το απόγευμα του **Σαββάτου 18 Αυγούστου 1917** σε μια συνοικία κοντά στην Άνω Πόλη. Ήταν καλοκαίρι, φυσούσε Βαρδάρης, τα σπίτια ήταν ξύλινα και η πόλη ήταν γεμάτη στρατό της Αντάντ. Το νερό δεν έφτανε.

Όταν έσβησε, ο απολογισμός ήταν:

- **9.500 κτίρια** καταστραμμένα
- **πάνω από 70.000 άστεγοι** — περίπου 52.000 Εβραίοι, 11.000 Μουσουλμάνοι και 10.000 Χριστιανοί
- το εμπορικό, διοικητικό και θρησκευτικό κέντρο της πόλης, μαζί με συναγωγές, εκκλησίες, σχολεία και αρχεία

## Η απόφαση που άλλαξε τα πάντα
Η ελληνική κυβέρνηση πήρε μια ασυνήθιστη απόφαση: **απαγόρευσε την ανοικοδόμηση** πάνω στα παλιά οικόπεδα. Αντί να ξαναχτιστεί η πόλη όπως ήταν, θα σχεδιαζόταν εκ νέου.

Επικεφαλής ορίστηκε ο Γάλλος πολεοδόμος **Ernest Hébrard**, που βρισκόταν ήδη στη Θεσσαλονίκη με τη Στρατιά της Ανατολής. Το σχέδιό του χώριζε την πόλη σε ζώνες — διοικητική, εμπορική, βιομηχανική — έφερνε φαρδιούς άξονες, και τοποθετούσε στον πυρήνα μια μεγάλη **Place Civique** που θα άνοιγε από τη διοίκηση προς τη θάλασσα.

Αυτή η πλατεία είναι η σημερινή **Αριστοτέλους**. Οι τοξωτές στοές της παραπέμπουν στη Rue de Rivoli του Παρισιού.

## Τι κέρδισε και τι έχασε η πόλη
Η Θεσσαλονίκη απέκτησε το μοναδικό ίσως ελληνικό κέντρο με ενιαίο πολεοδομικό σχέδιο: φαρδιές λεωφόρους, νεοκλασικά μέτωπα, θέα στον Θερμαϊκό.

Έχασε όμως την παλιά της μορφή, και κάτι βαρύτερο. Οι ιδιοκτήτες των καμένων οικοπέδων αποζημιώθηκαν με ομόλογα και όχι με γη. Πολλοί δεν μπόρεσαν να επιστρέψουν, και η **εβραϊκή κοινότητα**, που είχε χάσει το μεγαλύτερο μέρος των σπιτιών της, διασκορπίστηκε σε νέους συνοικισμούς στην περιφέρεια.

Πέντε χρόνια αργότερα, η άφιξη των **προσφύγων του 1922** θα άλλαζε ξανά τη δημογραφία της πόλης.

## Πού το βλέπεις σήμερα
- Στην **Πλατεία Αριστοτέλους**, που είναι κυριολεκτικά το κέντρο του σχεδίου Hébrard.
- Στην **Άνω Πόλη**, η μόνη περιοχή που γλίτωσε — γι' αυτό κρατά ακόμη καλντερίμια, ξύλινα σπίτια και σαχνισιά.
- Στον **Άγιο Δημήτριο**, που κάηκε και ξαναχτίστηκε· η σημερινή μορφή του είναι αποτέλεσμα της αποκατάστασης.
- Στη διαφορά που θα προσέξεις μόνος σου, μόλις ανηφορίσεις πάνω από την Ολύμπου: από εκεί και πάνω, η πόλη είναι άλλη.`,
      en: `If you ever wonder why central Thessaloniki looks planned while the Upper Town looks accidental, there is a single answer: **the fire of 1917**. In roughly **32 hours** most of the old city burned, and everything you see today between Egnatia and the sea was designed from scratch afterwards.

## What happened
The fire started on the afternoon of **Saturday 18 August 1917** in a district near the Upper Town. It was summer, the Vardaris wind was blowing, the houses were timber and the city was full of Allied troops. There was not enough water.

When it was out, the toll was:

- **9,500 buildings** destroyed
- **more than 70,000 homeless** — around 52,000 Jews, 11,000 Muslims and 10,000 Christians
- the commercial, administrative and religious heart of the city, along with synagogues, churches, schools and archives

## The decision that changed everything
The Greek government took an unusual decision: it **banned rebuilding** on the old plots. Rather than put the city back as it had been, it would be designed anew.

The French planner **Ernest Hébrard**, already in Thessaloniki with the Army of the Orient, was put in charge. His plan divided the city into zones — administrative, commercial, industrial — introduced wide axes, and placed at its core a great **Place Civique** opening from the seat of government down to the sea.

That square is today's **Aristotelous**. Its arcades echo the Rue de Rivoli in Paris.

## What the city gained, and lost
Thessaloniki got perhaps the only Greek city centre built to a single coherent plan: broad avenues, neoclassical frontages, a view onto the gulf.

But it lost its old form, and something heavier. Owners of burnt plots were compensated in bonds rather than land. Many could not return, and the **Jewish community**, which had lost the bulk of its housing, was scattered into new settlements on the edges of the city.

Five years later, the arrival of the **refugees of 1922** would change the city's make-up again.

## Where you see it today
- On **Aristotelous Square**, literally the centre of the Hébrard plan.
- In **Ano Poli**, the one district that escaped — which is why it still has cobbled lanes, timber houses and overhanging upper storeys.
- At **Agios Dimitrios**, which burned and was rebuilt; its present form is the result of that restoration.
- In the difference you will notice yourself the moment you climb above Olympou Street: from there up, it is a different city.`,
    },
    category: "history",
    cover: {
      url: "/photos/agios-dimitrios.webp",
      alt: {
        el: "Ο Ναός του Αγίου Δημητρίου, που κάηκε το 1917 και ξαναχτίστηκε",
        en: "The Church of Saint Demetrios, burned in 1917 and rebuilt",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    relatedPlaces: ["aristotelous-square", "agios-dimitrios", "byzantine-walls"],
  },
  {
    slug: "refugee-thessaloniki-1922",
    title: { el: "Η Προσφυγική Θεσσαλονίκη του 1922", en: "Refugee Thessaloniki, 1922" },
    excerpt: {
      el: "Πώς η ανταλλαγή πληθυσμών έφτιαξε τις μισές γειτονιές της πόλης — και την κουζίνα της.",
      en: "How the population exchange built half the city's neighbourhoods — and its cooking.",
    },
    body: {
      el: `Αν φας μεζέδες στη Θεσσαλονίκη και σου πουν ότι η κουζίνα εδώ είναι «πιο πλούσια», η εξήγηση δεν είναι γαστρονομική. Είναι δημογραφική, και έχει ημερομηνία: **1922**.

## Τι έγινε
Μετά τη Μικρασιατική Καταστροφή και την ανταλλαγή πληθυσμών που ακολούθησε τη **Συνθήκη της Λωζάνης (1923)**, εκατοντάδες χιλιάδες Έλληνες της Μικράς Ασίας, του Πόντου και της Ανατολικής Θράκης έφτασαν στην Ελλάδα. Η Θεσσαλονίκη, το κοντινότερο μεγάλο λιμάνι, δέχτηκε τεράστιο μέρος τους.

Ταυτόχρονα, η **μουσουλμανική κοινότητα** της πόλης — που ζούσε εδώ αιώνες — αναχώρησε στο πλαίσιο της ίδιας ανταλλαγής.

Μέσα σε λίγα χρόνια η σύνθεση της πόλης άλλαξε ριζικά, για δεύτερη φορά μέσα σε μια δεκαετία.

## Πού εγκαταστάθηκαν
Οι πρόσφυγες δεν χώρεσαν στο κέντρο, που εξάλλου ήταν ακόμη εργοτάξιο μετά την πυρκαγιά. Χτίστηκαν νέοι συνοικισμοί στην περιφέρεια, και τα ονόματά τους τα λένε όλα:

- **Καλαμαριά**, ο μεγαλύτερος προσφυγικός συνοικισμός, που σήμερα είναι δήμος με δική του ταυτότητα.
- **Νέα Κρήνη**, από την Κρήνη (Çeşme) της Μικράς Ασίας.
- **Τούμπα**, **Άνω Τούμπα**, **Χαριλάου**, **Ευαγγελίστρια**: πυκνές, εργατικές γειτονιές που κράτησαν τον χαρακτήρα τους.
- **Εύοσμος**, **Σταυρούπολη**, **Πολίχνη** στα δυτικά.

Το πρόθεμα **«Νέα»** σε ένα όνομα είναι σχεδόν πάντα δείκτης: κάποιοι ονόμασαν τον νέο τόπο τους από τον παλιό που άφησαν.

## Τι άλλαξε στο πιάτο
Η μικρασιατική και ποντιακή κουζίνα δεν ήρθε ως «εθνική κουζίνα» — ήρθε ως καθημερινό φαγητό χιλιάδων σπιτιών, και έμεινε. Από εκεί κρατούν τα **σουτζουκάκια**, οι πίτες, τα μπαχαρικά που λείπουν από τη νότια ελληνική κουζίνα, και η επιμονή της πόλης στο καλό ψωμί και στα γλυκά ταψιού.

Γι' αυτό η Θεσσαλονίκη θεωρείται συχνά η γαστρονομική πρωτεύουσα της χώρας. Δεν είναι μαρκετίστικος τίτλος· είναι το αποτέλεσμα μιας μετακίνησης πληθυσμών.

## Πού το συναντάς
- Στην **Καλαμαριά** και στη **Νέα Κρήνη**, όπου η προσφυγική καταγωγή είναι ακόμη ζωντανή μνήμη.
- Στην **Τούμπα**, από τις πιο αυθεντικές γειτονιές της πόλης.
- Στα **μεζεδοπωλεία** γύρω από τις αγορές Μοδιάνο και Καπάνι.
- Στα ονόματα των συλλόγων, των ποδοσφαιρικών ομάδων και των εκκλησιών — αν τα διαβάσεις προσεκτικά, σου λένε από πού ήρθε ο κόσμος.`,
      en: `If you eat meze in Thessaloniki and someone tells you the cooking here is "richer", the explanation is not culinary. It is demographic, and it has a date: **1922**.

## What happened
After the Asia Minor Catastrophe and the population exchange that followed the **Treaty of Lausanne (1923)**, hundreds of thousands of Greeks from Asia Minor, Pontus and Eastern Thrace arrived in Greece. Thessaloniki, the nearest large port, took an enormous share of them.

At the same time the city's **Muslim community**, which had lived here for centuries, left under the terms of the same exchange.

Within a few years the make-up of the city changed completely, for the second time in a decade.

## Where they settled
The refugees did not fit in the centre, which in any case was still a building site after the fire. New settlements went up around the edges, and their names say everything:

- **Kalamaria**, the largest refugee settlement, today a municipality with an identity of its own.
- **Nea Krini**, named for Krini (Çeşme) in Asia Minor.
- **Toumba**, **Ano Toumba**, **Charilaou**, **Evangelistria**: dense, working neighbourhoods that kept their character.
- **Evosmos**, **Stavroupoli** and **Polichni** to the west.

The prefix **"Nea"** — new — in a name is almost always a marker: people named their new place after the old one they had left.

## What changed on the plate
Asia Minor and Pontic cooking did not arrive as a cuisine to be celebrated; it arrived as the everyday food of thousands of households, and it stayed. From it come **soutzoukakia**, the pies, the spices that southern Greek cooking largely lacks, and the city's insistence on good bread and syrup-soaked sweets.

This is why Thessaloniki is so often called the country's gastronomic capital. It is not a marketing line; it is the result of a movement of people.

## Where you meet it
- In **Kalamaria** and **Nea Krini**, where refugee descent is still living memory.
- In **Toumba**, one of the city's most authentic neighbourhoods.
- In the **meze houses** around the Modiano and Kapani markets.
- In the names of associations, football clubs and churches — read them carefully and they tell you where people came from.`,
    },
    category: "history",
    cover: {
      url: "/photos/nea-paralia.webp",
      alt: {
        el: "Η Νέα Παραλία προς την Καλαμαριά, όπου χτίστηκε ο μεγαλύτερος προσφυγικός συνοικισμός",
        en: "The waterfront toward Kalamaria, where the largest refugee settlement was built",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    relatedPlaces: ["white-tower", "nea-paralia"],
  },
  {
    slug: "parking-in-thessaloniki",
    title: { el: "Πού να Παρκάρεις στη Θεσσαλονίκη", en: "Where to Park in Thessaloniki" },
    excerpt: {
      el: "Η σύντομη απάντηση είναι «μην φέρεις αυτοκίνητο στο κέντρο». Η μακρά εξηγεί τι να κάνεις αν πρέπει.",
      en: "The short answer is \"don't bring a car into the centre\". The long one explains what to do if you must.",
    },
    body: {
      el: `Η σύντομη απάντηση: **μην φέρεις αυτοκίνητο στο κέντρο**. Η μακρά απάντηση εξηγεί γιατί, και τι να κάνεις αν πρέπει.

## Γιατί είναι δύσκολο
Το κέντρο της Θεσσαλονίκης σχεδιάστηκε μετά την πυρκαγιά του 1917, για μια πόλη πολύ μικρότερη. Οι άξονες είναι φαρδιοί αλλά λίγοι, και ο πληθυσμός του πολεοδομικού συγκροτήματος ξεπερνά το ένα εκατομμύριο. Η παράνομη στάθμευση σε δεύτερη σειρά είναι καθημερινότητα.

Μετά το άνοιγμα του **μετρό**, το πρόβλημα άλλαξε χαρακτήρα: πλέον υπάρχει πραγματική εναλλακτική.

## Η λύση που δουλεύει
**Άφησε το αυτοκίνητο σε στάση μετρό στην περιφέρεια και μπες στην πόλη με το μετρό.**

Οι στάσεις προς τα ανατολικά και νοτιοανατολικά — προς **Νέα Ελβετία** και προς τον κλάδο της **Καλαμαριάς** — εξυπηρετούν όποιον έρχεται από τον περιφερειακό ή από τη Χαλκιδική. Από εκεί το κέντρο είναι λίγα λεπτά, χωρίς να ψάξεις θέση.

Δες τον [οδηγό των στάσεων](/metro) για το τι υπάρχει γύρω από την καθεμία.

## Αν πρέπει να παρκάρεις στο κέντρο
- **Ιδιωτικά πάρκινγκ** υπάρχουν σε όλο το κέντρο, με τη μεγαλύτερη πυκνότητα γύρω από την Τσιμισκή, τη Βαλαωρίτου και το λιμάνι. Είναι η ασφαλής επιλογή για μερικές ώρες.
- **Ελεγχόμενη στάθμευση** με κάρτα υπάρχει σε ζώνες του κέντρου. Οι τιμές και οι ώρες αλλάζουν, οπότε δες την επίσημη ενημέρωση του Δήμου πριν βασιστείς σε αυτήν.
- **Ξενοδοχεία:** ρώτα πριν κλείσεις. Αρκετά κεντρικά ξενοδοχεία δεν έχουν δικό τους πάρκινγκ και συνεργάζονται με πάρκινγκ της γειτονιάς, συχνά με χρέωση.

## Πού να μη δοκιμάσεις
Στην **Άνω Πόλη** οι δρόμοι είναι στενοί, ανηφορικοί και συχνά μονόδρομοι. Είναι εφικτό, αλλά αν δεν ξέρεις την περιοχή θα χάσεις περισσότερο χρόνο απ' όσο κερδίζεις. Ανέβα με λεωφορείο ή ταξί.

Στα **Λαδάδικα** και γύρω από τις αγορές, το βράδυ, μην το συζητάς.

## Αν έρχεσαι για εκδρομή
Για **Χαλκιδική**, **Όλυμπο** ή **Βεργίνα** το αυτοκίνητο είναι η λογική επιλογή. Για την πόλη, δεν είναι. Αν ο σκοπός σου είναι και τα δύο, κράτα το αυτοκίνητο για τις μέρες των εκδρομών και άφησέ το σταθμευμένο τις υπόλοιπες.`,
      en: `The short answer: **do not bring a car into the centre**. The long answer explains why, and what to do if you must.

## Why it is hard
Central Thessaloniki was laid out after the 1917 fire for a far smaller city. The axes are wide but few, and the wider urban area is home to more than a million people. Double parking is an everyday sight.

Since the **metro** opened, the problem has changed character: there is now a real alternative.

## What actually works
**Leave the car at an outlying metro station and take the metro in.**

The stations to the east and south-east — toward **Nea Elvetia** and along the **Kalamaria** branch — serve anyone arriving from the ring road or from Chalkidiki. From there the centre is minutes away, with no hunt for a space.

See the [station guides](/en/metro) for what sits around each one.

## If you must park in the centre
- **Private car parks** exist across the centre, most densely around Tsimiski, Valaoritou and the port. This is the safe option for a few hours.
- **Controlled on-street parking** operates in zones of the centre. Prices and hours change, so check the municipality's official information before relying on it.
- **Hotels:** ask before you book. Several central hotels have no car park of their own and use a neighbourhood one, often for a fee.

## Where not to try
In **Ano Poli** the streets are narrow, steep and often one-way. It is possible, but if you do not know the area you will lose more time than you save. Go up by bus or taxi.

In **Ladadika** and around the markets in the evening, do not attempt it.

## If you are here for day trips
For **Chalkidiki**, **Mount Olympus** or **Vergina**, a car is the sensible choice. For the city, it is not. If you want both, keep the car for the day-trip days and leave it parked for the rest.`,
    },
    category: "tips",
    cover: {
      url: "/photos/aristotelous-square.webp",
      alt: {
        el: "Η Πλατεία Αριστοτέλους, στο κέντρο του σχεδίου που έγινε μετά την πυρκαγιά του 1917",
        en: "Aristotelous Square, at the heart of the plan drawn up after the 1917 fire",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    relatedPlaces: ["aristotelous-square"],
  },
  {
    slug: "thessaloniki-with-kids",
    title: { el: "Θεσσαλονίκη με Παιδιά", en: "Thessaloniki with Children" },
    excerpt: {
      el: "Τι δουλεύει, τι να αποφύγεις, και γιατί η παραλία λύνει τα μισά προβλήματα.",
      en: "What works, what to avoid, and why the seafront solves half the problem.",
    },
    body: {
      el: `Η Θεσσαλονίκη είναι πιο εύκολη πόλη με παιδιά απ' ό,τι δείχνει. Είναι επίπεδη εκεί που μετράει, έχει μεγάλο παραλιακό πεζόδρομο, και η ελληνική κουλτούρα δέχεται τα παιδιά παντού — σε ταβέρνες, σε καφέ, αργά το βράδυ.

## Το μεγάλο πλεονέκτημα
Η **Νέα Παραλία** είναι πέντε χιλιόμετρα πεζόδρομος δίπλα στη θάλασσα, χωρίς αυτοκίνητα, με θεματικούς κήπους, ποδηλατόδρομο και ανοιχτούς χώρους. Είναι το μέρος όπου τα παιδιά μπορούν να τρέξουν χωρίς να ανησυχείς, και οι μεγάλοι να καθίσουν.

Ποδήλατα και πατίνια νοικιάζονται κατά μήκος της.

## Τι δουλεύει με παιδιά
- **Λευκός Πύργος** — ανεβαίνεις κυκλικά, η θέα στην κορυφή είναι ανταμοιβή, και η επίσκεψη είναι σύντομη.
- **Το μετρό** — για παιδιά που δεν το έχουν συνηθίσει, είναι από μόνο του εμπειρία. Οι συρμοί είναι καινούργιοι και οι σταθμοί καθαροί.
- **Ομπρέλες του Ζογγολόπουλου** — το πιο φωτογραφημένο σημείο της πόλης, και ανοιχτός χώρος γύρω του.
- **Αγορές** — Μοδιάνο και Καπάνι, με χρώματα, φωνές και δοκιμές. Καλύτερα πρωί.
- **Ροτόντα και Καμάρα** — μεγάλα, εντυπωσιακά, γρήγορα. Δεν χρειάζονται υπομονή.

## Τι να αποφύγεις με μικρά παιδιά
Η **Άνω Πόλη** είναι όμορφη αλλά ανηφορική και με καλντερίμια. Με καρότσι είναι δύσκολη. Αν θες τη θέα, ανέβα με ταξί ή λεωφορείο και περπάτησε λίγο γύρω από τα τείχη.

Τα **μουσεία** είναι εξαιρετικά αλλά απαιτητικά για μικρές ηλικίες. Διάλεξε ένα, όχι δύο.

## Πρακτικά
- **Φαγητό:** τα περισσότερα εστιατόρια δέχονται παιδιά χωρίς ζήτημα και πολλά έχουν καρέκλες. Δεν υπάρχει «ώρα για παιδιά» — η πόλη τρώει αργά και τα παιδιά είναι μέσα σε αυτό.
- **Ζέστη:** Ιούλιο και Αύγουστο απόφυγε το κέντρο 12:00–17:00. Δες τον οδηγό [μήνα-μήνα](/when-to-visit) για το τι να περιμένεις.
- **Θάλασσα:** μέσα στην πόλη δεν κολυμπάς. Οι κοντινές επιλογές είναι **Περαία** και **Αγία Τριάδα** απέναντι, ή η [Χαλκιδική](/day-trips/chalkidiki) για ολόκληρη μέρα.
- **Καρότσι:** στο κέντρο και στην παραλία δουλεύει μια χαρά· στα πεζοδρόμια των εμπορικών δρόμων λιγότερο.`,
      en: `Thessaloniki is an easier city with children than it looks. It is flat where it matters, it has a long seafront promenade, and Greek culture takes children everywhere — into tavernas, into cafés, late into the evening.

## The big advantage
The **waterfront promenade** is five kilometres of car-free path beside the sea, with themed gardens, a cycle lane and open space. It is where children can run without you worrying, and adults can sit.

Bikes and scooters can be hired along it.

## What works with children
- **The White Tower** — you climb it in a spiral, the view at the top is the reward, and the visit is short.
- **The metro** — for children who have not used one, it is an outing in itself. The trains are new and the stations clean.
- **Zongolopoulos's Umbrellas** — the most photographed spot in the city, with open space around it.
- **The markets** — Modiano and Kapani, full of colour, noise and tasting. Better in the morning.
- **The Rotunda and the Arch** — big, impressive, quick. They ask no patience.

## What to avoid with small children
**Ano Poli** is beautiful but steep and cobbled. With a pushchair it is hard work. If you want the view, go up by taxi or bus and walk a short stretch along the walls.

The **museums** are excellent but demanding for young ages. Pick one, not two.

## Practical notes
- **Eating:** most restaurants take children without fuss and many have high chairs. There is no "children's hour" — the city eats late and children are part of it.
- **Heat:** in July and August avoid the centre between noon and 5 p.m. See the [month-by-month guide](/en/when-to-visit) for what to expect.
- **Swimming:** you do not swim in the city itself. The nearest options are **Peraia** and **Agia Triada** across the bay, or [Chalkidiki](/en/day-trips/chalkidiki) for a full day.
- **Pushchairs:** fine in the centre and along the seafront; less so on the pavements of the shopping streets.`,
    },
    category: "tips",
    cover: {
      url: "/photos/nea-paralia.webp",
      alt: {
        el: "Ο πεζόδρομος της Νέας Παραλίας, πέντε χιλιόμετρα χωρίς αυτοκίνητα",
        en: "The waterfront promenade, five car-free kilometres",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    relatedPlaces: ["nea-paralia", "white-tower"],
  },
  {
    slug: "accessible-thessaloniki",
    title: { el: "Προσβασιμότητα στη Θεσσαλονίκη", en: "Accessibility in Thessaloniki" },
    excerpt: {
      el: "Τι είναι πραγματικά προσβάσιμο, τι δεν είναι, και πώς να σχεδιάσεις γύρω από αυτό.",
      en: "What is genuinely accessible, what is not, and how to plan around it.",
    },
    body: {
      el: `Αυτή η σελίδα λέει τι ισχύει πραγματικά, χωρίς να ωραιοποιεί. Η Θεσσαλονίκη έχει βελτιωθεί σημαντικά, αλλά η προσβασιμότητα δεν είναι ομοιόμορφη.

## Τι δουλεύει καλά
**Το μετρό.** Είναι το νεότερο κομμάτι υποδομής της πόλης και σχεδιάστηκε με προσβασιμότητα εξαρχής: ανελκυστήρες στους σταθμούς, οδηγοί όδευσης τυφλών, ηχητικές και οπτικές αναγγελίες, και συρμοί στο ίδιο επίπεδο με την αποβάθρα χάρη στις θύρες ασφαλείας. Αν κινείσαι με αναπηρικό αμαξίδιο, **το μετρό είναι ο πιο αξιόπιστος τρόπος να διασχίσεις την πόλη**.

**Η Νέα Παραλία.** Πέντε χιλιόμετρα ανασχεδιασμένου πεζόδρομου, επίπεδα, φαρδιά, χωρίς αυτοκίνητα. Από τα καλύτερα προσβάσιμα σημεία της πόλης.

**Τα μεγάλα μουσεία.** Το Αρχαιολογικό Μουσείο και το Μουσείο Βυζαντινού Πολιτισμού έχουν προβλέψεις πρόσβασης. Επιβεβαίωσε με τον επίσημο ιστότοπο πριν πας.

## Τι είναι δύσκολο
**Η Άνω Πόλη.** Καλντερίμια, απότομες ανηφόρες, στενά πεζοδρόμια. Με αμαξίδιο είναι πρακτικά μη προσβάσιμη στο μεγαλύτερο μέρος της.

**Τα αρχαία μνημεία.** Ροτόντα, Αψίδα, Αρχαία Αγορά, βυζαντινοί ναοί: πολλά έχουν σκαλοπάτια, ανώμαλο δάπεδο ή είσοδο σε διαφορετική στάθμη. Μερικά έχουν ράμπες. Δεν υπάρχει ενιαίος κανόνας — ρώτα κατά περίπτωση.

**Τα πεζοδρόμια του κέντρου.** Στους κεντρικούς άξονες είναι καλά. Στους μικρότερους δρόμους, η παράνομη στάθμευση τα κάνει συχνά αδιάβατα. Αυτό είναι το πιο συχνό εμπόδιο στην πράξη.

## Πρακτικές συμβουλές
- **Σχεδίασε γύρω από το μετρό.** Δες ποιες στάσεις εξυπηρετούν αυτά που θες να δεις στον [οδηγό των στάσεων](/metro), όπου κάθε σελίδα λέει τι υπάρχει σε απόσταση περιπάτου.
- **Κατάλυμα:** ρώτα συγκεκριμένα — πλάτος πόρτας, ανελκυστήρα, σκαλοπάτι στην είσοδο. Πολλά κεντρικά κτίρια είναι παλιά και «προσβάσιμο» σημαίνει διαφορετικά πράγματα.
- **Ταξί:** υπάρχουν οχήματα με πρόσβαση αμαξιδίου, αλλά είναι λίγα. Κλείσε εκ των προτέρων.
- **Επιβεβαίωσε πάντα.** Οι πληροφορίες προσβασιμότητας αλλάζουν και τα έργα είναι συχνά. Δεν δημοσιεύουμε εδώ ωράρια ή στοιχεία που δεν μπορούμε να επαληθεύσουμε — δες πάντα την επίσημη πηγή του κάθε χώρου.`,
      en: `This page says what is actually the case, without dressing it up. Thessaloniki has improved a great deal, but accessibility is not uniform.

## What works well
**The metro.** It is the newest piece of infrastructure in the city and was designed for accessibility from the start: lifts at the stations, tactile guidance paths, audio and visual announcements, and trains level with the platform thanks to the platform screen doors. If you use a wheelchair, **the metro is the most reliable way to cross the city**.

**The waterfront promenade.** Five kilometres of redesigned path, flat, wide and car-free. One of the most accessible places in the city.

**The major museums.** The Archaeological Museum and the Museum of Byzantine Culture have access provisions. Confirm with the official site before you go.

## What is difficult
**Ano Poli.** Cobbles, steep climbs, narrow pavements. In a wheelchair most of it is effectively inaccessible.

**The ancient monuments.** The Rotunda, the Arch, the Ancient Agora, the Byzantine churches: many have steps, uneven floors or an entrance at a different level. Some have ramps. There is no single rule — ask case by case.

**Pavements in the centre.** On the main axes they are good. On smaller streets, illegal parking often makes them impassable. In practice this is the most frequent obstacle.

## Practical advice
- **Plan around the metro.** See which stations serve what you want in the [station guides](/en/metro), where each page lists what is within walking distance.
- **Accommodation:** ask specifically — door widths, a lift, a step at the entrance. Many central buildings are old, and "accessible" means different things.
- **Taxis:** wheelchair-accessible vehicles exist but are few. Book ahead.
- **Always confirm.** Accessibility information changes and works are frequent. We do not publish hours or details here that we cannot verify — check each site's official source.`,
    },
    category: "tips",
    cover: {
      url: "/photos/nea-paralia.webp",
      alt: {
        el: "Ο επίπεδος, φαρδύς πεζόδρομος της Νέας Παραλίας",
        en: "The flat, wide promenade along the waterfront",
      },
    },
    author: "ThessalonikiHub",
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    relatedPlaces: ["nea-paralia", "archaeological-museum"],
  },
];
