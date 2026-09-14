import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";
import type { ShareLabels } from "@/components/ShareButton";

/**
 * The props every ShareButton needs, built once on the server.
 *
 * The URL is composed here rather than read from `window.location` so that
 * what gets pasted into a chat is the canonical address — the right locale,
 * and none of the `?filter=` or campaign parameters the visitor happened to
 * arrive with.
 */
export async function shareProps(
  locale: Locale,
  /** In-app path WITHOUT the locale prefix, e.g. "/eat/mavri-thalassa". */
  path: string,
): Promise<{ url: string; labels: ShareLabels }> {
  const t = await getTranslations({ locale });
  return {
    url: absoluteUrl(locale, path),
    labels: {
      share: t("share.share"),
      copy: t("share.copy"),
      copied: t("share.copied"),
      whatsapp: t("share.whatsapp"),
      viber: t("share.viber"),
      facebook: t("share.facebook"),
      email: t("share.email"),
    },
  };
}
