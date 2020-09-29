import { createAction, handleActions } from 'redux-actions'

const initialState = []

export const SET_CURRENT_BUBBLE_TWO = 'SET_CURRENT_BUBBLE_TWO'
export const setCurrentBubbleTwo = createAction(SET_CURRENT_BUBBLE_TWO)

export const currentBubbleSortTwo = handleActions({
  SET_CURRENT_BUBBLE_TWO: (state, { payload }) => {
    return payload
  }
}, initialState)