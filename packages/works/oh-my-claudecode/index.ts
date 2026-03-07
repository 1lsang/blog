export const meta = {
  id: '1',
  title: 'oh-my-claudecode',
  description:
    'Claude Code를 위한 멀티 에이전트 오케스트레이션 레이어. autopilot, ralph, ultrawork 등 다양한 실행 모드를 제공한다.',
  tech: ['TypeScript', 'Claude API', 'Shell'] as const,
  thumbnail: '/works/omc.png',
  github: 'https://github.com/username/oh-my-claudecode',
  url: null as string | null,
  year: 2025,
  featured: true,
} as const

export type WorkMeta = typeof meta
