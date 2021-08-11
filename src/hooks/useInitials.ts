import { useMemo } from 'react'

export const useInitials = (name: string) => {
  return useMemo(() => {
    const words = name.split(' ')
    const cleanedWords = words.filter((w) => w.trim().length)

    if (cleanedWords.length === 0) {
      return '?'
    }

    if (cleanedWords.length === 1) {
      return cleanedWords[0].slice(0, 2).toUpperCase()
    }

    const [firstName, lastName] = cleanedWords

    return (
      firstName.slice(0, 1).toUpperCase() + lastName.slice(0, 1).toUpperCase()
    )
  }, [name])
}
