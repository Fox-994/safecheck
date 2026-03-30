export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
        <span>
          {current} di {total}
        </span>
        <span>{percent}%</span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-slate-900 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}