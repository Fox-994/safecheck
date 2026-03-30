// lib/diagnosis-config.js

export const DIAGNOSIS_DEPENDENCY_RULES = [
  {
    id: 'email-access-critical',
    triggerQuestionId: 'emailAccess',
    triggerValues: [3],
    penalty: 4,
    affects: [
      { questionId: 'incidentReadiness', boost: 22 },
      { questionId: 'appAccess', boost: 16 },
      { questionId: 'passwords', boost: 10 },
    ],
    reason:
      'Se l’accesso alla mail è fragile, anche recupero account, accessi alle app e password diventano più critici.',
  },
  {
    id: 'email-access-warning',
    triggerQuestionId: 'emailAccess',
    triggerValues: [2],
    penalty: 2,
    affects: [
      { questionId: 'incidentReadiness', boost: 10 },
      { questionId: 'appAccess', boost: 8 },
      { questionId: 'passwords', boost: 5 },
    ],
    reason:
      'Una protezione solo parziale della mail indebolisce comunque tutto il resto.',
  },
  {
    id: 'passwords-critical',
    triggerQuestionId: 'passwords',
    triggerValues: [3],
    penalty: 3,
    affects: [
      { questionId: 'emailAccess', boost: 12 },
      { questionId: 'appAccess', boost: 10 },
    ],
    reason:
      'Password deboli o riutilizzate rendono più fragile sia la mail sia gli altri account.',
  },
  {
    id: 'app-access-critical',
    triggerQuestionId: 'appAccess',
    triggerValues: [3],
    penalty: 2,
    affects: [
      { questionId: 'emailAccess', boost: 8 },
      { questionId: 'incidentReadiness', boost: 12 },
    ],
    reason:
      'Se gli accessi alle app sono fragili, anche il recupero da un problema peggiora.',
  },
  {
    id: 'backup-critical',
    triggerQuestionId: 'backup',
    triggerValues: [3],
    penalty: 3,
    affects: [{ questionId: 'incidentReadiness', boost: 18 }],
    reason:
      'Senza backup seri, un incidente ha conseguenze molto peggiori.',
  },
  {
    id: 'device-protection-critical',
    triggerQuestionId: 'deviceProtection',
    triggerValues: [3],
    penalty: 2,
    affects: [
      { questionId: 'backup', boost: 8 },
      { questionId: 'incidentReadiness', boost: 10 },
    ],
    reason:
      'Un dispositivo poco protetto aumenta il rischio operativo e di perdita dati.',
  },
];

export const DIAGNOSIS_ACTION_LIBRARY = {
  emailAccess: {
    3: {
      title: 'Metti in sicurezza la tua mail principale',
      description:
        'Attiva subito la 2FA, controlla i metodi di recupero e verifica i dispositivi collegati.',
      guidePath: '/guide/2fa',
      impact: 100,
      eta: '5-10 min',
    },
    2: {
      title: 'Rafforza la protezione della tua mail',
      description:
        'Controlla mail di recupero, numero di telefono, sessioni aperte e secondo fattore.',
      guidePath: '/guide/2fa',
      impact: 78,
      eta: '5-10 min',
    },
  },

  passwords: {
    3: {
      title: 'Sistema subito le password più critiche',
      description:
        'Parti da mail, banca, cloud e strumenti di lavoro: devono essere uniche e robuste.',
      guidePath: '/guide/password-manager',
      impact: 96,
      eta: '10-20 min',
    },
    2: {
      title: 'Rendi più forti le password principali',
      description:
        'Aggiorna almeno gli account più importanti con password lunghe e diverse.',
      guidePath: '/guide/password-manager',
      impact: 72,
      eta: '10-20 min',
    },
  },

  appAccess: {
    3: {
      title: 'Proteggi gli accessi alle app di lavoro',
      description:
        'Rivedi login, condivisioni, accessi rimasti aperti e protezioni sugli strumenti che usi ogni giorno.',
      guidePath: '/guide/accessi',
      impact: 90,
      eta: '10-15 min',
    },
    2: {
      title: 'Ripulisci gli accessi alle app più importanti',
      description:
        'Controlla chi accede, con quali credenziali e dove mancano protezioni essenziali.',
      guidePath: '/guide/accessi',
      impact: 70,
      eta: '10-15 min',
    },
  },

  incidentReadiness: {
    3: {
      title: 'Prepara un piano minimo di recupero',
      description:
        'Definisci cosa fare se perdi accesso a mail, file o account. Pochi passaggi chiari bastano.',
      guidePath: null,
      impact: 88,
      eta: '10 min',
    },
    2: {
      title: 'Rendi più concreto il tuo piano di recupero',
      description:
        'Annota contatti, priorità e sequenza di azioni da fare in caso di problema.',
      guidePath: null,
      impact: 66,
      eta: '10 min',
    },
  },

  backup: {
    3: {
      title: 'Sistema subito un backup affidabile',
      description:
        'Assicurati di avere almeno una copia recente dei file importanti fuori dal dispositivo principale.',
      guidePath: '/guide/backup',
      impact: 94,
      eta: '15-20 min',
    },
    2: {
      title: 'Rendi i tuoi backup più affidabili',
      description:
        'Controlla frequenza, posizione e possibilità reale di recupero dei file.',
      guidePath: '/guide/backup',
      impact: 74,
      eta: '10-15 min',
    },
  },

  deviceProtection: {
    3: {
      title: 'Metti in ordine la protezione del dispositivo',
      description:
        'Aggiorna sistema, blocco schermo, protezioni di base e impostazioni essenziali.',
      guidePath: null,
      impact: 84,
      eta: '10-15 min',
    },
    2: {
      title: 'Rafforza la sicurezza del tuo dispositivo',
      description:
        'Verifica aggiornamenti, blocco automatico e protezione generale del device.',
      guidePath: null,
      impact: 64,
      eta: '10 min',
    },
  },
};