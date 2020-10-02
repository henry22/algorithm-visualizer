import React from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const SortInfo = (props) => {
  const { isEnding, handleClose } = props
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={isEnding}
      onClose={handleClose}
      action={
        <React.Fragment>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>Sorting completed!</p>
            <table style={{ borderSpacing: '15px' }}>
              <thead>
                <tr>
                  <td>Bubble Sort</td>
                  <td>Performance</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ wordWrap: 'break-word', width: '500px' }}>
                    Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.
                      </td>
                  <td>
                    Space Complexity: <code>O(1)</code><br />
                    Time Complexity: <code>O(n^2)</code>
                  </td>
                </tr>
              </tbody>
            </table>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} style={{ alignSelf: 'flex-start' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </React.Fragment>
      }
    />
  )
}

export default SortInfo