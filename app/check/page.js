"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "../../lib/questions";
import { buildResult } from "../../lib/scoring";

function getOptionButtonClass(isSelected) {
  if (isSelected) {
    return "w-full rounded-2xl border px-4 py-4 text-left transition-all duration-200 bg-blue-700 border-blue-700 text-white shadow-sm";
  }

  return "w-full rounded-2xl border px-4 py-4 text-left transition-all duration-200 bg-white border-blue-100 text-slate-800 hover:border-blue-400 hover:bg-blue-50";
}

export default function CheckPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[step];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  const handleAnswer = (value) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    };

    setAnswers(updatedAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 140);
      return;
    }

    const resultData = buildResult(updatedAnswers);

    localStorage.setItem(
      "safecheck-answers",
      JSON.stringify(updatedAnswers)
    );

    localStorage.setItem(
      "safecheck_result",
      JSON.stringify(resultData)
    );

    setTimeout(() => {
      router.push("/result");
    }, 160);
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
        <div className="mb-6">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
            SafeCheck
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
            Controllo rapido
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Ti bastano pochi passaggi per capire dove sei più esposto e da dove conviene partire.
          </p>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>
                Domanda {step + 1} di {questions.length}
              </span>
              <span>{progress}%</span>
            </div>

            <div className="h-2.5 w-full overflow-hidden rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <section className="rounded-3xl border border-blue-100 bg-white/95 p-5 shadow-[0_10px_35px_rgba(30,64,175,0.10)] backdrop-blur">
          <div className="mb-5">
            <p className="text-sm font-medium text-blue-700">
              {currentQuestion.category}
            </p>

            <h2 className="mt-2 text-xl font-semibold leading-8 text-slate-900">
              {currentQuestion.question}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {currentQuestion.description}
            </p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === option.value;

              return (
                <button
                  key={`${currentQuestion.id}-${index}`}
                  type="button"
                  onClick={() => handleAnswer(option.value)}
                  className={getOptionButtonClass(isSelected)}
                >
                  <span className="block text-base font-medium">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Indietro
            </button>

            <span className="text-xs text-slate-400">Risposta singola</span>
          </div>
        </section>
      </div>
    </main>
  );
}