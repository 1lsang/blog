import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const essayCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/personal/essay' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
})

const techCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/tech' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
})

export const collections = {
  essay: essayCollection,
  tech: techCollection,
}
