import { createAction, handleActions } from 'redux-actions'

import { CURSOR_CLICK, CURSOR_DRAG, CURSOR_DOWN, CURSOR_UP, KEY_PRESS } from './notebook'
import { SET_TOOL } from './tool'

export const defaultState = {
  selection: [0, 0, 0, 0],
  tool: null,
  paths: [],
  symbols: [],
  clipPaths: [],
  masks: [],
  cursor: { x: 0, y: 0 }
};

export const SELECT = 'SELECT'

export const selectPath = createAction(SELECT, pathIndex => pathIndex)

export const actions = {
  selectPath
}

export default handleActions({
  // currently, deselecting when changing tool
  [SET_TOOL]: (state, { payload }) => Object.assign({}, state, {
    tool: payload,
    paths: state.paths.map(p => Object.assign({}, p, { selected: false }))
  }),
  [CURSOR_CLICK]: (state, action) =>
    state.tool.tool &&
      state.tool.tool[CURSOR_CLICK] &&
      state.tool.tool[CURSOR_CLICK](state, action) || state,
  [SELECT]: (state, action) =>
    state.tool.tool &&
      state.tool.tool[SELECT] &&
      state.tool.tool[SELECT](state, action) || state,
  [CURSOR_DOWN]: (state, action)  =>
    state.tool.tool &&
      state.tool.tool[CURSOR_DOWN] &&
      state.tool.tool[CURSOR_DOWN](state, action) || state,
  [CURSOR_DRAG]: (state, action) =>
    state.tool.tool &&
      state.tool.tool[CURSOR_DRAG] &&
      state.tool.tool[CURSOR_DRAG](state, action) || state,
  [CURSOR_UP]: (state, action) =>
    state.tool.tool &&
      state.tool.tool[CURSOR_UP] &&
      state.tool.tool[CURSOR_UP](state, action) || state
}, defaultState)
