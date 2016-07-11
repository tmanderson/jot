import { createAction, handleActions } from 'redux-actions'

import { CURSOR_DRAG } from './notebook'
import pencil from '../tools/pencil'
import eraser from '../tools/eraser'

export const defaultState = {
  active: null,
  tools: [pencil, eraser]
};

export const SET_TOOL = 'SET_TOOL'

export const PENCIL_DRAW = 'PENCIL_DRAW'
export const ERASER_ERASE = 'ERASER_ERASE'
export const SYMBOL_STAMP = 'SYMBOL_STAMP'

export const setTool = createAction(SET_TOOL, (tool) => tool)

export const actions = {
  setTool
}

export default handleActions({
  [SET_TOOL]: (state, { payload }) => Object.assign({}, state, { active: payload.name })
}, defaultState)