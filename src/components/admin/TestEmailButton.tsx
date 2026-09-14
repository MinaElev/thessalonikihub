"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { sendTestEmail, type TestMailState } from "@/app/actions/people";

/**
 * Sends a test message to the admin's own address.
 *
 * The point is the failure case. SMTP fails for a handful of very different
 * reasons — a rejected password, a blocked port, an address Gmail will not
 * send as — and each has a different fix, so the server's own wording is shown
 * rather than a generic "something went wrong".
 */
function Button({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:border-brand-300 hover:text-brand-700 disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      {label}
    </button>
  );
}

export function TestEmailButton({
  labels,
}: {
  labels: {
    send: string;
    sent: string;
    unconfigured: string;
    failed: string;
  };
}) {
  const [state, action] = useActionState<TestMailState, FormData>(sendTestEmail, {
    status: "idle",
  });

  return (
    <form action={action} className="flex flex-wrap items-center gap-3">
      <Button label={labels.send} />

      {state.status === "sent" ? (
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
          <CheckCircle2 className="h-4 w-4" /> {labels.sent}
        </span>
      ) : null}

      {state.status === "unconfigured" ? (
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-800">
          <AlertCircle className="h-4 w-4" /> {labels.unconfigured}
        </span>
      ) : null}

      {state.status === "failed" ? (
        <span className="inline-flex flex-wrap items-baseline gap-x-2 text-sm text-accent-800">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <AlertCircle className="h-4 w-4" /> {labels.failed}
          </span>
          {state.detail ? (
            <code className="rounded bg-accent-50 px-1.5 py-0.5 text-xs">{state.detail}</code>
          ) : null}
        </span>
      ) : null}
    </form>
  );
}
