import React from 'react'

const useCleanupError = (init) => {
  const [clean, setClean] = React.useState(init)

  React.useEffect(() => {
    const timer = setTimeout(() => setClean(null), 3000)
    return () => clearTimeout(timer)
  }, [init, clean])

  return { clean, setClean }
}

export { useCleanupError }
