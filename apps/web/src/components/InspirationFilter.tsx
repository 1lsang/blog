import { useState, useEffect } from 'react'

interface InspirationItem {
  id: string
  title: string
  url: string
  thumbnail?: string
  category: string
  tags?: string[]
  note?: string
}

interface InspirationFilterProps {
  items: InspirationItem[]
}

const CATEGORIES = [
  { value: 'all', label: '전체' },
  { value: 'brand', label: 'Brand' },
  { value: 'product', label: 'Product' },
  { value: 'link', label: 'Link' },
  { value: 'design', label: 'Design' },
]

export default function InspirationFilter({ items }: InspirationFilterProps) {
  const [active, setActive] = useState('all')

  // Sync with URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (CATEGORIES.some(c => c.value === hash)) {
      setActive(hash)
    }
  }, [])

  const filtered = active === 'all' ? items : items.filter(i => i.category === active)

  const handleCategoryChange = (value: string) => {
    setActive(value)
    window.history.replaceState(null, '', value === 'all' ? window.location.pathname : `#${value}`)
  }

  return (
    <div>
      {/* Category tabs */}
      <nav aria-label="카테고리 필터" style={{ marginBottom: '2rem' }}>
        <ul style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <li key={cat.value}>
              <button
                onClick={() => handleCategoryChange(cat.value)}
                aria-pressed={active === cat.value}
                style={{
                  padding: '0.375rem 0.875rem',
                  fontSize: '0.875rem',
                  border: '1px solid',
                  borderColor: active === cat.value ? 'var(--color-fg)' : 'var(--color-border)',
                  background: active === cat.value ? 'var(--color-fg)' : 'transparent',
                  color: active === cat.value ? 'var(--color-bg)' : 'var(--color-muted)',
                  borderRadius: '2rem',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  fontFamily: 'inherit',
                }}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '1rem',
      }}>
        {filtered.map(item => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.title}
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid var(--color-border)',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'border-color 150ms ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-accent)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border)' }}
          >
            {/* Thumbnail placeholder */}
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              background: 'var(--color-code-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              overflow: 'hidden',
            }}>
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ opacity: 0.3 }}>↗</span>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{item.title}</span>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-muted)',
                  background: 'var(--color-code-bg)',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '0.25rem',
                  whiteSpace: 'nowrap',
                }}>
                  {item.category}
                </span>
              </div>
              {item.note && (
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>
                  {item.note}
                </p>
              )}
              {item.tags && item.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.6875rem',
                      color: 'var(--color-muted)',
                      border: '1px solid var(--color-border)',
                      padding: '0.1rem 0.35rem',
                      borderRadius: '0.25rem',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ color: 'var(--color-muted)', textAlign: 'center', padding: '3rem 0', fontSize: '0.9rem' }}>
          해당 카테고리의 항목이 없습니다.
        </p>
      )}
    </div>
  )
}
