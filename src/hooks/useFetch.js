import { useEffect, useState } from 'react'
import { api } from '@/services/api'

export function useFetch(path) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()
    api
      .get(path)
      .then((data) => !controller.signal.aborted && setState({ data, loading: false, error: null }))
      .catch((error) => !controller.signal.aborted && setState({ data: null, loading: false, error }))
    return () => controller.abort()
  }, [path])

  return state
}
