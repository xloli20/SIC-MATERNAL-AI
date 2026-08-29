import React from 'react'

export default function PredictionCard({ prediction }) {
  return <div>{prediction || 'No prediction yet'}</div>
}
