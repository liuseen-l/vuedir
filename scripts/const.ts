import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const scriptDir = dirname(fileURLToPath(import.meta.url))

export const rootDir = resolve(scriptDir, '..')
