import { createAction, handleActions } from 'redux-actions'

const initialState = false

export const SET_ENDING = 'SET_ENDING'
export const setEnding = createAction(SET_ENDING)

export const isEnding = handleActions({
  SET_ENDING: (state, { payload }) => {
    return payload
  }
}, initialState)