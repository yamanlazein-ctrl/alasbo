'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

interface SpeechResult {
  readonly isFinal: boolean
  readonly 0: { readonly transcript: string }
}

interface Recognition {
  lang: string
  interimResults: boolean
  onstart: (() => void) | null
  onresult: ((event: { results: ArrayLike<SpeechResult> }) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
  abort(): void
}

type VoiceState = 'idle' | 'starting' | 'listening' | 'stopping'

const noSpeech = 'لم يُلتقط كلام واضح. جرّب مجدداً أو اكتب عبارة البحث.'
const permissionDenied = 'لم يُسمح باستخدام الميكروفون. يمكنك الكتابة أو تعديل إذن الميكروفون في المتصفح.'
const unavailable = 'تعذّر بدء البحث الصوتي. يمكنك كتابة عبارة البحث.'

export function useVoiceSearch(inputRef: RefObject<HTMLInputElement | null>, clearError: () => void) {
  const active = useRef<Recognition | null>(null)
  const [state, setState] = useState<VoiceState>('idle')
  const [status, setStatus] = useState('')

  useEffect(() => () => {
    const recognition = active.current
    active.current = null
    recognition?.abort()
  }, [])

  function cancel() {
    const recognition = active.current
    if (!recognition) return
    active.current = null
    recognition.abort()
    setState('idle')
    setStatus('')
  }

  async function toggle() {
    if (state === 'stopping') return
    if (active.current) {
      if (state === 'starting') {
        cancel()
      } else {
        setState('stopping')
        setStatus('جارٍ إنهاء الاستماع…')
        active.current.stop()
      }
      return
    }

    const api = window as Window & {
      SpeechRecognition?: new () => Recognition
      webkitSpeechRecognition?: new () => Recognition
    }
    const SpeechRecognition = api.SpeechRecognition ?? api.webkitSpeechRecognition
    if (!SpeechRecognition || !window.isSecureContext) {
      setStatus('البحث الصوتي غير متاح في هذا المتصفح. يمكنك كتابة عبارة البحث.')
      return
    }

    const input = inputRef.current
    if (!input) return
    const recognition = new SpeechRecognition()
    const originalText = input.value
    let finalText = ''
    active.current = recognition
    recognition.lang = 'ar-SY'
    recognition.interimResults = true
    setState('starting')
    setStatus('جارٍ تهيئة الميكروفون…')

    function finish(message: string) {
      if (active.current !== recognition) return
      active.current = null
      if (input) input.value = finalText || originalText
      setState('idle')
      setStatus(message)
    }

    recognition.onstart = () => {
      if (active.current !== recognition) return
      setState('listening')
      setStatus('جارٍ الاستماع…')
    }
    recognition.onresult = ({ results }) => {
      if (active.current !== recognition) return
      const fragments = Array.from(results)
      finalText = fragments.filter(({ isFinal }) => isFinal).map((result) => result[0].transcript.trim()).join(' ').trim()
      input.value = fragments.map((result) => result[0].transcript.trim()).join(' ').trim()
      if (input.value) clearError()
    }
    recognition.onerror = ({ error }) => {
      if (error === 'not-allowed' || error === 'service-not-allowed') finish(permissionDenied)
      else if (error === 'no-speech') finish(noSpeech)
      else if (error === 'audio-capture') finish('تعذّر الوصول إلى الميكروفون. تحقّق من اتصاله أو اكتب عبارة البحث.')
      else if (error === 'language-not-supported') finish('خدمة التعرّف في متصفحك لا تدعم العربية. يمكنك الكتابة.')
      else finish(unavailable)
    }
    recognition.onend = () => finish(finalText ? 'يمكنك مراجعة النص وتعديله قبل البحث.' : noSpeech)

    const permission = await navigator.permissions?.query({ name: 'microphone' }).catch(() => undefined)
    if (active.current !== recognition) return
    if (permission?.state === 'denied') {
      finish(permissionDenied)
      return
    }

    try {
      recognition.start()
    } catch {
      finish(unavailable)
    }
  }

  return { state, status, toggle, cancel, isActive: () => active.current !== null }
}
