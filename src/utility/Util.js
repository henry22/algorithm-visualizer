import {uid} from 'react-uid'

export function generateRandomArray(length) {
  const set = new Set()
  const randomItems = []

  for(let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 101)

    if (!set.has(randomNumber)) {
      randomItems.push({ id: uid(Math.random()), itemValue: randomNumber, color: '#2d8ae2' })
      set.add(randomNumber)
    }
  }

  return randomItems
}

export const springAnimation = {
  type: "spring",
  damping: 20,
  stiffness: 300
}