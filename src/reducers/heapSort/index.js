import { createAction, handleActions } from 'redux-actions'

const initialState = []

export const SET_CURRENT_HEAP_SORT = 'SET_CURRENT_HEAP_SORT'
export const setCurrentHeapSort = createAction(SET_CURRENT_HEAP_SORT)

export const currentHeapSort = handleActions({
  SET_CURRENT_HEAP_SORT: (state, { payload }) => {
    return payload
  }
}, initialState)