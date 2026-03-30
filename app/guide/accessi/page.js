import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Parti dall'email principale",
    description:
      "La tua email è spesso la chiave di accesso a tutto il resto. Se qualcuno entra lì, può recuperare password e prendere il controllo di altri account.",
  },
  {
    number: "2",
    title: "Attiva una verifica in più",
    description:
      "Quando disponibile, attiva la verifica in due passaggi. Anche se qualcuno scopre la password, entrare diventa molto più difficile.",
  },
  {
    number: "3",
    title: "Controlla se riusi la stessa password",
    description:
      "Se la stessa password è usata in più servizi, basta che un solo account venga esposto per mettere a rischio anche gli altri.",
  },
  {
    number: "4",
    title: "Metti ordine negli accessi più importanti",
    description:
      "Dai priorità a email, home banking, cloud, strumenti di lavoro e account usati per fatture o documenti sensibili.",
  },
  {
    number: "5",
    title: "Evita scorciatoie pericolose",
    description:
      "Salvare password a caso, condividerle via chat o usare combinazioni troppo semplici ti espone più di quanto sembri.",
  },
];

const checklist = [
  "Ho controllato l'email principale",
  "Ho attivato la verifica in due passaggi dove possibile",
  "Non sto riutilizzando la stessa password ovunque",
  "Ho dato priorità agli account davvero importanti",
  "Ho eliminato almeno una cattiva abitudine sugli accessi",
];

export default function GuidaAccessiPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-md px-4 py-6 sm:py-8">
        <div className="space-y-4">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">SafeCheck</p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              Metti al sicuro i tuoi accessi
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Questa è una delle aree più importanti da sistemare. Non serve fare tutto in modo perfetto: serve mettere in sicurezza prima i punti che contano davvero.
            </p>

            <div className="mt-4 rounded-2xl bg-slate-900 p-4 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Obiettivo pratico
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-100">
                Ridurre il rischio che qualcuno entri nei tuoi account principali o li recuperi troppo facilmente.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Da dove partire
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Segui questi passaggi in ordine. Parti dalle cose più sensibili e non disperdere attenzione su dettagli secondari.
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      {step.number}
                    </div>

                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">
                        {step.title}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Mini checklist finale
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Se riesci a spuntare queste 5 cose, hai già migliorato davvero la situazione.
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {checklist.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-semibold text-white">
                    ✓
                  </div>
                  <p className="text-sm leading-6 text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm leading-6 text-slate-600">
              Non serve diventare esperti. Serve rendere più difficile l’accesso ai tuoi account più importanti e togliere di mezzo le debolezze più banali.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/result"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-medium text-white transition hover:opacity-90"
              >
                Torna al risultato
              </Link>

              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Rifai il check
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}