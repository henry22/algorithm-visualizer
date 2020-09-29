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
  fontSize: '32px',
  textAlign: 'center',
  alignItems: 'center',
  display: 'grid'
}

const Chart = (props) => {
  const { array, currentSwapper, currentBubbleSortTwo, currentSorted } = props
  let liHeight = Math.floor((window.innerHeight / 2) / 100);
  let liWidth = 32;

  return (
    <div style={{ display: 'inline-flex', justifyItems: 'center', alignItems: 'flex-end' }}>
      {array.length ? array.map((number, index) => {
        let backgroundColor;
        if (currentSwapper.includes(index)) {
          backgroundColor = "rgba(219, 57, 57, 0.8)"
        } else if (currentBubbleSortTwo.includes(index)) {
          backgroundColor = "rgba(78, 216, 96, 0.8)"
        } else if (currentSorted.includes(index)) {
          backgroundColor = "rgba(169, 92, 232, 0.8)"
        } else {
          backgroundColor = "rgba(66, 134, 244, 0.8)"
        }

        return (
          <motion.div
            key={index}
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
      {/* {
        array.map((item, index) =>
          <motion.div
            key={index}
            animate={{ scale: [1, 1.2, 1] }}
            layoutTransition={springAnimation}
            style={{
              ...liStyle,
              background: "#2d8ae2",
              width: liWidth,
              height: liHeight * (item + 10),
            }}>
            <h6 style={{ margin: 0 }}>{item}</h6>
          </motion.div>
        )
      } */}
    </div>
  )
}

export default Chart;