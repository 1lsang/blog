export const meta = {
  id: '2',
  title: 'personal-blog',
  description:
    '이 블로그 자체. Astro + React Islands로 구축한 개인 블로그 & 포트폴리오 통합 사이트.',
  tech: ['Astro', 'React', 'TypeScript', 'Tailwind CSS'] as const,
  thumbnail: '/works/blog.png',
  github: 'https://github.com/username/blog-ui',
  url: 'https://1lsang.dev' as string | null,
  year: 2026,
  featured: true,
} as const

export type WorkMeta = typeof meta
