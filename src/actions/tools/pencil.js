import React from 'react'
import { createAction, handleActions } from 'redux-actions'
import { CURSOR_DRAG, CURSOR_DOWN, CURSOR_UP } from '../notebook'

export const NAME = 'PENCIL'

export default {
  name: NAME,
  [CURSOR_DOWN]: (state, { payload }) => Object.assign({}, state, {
    paths: state.paths.concat({
      color: state.tool.color,
      size: state.tool.size,
      points: [ [ payload.x, payload.y ] ],
      translate: [0, 0]
    })
  }),
  [CURSOR_DRAG]: (state, { payload }) => {
    const last = state.paths.pop()

    return Object.assign({}, state, {
      paths: state.paths.concat(
        Object.assign({}, last, {
          points: last.points.concat([[ payload.x, payload.y ]])
        })
      )
    })
  },
  [CURSOR_UP]: (state, { payload }) => {
    const last = state.paths.pop()

    return Object.assign({}, state, {
      paths: state.paths.concat(
        Object.assign({}, last, {
          points: last.points.concat([[ payload.x, payload.y ]])
        })
      )
    })
  }
}
