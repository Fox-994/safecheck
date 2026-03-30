export default function QuestionCard({
  question,
  selectedValue,
  onSelect,
}) {
  if (!question) return null;

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      {/* Categoria */}
      <div className="mb-2 text-sm font-medium text-blue-600">
        {question.category}
      </div>

      {/* DOMANDA (FIX QUI) */}
      <h2 className="text-xl font-semibold text-slate-900 leading-7">
        {question.question}
      </h2>

      {/* Descrizione */}
      <p className="mt-2 text-sm text-slate-500 leading-6">
        {question.description}
      </p>

      {/* Opzioni */}
      <div className="mt-5 space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedValue === option.value;

          return (
            <button
              key={index}
              onClick={() => onSelect(question.id, option.value)}
              className={`w-full rounded-2xl border px-4 py-4 text-left text-base transition ${
                isSelected
                  ? "border-blue-600 bg-blue-50 text-slate-900"
                  : "border-slate-300 bg-white text-slate-800"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}