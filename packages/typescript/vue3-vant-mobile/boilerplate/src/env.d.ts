/// <reference types="vite/client" />
interface ImportMetaEnv {
  // app
  readonly VITE_APP_NAME: string
  readonly VITE_APP_SECRET_CODE: string
  // server
  readonly VITE_APP_SERVER_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
