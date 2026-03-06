export const languages = {
  en: 'English',
  ko: '한국어',
} as const

export type Language = keyof typeof languages

export const defaultLang: Language = 'en'

export const ui = {
  en: {
    // Navigation
    'nav.gallery': 'Gallery',
    'nav.essay': 'Essay',
    'nav.inspirations': 'Inspirations',
    'nav.tech': 'Tech ↗',
    // Hero
    'hero.name': '1lsang',
    'hero.tagline': 'Frontend developer and writer.',
    'hero.desc': 'I document everyday life in words and images,\nand build interfaces with code.',
    // Sections
    'section.recentEssays': 'Recent Essays',
    'section.gallery': 'Gallery',
    'section.techBlog': 'Tech Blog',
    'section.viewAll': 'View all →',
    'section.techBlogDesc': 'Development articles, projects, and resume on a separate site.',
    'section.visitTech': 'Visit ↗',
    // Essay page
    'essay.title': 'Essay',
    'essay.count': '{n} essays',
    // Gallery page
    'gallery.title': 'Gallery',
    'gallery.desc': 'Everyday photographs.',
    'gallery.count': '{n} photos',
    // Inspirations page
    'inspirations.title': 'Inspirations',
    'inspirations.desc': 'Things that catch my eye.',
    'inspirations.subtitle': 'Brands, products, and links archive.',
  },
  ko: {
    // Navigation
    'nav.gallery': 'Gallery',
    'nav.essay': 'Essay',
    'nav.inspirations': 'Inspirations',
    'nav.tech': 'Tech ↗',
    // Hero
    'hero.name': '1lsang',
    'hero.tagline': '프론트엔드 개발자이자 기록하는 사람.',
    'hero.desc': '일상과 생각을 글과 이미지로 남기고,\n코드로는 인터페이스를 만듭니다.',
    // Sections
    'section.recentEssays': '최근 에세이',
    'section.gallery': '갤러리',
    'section.techBlog': '기술 블로그',
    'section.viewAll': '전체 보기 →',
    'section.techBlogDesc': '개발 관련 글, 프로젝트, 이력서는 별도 사이트에서 확인할 수 있습니다.',
    'section.visitTech': '방문하기 ↗',
    // Essay page
    'essay.title': 'Essay',
    'essay.count': '총 {n}편의 에세이',
    // Gallery page
    'gallery.title': '갤러리',
    'gallery.desc': '일상의 기록.',
    'gallery.count': '{n}장의 사진',
    // Inspirations page
    'inspirations.title': '영감',
    'inspirations.desc': '눈길을 사로잡는 것들.',
    'inspirations.subtitle': '브랜드, 제품, 링크 아카이브.',
  },
} as const

export type TranslationKey = keyof typeof ui[typeof defaultLang]
