import { ApiReferenceReact } from '@scalar/api-reference-react'
import '@scalar/api-reference-react/style.css'

const openApiUrl =
  import.meta.env.PUBLIC_ATOMIC_OPENAPI_URL ??
  'https://kenforthewin.github.io/atomic/openapi.json'

export default function ApiExplorer() {
  return (
    <ApiReferenceReact
      configuration={{
        url: openApiUrl,
        theme: 'kepler',
        darkMode: true,
        hideModels: false,
        hideDownloadButton: false,
      }}
    />
  )
}
