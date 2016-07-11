import { createAction, handleActions } from 'redux-actions'

export const defaultState = {
  dragging: false,
  name: 'Notebook',
  cover: '#333',
  defaults: {
    background: 'white',
    tool: 'pen',
    color: '#333',
    size: 2
  },
  pages: []
};

export const CURSOR_DOWN = 'CURSOR_DOWN'
export const CURSOR_MOVE = 'CURSOR_MOVE'
export const CURSOR_UP = 'CURSOR_UP'
export const CURSOR_DRAG = 'CURSOR_DRAG'
export const CURSOR_CLICK = 'CURSOR_CLICK'

export const cursorDown = createAction(CURSOR_DOWN, (e) => ({ x: e.clientX, y: e.clientY }))
export const cursorMove = createAction(CURSOR_MOVE, (e) => ({ x: e.clientX, y: e.clientY }))
export const cursorUp = createAction(CURSOR_UP, (e) => ({ x: e.clientX, y: e.clientY }))
export const cursorDrag = createAction(CURSOR_DRAG, (e) => ({ x: e.clientX, y: e.clientY }))
export const cursorClick = createAction(CURSOR_CLICK, (e) => ({ x: e.clientX, y: e.clientY }))

export const actions = {
  cursorDown,
  cursorMove,
  cursorUp,
  cursorDrag
}

export default handleActions({
  [CURSOR_DOWN]: (state, { payload }) => Object.assign({}, state, { dragging: true }),
  [CURSOR_MOVE]: (state, { payload }) => Object.assign({}, state, { cursor: payload }),
  [CURSOR_UP]: (state, { payload }) => Object.assign({}, state, { dragging: false })
}, defaultState)