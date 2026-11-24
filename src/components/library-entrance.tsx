import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function LibraryEntrance() {
  return (
    <section className="library-entrance" aria-labelledby="library-title">
      <div className="library-entrance__inner">
        <h2 className="library-entrance__title" id="library-title">المكتبة الرقمية</h2>
        <Link className="cinematic-link" href="/library" prefetch={false}>
          تصفّح المكتبة <ArrowLeft size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
