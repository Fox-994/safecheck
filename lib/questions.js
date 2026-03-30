export const questions = [
  {
    id: "passwords",
    category: "Identità",
    question: "Sulle password, sei tranquillo davvero o vai un po’ a fiducia?",
    description: "Pensa a mail, banca, lavoro e servizi importanti.",
    weight: 1.5,
    issueCopy: "Le tue password sono più fragili di quanto dovrebbero.",
    impactCopy:
      "Se una password viene scoperta o riutilizzata, il danno può allargarsi velocemente anche ad altri account.",
    actionCopy:
      "Metti in sicurezza i tuoi accessi principali con password uniche e un gestore affidabile.",
    actionSteps: [
      "Scegli un gestore password come Bitwarden, Google Password Manager o Password di Apple.",
      "Cambia subito la password della tua mail principale.",
      "Usa password diverse almeno per mail, banca e lavoro.",
    ],
    options: [
      { label: "Sono messo bene: password diverse e gestite decentemente", value: 0 },
      { label: "Così così: provo a stare attento, ma mi arrangio", value: 1 },
      { label: "Male: ne riuso diverse o le gestisco in modo confuso", value: 3 },
    ],
  },
  {
    id: "emailAccess",
    category: "Identità",
    question: "Se qualcuno scopre la password della tua mail principale, quanto è vicino a entrare?",
    description: "Conta solo quello che succede davvero al login.",
    weight: 1.7,
    issueCopy: "La tua mail principale è più esposta del dovuto.",
    impactCopy:
      "Chi entra nella tua mail può resettare password, leggere dati e arrivare a molti altri servizi collegati.",
    actionCopy:
      "Proteggi la mail principale con una vera verifica in due passaggi.",
    actionSteps: [
      "Apri la sezione Sicurezza del tuo account mail.",
      "Attiva la verifica in due passaggi.",
      "Collega un’app di autenticazione e salva i codici di recupero.",
    ],
    options: [
      { label: "È ancora bloccato: serve un secondo passaggio", value: 0 },
      { label: "La protezione c’è, ma non è chiarissima o non sempre", value: 1 },
      { label: "Con quella password entrerebbe o quasi", value: 3 },
    ],
  },
  {
    id: "backup",
    category: "Dati",
    question: "Scenario brutto ma realistico: oggi perdi PC o telefono. Domani quanto riesci a rimettere in piedi?",
    description: "File, documenti, foto, materiali di lavoro.",
    weight: 1.6,
    issueCopy: "I tuoi file non sono protetti quanto dovrebbero.",
    impactCopy:
      "Senza una copia recente, un guasto o uno smarrimento possono trasformarsi in perdita reale di lavoro e tempo.",
    actionCopy:
      "Crea un backup semplice dei file che contano davvero.",
    actionSteps: [
      "Scegli un posto sicuro: Google Drive, OneDrive, iCloud o disco esterno.",
      "Metti lì i file più importanti.",
      "Attiva sincronizzazione o controllo ricorrente.",
    ],
    options: [
      { label: "Quasi tutto: me la caverei bene", value: 0 },
      { label: "Una parte sì, una parte no", value: 1 },
      { label: "Sarebbe un mezzo disastro", value: 3 },
    ],
  },
  {
    id: "links",
    category: "Abitudini",
    question: "Ti arriva un messaggio urgente da banca, corriere o account. Quanto ti fidi del primo link che vedi?",
    description: "Mail, SMS, WhatsApp, notifiche strane.",
    weight: 1.3,
    issueCopy: "Sei più esposto del necessario ai messaggi ingannevoli.",
    impactCopy:
      "Un clic fatto di fretta può portare a furto di accessi, dati o soldi.",
    actionCopy:
      "Quando un messaggio ti mette fretta, rallenta tu.",
    actionSteps: [
      "Non aprire subito il link.",
      "Vai sul sito o sull’app ufficiale per conto tuo.",
      "Controlla lì se la richiesta è vera.",
    ],
    options: [
      { label: "Poco o niente: controllo prima", value: 0 },
      { label: "Abbastanza: a volte ci casco per fretta", value: 1 },
      { label: "Troppo: mi è già capitato di aprire senza verificare bene", value: 3 },
    ],
  },
  {
    id: "publicWifi",
    category: "Rete",
    question: "Sei in giro e devi lavorare. Quanto facilmente usi un Wi-Fi pubblico per fare cose importanti?",
    description: "Mail, documenti, accessi, pagamenti.",
    weight: 0.9,
    issueCopy: "Stai dando troppa fiducia a reti poco affidabili.",
    impactCopy:
      "Su reti pubbliche o poco controllate aumentano i rischi di esporre dati e accessi.",
    actionCopy:
      "Per le attività importanti, usa hotspot o reti fidate.",
    actionSteps: [
      "Evita il Wi-Fi pubblico per mail e account sensibili.",
      "Usa il tuo hotspot quando puoi.",
      "Lascia il Wi-Fi pubblico alle cose non delicate.",
    ],
    options: [
      { label: "Difficilmente: per le cose serie lo evito", value: 0 },
      { label: "Ogni tanto, ma cerco di stare attento", value: 1 },
      { label: "Abbastanza facilmente: uso quello che trovo", value: 3 },
    ],
  },
  {
    id: "phoneProtection",
    category: "Dispositivo",
    question: "Se perdi il telefono oggi, quanto dormi tranquillo stanotte?",
    description: "Blocco schermo, biometria, localizzazione e dati dentro.",
    weight: 1.2,
    issueCopy: "Il telefono potrebbe essere un punto debole importante.",
    impactCopy:
      "Chi trova o ruba il telefono può provare ad arrivare a mail, messaggi, documenti e codici.",
    actionCopy:
      "Rendi il telefono più difficile da usare per altri e più facile da bloccare da remoto.",
    actionSteps: [
      "Attiva PIN sicuro o biometria.",
      "Verifica la localizzazione del dispositivo.",
      "Controlla il blocco o la cancellazione da remoto.",
    ],
    options: [
      { label: "Molto: è protetto bene", value: 0 },
      { label: "Abbastanza: ma so che potrei migliorare", value: 1 },
      { label: "Poco: sarebbe un problema serio", value: 3 },
    ],
  },
  {
    id: "updates",
    category: "Sistema",
    question: "Con gli aggiornamenti sei disciplinato o fai finta di niente finché tutto regge?",
    description: "Telefono, PC, browser e app.",
    weight: 1.1,
    issueCopy: "Stai lasciando aperte più falle del necessario.",
    impactCopy:
      "Molti attacchi e problemi sfruttano aggiornamenti rimandati troppo a lungo.",
    actionCopy:
      "Riduci i rinvii e automatizza quello che puoi.",
    actionSteps: [
      "Apri le impostazioni del dispositivo.",
      "Controlla aggiornamenti di sistema e browser.",
      "Attiva gli aggiornamenti automatici.",
    ],
    options: [
      { label: "Abbastanza disciplinato", value: 0 },
      { label: "A metà: li faccio, ma spesso tardi", value: 1 },
      { label: "Molto poco: li rimando spesso", value: 3 },
    ],
  },
  {
    id: "incidentReadiness",
    category: "Recupero",
    question: "Se domani perdi accesso a mail o file, hai un piano o improvvisi nel panico?",
    description: "Recupero accessi, codici, contatti utili e primi passi.",
    weight: 1.1,
    issueCopy: "Se succede qualcosa, rischi di reagire troppo tardi e male.",
    impactCopy:
      "Quando manca un minimo di piano, anche un problema piccolo può bloccare lavoro e clienti.",
    actionCopy:
      "Preparati un mini piano di emergenza semplice ma concreto.",
    actionSteps: [
      "Scrivi i 3 account più importanti da recuperare.",
      "Segna dove trovare codici e riferimenti utili.",
      "Tieni questa lista in un posto facile da ritrovare.",
    ],
    options: [
      { label: "Ho già un’idea chiara di cosa fare", value: 0 },
      { label: "Più o meno, ma senza nulla di davvero pronto", value: 1 },
      { label: "Improvviserei completamente", value: 3 },
    ],
  },
  {
    id: "appAccess",
    category: "Accessi",
    question: "Sugli accessi collegati ai tuoi account sei in controllo o lasci tutto accumularsi?",
    description: "App collegate a Google, Apple, Microsoft o vecchi servizi.",
    weight: 1.0,
    issueCopy: "Ci sono probabilmente accessi collegati che non controlli da tempo.",
    impactCopy:
      "Un’app dimenticata può mantenere accesso ai tuoi dati anche se non la usi più.",
    actionCopy:
      "Controlla gli accessi collegati e fai pulizia.",
    actionSteps: [
      "Apri il tuo account principale.",
      "Vai nella sezione sicurezza o app collegate.",
      "Rimuovi ciò che non usi più o non riconosci.",
    ],
    options: [
      { label: "Sono abbastanza in controllo", value: 0 },
      { label: "Solo in parte", value: 1 },
      { label: "Per niente o quasi", value: 3 },
    ],
  },
];

export const questionCategories = [
  "Identità",
  "Dispositivo",
  "Sistema",
  "Dati",
  "Abitudini",
  "Rete",
  "Recupero",
  "Accessi",
];