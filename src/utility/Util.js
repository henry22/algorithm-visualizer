export function generateRandomArray(length) {
  const randomItems = new Set()

  while (randomItems.size < length) {
    const randomNumber = Math.floor(Math.random() * 101)
    randomItems.add(randomNumber)
  }

  return Array.from(randomItems)
}

export const springAnimation = {
  type: "spring",
  damping: 100,
  stiffness: 1000
}