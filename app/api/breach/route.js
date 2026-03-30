export async function GET() {
  return Response.json({
    ok: true,
    message: "Route /api/breach attiva",
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body?.email?.trim();

    if (!email) {
      return Response.json(
        {
          ok: false,
          message: "Inserisci un'email valida.",
        },
        { status: 400 }
      );
    }

    const testBreachedEmails = ["test@breachdemo.com", "demo@unsafe.it"];
    const isBreached = testBreachedEmails.includes(email.toLowerCase());

    if (isBreached) {
      return Response.json({
        ok: true,
        breached: true,
        breachesCount: 2,
        message:
          "Questa email compare in violazioni note. Ti conviene cambiare password e attivare la verifica in due passaggi.",
      });
    }

    return Response.json({
      ok: true,
      breached: false,
      breachesCount: 0,
      message:
        "Non risultano violazioni note per questa email nel controllo demo.",
    });
  } catch (error) {
    console.error("Errore API /api/breach:", error);

    return Response.json(
      {
        ok: false,
        message: "Errore durante il controllo email.",
        error: String(error),
      },
      { status: 500 }
    );
  }
}