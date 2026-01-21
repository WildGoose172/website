'use client'
import { useEffect, useState } from 'react'

export function useContainerPadding() {
  const [containerPadding, setContainerPadding] = useState(0)

  useEffect(() => {
    function calculatePadding() {
      const width = window.innerWidth

      let padding
      if (width >= 1536) {
        // 2xl
        padding = 56
      } else if (width >= 1280) {
        // xl
        padding = 48
      } else if (width >= 1024) {
        // lg
        padding = 40
      } else if (width >= 640) {
        // sm
        padding = 32
      } else {
        // default
        padding = 16
      }

      const maxWidth = 1800
      const containerWidth = Math.min(width, maxWidth)

      const edgePadding = (width - containerWidth) / 2 + padding

      setContainerPadding(edgePadding)
    }

    calculatePadding()
    window.addEventListener('resize', calculatePadding)

    return () => window.removeEventListener('resize', calculatePadding)
  }, [])

  return containerPadding
}
