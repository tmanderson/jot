import React from 'react'
import { createAction, handleActions } from 'redux-actions'

export const NAME = 'SELECT'

export default {
  name: NAME,
  'SELECT': (state, { payload: idx }) => Object.assign({}, state, {
    paths: state.paths.slice(0, idx)
      .concat(Object.assign({}, state.paths[idx], { selected: !state.paths[idx].selected }))
        .concat(state.paths.slice(idx+1))
  }),
  'CURSOR_DOWN': (state, { payload }) => {
    const selected = !!state.paths.filter(props => props.selected).length
    // if no shapes are selected, assume the user is going to start a selection area
    return Object.assign({}, state, {
      selection: !selected && [payload.x, payload.y, 0, 0] || []
    })
  },
  'CURSOR_DRAG': (state, { payload }) => {
    // If no paths are selected OR certain keys are pressed
    // (Shift - Additive, Ctrl - Subtractive)
    const [ x , y ] = state.selection

    if(x && y) {
      const w = payload.x - state.selection[0]
      const h = payload.y - state.selection[1]
      const selection = [ state.selection[0], state.selection[1], w, h ]


      return Object.assign({}, state, {
        selection: selection,
        paths: state.paths.map(props => {
          let selected = false
          const [ox, oy] = props.translate
          props.points.forEach(([px, py]) => {
            if(selected) return
            px += ox
            py += oy
            selected = ((px > x && px < x + w) && (py > y && py < y + h)) || ((px < x && px > x + w) && (py < y && py > y + h))
          })
          return Object.assign({}, props, { selected: selected })
        })
      })
    }

    return Object.assign({}, state, {
      paths: state.paths.map(path => !path.selected && path || Object.assign({}, path, {
        translate: [ path.translate[0] += payload.dx, path.translate[1] += payload.dy ]
      }))
    })
  },
  'CURSOR_UP': (state, { payload }) => {
    const selected = !!state.paths.filter(props => props.selected).length

    if(!selected) {
      // find selected shapes
      const [ x, y, w, h ] = state.selection

      return Object.assign({}, state, {
        paths: state.paths.map(props => {
          let selected = false
          const [ox, oy] = props.translate
          props.points.forEach(([px, py]) => {
            if(selected) return
            px += ox
            py += oy
            selected = ((px > x && px < x + w) && (py > y && py < y + h)) || ((px < x && px > x + w) && (py < y && py > y + h))
          })
          return Object.assign({}, props, { selected: selected })
        })
      })
    }
  }
}
