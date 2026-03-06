import { ui, defaultLang, type Language, type TranslationKey } from './translations'

export function getLangFromUrl(url: URL): Language {
  const [, maybeLang] = url.pathname.split('/')
  if (maybeLang in ui) return maybeLang as Language
  return defaultLang
}

export function useTranslations(lang: Language) {
  return function t(key: TranslationKey, params?: Record<string, string | number>): string {
    const dict = ui[lang] as Record<string, string>
    const fallback = ui[defaultLang] as Record<string, string>
    let value = dict[key] ?? fallback[key] ?? key
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = value.replace(`{${k}}`, String(v))
      }
    }
    return value
  }
}

export function getLocalePath(path: string, lang: Language): string {
  if (lang === defaultLang) return path
  return `/${lang}${path}`
}

export function getAlternatePath(url: URL, targetLang: Language): string {
  const currentLang = getLangFromUrl(url)
  if (currentLang === defaultLang) {
    return `/${targetLang}${url.pathname}`
  }
  const withoutLang = url.pathname.replace(`/${currentLang}`, '') || '/'
  if (targetLang === defaultLang) return withoutLang
  return `/${targetLang}${withoutLang}`
}
