export default function TwoFAGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-md px-4 py-10 space-y-6">

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">SafeCheck</p>

          <h1 className="mt-2 text-2xl font-semibold">
            Attiva la verifica in due passaggi (2FA)
          </h1>

          <p className="mt-3 text-sm text-slate-600 leading-6">
            È il modo più semplice per proteggere i tuoi account. Anche se qualcuno scopre la password, non potrà accedere senza il secondo codice.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <p className="text-sm font-semibold">Fai così (5 minuti)</p>

          <div className="space-y-3">
            {[
              "Apri la tua email principale (Gmail, Outlook, ecc.)",
              "Vai su Impostazioni → Sicurezza",
              "Attiva la verifica in due passaggi",
              "Scarica un'app di autenticazione",
              "Scansiona il codice e conferma",
            ].map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="h-6 w-6 flex items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <p className="text-sm font-semibold">Strumenti consigliati</p>

          <a
            href="https://support.google.com/accounts/answer/1066447"
            target="_blank"
            className="block w-full rounded-xl bg-slate-900 text-white text-sm font-medium px-4 py-3 text-center"
          >
            Google Authenticator (consigliato)
          </a>

          <a
            href="https://www.microsoft.com/en-us/security/mobile-authenticator-app"
            target="_blank"
            className="block w-full rounded-xl border border-slate-200 text-sm font-medium px-4 py-3 text-center"
          >
            Microsoft Authenticator
          </a>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">
            Una volta fatto questo, hai già fatto più del 70% delle persone.
          </p>
        </section>

      </div>
    </main>
  );
}