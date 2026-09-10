"use client";

import { useEffect } from "react";

/**
 * Gives the header's native <details> menus the two behaviours people expect
 * from a menu and that <details> does not provide: Escape closes it, and so
 * does a click anywhere outside.
 *
 * The menus stay plain <details>/<summary> so they keep working — keyboard
 * included — before this script runs or if it never does.
 */
export function MenuAutoClose() {
  useEffect(() => {
    const menus = () =>
      Array.from(document.querySelectorAll<HTMLDetailsElement>("details[data-menu]"));

    const closeAll = (except?: Element | null) => {
      for (const d of menus()) {
        if (d.open && d !== except) d.open = false;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Element | null;
      closeAll(target?.closest("details[data-menu]"));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const open = menus().find((d) => d.open);
      if (!open) return;
      open.open = false;
      // Return focus to the control that opened it, so keyboard users are not
      // dropped at the top of the document.
      open.querySelector("summary")?.focus();
    };

    // A menu link navigates client-side; the menu must not stay open behind it.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest("a");
      if (link?.closest("details[data-menu]")) closeAll();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
