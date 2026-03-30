export default function ScoreCard({ score, riskLevel, summary }) {
  const levelStyles = {
    Alto: "bg-red-50 text-red-700",
    Medio: "bg-amber-50 text-amber-700",
    Buono: "bg-emerald-50 text-emerald-700",
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-slate-500">
            Risultato finale
          </div>
          <h1 className="mt-1 text-4xl font-bold">{score}/100</h1>
        </div>

        <div
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            levelStyles[riskLevel] || "bg-slate-100 text-slate-700"
          }`}
        >
          {riskLevel}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-700">{summary}</p>
    </section>
  );
}