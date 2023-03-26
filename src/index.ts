import type { AstroIntegration } from 'astro'
import { type ZodSchema, z } from 'zod'
import { loadEnv } from 'vite'

type Options = {
  schema: ZodSchema
}

export default function createIntegration(options: Options): AstroIntegration {
  return {
    name: 'astro-zod-env',
    hooks: {
      'astro:server:setup': () => {
        options.schema.parse(loadEnv('production', process.cwd(), ''))
      },
    },
  }
}

export type Environment = z.infer<Parameters<typeof createIntegration>[0]['schema']>