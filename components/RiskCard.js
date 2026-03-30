export default function RiskCard({ risk }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <h3 className="text-base font-semibold">{risk.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        {risk.explanation}
      </p>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-900">
        Impatto reale: {risk.impact}
      </p>
    </div>
  );
}