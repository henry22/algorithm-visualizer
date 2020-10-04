import { createAction, handleActions } from 'redux-actions'

const initialState = []

export const SET_CURRENT_SELECTION_SORT = 'SET_CURRENT_SELECTION_SORT'
export const setCurrentSelectionSort = createAction(SET_CURRENT_SELECTION_SORT)

export const currentSelectionSort = handleActions({
  SET_CURRENT_SELECTION_SORT: (state, { payload }) => {
    return payload
  }
}, initialState)