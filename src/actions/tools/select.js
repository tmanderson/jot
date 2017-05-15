import { CURSOR_CLICK, CURSOR_DRAG, CURSOR_DOWN, CURSOR_UP } from '../notebook'

export const NAME = 'SELECT'

export default {
  name: NAME,
  SELECT: (state, { payload: idx }) => Object.assign({}, state, {
    paths: state.paths.slice(0, idx)
      .concat(Object.assign({}, state.paths[idx], {
        selected: !state.paths[idx].selected
      }))
      .concat(state.paths.slice(idx+1))
  }),

  [CURSOR_CLICK]: (state, { payload: { x: cx, y: cy } }) => {
    const [ x, y, w, h ] = state.selection
    const selected = w && h;

    if(!selected || (cx < x || cx > x + w || cy < y || cy > y + h)) {
      return Object.assign({}, state, {
        selection: !selected && [cx, cy, 0, 0] || [],
        paths: state.paths.map(props => Object.assign(props, { selected: false })),
      })
    }

    return state;
  },

  [CURSOR_DOWN]: (state, { payload: { x: sx, y: sy } }) => {
    const selected = !!state.paths.filter(props => props.selected).length

    // if no shapes are selected, assume the user is going to start a selection area
    return Object.assign({}, state, {
      selection: !selected && [ sx, sy, 0, 0 ] || [],
    })
  },

  [CURSOR_DRAG]: (state, { payload: { x: cx, y: cy, dx, dy } }) => {
    // If no paths are selected OR certain keys are pressed
    // (Shift - Additive, Ctrl - Subtractive)
    let x = state.selection[0];
    let y = state.selection[1];

    if(x && y) {
      let w = cx - x;
      let h = cy - y;

      return Object.assign({}, state, {
        selection: [ x, y, w, h ],

        paths: state.paths.map(props => Object.assign({}, props, {
          selected: props.points.reduce((isSelected, [ px, py ]) => {
            px += props.translate.ox
            py += props.translate.oy
            // if any points are within the bounds of the selection, select this path!
            return isSelected ||
            // since we use a transform on the selection path to fake inverted
            // selections (ie x < 0 and/or y < 0), we need to check for bounds in
            // both negative and positive directions
              ((px > x && px < x + w) || (px < x && px > x + w)) &&
              ((py > y && py < y + h) || (py < y && py > y + h))
          }, false)
        }))
      })
    }

    return Object.assign({}, state, {
      paths: state.paths.map(path => {
        if(!path.selected && path) return path

        return Object.assign({}, path, {
          translate: [
            path.translate[0] += dx,
            path.translate[1] += dy
          ],
        })
      })
    })
  },

  [CURSOR_UP]: (state, { payload }) => {
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
            // since we use a transform on the selection path to fake inverted
            // selections (ie x < 0 and/or y < 0), we need to check for bounds in
            // both negative and positive directions
            selected = ((px > x && px < x + w) || (px < x && px > x + w)) &&
              ((py > y && py < y + h) || (py < y && py > y + h))
          })

          return Object.assign({}, props, { selected: selected })
        })
      })
    }
  }
}
