"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { calculateSafeCheckResult } from "../../lib/scoring";

const priorityGuideMap = {
  emailAccess: "/guide/2fa",
  passwords: "/guide/password-manager",
  backup: "/guide/backup",
  appAccess: "/guide/accessi",
  incidentReadiness: "/guide/recupero",
  phoneProtection: "/guide/telefono",
  links: "/guide/phishing",
  updates: "/guide/aggiornamenti",
  publicWifi: "/guide/reti-sicure",

  "identity-core": "/guide/identita",
  "email-core-critical": "/guide/identita",
  "password-reuse-risk": "/guide/password-manager",
  "backup-recovery-chain": "/guide/backup",
  "phone-account-chain": "/guide/telefono",
  "easy-entry": "/guide/phishing",
  "no-recovery-path": "/guide/recupero",
  "hidden-access": "/guide/accessi",
  "risky-context": "/guide/reti-sicure",
};

const resultStorageKeys = [
  "safecheck-answers",
  "safecheckAnswers",
  "safecheck_result_answers",
  "safecheck-result-answers",
  "answers",
];

function readAnswersFromStorage() {
  if (typeof window === "undefined") return {};

  for (const key of resultStorageKeys) {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;

      const parsed = JSON.parse(raw);

      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      console.error(`Errore lettura localStorage per la chiave "${key}"`, error);
    }
  }

  return {};
}

function getToneClasses(tone) {
  switch (tone) {
    case "good":
      return {
        badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
        score: "text-emerald-600",
        card: "border-emerald-200 bg-emerald-50/60",
      };
    case "warn":
      return {
        badge: "border-amber-200 bg-amber-50 text-amber-700",
        score: "text-amber-600",
        card: "border-amber-200 bg-amber-50/60",
      };
    case "alert":
      return {
        badge: "border-orange-200 bg-orange-50 text-orange-700",
        score: "text-orange-600",
        card: "border-orange-200 bg-orange-50/60",
      };
    case "danger":
    default:
      return {
        badge: "border-red-200 bg-red-50 text-red-700",
        score: "text-red-600",
        card: "border-red-200 bg-red-50/60",
      };
  }
}

function getGuidePathFromIssue(issueId) {
  return priorityGuideMap[issueId] || null;
}

function getPrimaryGuidePath(result) {
  if (!result?.topActionsDetailed?.length && !result?.topIssues?.length) {
    return null;
  }

  const firstAction = result?.topActionsDetailed?.[0];
  const firstIssue = result?.topIssues?.[0];

  return (
    firstAction?.guidePath ||
    getGuidePathFromIssue(firstAction?.id) ||
    getGuidePathFromIssue(firstIssue?.id) ||
    null
  );
}

function getVisibleStats(stats) {
  if (!stats) return [];

  return [
    {
      label: "Controlli completati",
      value: stats.totalQuestions ?? 0,
    },
    {
      label: "Criticità gravi",
      value: stats.criticalAnswersCount ?? 0,
    },
    {
      label: "Incroci di rischio",
      value: stats.combinationIssuesCount ?? 0,
    },
  ];
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M7 13L13 7" />
      <path d="M8 6h6v6" />
      <path d="M6 10v4h8v-8h-4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3l7 3v5c0 4.5-2.7 8.4-7 10-4.3-1.6-7-5.5-7-10V6l7-3z" />
    </svg>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    const storedAnswers = readAnswersFromStorage();
    setAnswers(storedAnswers);
    setIsLoaded(true);

    if (storedAnswers && Object.keys(storedAnswers).length > 0) {
      console.log("COMPLETED_TEST");
    }
  }, []);

  const result = useMemo(() => {
    return calculateSafeCheckResult(answers || {});
  }, [answers]);

  const toneClasses = getToneClasses(result?.riskLevel?.tone);
  const stats = getVisibleStats(result?.stats);
  const primaryGuidePath = getPrimaryGuidePath(result);

  const hasAnswers = Object.keys(answers || {}).length > 0;

  function handleFeedback(type) {
    console.log(type);
    setFeedbackSent(true);
  }

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] px-4 py-10 text-slate-900">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-medium text-slate-500">
              Sto preparando il risultato...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!hasAnswers) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] px-4 py-10 text-slate-900">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <h1 className="text-xl font-semibold text-slate-900">
                Nessun risultato trovato
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                Non trovo le risposte del check. Probabilmente non sono state
                salvate oppure hai aperto direttamente questa pagina, come fanno
                spesso gli esseri umani quando decidono di saltare i passaggi.
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={() => router.push("/check")}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Vai al check
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-8 text-slate-900 md:py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
            SafeCheck
          </p>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Risultato del check
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
            Hai completato {result?.stats?.totalQuestions ?? 0} controlli
            essenziali sulla tua sicurezza digitale.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-[180px_1fr] md:items-start">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
              <div
                className={`text-5xl font-semibold tracking-tight ${toneClasses.score}`}
              >
                {result.score}
              </div>
              <div className="mt-2 text-sm text-slate-500">su 100</div>
            </div>

            <div className={`rounded-3xl border p-5 ${toneClasses.card}`}>
              <div
                className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${toneClasses.badge}`}
              >
                {result?.riskLevel?.label}
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-700 md:text-base">
                {result?.shortSummary}
              </p>

              <p className="mt-4 text-sm font-medium text-slate-500">
                {result?.proofLine}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <div className="text-2xl font-semibold text-slate-900">
                  {item.value}
                </div>
                <div className="mt-1 text-sm text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Diagnosi: i 3 punti da sistemare
          </h2>

          <div className="mt-6 space-y-4">
            {result.topIssues?.map((issue, index) => (
              <div
                key={`${issue.id || issue.title}-${index}`}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold leading-7 text-slate-900">
                      {issue.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
                      {issue.impact || issue.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          {result.topActionsDetailed?.map((action, index) => {
            const relatedIssueId = result.topIssues?.[index]?.id || null;
            const guidePath =
              action?.guidePath ||
              getGuidePathFromIssue(action?.id) ||
              getGuidePathFromIssue(relatedIssueId);

            return (
              <article
                key={`${action.title}-${index}`}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold leading-8 text-slate-900">
                        {action.title}
                      </h3>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                    {action.priority || "Alta priorità"}
                  </span>
                </div>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  {action.description}
                </p>

                {action.steps?.length > 0 && (
                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Fai così
                    </p>

                    <div className="mt-3 space-y-3">
                      {action.steps.map((step, stepIndex) => (
                        <div
                          key={`${step}-${stepIndex}`}
                          className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4"
                        >
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                            {stepIndex + 1}
                          </div>

                          <p className="text-sm leading-6 text-slate-700 md:text-base">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  {guidePath ? (
                    <Link
                      href={guidePath}
                      onClick={() =>
                        console.log(`CLICK_GUIDE_${action.id || index + 1}`)
                      }
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-95"
                    >
                      Vai alla guida operativa
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex cursor-not-allowed items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-medium text-slate-500"
                    >
                      Guida in arrivo
                    </button>
                  )}
                </div>

                {action.tools?.length > 0 && (
                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Strumenti utili
                    </p>

                    <div className="mt-3 space-y-3">
                      {action.tools.map((tool, toolIndex) => (
                        <a
                          key={`${tool.label}-${toolIndex}`}
                          href={tool.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() =>
                            console.log(
                              `CLICK_TOOL_${tool.label
                                .replace(/\s+/g, "_")
                                .toUpperCase()}`
                            )
                          }
                          className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                            toolIndex === 0
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <span className="truncate">{tool.label}</span>
                            {toolIndex === 0 && (
                              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-300">
                                Consigliato
                              </span>
                            )}
                          </span>

                          <ExternalLinkIcon />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:p-8">
          <div className="flex items-start gap-3 text-slate-500">
            <ShieldIcon />
            <p className="text-sm leading-6 md:text-base">
              SafeCheck non sostituisce una consulenza professionale, ma ti
              aiuta a capire subito dove sei più esposto e da dove conviene
              partire.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <button
              onClick={() => {
                console.log("CLICK_RETAKE_CHECK");
                router.push("/check");
              }}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Rifai il check
            </button>

            {primaryGuidePath ? (
              <Link
                href={primaryGuidePath}
                onClick={() => console.log("CLICK_PRIORITY_1")}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-95"
              >
                Apri la priorità 1
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-medium text-slate-500"
              >
                Guida della priorità 1 in arrivo
              </button>
            )}
          </div>

          <p className="mt-5 text-center text-sm leading-6 text-slate-500">
            Parti dalla priorità 1: è l’azione che riduce più rischio nel minor
            tempo.
          </p>

          <div className="mt-6 border-t border-slate-200 pt-6 text-center">
            <p className="text-sm leading-6 text-slate-500">
              Ti è stato utile questo risultato?
            </p>

            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => handleFeedback("FEEDBACK_YES")}
                disabled={feedbackSent}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                👍 Sì
              </button>

              <button
                onClick={() => handleFeedback("FEEDBACK_NO")}
                disabled={feedbackSent}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                👎 No
              </button>
            </div>

            {feedbackSent && (
              <p className="mt-3 text-sm text-emerald-600">
                Feedback registrato. Almeno una cosa utile l’hai fatta.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}