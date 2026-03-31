"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-3xl font-bold">SafeCheck</h1>

        <p className="mb-6 text-slate-600">
          Scopri in 2 minuti quanto sei esposto ai rischi cyber.
        </p>

        <Link
          href="/check"
          onClick={() => {
            console.log("START_TEST");
          }}
          className="block rounded-2xl bg-slate-900 px-6 py-4 font-semibold text-white"
        >
          Inizia il controllo
        </Link>
      </div>
    </main>
  );
}