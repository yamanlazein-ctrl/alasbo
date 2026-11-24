'use client'

import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Mic, Square } from 'lucide-react'
import { examples } from '../content/site'
import { useVoiceSearch } from './use-voice-search'

export function ScholarlySearch() {
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const voice = useVoiceSearch(inputRef, () => setError(''))
  const voiceActive = voice.state !== 'idle'

  useEffect(() => {
    if (location.hash === '#archive-query') inputRef.current?.focus({ preventScroll: true })
  }, [])

  function showEmptyQueryError() {
    setError('اكتب سؤالاً أو عبارة للبحث أولاً.')
    inputRef.current?.focus()
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    if (voice.isActive()) {
      event.preventDefault()
      return
    }
    const input = inputRef.current
    if (!input?.value.trim()) {
      event.preventDefault()
      showEmptyQueryError()
      return
    }

    setError('')
  }

  function submitExample(example: string) {
    const input = inputRef.current
    if (!input) return
    voice.cancel()
    input.value = example
    input.form?.requestSubmit()
  }

  return (
    <form
      className="scholarly-search"
      id="scholarly-search"
      action="/search"
      method="get"
      onSubmit={submitSearch}
      data-hero-motion="search"
      role="search"
    >
      <label className="label inline-block font-bold" htmlFor="archive-query">
        اسأل سؤالاً
      </label>
      <div className={`search-surface${error ? ' search-surface--error' : ''}`}>
        <input
          ref={inputRef}
          id="archive-query"
          name="q"
          type="search"
          onChange={() => {
            voice.cancel()
            setError('')
          }}
          onInvalid={(event) => {
            event.preventDefault()
            showEmptyQueryError()
          }}
          placeholder="ابحث في تراث الشيخ"
          aria-describedby={error ? 'search-error' : undefined}
          aria-invalid={Boolean(error)}
          autoComplete="off"
          required
        />
        <button
          className="microphone"
          type="button"
          data-voice-state={voice.state}
          aria-disabled={voice.state === 'stopping'}
          aria-label={voice.state === 'starting' ? 'إلغاء البحث الصوتي' : voiceActive ? 'إيقاف الاستماع' : 'البحث بالصوت'}
          aria-describedby="voice-privacy"
          onClick={() => void voice.toggle()}
        >
          {voice.state === 'listening' ? <Square aria-hidden="true" /> : <Mic aria-hidden="true" />}
        </button>
        <button className="button button--primary search-submit" type="submit" disabled={voiceActive}>
          ابحث
        </button>
      </div>
      <p className="voice-status" data-voice-state={voice.state} role="status">{voice.status}</p>
      <p className="search-error" id="search-error" role="alert" aria-live="polite">
        {error}
      </p>
      <div className="search-examples flex flex-wrap gap-x-4" role="group" aria-label="أسئلة مقترحة">
        {examples.map((example) => (
          <button
            className="search-example"
            key={example}
            type="button"
            onClick={() => submitExample(example)}
          >
            {example}
          </button>
        ))}
      </div>
      <p className="voice-privacy" id="voice-privacy">
        قد يعالج متصفحك الصوت عبر خدمة التعرّف على الكلام.
      </p>
    </form>
  )
}
