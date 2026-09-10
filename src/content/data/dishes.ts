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
