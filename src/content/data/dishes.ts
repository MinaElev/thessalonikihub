import type { Localized } from "@/lib/types";

/**
 * "What Thessaloniki eats", monographs on the city's signature foods.
 *
 * Histories researched and cross-checked (Sept 2026). Where a dish's origin is
 * shared or disputed, the page says so rather than claiming it for the city.
 *
 * These pages describe FOOD, not businesses. No shop is recommended or named,
 * except where a person or establishment is part of the documented history.
 */
export interface Dish {
  slug: string;
  name: Localized<string>;
  /** street | sweet | sea | table | drink */
  kind: "street" | "sweet" | "sea" | "table" | "drink";
  /** When locals actually eat it. */
  whenToEat: Localized<string>;
  blurb: Localized<string>;
  long: Localized<string>;
  /** Area slugs where it is most associated, for cross-linking. */
  areas?: string[];
  featured?: boolean;
}

export const dishes: Dish[] = [
  {
    slug: "bougatsa",
    name: { el: "Μπουγάτσα", en: "Bougatsa" },
    kind: "street",
    whenToEat: { el: "Πρωινό, από νωρίς", en: "Breakfast, from early" },
    blurb: {
      el: "Το πρωινό της πόλης: τραγανό φύλλο, ζεστή κρέμα ή τυρί, κομμένη σε τετράγωνα με το ψαλίδι.",
      en: "The city's breakfast: crisp filo, warm custard or cheese, cut into squares with scissors.",
    },
    long: {
      el: `Αν ρωτήσεις έναν Θεσσαλονικιό τι πρέπει να φας πρώτο όταν έρθεις στην πόλη, θα σου πει μπουγάτσα. Όχι επειδή είναι σπάνια, επειδή είναι καθημερινή. Είναι το πρωινό που τρώγεται όρθιος, από χαρτί, στις οκτώ το πρωί.

## Από πού ήρθε
Η μπουγάτσα δεν γεννήθηκε στη Θεσσαλονίκη, και αξίζει να το ξέρεις. Οι ρίζες της είναι **βυζαντινές** και το ταξίδι της ξεκινά από την **Κωνσταντινούπολη**. Το όνομα προέρχεται από το τουρκικό *pogaça*, που σημαίνει ζύμη, αλλά το ίδιο το έδεσμα είναι παλαιότερο: μαρτυρίες για την παρασκευή του υπάρχουν από τον 16ο και 17ο αιώνα, μετά την Άλωση.

Στην αρχή η μπουγάτσα ήταν **χωρίς γέμιση** και τη φώναζαν «η πίτα του φτωχού». Η γεμιστή με κρέμα εκδοχή διαδόθηκε από πρόσφυγες που εγκαταστάθηκαν στις **Σέρρες** στις αρχές του 20ού αιώνα. Εκεί απέκτησε τον χαρακτήρα και τη φήμη της, και από εκεί ήρθε στη Θεσσαλονίκη, κυρίως από **Σερραίους τεχνίτες** που έφεραν μαζί τους την τέχνη του φύλλου.

## Πώς έγινε θεσμός
Στις προσφυγικές γειτονιές της Θεσσαλονίκης οι **μπουγατσατζήδες** γύριζαν με μικρά καρότσια, κρατώντας την μπουγάτσα ζεστή με **κάρβουνα**. Το **σωματείο των μπουγατσατζήδων της Θεσσαλονίκης ιδρύθηκε το 1917**, και από το **1922** και μετά (με την άφιξη των προσφύγων της Μικράς Ασίας) η διάδοσή της επιταχύνθηκε δραματικά.

Έτσι η Θεσσαλονίκη δεν εφηύρε την μπουγάτσα· την **υιοθέτησε και την έκανε ταυτότητα**. Σήμερα, όταν κάποιος λέει «μπουγάτσα», η πόλη που έρχεται στο μυαλό είναι αυτή.

## Οι εκδοχές
- **Με κρέμα**: η γλυκιά, πασπαλισμένη με ζάχαρη άχνη και κανέλα. Η πιο γνωστή.
- **Με τυρί**: αλμυρή, συνήθως με φέτα ή μυζήθρα.
- **Με κιμά**, αλμυρή και πιο χορταστική.
- **Με σπανάκι**. Η πιο κοντινή σε σπανακόπιτα.

## Πώς τρώγεται
Ζεστή, μόλις βγει. Ο μπουγατσατζής την **κόβει με το ψαλίδι** σε τετράγωνα μέσα στο χαρτί, αυτός ο ήχος είναι μέρος της εμπειρίας. Στη γλυκιά ρίχνει άχνη και κανέλα μπροστά σου. Δεν παραγγέλνεται «για αργότερα»: κρυώνει και χάνει το τραγανό.

## Πού θα τη βρεις
Παραδοσιακά μπουγατσάδικα λειτουργούν σε όλη την πόλη, με μεγαλύτερη συγκέντρωση στο **κέντρο** και γύρω από τις αγορές. Ανοίγουν πολύ νωρίς: αρκετά από τα ιστορικά ξεκινούν πριν τις 6 το πρωί, εξυπηρετώντας όσους γυρίζουν από τη νύχτα και όσους πάνε στη δουλειά.`,
      en: `Ask anyone from Thessaloniki what you should eat first when you arrive and they'll say bougatsa. Not because it's rare, because it's everyday. It's the breakfast eaten standing up, out of paper, at eight in the morning.

## Where it came from
Bougatsa was not born in Thessaloniki, and that's worth knowing. Its roots are **Byzantine** and its journey begins in **Constantinople**. The name comes from the Turkish *pogaça*, meaning dough, but the dish itself is older: accounts of it being made survive from the 16th and 17th centuries, after the Fall.

At first bougatsa had **no filling** and was called "the poor man's pie". The cream-filled version spread through refugees who settled in **Serres** in the early 20th century. There it acquired its character and its fame, and from there it came to Thessaloniki, largely with **craftsmen from Serres** who brought the art of the filo with them.

## How it became an institution
In Thessaloniki's refugee neighbourhoods the **bougatsa sellers** went round with small carts, keeping it warm over **charcoal**. The **bougatsa makers' guild of Thessaloniki was founded in 1917**, and from **1922** onward — with the arrival of the refugees from Asia Minor — its spread accelerated dramatically.

So Thessaloniki didn't invent bougatsa; it **adopted it and made it an identity**. Today, when someone says "bougatsa", this is the city that comes to mind.

## The versions
- **With cream**: the sweet one, dusted with icing sugar and cinnamon. The best known.
- **With cheese**: savoury, usually feta or mizithra.
- **With minced meat**, savoury and more filling.
- **With spinach**. The closest to a spanakopita.

## How it's eaten
Hot, straight out. The seller **cuts it with scissors** into squares inside the paper, that sound is part of the experience. For the sweet one, the sugar and cinnamon go on in front of you. It isn't ordered "for later": it cools and loses its crispness.

## Where to find it
Traditional bougatsa shops operate across the city, most densely in the **centre** and around the markets. They open very early, several of the historic ones start before 6 a.m., serving both those coming home from the night and those heading to work.`,
    },
    areas: ["center", "ladadika"],
    featured: true,
  },
  {
    slug: "koulouri",
    name: { el: "Κουλούρι Θεσσαλονίκης", en: "Koulouri Thessalonikis" },
    kind: "street",
    whenToEat: { el: "Πρωί ή οποιαδήποτε ώρα, στον δρόμο", en: "Morning, or any hour, on the street" },
    blurb: {
      el: "Το σουσαμένιο δαχτυλίδι που πουλιόταν στην Κωνσταντινούπολη με το όνομα της Θεσσαλονίκης.",
      en: "The sesame ring that was sold in Constantinople under Thessaloniki's own name.",
    },
    long: {
      el: `Κοστίζει ελάχιστα, τρώγεται στο περπάτημα και υπάρχει σε κάθε γωνία. Το κουλούρι είναι το πιο δημοκρατικό φαγητό της πόλης, και κουβαλά μια ιστορία που λίγοι ξέρουν.

## Η ονομασία που ταξίδεψε αντίστροφα
Η ιστορία του ξεκινά από τα **βυζαντινά χρόνια**. Η ίδια η λέξη προέρχεται από το βυζαντινό **«κολλίκιον»**, και το έδεσμα εμφανίζεται κυρίως σε δύο πόλεις: την **Κωνσταντινούπολη** και τη **Θεσσαλονίκη**.

Εδώ κρύβεται το ωραιότερο στοιχείο: στην Πόλη, οι **κουλουρτζήδες διαλαλούσαν το εμπόρευμά τους ως «κουλούρι Θεσσαλονίκης»**. Δηλαδή το όνομα της πόλης λειτουργούσε ως σήμα ποιότητας σε μια άλλη μεγαλούπολη, αιώνες πριν εφευρεθεί το μάρκετινγκ προορισμού. Οι τεχνίτες και οι πωλητές καθιέρωσαν ιστορικά το «κουλούρι Θεσσαλονίκης» με το συγκεκριμένο σχήμα, το άφθονο σουσάμι και την τραγανή γεύση.

## Τι είναι ακριβώς
Ένα δαχτυλίδι ζύμης από **αλεύρι σίτου, μαγιά, νερό, αλάτι και ζάχαρη**, βουτηγμένο σε σουσάμι και ψημένο. Τίποτα άλλο. Το μυστικό δεν είναι κάποιο κρυφό υλικό· είναι το **σουσάμι**: πολύ, και καλής ποιότητας. Ένα σωστό κουλούρι είναι τραγανό απ' έξω, μαλακό μέσα, και αφήνει σουσάμι στα δάχτυλα.

Θα το ακούσεις και ως **σιμίτι**, ονομασία που κρατά από την ίδια οθωμανική/πολίτικη παράδοση.

## Η θέση του στην πόλη
Το κουλούρι είναι το πρωινό ξύπνημα της Θεσσαλονίκης. Πουλιέται από **καροτσάκια σε πλατείες, στάσεις και έξω από σχολεία**, και από φούρνους. Είναι το φαγητό που τρως όταν βιάζεσαι, όταν δεν πεινάς αρκετά για μπουγάτσα, ή όταν περιμένεις το λεωφορείο.

## Παραλλαγές
Πέρα από το κλασικό, θα βρεις εκδοχές **γεμιστές** (με τυρί, πραλίνα ή αλλαντικά) και ολικής άλεσης. Οι παραδοσιακοί κουλουρτζήδες όμως επιμένουν στο σκέτο: το κουλούρι δεν χρειάζεται βοήθεια.`,
      en: `It costs next to nothing, it's eaten walking, and it's on every corner. The koulouri is the city's most democratic food, and it carries a history few people know.

## The name that travelled the other way
Its story begins in **Byzantine times**. The word itself comes from the Byzantine **"kollikion"**, and the bread appears chiefly in two cities: **Constantinople** and **Thessaloniki**.

Here is the loveliest detail: in Constantinople, the **koulouri sellers advertised their wares as "koulouri Thessalonikis"**, Thessaloniki's koulouri. The city's name worked as a mark of quality in another great metropolis, centuries before destination marketing was invented. Craftsmen and sellers historically fixed the "koulouri Thessalonikis" as that particular shape, with abundant sesame and a crisp bite.

## What it actually is
A ring of dough made from **wheat flour, yeast, water, salt and sugar**, dipped in sesame and baked. Nothing else. The secret isn't a hidden ingredient; it's the **sesame**: plenty of it, and of good quality. A proper koulouri is crisp outside, soft inside, and leaves sesame on your fingers.

You'll also hear it called **simiti**, a name surviving from the same Ottoman and Constantinopolitan tradition.

## Its place in the city
The koulouri is Thessaloniki's morning wake-up. It's sold from **carts in squares, at bus stops and outside schools**, and from bakeries. It's what you eat when you're in a hurry, when you're not hungry enough for a bougatsa, or while you wait for the bus.

## Variations
Beyond the classic you'll find **filled** versions (with cheese, chocolate spread or cold cuts) and wholemeal ones. The traditional sellers, though, insist on the plain: the koulouri needs no help.`,
    },
    areas: ["center", "vardaris"],
    featured: true,
  },
  {
    slug: "trigono-panoramatos",
    name: { el: "Τρίγωνο Πανοράματος", en: "Trigono Panoramatos" },
    kind: "sweet",
    whenToEat: { el: "Απόγευμα, με καφέ", en: "Afternoon, with coffee" },
    blurb: {
      el: "Το γλυκό που γεννήθηκε το 1960 από έναν γαλατά στο Πανόραμα και πήρε το όνομα της γειτονιάς του.",
      en: "The pastry created in 1960 by a milkman in Panorama, which took its neighbourhood's name.",
    },
    long: {
      el: `Από όλα τα φαγητά αυτής της σελίδας, το τρίγωνο είναι το μόνο με **βεβαιωμένη ημερομηνία γέννησης και όνομα δημιουργού**. Δεν κατέβηκε από το Βυζάντιο ούτε ήρθε με πρόσφυγες: φτιάχτηκε εδώ, στη μεταπολεμική Θεσσαλονίκη, από έναν άνθρωπο που πουλούσε γάλα.

## Ο Ελενίδης και το «Λουξ»
Ο **Γιάννης Ελενίδης** ήταν γαλατάς. Μοίραζε **χύμα γάλα από πόρτα σε πόρτα**, μέχρι που το **1956** άνοιξε το δικό του γαλακτοπωλείο στο **Πανόραμα**, με το όνομα **«το Λουξ»**.

Το **1960** άρχισε να φτιάχνει γλυκίσματα από **χειροποίητο φύλλο κρούστας** και μια **κρέμα δικής του συνταγής**. Το σχήμα ήταν το χαρακτηριστικό: ένα χωνάκι φύλλου διπλωμένο σε τρίγωνο, γεμισμένο με κρέμα, σιροπιασμένο.

Το «τρίγωνο του Ελενίδη» έγινε γνωστό πρώτα στη γειτονιά, μετά στην πόλη, και τελικά σε όλη την Ελλάδα, όπου καθιερώθηκε με το όνομα της περιοχής: **τρίγωνο Πανοράματος**. Μετρά πλέον πάνω από εξήντα χρόνια ζωής.

## Γιατί δουλεύει
Είναι μια πολύ απλή ιδέα εκτελεσμένη σωστά. Το φύλλο, τηγανισμένο ή ψημένο, μένει **τραγανό παρά το σιρόπι**: αυτή ακριβώς η αντίθεση με την παγωμένη, βαριά κρέμα κάνει το γλυκό. Ένα κακό τρίγωνο προδίδεται αμέσως: το φύλλο έχει μαλακώσει.

## Το Πανόραμα
Το γλυκό πήρε το όνομα μιας πραγματικής γειτονιάς: του **Πανοράματος**, του προαστίου στα ανατολικά υψώματα, γνωστού για τη θέα του προς την πόλη και τον Θερμαϊκό. Η άνοδος στο Πανόραμα για γλυκό και θέα είναι κλασική κυριακάτικη συνήθεια των Θεσσαλονικέων εδώ και δεκαετίες.

## Πώς τρώγεται
Παγωμένο, με σκέτο καφέ για αντίστιξη. Είναι **γλυκύτατο**. Ένα ή δύο αρκούν. Θα το βρεις σε ζαχαροπλαστεία σε όλη την πόλη, αλλά η διαδρομή μέχρι το Πανόραμα κάνει τη διαφορά στην εμπειρία, όχι μόνο στη γεύση.`,
      en: `Of all the foods on this page, the trigono is the only one with a **confirmed birth date and a named creator**. It didn't come down from Byzantium and it didn't arrive with refugees: it was made here, in post-war Thessaloniki, by a man who sold milk.

## Elenidis and "to Loux"
**Yannis Elenidis** was a milkman. He delivered **loose milk door to door** until, in **1956**, he opened his own dairy shop in **Panorama**, named **"to Loux"**.

In **1960** he began making pastries from **handmade filo** and a **cream of his own recipe**. The shape was the distinctive part: a cone of filo folded into a triangle, filled with custard and steeped in syrup.

"Elenidis' triangle" became known first in the neighbourhood, then across the city, and eventually throughout Greece, where it settled under the name of the area: **trigono Panoramatos**. It has now passed sixty years.

## Why it works
It is a very simple idea executed properly. The filo, fried or baked, stays **crisp despite the syrup**, and it's precisely that contrast with the cold, heavy custard that makes the pastry. A bad trigono gives itself away instantly: the filo has gone soft.

## Panorama
The sweet took the name of a real neighbourhood: **Panorama**, the suburb on the eastern heights, known for its view over the city and the Thermaic Gulf. Driving up to Panorama for a pastry and the view has been a classic Sunday habit for locals for decades.

## How it's eaten
Cold, with a plain coffee for contrast. It is **very sweet**, one or two is plenty. You'll find it in patisseries across the city, but the trip up to Panorama changes the experience, not just the taste.`,
    },
    areas: ["panorama"],
    featured: true,
  },
  {
    slug: "mydia-thermaikou",
    name: { el: "Μύδια Θερμαϊκού", en: "Thermaic Gulf mussels" },
    kind: "sea",
    whenToEat: { el: "Μεσημέρι ή βράδυ, με τσίπουρο", en: "Lunch or dinner, with tsipouro" },
    blurb: {
      el: "Ο κόλπος μπροστά από την πόλη είναι και πιάτο: τα μύδια της Χαλάστρας τρέφονται μόνα τους, φιλτράροντας τη θάλασσα.",
      en: "The gulf in front of the city is also a dish: Chalastra's mussels feed themselves, filtering the sea.",
    },
    long: {
      el: `Η Θεσσαλονίκη κοιτάζει τη θάλασσα από κάθε σημείο της παραλίας της. Αυτό που δεν φαίνεται είναι ότι ο ίδιος αυτός κόλπος τροφοδοτεί τα τραπέζια της με ένα από τα πιο χαρακτηριστικά της προϊόντα.

## Πού καλλιεργούνται
Στα **υφάλμυρα νερά του Θερμαϊκού**, κυρίως γύρω από τη **Χαλάστρα**, στις εκβολές των ποταμών δυτικά της πόλης. Η ανάμειξη γλυκού και αλμυρού νερού δημιουργεί ιδανικές συνθήκες.

Το σημαντικό: το μύδι **γεννιέται φυσικά** στον κόλπο και αναπτύσσεται **χωρίς πρόσθετη τροφή**. Φιλτράρει το νερό και παίρνει από εκεί ό,τι χρειάζεται. Είναι, με άλλα λόγια, μια καλλιέργεια που δεν ταΐζεται, γι' αυτό και η ποιότητα του νερού καθορίζει απευθείας την ποιότητα του προϊόντος.

## Μεγέθη
Η Βόρεια Ελλάδα παράγει το **μεγαλύτερο μέρος της ελληνικής παραγωγής μυδιών**, της τάξης των **30.000 τόνων ετησίως**. Τα μύδια της περιοχής δεν είναι μόνο τοπικό φαγητό: αποτελούν σημαντικό **εξαγωγικό προϊόν**, με φήμη που ξεπερνά τα σύνορα.

## Πώς σερβίρονται
Στα ουζερί και τα μεζεδοπωλεία της πόλης θα τα συναντήσεις σε αρκετές μορφές:

- **Τηγανητά**, με κρούστα από αλεύρι. Ο πιο δημοφιλής μεζές.
- **Σαγανάκι**, με ντομάτα, φέτα και καυτερή πιπεριά.
- **Αχνιστά**, με λευκό κρασί και σκόρδο.
- **Μυδοπίλαφο**, το πιο χορταστικό πιάτο της οικογένειας.

Συνοδεύονται σχεδόν πάντα με **τσίπουρο** ή ούζο, όχι με κρασί.

## Καλό να ξέρεις
Τα μύδια είναι **εποχιακό** προϊόν και η διαθεσιμότητά τους ποικίλλει μέσα στον χρόνο. Οι μυδοκαλλιέργειες του Θερμαϊκού είναι επίσης ευάλωτες σε ακραία καιρικά φαινόμενα και μεταβολές της θερμοκρασίας του νερού, έχουν υπάρξει χρονιές με σοβαρές απώλειες στην παραγωγή. Αν σε ενδιαφέρει η φρεσκάδα, ρώτα απλώς τι ήρθε εκείνη τη μέρα.`,
      en: `Thessaloniki looks out to sea from every point along its waterfront. What isn't visible is that this same gulf supplies its tables with one of the region's most characteristic products.

## Where they're farmed
In the **brackish waters of the Thermaic Gulf**, chiefly around **Chalastra**, at the river mouths west of the city. The mixing of fresh and salt water creates ideal conditions.

The important part: the mussel is **born naturally** in the gulf and grows **without additional feed**. It filters the water and takes what it needs from it. In other words, this is farming that isn't fed, which is why water quality directly determines product quality.

## The scale
Northern Greece produces the **largest share of Greek mussel output**, on the order of **30,000 tonnes a year**. The region's mussels aren't only local food: they are a significant **export product**, with a reputation that travels well beyond the country.

## How they're served
In the city's ouzeri and meze houses you'll meet them in several forms:

- **Fried**, in a light flour crust. The most popular meze.
- **Saganaki**, with tomato, feta and hot pepper.
- **Steamed**, with white wine and garlic.
- **Mydopilafo**, mussel rice, the most substantial of the family.

They are almost always accompanied by **tsipouro** or ouzo, not wine.

## Good to know
Mussels are **seasonal** and availability varies through the year. The Thermaic farms are also vulnerable to extreme weather and shifts in water temperature, there have been years with serious losses. If freshness matters to you, simply ask what came in that day.`,
    },
    areas: ["ladadika", "aretsou", "limani"],
  },
  {
    slug: "tsipouro-meze",
    name: { el: "Τσίπουρο & μεζές", en: "Tsipouro and meze" },
    kind: "drink",
    whenToEat: { el: "Μεσημέρι ή βράδυ, για ώρες", en: "Lunch or evening, for hours" },
    blurb: {
      el: "Δεν είναι ποτό, είναι τρόπος να περάσεις το απόγευμα: μικρά πιάτα που έρχονται συνέχεια και μια παρέα που δεν βιάζεται.",
      en: "Not a drink but a way to spend an afternoon: small plates that keep coming, and company in no hurry.",
    },
    long: {
      el: `Το πιο χαρακτηριστικό «φαγητό» της Θεσσαλονίκης δεν είναι φαγητό. Είναι μια τελετουργία, και όποιος δεν τη γνωρίζει τη μπερδεύει με το να πιεις ένα ποτό.

## Τι είναι το τσίπουρο
Απόσταγμα από τα **στέμφυλα**, ό,τι μένει από τα σταφύλια μετά την οινοποίηση. Παράγεται σε όλη τη Βόρεια Ελλάδα και σερβίρεται παγωμένο, σε μικρά μπουκάλια ή καραφάκια. Υπάρχει **με γλυκάνισο** και **χωρίς**: η επιλογή είναι θέμα σχολής, και οι ντόπιοι έχουν άποψη.

Δεν πίνεται ποτέ μόνο του. Το τσίπουρο **απαιτεί** μεζέ.

## Πώς λειτουργεί το τραπέζι
Δεν παραγγέλνεις ένα κυρίως πιάτο. Παραγγέλνεις **μικρά πιάτα, σε κύματα**, και συνεχίζεις όσο κρατά η κουβέντα. Τυπικά περνούν από το τραπέζι:

- Θαλασσινά: **μύδια τηγανητά**, χταπόδι, γαύρος μαρινάτος, σαρδέλα.
- Αλμυρά: **φέτα ψητή**, τυροκαυτερή, πιπεριές, ντολμαδάκια.
- Ζεστά: λουκάνικο, τηγανητές πατάτες, σαγανάκι.

Ο ρυθμός είναι αργός επίτηδες. Ένα τσιπουράδικο τραπέζι μπορεί άνετα να κρατήσει **τρεις ώρες**, και αυτό δεν θεωρείται καθόλου ασυνήθιστο.

## Πού γίνεται
Στα **ουζερί** και τα **μεζεδοπωλεία**, κατηγορία μαγαζιού διαφορετική από το εστιατόριο. Ιστορικά συγκεντρώνονται γύρω από τις αγορές και στα **Λαδάδικα**, την περιοχή που πήρε το όνομά της από τις παλιές αποθήκες λαδιού και σήμερα είναι από τα κέντρα της βραδινής εξόδου.

## Ο άγραφος κανόνας
Το τραπέζι είναι **κοινό**. Δεν υπάρχει «το πιάτο μου», όλα μπαίνουν στη μέση και όλοι τσιμπάνε από παντού. Ο λογαριασμός συνήθως μοιράζεται. Το να παραγγείλεις μόνο για σένα θεωρείται παράξενο.

## Ώρες
Το τσίπουρο έχει δύο ζώνες: το **μεσημέρι**, ιδίως τα σαββατοκύριακα, και το **βράδυ από τις 9 και μετά**. Το μεσημεριανό τσίπουρο είναι θεσμός στη Θεσσαλονίκη και συχνά καταλήγει να αντικαταστήσει και το δείπνο.`,
      en: `Thessaloniki's most characteristic "dish" isn't a dish at all. It's a ritual, and anyone unfamiliar with it mistakes it for going out for a drink.

## What tsipouro is
A spirit distilled from **pomace**, what's left of the grapes after winemaking. It's produced across Northern Greece and served ice-cold, in small bottles or carafes. It comes **with aniseed** and **without**: the choice is a matter of school, and locals have opinions.

It is never drunk on its own. Tsipouro **requires** meze.

## How the table works
You don't order a main course. You order **small plates, in waves**, and keep going as long as the conversation lasts. Typically passing across the table:

- Seafood: **fried mussels**, octopus, marinated anchovy, sardine.
- Savoury: **baked feta**, spicy cheese dip, peppers, stuffed vine leaves.
- Hot plates: sausage, fried potatoes, saganaki.

The pace is deliberately slow. A tsipouro table can comfortably last **three hours**, and that isn't considered unusual in the slightest.

## Where it happens
In **ouzeri** and **mezedopoleia**. A category of place distinct from a restaurant. Historically they cluster around the markets and in **Ladadika**, the quarter named after the old olive-oil warehouses and today one of the centres of going out.

## The unwritten rule
The table is **shared**. There is no "my plate", everything goes in the middle and everyone picks from everywhere. The bill is usually split. Ordering only for yourself is considered odd.

## Hours
Tsipouro has two zones: **midday**, especially at weekends, and **evening from 9 onwards**. The midday tsipouro is an institution in Thessaloniki and frequently ends up replacing dinner as well.`,
    },
    areas: ["ladadika", "valaoritou", "center"],
    featured: true,
  },
  {
    slug: "mikrasiatiki-kouzina",
    name: { el: "Μικρασιάτικη κουζίνα", en: "The Asia Minor kitchen" },
    kind: "table",
    whenToEat: { el: "Κυρίως βράδυ, σε τραπέζι", en: "Mainly evening, sitting down" },
    blurb: {
      el: "Το 1922 άλλαξε τη γεύση της πόλης για πάντα: μπαχάρι, γιαούρτι, καπνιστή πάπρικα και συνταγές που ήρθαν σε βαλίτσες.",
      en: "1922 changed the city's palate for good: spice, yoghurt, smoked paprika and recipes that arrived in suitcases.",
    },
    long: {
      el: `Για να καταλάβεις γιατί η Θεσσαλονίκη τρώει διαφορετικά από την υπόλοιπη Ελλάδα, πρέπει να πας πίσω στο **1922**.

## Τι συνέβη
Μετά τη Μικρασιατική Καταστροφή και την ανταλλαγή πληθυσμών, εκατοντάδες χιλιάδες πρόσφυγες από τη **Μικρά Ασία**, τον **Πόντο** και την **Ανατολική Θράκη** εγκαταστάθηκαν στη Θεσσαλονίκη και τη Μακεδονία. Η πόλη, ήδη πληγωμένη από τη μεγάλη πυρκαγιά του 1917, άλλαξε πληθυσμιακά μέσα σε λίγα χρόνια.

Δεν έφεραν μόνο ανθρώπους. Έφεραν **μια ολόκληρη κουζίνα**: μπαχαρικά, τεχνικές, συνταγές αστικών κέντρων με αιώνες παράδοσης πίσω τους. Η ελληνική κουζίνα της Βόρειας Ελλάδας δεν ήταν ποτέ ξανά η ίδια.

## Τι άλλαξε στο πιάτο
Η διαφορά είναι αισθητή ακόμη και σήμερα:

- **Μπαχάρι και κύμινο** εκεί που η νότια Ελλάδα βάζει ρίγανη.
- **Γιαούρτι** ως συστατικό, όχι μόνο ως συνοδευτικό.
- **Καυτερή και καπνιστή πιπεριά**, βασικό στοιχείο της τοπικής γεύσης.
- Πιο έντονη χρήση **ξινών** στοιχείων και σάλτσας ντομάτας με βάθος.

## Χαρακτηριστικά πιάτα
- **Σουτζουκάκια σμυρνέικα**: κεφτεδάκια με κύμινο σε σάλτσα ντομάτας, από τη Σμύρνη.
- **Γιαουρτλού κεμπάπ**: ψητό κρέας πάνω σε πίτα, με σάλτσα ντομάτας και γιαούρτι.
- **Πολίτικη σαλάτα**: λάχανο, καρότο, πιπεριές σε ξίδι, από την Κωνσταντινούπολη.
- **Ποντιακά**: πιροσκί, χαβίτς και οι πίτες του Πόντου, με δική τους ξεχωριστή γραμμή.
- Γλυκά με **σιρόπι και ξηρούς καρπούς**, από την ίδια παράδοση.

## Πού θα τα βρεις
Σε **παραδοσιακά εστιατόρια και μεζεδοπωλεία** σε όλη την πόλη, αλλά ιδιαίτερα στις γειτονιές που χτίστηκαν από πρόσφυγες: **Τούμπα**, **Καλαμαριά**, **Νέα Κρήνη**. Πολλές οικογενειακές επιχειρήσεις εκεί μαγειρεύουν ακόμη με συνταγές που πέρασαν από γενιά σε γενιά.

## Γιατί έχει σημασία
Είναι ο λόγος που η Θεσσαλονίκη θεωρείται από πολλούς γαστρονομική πρωτεύουσα της χώρας. Δεν πρόκειται για «τοπική παραλλαγή» της ελληνικής κουζίνας, αλλά για **τη συνάντηση δύο παραδόσεων** (της βαλκανικής και της μικρασιατικής) σε μία πόλη που έτυχε να είναι λιμάνι, σταυροδρόμι και τόπος υποδοχής ταυτόχρονα.`,
      en: `To understand why Thessaloniki eats differently from the rest of Greece, you have to go back to **1922**.

## What happened
After the Asia Minor Catastrophe and the population exchange, hundreds of thousands of refugees from **Asia Minor**, **Pontus** and **Eastern Thrace** settled in Thessaloniki and Macedonia. The city, already wounded by the great fire of 1917, changed demographically within a few years.

They didn't only bring people. They brought **an entire cuisine**: spices, techniques, recipes from urban centres with centuries of tradition behind them. The Greek cooking of Northern Greece was never the same again.

## What changed on the plate
The difference is noticeable even today:

- **Allspice and cumin** where southern Greece reaches for oregano.
- **Yoghurt** as an ingredient, not just an accompaniment.
- **Hot and smoked peppers**, a cornerstone of the local palate.
- Heavier use of **sour** notes and tomato sauces with depth.

## Characteristic dishes
- **Soutzoukakia Smyrneika**: cumin-spiced meatballs in tomato sauce, from Smyrna.
- **Yiaourtlou kebab**, grilled meat over flatbread with tomato sauce and yoghurt.
- **Politiki salad**: cabbage, carrot and peppers in vinegar, from Constantinople.
- **Pontic dishes**: piroski, havits and the pies of Pontus, a distinct line of their own.
- Sweets with **syrup and nuts**, from the same tradition.

## Where to find them
In **traditional restaurants and meze houses** across the city, but especially in the neighbourhoods built by refugees: **Toumba**, **Kalamaria**, **Nea Krini**. Many family businesses there still cook from recipes passed down through generations.

## Why it matters
It is the reason many consider Thessaloniki the country's gastronomic capital. This is not a "local variation" of Greek cooking but **the meeting of two traditions** (Balkan and Anatolian) in a city that happened to be a port, a crossroads and a place of refuge all at once.`,
    },
    areas: ["toumba", "kalamaria", "aretsou"],
    featured: true,
  },
  {
    slug: "frappe",
    name: { el: "Φραπές", en: "Frappé" },
    kind: "drink",
    whenToEat: { el: "Απόγευμα, και με την ησυχία σου", en: "Afternoon, and slowly" },
    blurb: {
      el: "Ο αφρός που καθιερώθηκε στη ΔΕΘ του 1957 και έγινε εθνικό ρόφημα.",
      en: "The foam that took hold at the 1957 fair and became a national drink.",
    },
    long: {
      el: `Ο φραπές είναι το πιο ελληνικό ρόφημα που δεν υπάρχει σχεδόν πουθενά αλλού, και η Θεσσαλονίκη διεκδικεί τη γέννησή του.

## Η ιστορία, όπως λέγεται
Το **1957**, στη **22η Διεθνή Έκθεση Θεσσαλονίκης**, η εταιρεία Δρίτσα εκπροσωπούσε στην Ελλάδα τον στιγμιαίο καφέ της Nestlé. Στο περίπτερο προωθούσαν ένα νέο σοκολατούχο ρόφημα για παιδιά, που ετοιμαζόταν αναμειγνύοντάς το με γάλα σε **σέικερ**.

Ένας υπάλληλος, ο **Δημήτρης Βακόνδιος**, θέλησε καφέ και δεν είχε ζεστό νερό. Χρησιμοποίησε το σέικερ με κρύο νερό, και βγήκε ο αφρός.

## Πόσο αληθινό είναι
Αξίζει να το πούμε καθαρά: **παγωμένος στιγμιαίος καφές υπήρχε και πριν**. Διαφημίσεις της Nestlé από τη δεκαετία του 1930 και του 1940 πρότειναν ήδη την κρύα κατανάλωση. Η ιστορία της ΔΕΘ είναι ο πιο διαδεδομένος αστικός θρύλος, όχι τεκμηριωμένη ευρεσιτεχνία.

Αυτό που δεν αμφισβητείται είναι ότι ο **ελληνικός φραπές** — με τον πυκνό αφρό, το σέικερ και το ψηλό ποτήρι — καθιερώθηκε εδώ και από εδώ διαδόθηκε σε όλη τη χώρα. Και ότι το σκηνικό ταιριάζει: η ΔΕΘ ήταν το μέρος όπου η μεταπολεμική Ελλάδα πρωτοέβλεπε καινούργια πράγματα.

## Τι τον κάνει φραπέ
Ο αφρός. Δεν είναι διακοσμητικός — είναι το ρόφημα. Δημιουργείται από το χτύπημα του στιγμιαίου καφέ με λίγο νερό, πριν προστεθεί το υπόλοιπο και ο πάγος. Ένας καλός φραπές κρατά τον αφρό του μέχρι το τέλος· ένας κακός τον χάνει σε δέκα λεπτά.

Γι' αυτό ο φραπές δεν γίνεται με φίλτρου ή espresso. Χρειάζεται **στιγμιαίο**, και αυτό είναι που τον κρατά εκτός των καφετεριών τρίτου κύματος.

## Πώς παραγγέλνεται
Δύο άξονες, και πρέπει να πεις και τους δύο:

- **Γλυκύτητα:** σκέτος, μέτριος, γλυκός
- **Γάλα:** με γάλα ή χωρίς

Άρα «μέτριος με γάλα» ή «σκέτος χωρίς». Αν πεις απλώς «έναν φραπέ», θα σε ξαναρωτήσουν.

## Πότε τον πίνουν
Όλη μέρα, αλλά κυρίως **το απόγευμα** και κυρίως **αργά**. Ο φραπές δεν είναι καφές που τον πίνεις και φεύγεις. Είναι το εισιτήριο για δύο ώρες σε τραπέζι, και στη Θεσσαλονίκη αυτό είναι θεσμός, όχι σχήμα λόγου.

Το καλοκαίρι θα τον δεις παντού στη **Νέα Παραλία** και στα τραπέζια της **Αριστοτέλους**. Τα τελευταία χρόνια ο **freddo espresso** έχει πάρει μεγάλο μερίδιο, ιδίως στους νεότερους — αλλά ο φραπές δεν έφυγε, και στην πόλη που τον καθιέρωσε τον παραγγέλνεις χωρίς να εξηγήσεις τίποτα.`,
      en: `The frappé is the most Greek drink that exists almost nowhere else, and Thessaloniki claims its birth.

## The story, as it is told
In **1957**, at the **22nd International Fair of Thessaloniki**, the Dritsa company represented Nestlé's instant coffee in Greece. At the stand they were promoting a new chocolate drink for children, prepared by mixing it with milk in a **shaker**.

An employee, **Dimitris Vakondios**, wanted a coffee and had no hot water. He used the shaker with cold water instead, and got the foam.

## How true is it
Worth saying plainly: **cold instant coffee existed before this**. Nestlé advertisements from the 1930s and 1940s already suggested drinking it iced. The fair story is the most widely repeated urban legend, not a documented invention.

What is not disputed is that the **Greek frappé** — the thick foam, the shaker, the tall glass — was established here and spread from here across the country. And the setting fits: the fair was where post-war Greece saw new things first.

## What makes it a frappé
The foam. It is not decoration — it is the drink. It comes from whipping the instant coffee with a little water before the rest and the ice go in. A good frappé holds its foam to the last sip; a bad one loses it in ten minutes.

This is why a frappé cannot be made with filter or espresso. It needs **instant**, and that is what keeps it out of third-wave cafés.

## How to order it
Two axes, and you have to state both:

- **Sweetness:** *sketos* (no sugar), *metrios* (medium), *glykos* (sweet)
- **Milk:** with or without

So "metrios with milk", or "sketos without". Ask simply for "a frappé" and you will be asked again.

## When people drink it
All day, but mostly **in the afternoon**, and mostly **slowly**. A frappé is not a coffee you drink and leave. It is a ticket to two hours at a table, and in Thessaloniki that is an institution rather than a figure of speech.

In summer you will see it everywhere along the **waterfront** and at the tables on **Aristotelous**. In recent years the **freddo espresso** has taken a large share, especially among younger drinkers — but the frappé has not gone, and in the city that established it you order one without explaining anything.`,
    },
    areas: ["center", "waterfront"],
    featured: true,
  },
  {
    slug: "soutzoukakia",
    name: { el: "Σουτζουκάκια", en: "Soutzoukakia" },
    kind: "table",
    whenToEat: { el: "Μεσημέρι ή βράδυ, με ρύζι", en: "Lunch or dinner, with rice" },
    blurb: {
      el: "Σμυρνέικα, με κύμινο και σάλτσα ντομάτας. Ήρθαν το 1922 και έμειναν.",
      en: "Smyrna-style, with cumin and tomato sauce. They arrived in 1922 and stayed.",
    },
    long: {
      el: `Τα σουτζουκάκια είναι το πιάτο που εξηγεί γιατί η κουζίνα της Θεσσαλονίκης έχει άλλη μυρωδιά από της νότιας Ελλάδας.

## Από πού ήρθαν
Ήρθαν από τη **Σμύρνη**, με τους πρόσφυγες του **1922**. Γι' αυτό λέγονται συχνά **«σμυρνέικα»**. Στη Σμύρνη τα φώναζαν **«κιοφτέδες»**· το όνομα «σουτζουκάκι» κρατά από το τουρκικό *sucuk*, που σημαίνει λουκάνικο, και δόθηκε για το **επίμηκες σχήμα** τους. Δεν είναι δηλαδή παραλλαγή του κεφτέ — είναι άλλο πιάτο, με άλλα μπαχαρικά και άλλη λογική.

## Η Σμύρνη πίσω από το πιάτο
Τον 19ο και στις αρχές του 20ού αιώνα η Σμύρνη ήταν κοσμοπολίτικο λιμάνι όπου συνυπήρχαν Έλληνες, Αρμένιοι, Τούρκοι, Εβραίοι και Ευρωπαίοι. Η κουζίνα της ήταν προϊόν αυτής της συμβίωσης. Οι αρμενικές εκδοχές του πιάτου ήταν παραδοσιακά **πιο καυτερές**· οι ελληνικές κράτησαν σταθερά το **κύμινο**.

Όταν ήρθαν οι πρόσφυγες, το πιάτο δεν ταξίδεψε ως συνταγή βιβλίου. Ήρθε ως καθημερινό φαγητό χιλιάδων σπιτιών, και έμεινε.

## Τι τα ξεχωρίζει
Δύο πράγματα, και τα δύο ασυνήθιστα για την ελληνική κουζίνα της εποχής:

- **Κύμινο**, γενναιόδωρα. Είναι η μυρωδιά που θα καταλάβεις αμέσως, και το μέτρο της ποιότητας.
- **Σκόρδο** μουλιασμένο μαζί με ψίχα ψωμιού, που δίνει την υφή — μαλακή μέσα, όχι σφιχτή σαν μπιφτέκι.

Πλάθονται επιμήκη, αλευρώνονται, τηγανίζονται ή ψήνονται, και μετά **σιγοβράζουν σε σάλτσα ντομάτας**. Αυτό το τελευταίο βήμα είναι που τα κάνει σουτζουκάκια: η σάλτσα δεν είναι συνοδευτικό, είναι μέρος του μαγειρέματος.

## Πώς σερβίρονται
Με **ρύζι** ή **πατάτες**, σχεδόν πάντα με το ζουμί τους. Σε μεζεδοπωλείο θα έρθουν σε μικρή μερίδα ως μεζές· σε ταβέρνα ως κυρίως πιάτο.

Ταιριάζουν με κόκκινο κρασί, αλλά στη Θεσσαλονίκη θα τα δεις εξίσου συχνά με **τσίπουρο**.

## Πού να τα φας
Σε **μεζεδοπωλεία** και ταβέρνες με μικρασιατικό προσανατολισμό, κυρίως γύρω από τις αγορές και στις προσφυγικές γειτονιές: **Καλαμαριά**, **Τούμπα**, Χαριλάου.

Δεν χρειάζονται ειδική αναζήτηση — είναι σε κάθε δεύτερο μενού. Αλλά η διαφορά ανάμεσα σε καλά και μέτρια σουτζουκάκια είναι μεγάλη, και φαίνεται στο κύμινο: αν δεν το μυρίζεις πριν φτάσει το πιάτο, κάτι λείπει.`,
      en: `Soutzoukakia are the dish that explains why Thessaloniki's cooking smells different from southern Greece's.

## Where they came from
They came from **Smyrna**, with the refugees of **1922**. That is why they are often called **"Smyrneika"**. In Smyrna they were called **"kioftedes"**; the name "soutzoukaki" comes from the Turkish *sucuk*, meaning sausage, and was given for their **oblong shape**. They are not, then, a variant of the meatball — they are a different dish, with different spices and a different logic.

## The Smyrna behind the dish
Through the nineteenth century and into the twentieth, Smyrna was a cosmopolitan port where Greeks, Armenians, Turks, Jews and Europeans lived side by side. Its cooking was the product of that. Armenian versions of the dish were traditionally **hotter**; the Greek ones held to **cumin**.

When the refugees came, the dish did not travel as a recipe in a book. It came as the everyday food of thousands of households, and it stayed.

## What sets them apart
Two things, both unusual in the Greek cooking of the time:

- **Cumin**, generously. It is the smell you recognise immediately, and the measure of quality.
- **Garlic** worked into soaked breadcrumb, which gives the texture — soft inside, not tight like a burger.

They are shaped long, floured, fried or baked, and then **simmered in tomato sauce**. That last step is what makes them soutzoukakia: the sauce is not a side, it is part of the cooking.

## How they are served
With **rice** or **potatoes**, almost always in their sauce. In a meze house they arrive as a small plate; in a taverna as a main.

They go with red wine, though in Thessaloniki you will as often see them with **tsipouro**.

## Where to eat them
In **meze houses** and tavernas with an Asia Minor leaning, mostly around the markets and in the refugee neighbourhoods: **Kalamaria**, **Toumba**, Charilaou.

They need no hunting — they are on every second menu. But the gap between good and mediocre soutzoukakia is wide, and it shows in the cumin: if you cannot smell it before the plate arrives, something is missing.`,
    },
    areas: ["kalamaria", "toumba"],
    featured: true,
  },
  {
    slug: "patsas",
    name: { el: "Πατσάς", en: "Patsas" },
    kind: "table",
    whenToEat: { el: "Πολύ νωρίς ή πολύ αργά", en: "Very early or very late" },
    blurb: {
      el: "Η σούπα που κρατά ανοιχτά μαγαζιά όταν όλα τα άλλα έχουν κλείσει.",
      en: "The soup that keeps shops open when everything else has closed.",
    },
    long: {
      el: `Ο πατσάς είναι το φαγητό που τρώγεται σε ώρες που δεν τρώει κανείς, και στη Θεσσαλονίκη έχει τα δικά του μαγαζιά, ανοιχτά όταν όλα τα άλλα έχουν κλείσει.

## Τι είναι
Σούπα από **πατσά** — στομάχι και πόδι μοσχαριού — που σιγοβράζει ώρες μέχρι να γίνει πηχτός, ζελατινώδης ζωμός. Σερβίρεται καυτός, και στο τραπέζι προσθέτεις μόνος σου **σκορδοξίδι** και **μπούκοβο**, την κόκκινη καυτερή πιπεριά που οι ντόπιοι θεωρούν απαραίτητη.

Δεν είναι πιάτο για όλους, και δεν προσποιείται ότι είναι.

## Θεσμός, όχι περιέργεια
Στη Θεσσαλονίκη ο πατσάς έχει βάθος που δεν έχει αλλού στην Ελλάδα. Είναι σε εξέλιξη **φάκελος για την ένταξή του στην άυλη πολιτιστική κληρονομιά της UNESCO**, με ιστορικά τεκμήρια που φτάνουν στις **αρχές του 20ού αιώνα**.

Το παλαιότερο και γνωστότερο πατσατζίδικο της πόλης ήταν του **Λευτέρη Βαφειάδη**, πρόσφυγα από την Κωνσταντινούπολη — από εκεί βγήκαν γενιές μαστόρων. Γύρω του δούλευαν κι άλλα ιστορικά μαγαζιά, στην Εγνατία και στην Κωνσταντινουπόλεως.

## Γιατί εδώ
Η παράδοση κρατά από την **οθωμανική** κουζίνα και ενισχύθηκε με τους πρόσφυγες του 1922. Τα πατσατζίδικα δούλευαν πάντα γύρω από τις **αγορές**, εκεί που οι εργάτες ξεκινούσαν πριν ξημερώσει — γι' αυτό επιβίωσαν ως **ολονύχτια** μαγαζιά και όχι ως εστιατόρια.

Στον πατσά αποδίδονται και ευεργετικές ιδιότητες, κάτι που περιλαμβάνεται στα τεκμήρια του φακέλου: ζεστός ζωμός, ζελατίνη, πρωτεΐνη, σε ανθρώπους που δούλευαν στο κρύο.

## Πότε τρώγεται
Δύο κοινά, στα δύο άκρα της νύχτας:

- **Νωρίς το πρωί**, πριν τη δουλειά. Αυτή είναι η αυθεντική ώρα.
- **Πολύ αργά**, μετά την έξοδο. Ο πατσάς έχει φήμη ως το φαγητό που «στρώνει» μετά το ποτό, και η φήμη κρατά γενιές.

## Πώς να τον παραγγείλεις
Θα σε ρωτήσουν αν τον θες **με πατσά ή μόνο ζωμό**, και **χοντροκομμένο ή ψιλοκομμένο**. Αν είναι η πρώτη σου φορά, ζήτα λίγο πατσά και περισσότερο ζωμό. Το σκορδοξίδι μπαίνει σταδιακά — δοκίμασε πρώτα, γιατί αλλάζει εντελώς το πιάτο.

## Πού
Στα **πατσατζίδικα** γύρω από το **Καπάνι** και τη **Βλάλη**, και σε μερικά ιστορικά μαγαζιά του κέντρου που δεν έχουν αλλάξει δεκαετίες. Ρώτα για ωράριο: αρκετά ανοίγουν τα μεσάνυχτα και κλείνουν το μεσημέρι.`,
      en: `Patsas is the food eaten at hours when nobody eats, and in Thessaloniki it has its own shops, open when everything else has closed.

## What it is
A soup of **tripe** — beef stomach and trotter — simmered for hours into a thick, gelatinous broth. It is served scalding, and at the table you add your own **garlic vinegar** and **boukovo**, the red chilli flake locals consider essential.

It is not a dish for everyone, and it does not pretend to be.

## An institution, not a curiosity
In Thessaloniki patsas has a depth it does not have elsewhere in Greece. A **dossier for its inscription on UNESCO's intangible cultural heritage list** is under way, supported by historical evidence going back to the **early twentieth century**.

The oldest and best-known patsas shop in the city was that of **Lefteris Vafeiadis**, a refugee from Constantinople — generations of cooks came out of it. Other historic shops worked around it, on Egnatia and on Konstantinoupoleos.

## Why here
The tradition comes from **Ottoman** cooking and was reinforced by the refugees of 1922. The patsas shops always worked around the **markets**, where labourers started before dawn — which is why they survived as **all-night** places rather than as restaurants.

Patsas is also credited with restorative properties, something the UNESCO dossier records: hot broth, gelatine and protein, for people working in the cold.

## When it is eaten
Two crowds, at the two ends of the night:

- **Early morning**, before work. This is the original hour.
- **Very late**, after a night out. Patsas has a reputation as the thing that settles you after drinking, and it has held for generations.

## How to order it
You will be asked whether you want it **with tripe or broth only**, and **coarsely or finely chopped**. If it is your first time, ask for a little tripe and more broth. Add the garlic vinegar gradually — taste first, because it changes the dish completely.

## Where
In the **patsatzidika** around **Kapani** and **Vlali**, and in a few historic places in the centre that have not changed in decades. Ask about hours: several open at midnight and close at noon.`,
    },
    areas: ["center"],
  },
  {
    slug: "siropiasta",
    name: { el: "Σιροπιαστά γλυκά", en: "Syrup sweets" },
    kind: "sweet",
    whenToEat: { el: "Απόγευμα, με καφέ", en: "Late afternoon, with coffee" },
    blurb: {
      el: "Μπακλαβάς, καταΐφι, γαλακτομπούρεκο: η οθωμανική κληρονομιά στο ταψί.",
      en: "Baklava, kataifi, galaktoboureko: the Ottoman inheritance, baked in a tray.",
    },
    long: {
      el: `Η Θεσσαλονίκη έχει φήμη για τα γλυκά της, και δεν εννοούμε τα ζαχαροπλαστεία με τις τούρτες. Εννοούμε τα **σιροπιαστά**: τα γλυκά ταψιού που κόβονται σε κομμάτια και στάζουν.

## Από πού
Είναι κληρονομιά **οθωμανική και μικρασιατική**. Ήρθαν με τους πρόσφυγες του **1922** και βρήκαν πόλη που τα ήξερε ήδη από πέντε αιώνες κοινής ζωής. Αυτή η διπλή καταγωγή είναι που δίνει στη θεσσαλονικιώτικη ζαχαροπλαστική τον χαρακτήρα της: σιρόπι **πιο ελαφρύ**, φύλλο **πιο λεπτό**, και λιγότερη ζάχαρη απ' ό,τι θα περίμενες.

## Τι να δοκιμάσεις
- **Μπακλαβάς** — φύλλο, καρύδι ή φιστίκι, σιρόπι. Το μέτρο της ποιότητας είναι αν το φύλλο **παραμένει τραγανό** κάτω από το σιρόπι. Αν έχει μουλιάσει, το γλυκό έχει μείνει.
- **Καταΐφι** — ίδια λογική, άλλη υφή: κλωστές ζύμης αντί για φύλλο, τυλιγμένες γύρω από τον ξηρό καρπό.
- **Γαλακτομπούρεκο** — κρέμα σιμιγδαλιού μέσα σε φύλλο, με σιρόπι από πάνω. Τρώγεται **χλιαρό**, και εκεί κρίνεται: κρύο χάνει τα μισά.
- **Ραβανί** — σιμιγδαλένιο κέικ σε σιρόπι. Το πιο απλό στη σύνθεση και το πιο δύσκολο να γίνει σωστά, γιατί δεν κρύβεται πίσω από τίποτα.
- **Τουλούμπα** — τηγανητή ζύμη βουτηγμένη σε κρύο σιρόπι, σερβιρισμένη ζεστή. Η αντίθεση θερμοκρασίας είναι το νόημα.
- **Εκμέκ** — καταΐφι με κρέμα και κρέμα γάλακτος, βαρύ και θεσσαλονικιώτικο.

Και το **τρίγωνο Πανοράματος**, που έχει τη δική του σελίδα εδώ γιατί είναι καθαρά τοπικό.

## Πότε τρώγονται
**Απόγευμα**, με καφέ. Όχι ως επιδόρπιο μετά το φαγητό — αυτό είναι πιο βόρειο-ευρωπαϊκή συνήθεια. Εδώ το γλυκό είναι **ξεχωριστή έξοδος**, γύρω στις έξι, και συχνά ο λόγος που βγαίνεις.

## Πώς να διαλέξεις
Κοίτα τη βιτρίνα. Τα σιροπιαστά πρέπει να φαίνονται **υγρά αλλά όχι πνιγμένα**, και το ταψί να μην κολυμπά. Ρώτα τι έγινε σήμερα — στα καλά ζαχαροπλαστεία θα σου πουν, και θα σε κατευθύνουν.

Μια πρακτική συμβουλή: ζήτα να σου κόψουν **μισό κομμάτι** αν δοκιμάζεις πολλά. Είναι απολύτως συνηθισμένο και κανείς δεν θα παραξενευτεί.

## Πού
Ιστορικά ζαχαροπλαστεία υπάρχουν σε όλο το κέντρο, με πυκνότητα γύρω από την **Τσιμισκή** και την **Αριστοτέλους**. Στο **Πανόραμα** ανηφορίζουν οι ντόπιοι ειδικά γι' αυτό, και αξίζει να το κάνεις κι εσύ αν έχεις μισό απόγευμα.`,
      en: `Thessaloniki has a reputation for its sweets, and we do not mean the patisseries with the layer cakes. We mean the **syrup sweets**: the tray-baked ones that are cut into pieces and drip.

## Where from
They are an **Ottoman and Asia Minor** inheritance. They arrived with the refugees of **1922** and found a city that already knew them from five centuries of shared life. That double descent is what gives Thessaloniki's pastry its character: **lighter syrup**, **thinner pastry**, and less sugar than you would expect.

## What to try
- **Baklava** — filo, walnut or pistachio, syrup. The measure of quality is whether the pastry **stays crisp** under the syrup. If it has gone soggy, the tray has been sitting.
- **Kataifi** — same logic, different texture: shredded pastry instead of sheets, wrapped around the nut.
- **Galaktoboureko** — semolina custard inside filo, syrup over the top. Eaten **warm**, and that is where it is judged: cold, it loses half of itself.
- **Ravani** — semolina cake in syrup. The simplest in composition and the hardest to get right, because it hides behind nothing.
- **Touloumba** — fried dough dipped in cold syrup and served warm. The contrast in temperature is the point.
- **Ekmek** — kataifi with custard and cream, heavy and thoroughly Thessalonian.

And the **trigono of Panorama**, which has its own page here because it is purely local.

## When they are eaten
**Late afternoon**, with coffee. Not as dessert after a meal — that is a more northern European habit. Here the sweet is **its own outing**, at around six, and often the reason you went out at all.

## How to choose
Look at the display. Syrup sweets should look **wet but not drowned**, and the tray should not be swimming. Ask what was made today — in a good patisserie they will tell you, and point you.

One practical tip: ask them to cut you **half a piece** if you are trying several. It is entirely normal and nobody will find it odd.

## Where
Historic patisseries are spread across the centre, most densely around **Tsimiski** and **Aristotelous**. Locals drive up to **Panorama** specifically for this, and it is worth doing if you have half an afternoon.`,
    },
    areas: ["center", "panorama"],
    featured: true,
  },
  {
    slug: "salepi",
    name: { el: "Σαλέπι", en: "Salep" },
    kind: "drink",
    whenToEat: { el: "Χειμωνιάτικο βράδυ, στον δρόμο", en: "A winter evening, in the street" },
    blurb: {
      el: "Ζεστό, πυκνό, με κανέλα. Πωλείται από πλανόδιους και μόνο τον χειμώνα.",
      en: "Hot, thick, dusted with cinnamon. Sold by street vendors, winter only.",
    },
    long: {
      el: `Το σαλέπι είναι χειμωνιάτικο ρόφημα του δρόμου, και στη Θεσσαλονίκη επιβιώνει εκεί που σε άλλες πόλεις έχει σχεδόν χαθεί.

## Τι είναι
Πυκνό, ζεστό, λευκό ρόφημα από **αλεσμένο βολβό ορχιδέας** — το σάλεπι — βρασμένο με γάλα ή νερό μέχρι να δέσει. Σερβίρεται σε ποτήρι, με **κανέλα** από πάνω και συχνά λίγο τζίντζερ.

Η υφή του ξενίζει την πρώτη φορά: είναι ανάμεσα σε ρόφημα και κρέμα, και χρειάζεται λίγο για να το συνηθίσεις.

## Από πού
Είναι **οθωμανικής** καταγωγής και ταξίδεψε σε όλη την αυτοκρατορία. Στη Θεσσαλονίκη πωλούνταν από **πλανόδιους** με μεγάλα μπρίκια και θερμός, που στέκονταν στις γωνίες τις κρύες νύχτες και φώναζαν την πραμάτεια τους. Η παράδοση συνδέεται στενά με τον χειμώνα και με τις **αγορές**, εκεί που ο κόσμος δούλευε από τα χαράματα.

Ήταν το ρόφημα του δρόμου πριν υπάρξει καφές του δρόμου.

## Γιατί είναι σπάνιο
Ο βολβός της ορχιδέας από τον οποίο παρασκευάζεται το αυθεντικό σαλέπι προέρχεται από **προστατευόμενα είδη**, και η συλλογή του είναι περιορισμένη. Χρειάζονται πολλοί βολβοί για λίγη σκόνη, και το φυτό δεν καλλιεργείται εύκολα.

Αποτέλεσμα: τα περισσότερα από όσα πωλούνται σήμερα ως «σαλέπι» είναι **παρασκευάσματα με άμυλο και άρωμα**. Δεν είναι απάτη — είναι η αγορά — αλλά αξίζει να το ξέρεις και να ρωτήσεις. Το αυθεντικό έχει πιο διακριτική γεύση και πιο λεπτή υφή απ' ό,τι περιμένεις.

## Πότε
Μόνο **χειμώνα**, χοντρικά από Νοέμβριο ως Μάρτιο, και κυρίως **βράδυ** ή νωρίς το πρωί σε κρύα μέρα. Καλοκαίρι δεν θα το βρεις, και αν το βρεις κάτι δεν πάει καλά.

## Πού
Από **πλανόδιους** στο κέντρο τις κρύες βραδιές, ιδίως γύρω από την **Αριστοτέλους**, την **Εγνατία** και τις αγορές. Μερικά παραδοσιακά μαγαζιά και γαλακτοπωλεία το σερβίρουν σταθερά όλη τη σεζόν.

Αν πετύχεις καροτσάκι με σαλέπι σε παγωμένο βράδυ στην Αριστοτέλους, δοκίμασέ το. Είναι από τις λίγες γεύσεις της πόλης που δεν έχουν γίνει τουριστικό προϊόν, και πιθανότατα η πιο παλιά που μπορείς ακόμη να αγοράσεις στον δρόμο.`,
      en: `Salep is a winter street drink, and in Thessaloniki it survives where in other cities it has nearly vanished.

## What it is
A thick, hot, white drink made from **ground orchid tuber** — salep — boiled with milk or water until it thickens. It is served in a glass with **cinnamon** on top, and often a little ginger.

The texture surprises people the first time: it sits between a drink and a custard, and takes a moment to get used to.

## Where from
It is **Ottoman** in origin and travelled across the empire. In Thessaloniki it was sold by **street vendors** with large pots and flasks, standing on corners on cold nights and calling their wares. The tradition is tied closely to winter and to the **markets**, where people worked from before dawn.

It was street coffee before street coffee existed.

## Why it is rare
The orchid tuber that real salep is made from comes from **protected species**, and its collection is restricted. It takes many tubers to make a little powder, and the plant is not easily cultivated.

The result: most of what is sold today as "salep" is **made with starch and flavouring**. That is not a fraud, it is the market — but it is worth knowing, and worth asking. The real thing has a more restrained flavour and a finer texture than you expect.

## When
**Winter only**, roughly November to March, and mostly **in the evening** or early on a cold morning. You will not find it in summer, and if you do, something is off.

## Where
From **street vendors** in the centre on cold nights, particularly around **Aristotelous**, **Egnatia** and the markets. A few traditional shops and dairy bars serve it steadily through the season.

If you come across a salep cart on a freezing night on Aristotelous, try it. It is one of the few flavours in the city that has not been turned into a tourist product, and very probably the oldest thing you can still buy on the street.`,
    },
    areas: ["center"],
  },
];

const bySlug = new Map(dishes.map((d) => [d.slug, d]));

export function getDish(slug: string): Dish | undefined {
  return bySlug.get(slug);
}

export function getDishes(): Dish[] {
  return dishes;
}

/** Dishes associated with a given area slug, for cross-linking. */
export function getDishesForArea(areaSlug: string): Dish[] {
  return dishes.filter((d) => d.areas?.includes(areaSlug));
}
