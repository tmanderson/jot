import { createAction, handleActions } from 'redux-actions'

import { CURSOR_DRAG } from './notebook'

import pencil from './tools/pencil'
import eraser from './tools/eraser'
import select from './tools/select'

export const defaultState = {
  active: pencil,
  tools: { pencil, eraser, select },
  color: 'black',
  size: 2
}

export const SET_TOOL = 'SET_TOOL'
export const SET_COLOR = 'SET_COLOR'
export const SET_SIZE = 'SET_SIZE'

export const setTool = createAction(SET_TOOL, (tool, { size, color }) => !console.log(tool) && ({ tool, size, color }))

export const actions = {
  setTool
}

export default handleActions({
  [SET_TOOL]: (state, { payload }) => Object.assign({}, state, { active: payload.tool, color: payload.color, size: payload.size })
}, defaultState)
