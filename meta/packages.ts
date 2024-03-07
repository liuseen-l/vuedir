export type MetaConfig = {
  name: string
  build?: boolean
  external?: string[]
}[]

export const packages: MetaConfig = [
  {
    name: 'shared',
    build: true,
  },
  {
    name: 'core',
    build: true,
    external: [
      '@vuedir/shared',
    ],
  },
]
