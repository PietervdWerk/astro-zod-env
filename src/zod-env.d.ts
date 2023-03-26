type Environment = import('./src/env/schema')

interface ImportMetaEnv extends Environment {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
