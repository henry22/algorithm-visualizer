import React from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import sortingInfo from './Sorting.json'

const SortInfo = (props) => {
  const { isEnding, handleClose, algorithm } = props
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
                  <td>{algorithm && sortingInfo[algorithm].title}</td>
                  <td>Performance</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ wordWrap: 'break-word', width: '500px' }}>
                    {algorithm && sortingInfo[algorithm].description}
                  </td>
                  <td>
                    Space Complexity: <code>{algorithm && sortingInfo[algorithm].spaceComplexity}</code><br />
                    Time Complexity: <code>{algorithm && sortingInfo[algorithm].timeComplexity}</code>
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