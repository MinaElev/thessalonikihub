/**
 * Change a user's role.
 *
 * ADMIN is the highest role the site has: it gates moderation, claim approval,
 * the event importer, and editing the editorial text and SEO fields of any
 * listing. There is no separate superadmin.
 *
 * A profile row only exists once that person has signed in at least once — it
 * is created from their Supabase auth user — so an address that has never
 * signed in cannot be promoted here.
 *
 *   node scripts/set-role.mjs                        # list everyone
 *   node scripts/set-role.mjs <email> ADMIN          # dry run
 *   node scripts/set-role.mjs <email> ADMIN --apply  # write
 */
import { PrismaClient } from "@prisma/client";

const ROLES = ["USER", "OWNER", "ADMIN"];
const args = process.argv.slice(2);
const apply = args.includes("--apply");
const [email, role] = args.filter((a) => !a.startsWith("--"));

const prisma = new PrismaClient();

async function list() {
  const rows = await prisma.profile.findMany({
    select: { email: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  console.log(`${rows.length} profile(s):\n`);
  for (const r of rows) {
    console.log(
      `  ${r.role.padEnd(6)} ${r.email.padEnd(32)} ${(r.name ?? "—").padEnd(18)} ${r.createdAt.toISOString().slice(0, 10)}`,
    );
  }
}

async function main() {
  if (!email) {
    await list();
    console.log("\nTo change one:  node scripts/set-role.mjs <email> ADMIN --apply");
    return;
  }

  if (!role || !ROLES.includes(role)) {
    console.error(`Role must be one of: ${ROLES.join(", ")}`);
    process.exitCode = 1;
    return;
  }

  const user = await prisma.profile.findUnique({
    where: { email },
    select: { id: true, email: true, role: true },
  });

  if (!user) {
    console.error(`No profile for ${email}.`);
    console.error("They need to sign in once before a role can be set.\n");
    await list();
    process.exitCode = 1;
    return;
  }

  if (user.role === role) {
    console.log(`${email} is already ${role}. Nothing to do.`);
    return;
  }

  console.log(`${apply ? "" : "WOULD CHANGE  "}${email}: ${user.role} -> ${role}`);
  if (!apply) {
    console.log("\nDry run — re-run with --apply to write.");
    return;
  }

  await prisma.profile.update({ where: { id: user.id }, data: { role } });
  console.log("Done.\n");
  await list();
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
