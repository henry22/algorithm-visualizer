import {uid} from 'react-uid'

export function generateRandomArray(length) {
  let randomItems = []

  for(let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 101)

    if (randomItems.indexOf(randomNumber) === -1) {
      randomItems.push({ id: uid(Math.random()), itemValue: randomNumber, color: '#2d8ae2' })
    }
  }
  return randomItems
}

export const springAnimation = {
  type: "spring",
  damping: 20,
  stiffness: 300
}