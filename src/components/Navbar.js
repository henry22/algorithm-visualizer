import React from 'react'
import './Navbar.css'

export default function Navbar(props) {
  const {resetArray, mergeSort} = props
  return (
    <div className="navbar">
      <button onClick={resetArray}>Generate New</button>
      <button onClick={mergeSort}>Merge Sort</button>
    </div>
  )
}