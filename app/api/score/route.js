import { buildResult } from "../../../lib/scoring";

export async function GET() {
  return Response.json({
    ok: true,
    message: "Route /api/score attiva",
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { answers = {} } = body;

    const result = buildResult(answers);

    return Response.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    console.error("Errore API /api/score:", error);

    return Response.json(
      {
        ok: false,
        message: "Errore durante il calcolo del punteggio.",
        error: String(error),
      },
      { status: 500 }
    );
  }
}