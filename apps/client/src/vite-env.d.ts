/// <reference types="vite/client" />

declare const __BUILD_TIMESTAMP__: number;
declare const __VERSION__: string;

interface ImportMetaEnv {
  readonly COMMIT_REF: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
