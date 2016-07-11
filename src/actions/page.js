import { createAction, handleActions } from 'redux-actions'
import { CURSOR_DRAG, CURSOR_DOWN, CURSOR_UP } from './notebook'
import { SET_TOOL } from './tool'

export const defaultState = {
  tool: null,
  paths: [],
  symbols: [],
  clipPaths: [],
  masks: [],
  cursor: { x: 0, y: 0 }
};

export const PATH_START = 'PATH_START'
export const PATH_UPDATE = 'PATH_UPDATE'
export const PATH_END = 'PATH_END'

export const SYMBOL_ADD = 'SYMBOL_ADD'

export const startPath = createAction(PATH_START, (p) => p)

export const actions = {
  startPath
}

const handleTool = (action) =>
  (state, { payload }) => {
    let { tool, paths, symbols, clipPaths, masks } = state
    let { x, y } = payload
    let cursor = { x, y }

    if(tool && tool.handlers[action]) {
      return Object.assign({}, state, { cursor },
        tool.handlers[action]({
          paths,
          symbols,
          clipPaths,
          masks,
          cursor: cursor
        })
      )
    }

    return Object.assign({}, state, {
      cursor: cursor,
      dragging: true
    })
  }

export default handleActions({
  [SET_TOOL]: (state, { payload }) => Object.assign({}, state, { tool: payload }),
  [CURSOR_DOWN]: handleTool(CURSOR_DOWN),
  [CURSOR_DRAG]: handleTool(CURSOR_DRAG),
  [CURSOR_UP]: handleTool(CURSOR_UP)
}, defaultState)