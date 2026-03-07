import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const essays = await getCollection('essay')
  const techPosts = await getCollection('tech')

  const allPosts = [
    ...essays
      .filter(e => !e.data.draft)
      .map(e => ({
        title: e.data.title,
        pubDate: e.data.date,
        description: e.data.description ?? '',
        link: `/essay/${e.id}/`,
      })),
    ...techPosts
      .filter(t => !t.data.draft)
      .map(t => ({
        title: t.data.title,
        pubDate: t.data.date,
        description: t.data.description ?? '',
        link: `/tech/${t.id}/`,
      })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())

  return rss({
    title: '1lsang',
    description: '개인의 일상과 기록, 그리고 프론트엔드 개발자로서의 생각들.',
    site: context.site!,
    items: allPosts,
    customData: '<language>ko</language>',
  })
}
