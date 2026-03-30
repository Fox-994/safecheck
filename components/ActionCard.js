export default function ActionCard({ action, index }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="mb-2 text-sm font-semibold text-slate-500">
        Azione {index + 1}
      </div>
      <h3 className="text-base font-semibold">{action.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        {action.description}
      </p>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-6 text-slate-700">
        {action.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}