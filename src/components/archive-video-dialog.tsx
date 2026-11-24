'use client'

import Image from 'next/image'
import { Dialog } from '@base-ui/react/dialog'
import { Play, X } from 'lucide-react'
import { useState } from 'react'

const videoId = 'VIDEO_ID'

export function ArchiveVideoDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="group inline-flex min-h-12 appearance-none items-center gap-3 border-0 bg-transparent p-0 text-sm text-parchment/80 transition-colors duration-[var(--duration-quick)] ease-heritage hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">
        <span className="grid size-9 place-items-center rounded-full border border-parchment/35 transition-colors group-hover:border-parchment/70 group-hover:text-parchment">
          <Play aria-hidden="true" className="ms-0.5 size-3.5 fill-current" />
        </span>
        شاهد المقطع الأرشيفي
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-ink/90 transition-opacity duration-[var(--duration-quick)] data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed start-1/2 top-1/2 flex w-[min(56rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 border border-parchment/15 bg-ink p-4 text-parchment shadow-2xl shadow-black/40 sm:p-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-col gap-1">
              <Dialog.Title className="font-primary text-2xl">من ذاكرة الدرس</Dialog.Title>
              <Dialog.Description className="text-sm leading-7 text-parchment/70">مقطع أرشيفي من دروس الشيخ محمد علي الصابوني.</Dialog.Description>
            </div>
            <Dialog.Close aria-label="إغلاق المقطع" className="grid size-11 shrink-0 place-items-center text-parchment/70 transition-colors hover:text-parchment focus-visible:outline-2 focus-visible:outline-focus-ring">
              <X aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </div>
          <div className="relative aspect-video overflow-hidden bg-surface">
            <Image src="/assets/images/sheikh-muhammad-ali-al-sabouni-cutout.png" alt="الشيخ محمد علي الصابوني" fill sizes="(max-width: 896px) 100vw, 896px" className="object-contain object-center opacity-45" />
            {open ? (
              <iframe
                className="absolute inset-0 size-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                title="المقطع الأرشيفي للشيخ محمد علي الصابوني"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : null}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
