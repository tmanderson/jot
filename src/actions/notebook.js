import { createAction, handleActions } from 'redux-actions'
import { ActionCreators } from 'redux-undo'

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
export const KEY_PRESS = 'KEY_PRESS'
export const UNDO = 'UNDO'

export const cursorDown = createAction(CURSOR_DOWN, (e) => ({ target: e.target, x: e.clientX, y: e.clientY }))
export const cursorMove = createAction(CURSOR_MOVE, (e) => ({ target: e.target, x: e.clientX, y: e.clientY }))
export const cursorUp = createAction(CURSOR_UP, (e) => ({ target: e.target, x: e.clientX, y: e.clientY }))
export const cursorDrag = createAction(CURSOR_DRAG, (e) => ({ target: e.target, x: e.clientX, y: e.clientY, dx: e.nativeEvent.movementX, dy: e.nativeEvent.movementY }))
export const cursorClick = createAction(CURSOR_CLICK, (e) => ({ target: e.target, x: e.clientX, y: e.clientY }))
export const keyPress = createAction(KEY_PRESS, e => ({ key: e.key, meta: e.metaKey, alt: e.altKey, ctrl: e.ctrlKey, shift: e.shiftKey }))

export const actions = {
  cursorDown,
  cursorMove,
  cursorUp,
  cursorDrag,
  cursorClick,
  keyPress,
  undo: ActionCreators.undo
}

export default handleActions({
  [CURSOR_DOWN]: (state, { payload }) => Object.assign({}, state, { dragging: true }),
  [CURSOR_MOVE]: (state, { payload }) => Object.assign({}, state, { cursor: payload }),
  [CURSOR_UP]: (state, { payload }) => Object.assign({}, state, { dragging: false }),
  [KEY_PRESS]: (state, { payload }) => Object.assign({}, state, { keys: payload })
}, defaultState)
