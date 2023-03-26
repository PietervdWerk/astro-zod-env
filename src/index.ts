import type { AstroIntegration } from 'astro'
import { type ZodSchema } from 'zod'
import { ConfigEnv, loadEnv } from 'vite'

export default function createIntegration(schema: ZodSchema): AstroIntegration {
  let configMode: ConfigEnv['mode'] = ''

  return {
    name: 'astro-zod-env',
    hooks: {
      'astro:config:setup': ({ config }) => {
        configMode = config.vite.mode || ''
      },
      'astro:server:setup': () => {
        const env = loadEnv(configMode, process.cwd(), '')
        const parsed = schema.safeParse(env)

        // Parse the environment with the provided schema
        // Credits to https://github.com/t3-oss/create-t3-app/blob/bc3f328d697f3a2ae6a89b706ceeb5cf517e47d3/cli/template/base/src/env.mjs#L50
        if (parsed.success === false) {
          console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
          throw new Error('Invalid environment variables')
        }
      },
    },
  }
}
