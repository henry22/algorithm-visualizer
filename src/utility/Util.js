// import { uid } from 'react-uid'

export function generateRandomArray(length) {
  const randomItems = new Set()

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 101)

    if (!randomItems.has(randomNumber)) {
      // randomItems.push({ id: uid(Math.random()), itemValue: randomNumber, color: '#2d8ae2' })
      randomItems.add(randomNumber)
    }
  }

  return Array.from(randomItems)
}

export const springAnimation = {
  type: "spring",
  damping: 50,
  stiffness: 300
}