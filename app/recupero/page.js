export default function GuidaRecuperoPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:p-8">
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            Guida pratica
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Recupero: cosa fare prima che succeda un problema
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Quando perdi accesso a una mail, a un account o a file importanti,
            il vero problema non è solo il danno iniziale. È il tempo perso,
            la confusione e il fatto di non sapere da dove partire. Questa guida
            ti aiuta a costruire un piano minimo di recupero, semplice ma
            davvero utile.
          </p>

          <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Obiettivo della guida
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
              Preparare in anticipo poche cose essenziali, così se succede un
              problema non devi improvvisare nel panico.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              1. Identifica i 3 account più importanti
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Parti dagli accessi che, se persi, ti bloccano davvero. Per quasi
              tutti sono:
            </p>

            <div className="mt-5 grid gap-3">
              {[
                "Mail principale",
                "Cloud o archivio file",
                "Account di lavoro o amministrazione",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-slate-700 md:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Non serve fare un elenco infinito. Se metti in ordine questi tre,
              hai già costruito il centro del tuo recupero.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              2. Controlla i metodi di recupero
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Apri ogni account importante e verifica subito:
            </p>

            <div className="mt-5 space-y-3">
              {[
                "mail di recupero corretta",
                "numero di telefono aggiornato",
                "verifica in due passaggi attiva",
                "codici di recupero salvati in un posto sicuro",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-slate-700 md:text-base">
                    Verifica di avere una <span className="font-medium">{item}</span>.
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              3. Scrivi un mini piano di emergenza
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Ti basta una nota privata, un documento protetto o un foglio
              tenuto bene. Dentro scrivi:
            </p>

            <div className="mt-5 grid gap-3">
              {[
                "quale account recuperare per primo",
                "dove trovi codici o riferimenti utili",
                "quali file o servizi devi rimettere in piedi subito",
                "quale contatto o fornitore potrebbe servirti",
              ].map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 md:text-base"
                >
                  <span className="font-semibold text-slate-900">
                    {index + 1}.
                  </span>{" "}
                  Segna <span className="font-medium">{item}</span>.
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Il piano deve essere corto. Se sembra un manuale aziendale da 40
              pagine, non lo userai mai.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              4. Proteggi quello che ti serve per recuperare
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              C’è un paradosso meraviglioso: il tuo piano di recupero serve a
              poco se poi perdi anche quello. Quindi:
            </p>

            <div className="mt-5 space-y-3">
              {[
                "salva i codici di recupero in un posto separato dal telefono principale",
                "non lasciare tutto in un solo dispositivo",
                "usa una nota protetta o un archivio ordinato e facile da ritrovare",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-slate-700 md:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="text-lg font-semibold text-amber-900">
              Errore comune da evitare
            </h2>
            <p className="mt-3 text-sm leading-6 text-amber-800 md:text-base">
              Pensare “tanto me la cavo se succede”. Finché va tutto bene sembra
              vero. Quando perdi accesso alla mail o a un file importante,
              improvvisare costa tempo, stress e spesso anche soldi.
            </p>
          </section>

          <section className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="text-lg font-semibold text-emerald-900">
              Checklist finale
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-emerald-900 md:text-base">
              <p>□ Ho identificato i 3 account più importanti</p>
              <p>□ Ho controllato i metodi di recupero</p>
              <p>□ Ho salvato i codici di emergenza</p>
              <p>□ Ho scritto un mini piano semplice e chiaro</p>
              <p>□ So da dove partire se perdo accesso a mail o file</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}