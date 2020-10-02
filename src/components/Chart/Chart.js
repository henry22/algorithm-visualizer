import React from 'react';
import { motion } from "framer-motion";
import { springAnimation } from '../../utility/Util';

const liStyle = {
  marginTop: 8,
  marginBottom: 8,
  marginLeft: 4,
  marginRight: 4,
  borderRadius: 5,
  listStyle: 'none',
  color: 'white',
  fontSize: '26px',
  textAlign: 'center',
  alignItems: 'center',
  display: 'grid'
}

const Chart = (props) => {
  const { array, currentSwapper, currentBubbleSortTwo, currentMergeSort, currentSorted, currentQuickSort, pivot } = props
  let liHeight = Math.floor((window.innerHeight / 2) / 100);
  let liWidth = 32;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100%', overflow: 'hidden', position: 'absolute', bottom: '0', right: '0', left: '0' }}>
      {array.length ? array.map((number, index) => {
        let backgroundColor;
        if (currentSwapper.includes(index)) {
          backgroundColor = "#DB3939"
        } else if (currentBubbleSortTwo.includes(index) || currentMergeSort.includes(index) || currentQuickSort.includes(index)) {
          backgroundColor = "#4ED860"
        } else if (pivot === index) {
          backgroundColor = '#EDEA3B'
        } else if (currentSorted.includes(index)) {
          backgroundColor = "#A95CE8"
        } else {
          backgroundColor = "#4286F4"
        }

        return (
          <motion.div
            key={index}
            animate={{ scale: [1, 1.1, 1] }}
            layoutTransition={springAnimation}
            style={{
              ...liStyle,
              background: backgroundColor,
              width: liWidth,
              height: liHeight * (number + 10),
            }}>
            <h6 style={{ margin: 0 }}>{number}</h6>
          </motion.div>
        )
      }) : null}
    </div>
  )
}

export default Chart;