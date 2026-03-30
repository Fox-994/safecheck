"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const guides = {
  identita: {
    eyebrow: "SafeCheck Guide",
    title: "Metti al sicuro la tua identità digitale",
    intro:
      "Se mail principale e password sono deboli, il problema non resta su un solo account. Può allargarsi a lavoro, cloud, recupero accessi e servizi collegati.",
    steps: [
      {
        title: "Metti in sicurezza la mail principale",
        text: "Attiva la verifica in due passaggi sul tuo account principale. È il punto da cui conviene partire prima di tutto il resto.",
      },
      {
        title: "Cambia le password più critiche",
        text: "Parti da mail, banca, cloud, strumenti di lavoro e qualsiasi account che permetta di recuperare altri accessi.",
      },
      {
        title: "Smetti di riusare password",
        text: "Se una password finisce nel posto sbagliato, il danno si moltiplica. Un password manager serve proprio a evitare questo.",
      },
      {
        title: "Controlla recupero e accessi collegati",
        text: "Verifica mail di recupero, numero di telefono, dispositivi collegati e app che possono ancora entrare nel tuo account.",
      },
    ],
    tools: [
      {
        label: "Attiva la verifica in due passaggi",
        href: "https://support.google.com/accounts/answer/1066447",
        primary: true,
      },
      {
        label: "Installa Bitwarden",
        href: "https://bitwarden.com/download/",
      },
      {
        label: "Controlla sicurezza account Google",
        href: "https://myaccount.google.com/security",
      },
    ],
    warning:
      "Non iniziare da venti account secondari. Prima sistemi il cuore: mail principale, password critiche e recupero accessi.",
    nextGuide: "/guide/2fa",
    nextGuideLabel: "Vai alla guida 2FA",
  },

  "2fa": {
    eyebrow: "SafeCheck Guide",
    title: "Attiva la verifica in due passaggi",
    intro:
      "Se qualcuno scopre la tua password, la verifica in due passaggi può impedirgli comunque di entrare. È una delle protezioni più utili in assoluto.",
    steps: [
      {
        title: "Parti dalla mail principale",
        text: "La mail è la chiave di accesso a molti altri account. È il primo posto in cui attivare la 2FA.",
      },
      {
        title: "Usa un’app di autenticazione",
        text: "Meglio un’app come Google Authenticator o Microsoft Authenticator rispetto al solo SMS, quando disponibile.",
      },
      {
        title: "Salva i codici di recupero",
        text: "Tieni i codici in un posto sicuro. Se perdi il telefono, ti servono per rientrare.",
      },
      {
        title: "Estendi la protezione agli account critici",
        text: "Dopo la mail, passa a cloud, lavoro, servizi amministrativi e qualsiasi account importante.",
      },
    ],
    tools: [
      {
        label: "Guida Google - verifica in due passaggi",
        href: "https://support.google.com/accounts/answer/1066447",
        primary: true,
      },
      {
        label: "Microsoft Authenticator",
        href: "https://www.microsoft.com/en-us/security/mobile-authenticator-app",
      },
      {
        label: "Google Authenticator",
        href: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2",
      },
    ],
    warning:
      "Non attivarla e poi dimenticare recupero e codici. La 2FA fatta male crea solo panico quando cambi telefono.",
    nextGuide: "/guide/password-manager",
    nextGuideLabel: "Vai alla guida password manager",
  },

  "password-manager": {
    eyebrow: "SafeCheck Guide",
    title: "Sistema le password senza impazzire",
    intro:
      "Il problema non è solo avere password deboli. Il vero disastro arriva quando le riusi in più posti. Un password manager serve a rompere questa catena.",
    steps: [
      {
        title: "Scegli un gestore password affidabile",
        text: "Bitwarden è una scelta semplice e concreta per partire. Anche Google Password Manager o Password di Apple possono andare bene per molti utenti.",
      },
      {
        title: "Cambia subito le password più delicate",
        text: "Parti da mail, banca, cloud, PEC, fatturazione e strumenti di lavoro.",
      },
      {
        title: "Rendi ogni password unica",
        text: "Non serve inventarsele a mano. Falle generare dal password manager.",
      },
      {
        title: "Conserva in ordine gli accessi importanti",
        text: "Quando hai tutto nello stesso posto, smetti di improvvisare e riduci molto il caos.",
      },
    ],
    tools: [
      {
        label: "Installa Bitwarden",
        href: "https://bitwarden.com/download/",
        primary: true,
      },
      {
        label: "Google Password Manager",
        href: "https://passwords.google.com/",
      },
    ],
    warning:
      "Non partire dai servizi secondari. Prima metti in sicurezza tutto quello che può farti perdere accessi, soldi o lavoro.",
    nextGuide: "/guide/backup",
    nextGuideLabel: "Vai alla guida backup",
  },

  backup: {
    eyebrow: "SafeCheck Guide",
    title: "Metti al sicuro i file che contano",
    intro:
      "Senza backup, anche un problema banale può diventare perdita vera di documenti, tempo e lavoro. Qui non serve teoria: serve una copia utilizzabile.",
    steps: [
      {
        title: "Scegli dove fare il backup",
        text: "Può essere cloud come Google Drive, OneDrive o iCloud, oppure un disco esterno se lo gestisci bene.",
      },
      {
        title: "Parti dai file davvero importanti",
        text: "Documenti di lavoro, foto, archivi clienti, file amministrativi, materiali che non vuoi ricreare da zero.",
      },
      {
        title: "Togli la dipendenza da un solo dispositivo",
        text: "Se tutto vive solo su PC o telefono, basta un guasto o uno smarrimento per metterti in crisi.",
      },
      {
        title: "Rendi il backup una routine",
        text: "Automatizza o fissati un controllo ricorrente. Il backup fatto una volta sola non è una strategia.",
      },
    ],
    tools: [
      {
        label: "Apri Google Drive",
        href: "https://drive.google.com/",
        primary: true,
      },
      {
        label: "Apri OneDrive",
        href: "https://www.microsoft.com/microsoft-365/onedrive/online-cloud-storage",
      },
    ],
    warning:
      "Non pensare “ce l’ho da qualche parte”. O sai dov’è la copia e la recuperi subito, oppure non è davvero un backup.",
    nextGuide: "/guide/recupero",
    nextGuideLabel: "Vai alla guida recupero",
  },

  recupero: {
    eyebrow: "SafeCheck Guide",
    title: "Prepara un mini piano di recupero",
    intro:
      "Quando perdi accesso a file o account, il danno peggiora se devi improvvisare. Un piano minimo ti fa risparmiare tempo, errori e panico.",
    steps: [
      {
        title: "Individua i 3 account più critici",
        text: "Mail principale, cloud, banca, servizi di lavoro. Parti da quelli che possono trascinare giù il resto.",
      },
      {
        title: "Segna dove recuperare accessi e codici",
        text: "Non affidarti alla memoria. Tieni chiaro dove sono i codici, i riferimenti e i passaggi utili.",
      },
      {
        title: "Prepara l’ordine delle azioni",
        text: "Prima blocchi il danno, poi recuperi accessi, poi controlli cosa è stato toccato.",
      },
      {
        title: "Rendi il piano facile da ritrovare",
        text: "Se lo nascondi troppo bene, quando serve non lo trovi. Se lo lasci in giro, non è sicuro. Serve equilibrio.",
      },
    ],
    tools: [
      {
        label: "Apri Google Drive",
        href: "https://drive.google.com/",
        primary: true,
      },
    ],
    warning:
      "Non fare un piano enorme che non leggerai mai. Ti basta qualcosa di breve, chiaro e realistico.",
    nextGuide: "/guide/accessi",
    nextGuideLabel: "Vai alla guida accessi",
  },

  accessi: {
    eyebrow: "SafeCheck Guide",
    title: "Fai pulizia negli accessi collegati",
    intro:
      "App vecchie, servizi dimenticati e accessi collegati possono restare aperti molto più a lungo di quanto immagini. E intanto si portano dietro pezzi dei tuoi dati.",
    steps: [
      {
        title: "Apri la sezione sicurezza del tuo account principale",
        text: "Vai su Google, Apple o Microsoft e controlla app collegate, dispositivi e sessioni attive.",
      },
      {
        title: "Rimuovi ciò che non usi più",
        text: "Se un servizio non ti serve, non deve restare connesso ai tuoi dati.",
      },
      {
        title: "Controlla ciò che non riconosci",
        text: "Se vedi accessi strani o dimenticati, trattali come un campanello d’allarme.",
      },
      {
        title: "Ripeti il controllo periodicamente",
        text: "Una pulizia ogni tanto basta già a evitare accumuli inutili.",
      },
    ],
    tools: [
      {
        label: "Controlla sicurezza account Google",
        href: "https://myaccount.google.com/security",
        primary: true,
      },
    ],
    warning:
      "Non dare per scontato che tutto quello collegato sia innocuo solo perché non lo usi più.",
    nextGuide: "/guide/phishing",
    nextGuideLabel: "Vai alla guida phishing",
  },

  phishing: {
    eyebrow: "SafeCheck Guide",
    title: "Riduci il rischio da link e messaggi ingannevoli",
    intro:
      "La fretta è una delle armi migliori contro chi usa tecnologia ogni giorno. Il phishing spesso non buca sistemi: buca l’attenzione.",
    steps: [
      {
        title: "Non cliccare subito i messaggi urgenti",
        text: "Banca, corriere, account bloccato, fattura, premio: il copione è sempre quello.",
      },
      {
        title: "Entra dai canali ufficiali",
        text: "Apri direttamente app o sito ufficiale invece di passare dal link ricevuto.",
      },
      {
        title: "Controlla il contesto",
        text: "Se il tono è strano, frettoloso o confuso, fermati. Il problema spesso è lì.",
      },
      {
        title: "Usa il dubbio come difesa",
        text: "Meglio perdere trenta secondi che regalare accessi o dati.",
      },
    ],
    tools: [
      {
        label: "Guida Google anti-phishing",
        href: "https://support.google.com/mail/answer/8253",
        primary: true,
      },
    ],
    warning:
      "Non fidarti del fatto che ‘sembra vero’. Il phishing fatto bene sembra quasi sempre plausibile.",
    nextGuide: "/guide/telefono",
    nextGuideLabel: "Vai alla guida telefono",
  },

  telefono: {
    eyebrow: "SafeCheck Guide",
    title: "Rendi il telefono meno utile a chi lo trova",
    intro:
      "Il telefono non è solo un dispositivo. Spesso è la chiave di accesso a mail, messaggi, codici e lavoro. Se è protetto male, il rischio si allarga in fretta.",
    steps: [
      {
        title: "Attiva un blocco schermo serio",
        text: "Usa PIN robusto, impronta o riconoscimento facciale. Niente scorciatoie comode e pessime.",
      },
      {
        title: "Controlla localizzazione e blocco da remoto",
        text: "Se lo perdi, devi poterlo trovare, bloccare o cancellare.",
      },
      {
        title: "Verifica quali app restano aperte",
        text: "Mail, cloud, banca, messaggi e autenticazione valgono più del telefono stesso.",
      },
      {
        title: "Consideralo parte della tua sicurezza",
        text: "Se il telefono cade male, non stai perdendo solo un oggetto. Stai esponendo anche gli account.",
      },
    ],
    tools: [
      {
        label: "Trova il mio dispositivo Android",
        href: "https://www.google.com/android/find/",
        primary: true,
      },
      {
        label: "Dov'è - Apple",
        href: "https://www.icloud.com/find/",
      },
    ],
    warning:
      "Non pensare solo al furto. Anche uno smarrimento banale può diventare un problema serio se il telefono è troppo aperto.",
    nextGuide: "/guide/aggiornamenti",
    nextGuideLabel: "Vai alla guida aggiornamenti",
  },

  aggiornamenti: {
    eyebrow: "SafeCheck Guide",
    title: "Riduci i rischi da aggiornamenti rimandati",
    intro:
      "Gli aggiornamenti non servono a farti perdere tempo. Servono spesso a chiudere problemi già noti e sfruttabili.",
    steps: [
      {
        title: "Controlla sistema e browser",
        text: "PC, telefono e browser sono i primi posti dove guardare.",
      },
      {
        title: "Aggiorna le app che usi davvero",
        text: "Non serve ossessione, ma rimandare sempre ti lascia più esposto del necessario.",
      },
      {
        title: "Attiva gli aggiornamenti automatici dove puoi",
        text: "Meno dipendi dalla memoria, meglio è.",
      },
      {
        title: "Tratta i rinvii come un rischio, non come una comodità",
        text: "Se rimandi troppo spesso, il problema non è tecnico. È abitudine.",
      },
    ],
    tools: [
      {
        label: "FAQ Windows Update",
        href: "https://support.microsoft.com/windows/windows-update-faq",
        primary: true,
      },
      {
        label: "Aggiornamenti Android",
        href: "https://support.google.com/android/answer/7680439",
      },
    ],
    warning:
      "Non aspettare il momento perfetto. Gli aggiornamenti rimandati si accumulano e peggiorano da soli.",
    nextGuide: "/guide/reti-sicure",
    nextGuideLabel: "Vai alla guida reti sicure",
  },

  "reti-sicure": {
    eyebrow: "SafeCheck Guide",
    title: "Usa le reti con meno leggerezza",
    intro:
      "Il Wi-Fi pubblico non è sempre una trappola, ma usarlo con troppa fiducia per cose importanti è un’abitudine evitabile.",
    steps: [
      {
        title: "Evita il Wi-Fi pubblico per operazioni sensibili",
        text: "Mail, banca, lavoro, pagamenti e accessi importanti meritano un contesto più affidabile.",
      },
      {
        title: "Usa hotspot o reti fidate quando puoi",
        text: "Una rete controllata da te vale molto di più di una trovata al volo.",
      },
      {
        title: "Non mischiare fretta e contesto fragile",
        text: "Se sei di corsa e su rete poco sicura, aumentano gli errori stupidi.",
      },
      {
        title: "Tratta la rete come parte della decisione",
        text: "Non conta solo cosa fai. Conta anche da dove lo fai.",
      },
    ],
    tools: [
      {
        label: "Guida sicurezza Wi-Fi pubblico",
        href: "https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know",
        primary: true,
      },
    ],
    warning:
      "Non pensare che basti ‘non fare cose strane’. Anche attività normali diventano più rischiose nel contesto sbagliato.",
    nextGuide: "/result",
    nextGuideLabel: "Torna al risultato",
  },
};

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

export default function GuideSlugPage() {
  const params = useParams();
  const slug = params?.slug;
  const guide = typeof slug === "string" ? guides[slug] : null;

  if (!guide) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] px-4 py-10 text-slate-900">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <h1 className="text-xl font-semibold text-slate-900">
                Guida non trovata
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                Questa guida non è ancora disponibile. Ottimo promemoria del fatto
                che i link corrono più veloci dei contenuti.
              </p>
            </div>

            <div className="mt-6">
              <Link
                href="/result"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Torna al risultato
              </Link>
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
            {guide.eyebrow}
          </p>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {guide.title}
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-600 md:text-base">
            {guide.intro}
          </p>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Cosa fare adesso
          </h2>

          <div className="mt-6 space-y-4">
            {guide.steps.map((step, index) => (
              <div
                key={`${step.title}-${index}`}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Strumenti utili
          </h2>

          <div className="mt-6 grid gap-3">
            {guide.tools.map((tool, index) => (
              <a
                key={`${tool.label}-${index}`}
                href={tool.href}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center justify-between rounded-2xl border px-5 py-4 text-sm font-medium transition ${
                  tool.primary
                    ? "border-slate-900 bg-slate-900 text-white hover:opacity-95"
                    : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>{tool.label}</span>
                <ExternalLinkIcon />
              </a>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:p-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Errore da evitare
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700 md:text-base">
              {guide.warning}
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <Link
              href="/result"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Torna al risultato
            </Link>

            <Link
              href={guide.nextGuide}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-95"
            >
              {guide.nextGuideLabel}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}