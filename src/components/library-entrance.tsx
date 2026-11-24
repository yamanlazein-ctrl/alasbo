import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function LibraryEntrance() {
  return (
    <section className="library-entrance" aria-labelledby="library-title">
      <div className="library-entrance__inner mx-auto w-full max-w-page px-gutter" data-library-entrance="">
        <h2 className="cinematic-title" id="library-title">المكتبة الرقمية</h2>
        <Link className="cinematic-link cinematic-link--library" href="/library" prefetch={false}>
          تصفّح المكتبة <ArrowLeft size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
