import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-svh w-fit content-center gap-4 px-gutter">
      <h1 className="font-primary text-h2">الصفحة غير موجودة</h1>
      <Link className="text-accent underline" href="/">العودة إلى الصفحة الرئيسية</Link>
    </main>
  )
}
