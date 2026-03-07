import { useState, useEffect, useCallback } from 'react'

interface LightboxImage {
  src: string
  alt: string
  caption?: string
}

interface LightboxProps {
  images: LightboxImage[]
}

export default function Lightbox({ images }: LightboxProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const close = useCallback(() => setOpen(false), [])

  const prev = useCallback(() => {
    setIndex(i => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setIndex(i => (i + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    const handler = (e: CustomEvent<{ index: number }>) => {
      setIndex(e.detail.index)
      setOpen(true)
    }
    window.addEventListener('lightbox:open', handler as EventListener)
    return () => window.removeEventListener('lightbox:open', handler as EventListener)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, prev, next])

  if (!open) return null

  const current = images[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="사진 뷰어"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.92)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
    >
      {/* Close */}
      <button
        onClick={close}
        aria-label="닫기"
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          padding: '0.5rem',
          lineHeight: 1,
          opacity: 0.8,
        }}
      >
        ✕
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={prev}
          aria-label="이전 사진"
          style={{
            position: 'absolute',
            left: '1rem',
            background: 'none',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
            opacity: 0.8,
          }}
        >
          ←
        </button>
      )}

      {/* Image */}
      <div style={{ maxWidth: '90vw', maxHeight: '90vh', textAlign: 'center' }}>
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          style={{
            maxWidth: '90vw',
            maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: '0.5rem',
          }}
        />
        {current.caption && (
          <p style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: '0.875rem',
            marginTop: '0.75rem',
          }}>
            {current.caption}
          </p>
        )}
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.75rem',
          marginTop: '0.5rem',
        }}>
          {index + 1} / {images.length}
        </p>
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={next}
          aria-label="다음 사진"
          style={{
            position: 'absolute',
            right: '1rem',
            background: 'none',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
            opacity: 0.8,
          }}
        >
          →
        </button>
      )}
    </div>
  )
}
