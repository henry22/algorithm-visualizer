import { createAction, handleActions } from 'redux-actions'

const initialState = []

export const SET_CURRENT_INSERTION_SORT = 'SET_CURRENT_INSERTION_SORT'
export const setCurrentInsertionSort = createAction(SET_CURRENT_INSERTION_SORT)

export const currentInsertionSort = handleActions({
  SET_CURRENT_INSERTION_SORT: (state, { payload }) => {
    return payload
  }
}, initialState)