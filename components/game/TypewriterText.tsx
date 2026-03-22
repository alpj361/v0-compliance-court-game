'use client'

import { useEffect, useRef, useState } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number          // ms per character
  onComplete?: () => void
  skipToEnd?: boolean     // jump to full text immediately
}

export function TypewriterText({ text, speed = 28, onComplete, skipToEnd }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Reset on text change
    indexRef.current = 0
    setDisplayed('')
    setDone(false)

    if (skipToEnd) {
      setDisplayed(text)
      setDone(true)
      onComplete?.()
      return
    }

    function tick() {
      if (indexRef.current >= text.length) {
        setDone(true)
        onComplete?.()
        return
      }
      indexRef.current++
      setDisplayed(text.slice(0, indexRef.current))
      timerRef.current = setTimeout(tick, speed)
    }

    timerRef.current = setTimeout(tick, speed)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, skipToEnd])

  return (
    <span>
      {displayed}
      {!done && (
        <span className="animate-cursor inline-block w-0.5 h-[1em] bg-court-gold ml-0.5 align-text-bottom" />
      )}
    </span>
  )
}
