import { site } from "@/lib/site";

/**
 * The chrome every outgoing email shares, and the blocks a template fills it
 * with.
 *
 * Email is not the web. Clients strip <style> blocks, ignore flexbox and grid,
 * and several still lay out with tables, so everything here is a table with
 * inline styles and a 600px body — the width that has survived every mail
 * client for twenty years. No web fonts, no external stylesheet, no remote
 * images: Gmail and Outlook block remote images by default, so a design that
 * needs one arrives broken.
 *
 * Every template produces HTML *and* plain text from the same blocks. The two
 * always say the same thing, which is what keeps a rich email out of the spam
 * folder: a message with no text part looks like something with an agenda.
 */

const BRAND = "#128788";
const BRAND_DARK = "#136b6d";
const INK = "#16232b";
const MUTED = "#5a6b74";
const LINE = "#e3ecec";
const SOFT = "#f4f8f8";
const ACCENT = "#d04921";
const AMBER_BG = "#fffbeb";
const AMBER_LINE = "#fde68a";
const AMBER_INK = "#78350f";

export type Block =
  | { kind: "text"; text: string }
  /** A labelled table of facts — the "detailed information" part. */
  | { kind: "facts"; rows: [string, string][] }
  /** A numbered sequence the reader is meant to follow. */
  | { kind: "steps"; items: string[] }
  /** Something set apart: a reason, a warning, a code. */
  | { kind: "callout"; tone: "neutral" | "warn"; title?: string; text: string }
  /** One big number or code, centred. */
  | { kind: "code"; value: string; caption?: string }
  | { kind: "button"; label: string; href: string }
  | { kind: "divider" };

export interface EmailDoc {
  /** Shown after the subject in most inboxes. Write it; the default is ugly. */
  preheader: string;
  heading: string;
  blocks: Block[];
  /** Small print under the rule. Defaults to why they received it. */
  footnote?: string;
}

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif";

function renderBlock(b: Block): string {
  switch (b.kind) {
    case "text":
      return `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${INK}">${esc(
        b.text,
      ).replace(/\n/g, "<br>")}</p>`;

    case "facts":
      return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 20px;border:1px solid ${LINE};border-radius:10px;border-collapse:separate;overflow:hidden">
${b.rows
  .map(
    ([k, v], i) =>
      `<tr>
<td style="padding:11px 14px;font-size:13px;color:${MUTED};white-space:nowrap;vertical-align:top;background:${SOFT};${
        i ? `border-top:1px solid ${LINE};` : ""
      }">${esc(k)}</td>
<td style="padding:11px 14px;font-size:14px;color:${INK};font-weight:600;vertical-align:top;${
        i ? `border-top:1px solid ${LINE};` : ""
      }">${esc(v)}</td>
</tr>`,
  )
  .join("\n")}
</table>`;

    case "steps":
      return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 20px">
${b.items
  .map(
    (item, i) =>
      `<tr>
<td width="28" style="padding:0 0 12px;vertical-align:top">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="22" height="22" align="center" style="background:${BRAND};border-radius:11px;font-family:${FONT};font-size:12px;font-weight:700;color:#ffffff;line-height:22px">${i + 1}</td>
</tr></table>
</td>
<td style="padding:0 0 12px 10px;font-size:15px;line-height:1.6;color:${INK};vertical-align:top">${esc(item)}</td>
</tr>`,
  )
  .join("\n")}
</table>`;

    case "callout": {
      const bg = b.tone === "warn" ? AMBER_BG : SOFT;
      const line = b.tone === "warn" ? AMBER_LINE : LINE;
      const ink = b.tone === "warn" ? AMBER_INK : INK;
      return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 20px">
<tr><td style="padding:14px 16px;background:${bg};border:1px solid ${line};border-radius:10px">
${b.title ? `<p style="margin:0 0 6px;font-size:13px;font-weight:700;color:${ink}">${esc(b.title)}</p>` : ""}
<p style="margin:0;font-size:14px;line-height:1.6;color:${ink};white-space:pre-line">${esc(b.text)}</p>
</td></tr></table>`;
    }

    case "code":
      return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 20px">
<tr><td align="center" style="padding:22px 16px;background:${SOFT};border:1px solid ${LINE};border-radius:10px">
<div style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:34px;font-weight:700;letter-spacing:.22em;color:${BRAND_DARK};padding-left:.22em">${esc(b.value)}</div>
${b.caption ? `<div style="margin-top:8px;font-size:13px;color:${MUTED}">${esc(b.caption)}</div>` : ""}
</td></tr></table>`;

    case "button":
      return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 24px">
<tr><td align="center" style="background:${BRAND};border-radius:999px">
<a href="${esc(b.href)}" style="display:inline-block;padding:13px 28px;font-family:${FONT};font-size:15px;font-weight:700;color:#ffffff;text-decoration:none">${esc(b.label)}</a>
</td></tr></table>`;

    case "divider":
      return `<hr style="border:0;border-top:1px solid ${LINE};margin:8px 0 22px">`;
  }
}

/** The HTML half. */
export function renderHtml(doc: EmailDoc): string {
  const footnote =
    doc.footnote ??
    `Έλαβες αυτό το email επειδή έχεις λογαριασμό στο ${site.name}.`;

  return `<!doctype html>
<html lang="el"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(doc.heading)}</title>
</head>
<body style="margin:0;padding:0;background:#eef3f3">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(doc.preheader)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#eef3f3">
<tr><td align="center" style="padding:28px 12px">

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;background:#ffffff;border:1px solid ${LINE};border-radius:14px;overflow:hidden">

<tr><td style="padding:20px 28px;background:${BRAND_DARK}">
<a href="${site.url}" style="font-family:${FONT};font-size:17px;font-weight:800;letter-spacing:-.01em;color:#ffffff;text-decoration:none">${esc(site.name)}</a>
<div style="margin-top:2px;font-family:${FONT};font-size:12px;color:#9fd6d4">Ο ψηφιακός οδηγός της Θεσσαλονίκης</div>
</td></tr>

<tr><td style="padding:28px 28px 8px;font-family:${FONT}">
<h1 style="margin:0 0 18px;font-size:21px;line-height:1.3;font-weight:800;letter-spacing:-.01em;color:${INK}">${esc(doc.heading)}</h1>
${doc.blocks.map(renderBlock).join("\n")}
</td></tr>

<tr><td style="padding:4px 28px 26px;font-family:${FONT}">
<hr style="border:0;border-top:1px solid ${LINE};margin:0 0 14px">
<p style="margin:0 0 6px;font-size:12px;line-height:1.6;color:${MUTED}">${esc(footnote)}</p>
<p style="margin:0;font-size:12px;line-height:1.6;color:${MUTED}">
<a href="${site.url}" style="color:${BRAND_DARK};text-decoration:none">${esc(site.domain)}</a>
&nbsp;·&nbsp;
<a href="${site.url}/info/contact" style="color:${BRAND_DARK};text-decoration:none">Επικοινωνία</a>
&nbsp;·&nbsp;
<a href="${site.url}/info/privacy" style="color:${BRAND_DARK};text-decoration:none">Απόρρητο</a>
</p>
</td></tr>

</table>
</td></tr></table>
</body></html>`;
}

/** The plain-text half, from the same blocks so the two cannot drift apart. */
export function renderText(doc: EmailDoc): string {
  const parts: string[] = [doc.heading, "=".repeat(Math.min(doc.heading.length, 60)), ""];

  for (const b of doc.blocks) {
    switch (b.kind) {
      case "text":
        parts.push(b.text, "");
        break;
      case "facts":
        for (const [k, v] of b.rows) parts.push(`${k}: ${v}`);
        parts.push("");
        break;
      case "steps":
        b.items.forEach((item, i) => parts.push(`${i + 1}. ${item}`));
        parts.push("");
        break;
      case "callout":
        if (b.title) parts.push(b.title);
        parts.push(b.text, "");
        break;
      case "code":
        parts.push(`    ${b.value}`, ...(b.caption ? [b.caption] : []), "");
        break;
      case "button":
        parts.push(`${b.label}: ${b.href}`, "");
        break;
      case "divider":
        parts.push("—", "");
        break;
    }
  }

  parts.push(
    "—",
    doc.footnote ?? `Έλαβες αυτό το email επειδή έχεις λογαριασμό στο ${site.name}.`,
    site.url,
  );
  return parts.join("\n");
}
