# Πρότυπα email του Supabase

Δημιουργούνται από `scripts/build-supabase-templates.ts` με το ίδιο layout
που χρησιμοποιούν και τα email του site, ώστε να μοιάζουν μεταξύ τους.

Αντιγραφή σε: **Supabase → Authentication → Email Templates**.

| Πρότυπο στο Supabase | Αρχείο | Θέμα |
| --- | --- | --- |
| Confirm signup | `01-confirm-signup.html` | `Ο κωδικός επιβεβαίωσης: {{ .Token }}` |
| Magic Link | `02-one-time-code.html` | `Ο κωδικός σύνδεσης: {{ .Token }}` |
| Reset Password | `03-reset-password.html` | `Επαναφορά κωδικού πρόσβασης` |

Για να φεύγουν από το Gmail και όχι από τον server του Supabase, πρέπει να
είναι ενεργό το **Custom SMTP** στο ίδιο dashboard.
