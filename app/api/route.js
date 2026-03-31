import { buildResult } from "../../lib/scoring";
export async function GET() {
  const demoAnswers = {
    passwords: 3,
    emailAccess: 3,
    backup: 1,
    links: 1,
    publicWifi: 0,
    phoneProtection: 1,
    updates: 1,
    incidentReadiness: 3,
    appAccess: 1,
  };

  const result = buildResult(demoAnswers);

  return Response.json({
    ok: true,
    message: "SafeCheck API attiva",
    result,
  });
}