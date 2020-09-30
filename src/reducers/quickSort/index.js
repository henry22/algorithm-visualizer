import { createAction, handleActions } from 'redux-actions'

const initialStateOne = []
const initialStateTwo = null

export const SET_CURRENT_QUICK_SORT = 'SET_CURRENT_QUICK_SORT'
export const setCurrentQuickSort = createAction(SET_CURRENT_QUICK_SORT)
export const SET_PIVOT = 'SET_PIVOT'
export const setPivot = createAction(SET_PIVOT)

export const currentQuickSort = handleActions({
  SET_CURRENT_QUICK_SORT: (state, { payload }) => {
    return payload
  }
}, initialStateOne)

export const pivot = handleActions({
  SET_PIVOT: (state, { payload }) => {
    return payload
  }
}, initialStateTwo)