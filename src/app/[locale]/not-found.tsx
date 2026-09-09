import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui";

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <Container className="py-24 text-center">
      <p className="text-6xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold">Thessaloniki?</h1>
      <p className="mx-auto mt-2 max-w-md text-muted">
        {t("common.loadingSoon")}
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-700"
      >
        {t("common.home")}
      </Link>
    </Container>
  );
}
