import { ApiReferenceReact } from '@scalar/api-reference-react'
import '@scalar/api-reference-react/style.css'

export default function ApiExplorer() {
  return (
    <ApiReferenceReact
      configuration={{
        url: '/openapi.json',
        theme: 'kepler',
        darkMode: true,
        hideModels: false,
        hideDownloadButton: false,
      }}
    />
  )
}
