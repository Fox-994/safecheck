import { questions } from "./questions";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getAnswerValue = (answers, questionId) => {
  const value = answers?.[questionId];
  return typeof value === "number" ? value : 0;
};

const getRiskLevel = (score) => {
  if (score >= 80) {
    return {
      label: "Solido",
      tone: "good",
      summary:
        "Hai basi abbastanza buone, ma ci sono ancora alcune cose da sistemare prima che diventino problemi veri.",
    };
  }

  if (score >= 60) {
    return {
      label: "Migliorabile",
      tone: "warn",
      summary:
        "La tua situazione è recuperabile in fretta, ma ci sono abitudini che ti espongono più del necessario.",
    };
  }

  if (score >= 40) {
    return {
      label: "Fragile",
      tone: "alert",
      summary:
        "Ci sono diversi punti deboli che possono trasformarsi in perdita di accessi, file o tempo di lavoro.",
    };
  }

  return {
    label: "Critico",
    tone: "danger",
    summary:
      "Hai alcune debolezze serie. La buona notizia è che puoi migliorare molto con poche azioni fatte bene.",
  };
};

const getSeverityLabel = (value) => {
  if (value === 3) return "critical";
  if (value === 1) return "warning";
  return "good";
};

const getGuidePathById = (id) => {
  const map = {
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

  return map[id] || null;
};

const buildIssue = (question, value, dependencyBoost = 0) => ({
  id: question.id,
  category: question.category,
  severity: value,
  severityLabel: getSeverityLabel(value),
  weight: question.weight,
  dependencyBoost,
  title: question.issueCopy,
  description: question.actionCopy,
  impact: question.impactCopy,
  actionSteps: question.actionSteps || [],
  guidePath: getGuidePathById(question.id),
});

const getToolSuggestions = (questionId) => {
  switch (questionId) {
    case "emailAccess":
      return [
        {
          label: "Google Authenticator",
          href: "https://support.google.com/accounts/answer/1066447",
        },
        {
          label: "Microsoft Authenticator",
          href: "https://www.microsoft.com/en-us/security/mobile-authenticator-app",
        },
      ];

    case "passwords":
      return [
        { label: "Bitwarden", href: "https://bitwarden.com/download/" },
        {
          label: "Google Password Manager",
          href: "https://passwords.google.com/",
        },
      ];

    case "backup":
      return [
        { label: "Google Drive", href: "https://drive.google.com/" },
        {
          label: "OneDrive",
          href: "https://www.microsoft.com/microsoft-365/onedrive/online-cloud-storage",
        },
      ];

    case "appAccess":
      return [
        {
          label: "Controllo accessi Google",
          href: "https://myaccount.google.com/security",
        },
      ];

    case "phoneProtection":
      return [
        {
          label: "Trova il mio dispositivo Android",
          href: "https://www.google.com/android/find/",
        },
        {
          label: "Dov'è - Apple",
          href: "https://www.icloud.com/find/",
        },
      ];

    case "links":
      return [
        {
          label: "Guida Google anti-phishing",
          href: "https://support.google.com/mail/answer/8253",
        },
      ];

    case "updates":
      return [
        {
          label: "Aggiornamenti Windows",
          href: "https://support.microsoft.com/windows/windows-update-faq",
        },
        {
          label: "Aggiornamenti Android",
          href: "https://support.google.com/android/answer/7680439",
        },
      ];

    case "publicWifi":
      return [
        {
          label: "Guida sicurezza Wi-Fi pubblico",
          href: "https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know",
        },
      ];

    default:
      return [];
  }
};

const getBasePriorityScore = (value, weight) => {
  if (value === 3) return 100 * weight;
  if (value === 1) return 45 * weight;
  return 0;
};

const getDependencyEffects = (answers) => {
  const boosts = {};
  const penalties = [];
  const actionInjections = [];

  const addBoost = (questionId, points) => {
    boosts[questionId] = (boosts[questionId] || 0) + points;
  };

  const addPenalty = ({
    id,
    points,
    critical = false,
    title,
    description,
    tools = [],
    actionTitle,
    actionDescription,
    steps = [],
  }) => {
    penalties.push({
      id,
      points,
      critical,
      title,
      description,
      tools,
      guidePath: getGuidePathById(id),
    });

    if (actionTitle && actionDescription) {
      actionInjections.push({
        id,
        title: actionTitle,
        description: actionDescription,
        priority: critical ? "Urgente" : "Alta priorità",
        tools,
        steps,
        guidePath: getGuidePathById(id),
        score: points * 10 + (critical ? 20 : 0),
      });
    }
  };

  const passwords = getAnswerValue(answers, "passwords");
  const emailAccess = getAnswerValue(answers, "emailAccess");
  const backup = getAnswerValue(answers, "backup");
  const links = getAnswerValue(answers, "links");
  const publicWifi = getAnswerValue(answers, "publicWifi");
  const phoneProtection = getAnswerValue(answers, "phoneProtection");
  const updates = getAnswerValue(answers, "updates");
  const incidentReadiness = getAnswerValue(answers, "incidentReadiness");
  const appAccess = getAnswerValue(answers, "appAccess");

  if (emailAccess === 3) {
    addBoost("incidentReadiness", 26);
    addBoost("appAccess", 18);
    addBoost("passwords", 12);

    addPenalty({
      id: "email-core-critical",
      points: 4,
      critical: true,
      title: "La mail principale trascina giù tutto il resto",
      description:
        "Se la tua mail principale è troppo facile da recuperare o violare, anche accessi collegati, password e recupero degli account diventano più fragili.",
      tools: [
        {
          label: "Google Authenticator",
          href: "https://support.google.com/accounts/answer/1066447",
        },
      ],
      actionTitle: "Metti in sicurezza la mail prima di tutto",
      actionDescription:
        "Blocca davvero la mail principale con un secondo fattore e controlla i metodi di recupero prima di sistemare il resto.",
      steps: [
        "Apri la sezione Sicurezza del tuo account principale.",
        "Attiva la verifica in due passaggi.",
        "Controlla metodi di recupero e dispositivi collegati.",
      ],
    });
  }

  if (passwords === 3) {
    addBoost("emailAccess", 14);
    addBoost("appAccess", 10);

    addPenalty({
      id: "password-reuse-risk",
      points: 3,
      critical: false,
      title: "Password deboli o riutilizzate allargano il rischio",
      description:
        "Se le password principali non sono solide, anche account che sembrano protetti restano più esposti del necessario.",
      tools: [{ label: "Bitwarden", href: "https://bitwarden.com/download/" }],
      actionTitle: "Sistema subito le password più delicate",
      actionDescription:
        "Parti da mail, banca, cloud e strumenti di lavoro. Devono essere uniche e gestite meglio.",
      steps: [
        "Cambia la password della mail principale.",
        "Usa password diverse per mail, banca e lavoro.",
        "Metti tutto in un password manager affidabile.",
      ],
    });
  }

  if (backup === 3) {
    addBoost("incidentReadiness", 20);

    addPenalty({
      id: "backup-recovery-chain",
      points: 3,
      critical: false,
      title: "Senza backup, ogni incidente pesa di più",
      description:
        "Quando mancano copie affidabili, anche un problema recuperabile può trasformarsi in perdita vera di tempo e lavoro.",
      tools: [{ label: "Google Drive", href: "https://drive.google.com/" }],
      actionTitle: "Crea una copia di sicurezza prima che serva",
      actionDescription:
        "Porta fuori dal dispositivo principale i file che contano davvero e rendi il backup una cosa concreta, non teorica.",
      steps: [
        "Scegli dove tenere il backup: cloud o disco esterno.",
        "Salva i file più importanti fuori dal dispositivo principale.",
        "Attiva una sincronizzazione o un controllo ricorrente.",
      ],
    });
  }

  if (phoneProtection === 3) {
    addBoost("emailAccess", 12);
    addBoost("incidentReadiness", 10);

    addPenalty({
      id: "phone-account-chain",
      points: 2,
      critical: false,
      title: "Telefono e account si rafforzano nel rischio",
      description:
        "Se il telefono è poco protetto, mail, messaggi e recupero account diventano molto più delicati.",
      tools: [
        {
          label: "Trova il mio dispositivo Android",
          href: "https://www.google.com/android/find/",
        },
        {
          label: "Dov'è - Apple",
          href: "https://www.icloud.com/find/",
        },
      ],
      actionTitle: "Rendi il telefono meno utile a chi lo trova",
      actionDescription:
        "Bloccalo meglio, verifica il controllo remoto e considera il telefono come una chiave dei tuoi account.",
      steps: [
        "Attiva un blocco schermo serio con PIN o biometria.",
        "Controlla localizzazione e blocco da remoto.",
        "Verifica che mail e app sensibili non siano troppo esposte.",
      ],
    });
  }

  if (updates === 3 && links === 3) {
    addBoost("phoneProtection", 8);
    addBoost("passwords", 6);

    addPenalty({
      id: "easy-entry",
      points: 6,
      critical: false,
      title: "Abitudini quotidiane che facilitano i problemi",
      description:
        "Aggiornamenti rimandati e clic impulsivi sono una combinazione che rende gli incidenti molto più probabili.",
      tools: [
        {
          label: "Guida Google anti-phishing",
          href: "https://support.google.com/mail/answer/8253",
        },
      ],
      actionTitle: "Riduci i rischi da fretta e rinvii",
      actionDescription:
        "Aggiorna ciò che usi davvero e smetti di fidarti del primo link urgente che compare.",
      steps: [
        "Aggiorna sistema, browser e app principali.",
        "Non cliccare link urgenti senza verificare.",
        "Per richieste importanti entra dai canali ufficiali.",
      ],
    });
  }

  if (passwords === 3 && emailAccess === 3) {
    addBoost("appAccess", 12);
    addBoost("incidentReadiness", 12);

    addPenalty({
      id: "identity-core",
      points: 10,
      critical: true,
      title: "Accessi principali troppo esposti",
      description:
        "Se la tua mail non è protetta bene e le password sono deboli o riutilizzate, basta poco per perdere il controllo di più account insieme.",
      tools: [
        {
          label: "Google Authenticator",
          href: "https://support.google.com/accounts/answer/1066447",
        },
        { label: "Bitwarden", href: "https://bitwarden.com/download/" },
      ],
      actionTitle: "Chiudi subito il fronte identità",
      actionDescription:
        "Mail e password sono il centro del problema. Vanno sistemate prima di ogni altra cosa.",
      steps: [
        "Metti in sicurezza la mail principale con 2FA.",
        "Cambia le password più critiche.",
        "Usa un password manager per evitare riuso e confusione.",
      ],
    });
  }

  if (backup === 3 && incidentReadiness === 3) {
    addBoost("emailAccess", 6);

    addPenalty({
      id: "no-recovery-path",
      points: 8,
      critical: true,
      title: "Recupero troppo fragile",
      description:
        "Se perdi file o accessi e non hai né copie né un piano minimo, il danno si allarga molto più in fretta.",
      tools: [{ label: "Google Drive", href: "https://drive.google.com/" }],
      actionTitle: "Costruisci un piano minimo di recupero",
      actionDescription:
        "Metti insieme backup, priorità e primi passaggi. Non serve un manuale NATO, basta qualcosa che useresti davvero.",
      steps: [
        "Decidi quali file e account sono davvero critici.",
        "Prepara una copia dei file importanti.",
        "Segna i primi passi da fare in caso di blocco o perdita.",
      ],
    });
  }

  if (appAccess === 3 && emailAccess === 3) {
    addBoost("passwords", 8);

    addPenalty({
      id: "hidden-access",
      points: 5,
      critical: false,
      title: "Accessi collegati troppo poco controllati",
      description:
        "Se non controlli gli accessi collegati e la mail è fragile, lasci aperte più porte del necessario.",
      tools: [
        {
          label: "Controllo accessi Google",
          href: "https://myaccount.google.com/security",
        },
      ],
      actionTitle: "Fai pulizia negli accessi collegati",
      actionDescription:
        "Rimuovi servizi che non usi più e controlla chi può ancora entrare tramite account principali.",
      steps: [
        "Apri la sezione sicurezza del tuo account principale.",
        "Controlla app e accessi collegati.",
        "Rimuovi ciò che non usi o non riconosci.",
      ],
    });
  }

  if (publicWifi === 3 && links === 3) {
    addBoost("emailAccess", 6);
    addBoost("appAccess", 6);

    addPenalty({
      id: "risky-context",
      points: 4,
      critical: false,
      title: "Troppa fiducia in contesti poco affidabili",
      description:
        "Messaggi ingannevoli e reti poco sicure aumentano insieme il rischio di esporre dati e accessi.",
      tools: [
        {
          label: "Guida sicurezza Wi-Fi pubblico",
          href: "https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know",
        },
      ],
      actionTitle:
        "Riduci l’esposizione nei contesti più facili da sbagliare",
      actionDescription:
        "Per operazioni importanti usa reti fidate e verifica sempre il contesto prima di cliccare.",
      steps: [
        "Evita il Wi-Fi pubblico per accessi importanti.",
        "Usa hotspot o reti fidate quando possibile.",
        "Non aprire link delicati in contesti poco sicuri.",
      ],
    });
  }

  return { boosts, penalties, actionInjections };
};

const buildPriorityItems = (answers, dependencyBoosts) => {
  return questions
    .map((question) => {
      const value = getAnswerValue(answers, question.id);
      const dependencyBoost = dependencyBoosts[question.id] || 0;
      const basePriority = getBasePriorityScore(value, question.weight);
      const finalPriority = basePriority + dependencyBoost;

      return {
        questionId: question.id,
        question,
        value,
        basePriority,
        dependencyBoost,
        finalPriority,
        issue: buildIssue(question, value, dependencyBoost),
      };
    })
    .sort((a, b) => b.finalPriority - a.finalPriority);
};

const buildDynamicChecklist = (priorityItems, injectedActions) => {
  const checklist = [];
  const usedIds = new Set();

  for (const item of priorityItems) {
    if (item.value !== 3 && item.value !== 1) continue;
    if (usedIds.has(item.questionId)) continue;

    checklist.push({
      id: item.questionId,
      title: item.value === 3
        ? item.question.actionCopy
        : item.question.actionCopy,
      description: item.question.impactCopy,
      priority: item.value === 3 ? "Urgente" : "Alta priorità",
      tools: getToolSuggestions(item.questionId),
      steps: item.question.actionSteps || [],
      guidePath: getGuidePathById(item.questionId),
      score: item.finalPriority,
    });

    usedIds.add(item.questionId);
  }

  injectedActions.forEach((action) => {
    if (usedIds.has(action.id)) return;

    checklist.push(action);
    usedIds.add(action.id);
  });

  return checklist
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 3)
    .map(({ score, ...rest }) => rest);
};

export function buildResult(answers = {}) {
  let weightedRisk = 0;
  let maxWeightedRisk = 0;

  const criticalAnswers = [];
  const warningAnswers = [];

  questions.forEach((question) => {
    const value = getAnswerValue(answers, question.id);

    weightedRisk += value * question.weight;
    maxWeightedRisk += 3 * question.weight;

    if (value === 3) {
      criticalAnswers.push(question.id);
    }

    if (value === 1) {
      warningAnswers.push(question.id);
    }
  });

  const rawRiskPercent =
    maxWeightedRisk > 0 ? (weightedRisk / maxWeightedRisk) * 100 : 0;

  let score = Math.round(100 - rawRiskPercent);

  const { boosts, penalties, actionInjections } = getDependencyEffects(answers);

  penalties.forEach((penalty) => {
    score -= penalty.points;
  });

  const hasCriticalCombo = penalties.some((item) => item.critical);

  if (hasCriticalCombo && score > 72) {
    score = 72;
  }

  if (criticalAnswers.length >= 3 && score > 62) {
    score = 62;
  }

  if (
    criticalAnswers.includes("emailAccess") &&
    criticalAnswers.includes("passwords") &&
    score > 58
  ) {
    score = 58;
  }

  score = clamp(score, 0, 100);

  const riskLevel = getRiskLevel(score);

  const priorityItems = buildPriorityItems(answers, boosts);

  const questionIssues = priorityItems
    .filter((item) => item.value === 3 || item.value === 1)
    .map((item) => ({
      ...item.issue,
      priorityScore: item.finalPriority,
    }));

  const penaltyIssues = penalties.map((item) => ({
    id: item.id,
    category: "Diagnosi",
    severity: item.critical ? 3 : 2,
    weight: item.critical ? 1.5 : 1.1,
    dependencyBoost: 0,
    title: item.title,
    description: item.description,
    impact: item.description,
    guidePath: item.guidePath || getGuidePathById(item.id),
    priorityScore: item.points * 12 + (item.critical ? 30 : 0),
  }));

  const mergedIssues = [...questionIssues, ...penaltyIssues]
    .sort((a, b) => (b.priorityScore || 0) - (a.priorityScore || 0))
    .slice(0, 3)
    .map(({ priorityScore, ...rest }) => rest);

  const topActionsDetailed = buildDynamicChecklist(
    priorityItems,
    actionInjections
  );

  return {
    score,
    riskLevel,
    shortSummary: riskLevel.summary,
    proofLine:
      "La tua prova del 9: come gestisci davvero la tua sicurezza ogni giorno.",
    topIssues: mergedIssues,
    topActionsDetailed,
    stats: {
      totalQuestions: questions.length,
      criticalAnswersCount: criticalAnswers.length,
      warningAnswersCount: warningAnswers.length,
      combinationIssuesCount: penalties.length,
      rawRiskPercent: Math.round(rawRiskPercent),
    },
  };
}

export function calculateSafeCheckResult(answers = {}) {
  return buildResult(answers);
}