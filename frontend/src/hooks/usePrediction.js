import { useState } from 'react'

export default function usePrediction() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  return { loading, result, setLoading, setResult }
}
