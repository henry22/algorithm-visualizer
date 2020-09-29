import { createAction, handleActions } from 'redux-actions'

const initialState = []

export const SET_CURRENT_SWAPPER = 'SET_CURRENT_SWAPPER'
export const setCurrentSwapper = createAction(SET_CURRENT_SWAPPER)

export const currentSwapper = handleActions({
  SET_CURRENT_SWAPPER: (state, { payload }) => {
    return payload.length ? state.concat(payload) : []
  }
}, initialState)