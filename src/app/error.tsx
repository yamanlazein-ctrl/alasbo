'use client'

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto grid min-h-svh w-fit content-center gap-4 px-gutter">
      <h1 className="font-primary text-h2">تعذّر تحميل الصفحة</h1>
      <button className="button button--primary justify-self-start" type="button" onClick={reset}>
        حاول مرة أخرى
      </button>
    </main>
  )
}
