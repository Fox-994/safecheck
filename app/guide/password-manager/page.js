import Link from "next/link";

export default function PasswordManagerGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-md px-4 py-10 space-y-4">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">SafeCheck</p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Inizia a usare un password manager
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Riutilizzare password o salvarle in modo confuso è una delle abitudini più rischiose. Un password manager ti aiuta a usare password diverse senza doverle ricordare tutte.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">
            Fai così
          </p>

          <div className="mt-4 space-y-3">
            {[
              "Scegli un password manager affidabile e installalo.",
              "Crea una password principale lunga e forte.",
              "Salva dentro almeno email, banca e account di lavoro.",
              "Sostituisci le password duplicate con password nuove e uniche.",
              "Da oggi usa il password manager invece di memoria, note o browser lasciato a caso.",
            ].map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">
            Strumenti consigliati
          </p>

          <div className="mt-4 space-y-3">
            <a
              href="https://bitwarden.com/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-slate-900 bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <span>Bitwarden</span>
              <span className="text-white/50 text-[10px] uppercase font-semibold tracking-wide">
                consigliato
              </span>
            </a>

            <a
              href="https://1password.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <span>1Password</span>
            </a>

            <a
              href="https://passwords.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <span>Google Password Manager</span>
            </a>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">
            Perché farlo adesso
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Un password manager elimina uno dei problemi più comuni: usare la stessa password in più posti. È una di quelle mosse poco spettacolari ma estremamente intelligenti. E purtroppo l’intelligenza pratica nel digitale è merce rara.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/result"
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Torna al risultato
            </Link>

            <Link
              href="/"
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-medium text-white transition hover:opacity-90"
            >
              Rifai il check
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}