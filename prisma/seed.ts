/**
 * Seed the database with the real, verified content (attractions, collections,
 * guides). Run with: `npm run db:seed` (after `npm run db:migrate`).
 *
 * Business pillars (stay/eat/drink/experiences) and events are intentionally
 * not seeded — those are added via verified/owner submissions.
 */
import { PrismaClient } from "@prisma/client";
import { attractions } from "../src/content/data/attractions.ts";
import { collections } from "../src/content/data/collections.ts";
import { guides } from "../src/content/data/guides.ts";

const prisma = new PrismaClient();

const up = (s: string) => s.toUpperCase().replace(/-/g, "_");

async function main() {
  console.log("Seeding places (attractions)…");
  for (const p of attractions) {
    const data = {
      kind: up(p.kind) as never,
      name: p.name as never,
      summary: p.summary as never,
      description: p.description as never,
      type: p.type,
      tags: p.tags,
      lat: p.geo.lat,
      lng: p.geo.lng,
      area: p.geo.area,
      address: (p.geo.address ?? null) as never,
      photos: p.photos as never,
      contact: p.contact as never,
      amenities: p.amenities ?? [],
      priceRange: p.priceRange ?? null,
      offers: (p.offers ?? null) as never,
      faqs: (p.faqs ?? null) as never,
      stay: (p.stay ?? null) as never,
      service: (p.service ?? null) as never,
      rating: (p.rating ?? null) as never,
      verified: p.verified ?? false,
      featured: p.featured ?? false,
      status: "PUBLISHED" as never,
    };
    await prisma.place.upsert({
      where: { slug: p.slug },
      update: data,
      create: { slug: p.slug, ...data },
    });
  }

  console.log("Seeding collections…");
  for (const c of collections) {
    const data = {
      facet: up(c.facet) as never,
      match: c.match,
      title: c.title as never,
      heading: c.heading as never,
      intro: c.intro as never,
      metaDescription: c.metaDescription as never,
      featured: c.featured ?? false,
    };
    await prisma.collection.upsert({
      where: { pillar_slug: { pillar: up(c.pillar) as never, slug: c.slug } },
      update: data,
      create: { slug: c.slug, pillar: up(c.pillar) as never, ...data },
    });
  }

  console.log("Seeding guides…");
  for (const g of guides) {
    const data = {
      title: g.title as never,
      excerpt: g.excerpt as never,
      body: g.body as never,
      category: up(g.category) as never,
      cover: g.cover as never,
      author: g.author,
      relatedPlaces: g.relatedPlaces ?? [],
      featured: g.featured ?? false,
      publishedAt: new Date(g.publishedAt),
    };
    await prisma.guide.upsert({
      where: { slug: g.slug },
      update: data,
      create: { slug: g.slug, ...data },
    });
  }

  const [places, cols, gds] = await Promise.all([
    prisma.place.count(),
    prisma.collection.count(),
    prisma.guide.count(),
  ]);
  console.log(`Done: ${places} places, ${cols} collections, ${gds} guides.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
