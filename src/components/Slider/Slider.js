import React from 'react'
import './Slider.css'

const Slider = (props) => {
  const { minItems, maxItems, styling, isRunning, handleChange, length } = props
  return (
    <input
      type="range"
      min={minItems}
      max={maxItems}
      step="1"
      style={{ background: styling.background, cursor: styling.cursor }}
      disabled={isRunning ? "disabled" : null}
      onChange={handleChange}
      value={length}
    />
  )
}

export default Slider