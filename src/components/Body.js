import React from 'react';
import { motion } from "framer-motion";
import { springAnimation } from '../utility/Util';

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

const Body = ({ items }) => {
  let liHeight = Math.floor((window.innerHeight / 2) / 100);
  let liWidth = 32;

  return (
    <div style={{ display: 'inline-flex', justifyItems: 'center', alignItems: 'flex-end' }}>
      {
        items.map(item =>
          <motion.div
            key={item.id}
            animate={{ scale: [1, 1.2, 1] }}
            layoutTransition={springAnimation}
            style={{
              ...liStyle,
              background: item.IsBeingSwapped === true ? "#2bc5bf" : item.color,
              width: liWidth,
              height: liHeight * (item.itemValue + 10),
            }}>
            <h6 style={{ margin: 0 }}>{item.itemValue}</h6>
          </motion.div>
        )
      }
    </div>
  )
}

export default Body;