import React from 'react'
import { createAction, handleActions } from 'redux-actions'

export default {
  'SELECT': (state, { payload: idx }) => Object.assign({}, state, {
    paths: state.paths.slice(0, idx)
      .concat(Object.assign({}, state.paths[idx], { selected: !state.paths[idx].selected }))
        .concat(state.paths.slice(idx+1))
  }),
  'CURSOR_DRAG': (state, { payload }) => Object.assign({}, state, {
    paths: state.paths.map(path => !path.selected && path || Object.assign({}, path, {
      translate: [ path.translate[0] += payload.dx, path.translate[1] += payload.dy ]
    }))
  })
}
