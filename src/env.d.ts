/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GITHUB_URL?: string;
  readonly PUBLIC_HUGGINGFACE_URL?: string;
  readonly PUBLIC_YOUTUBE_URL?: string;
  readonly PUBLIC_EMAIL?: string;
  readonly PUBLIC_NAHNO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
