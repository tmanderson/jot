import { CURSOR_DRAG, CURSOR_DOWN, CURSOR_UP } from '../notebook'

import SVGSymbol from '../../components/SVG/Symbol'
import Path from '../../components/SVG/Path'
import Mask from '../../components/SVG/Mask'

export const NAME = 'ERASER'
/**
 * Symbols don't need to be added at every new erase.
 * If all paths have a mask, we can re-use the last symbol (as no new drawing
 * layers have been added)
 */
export default {
  name: NAME,
  [CURSOR_DOWN]: (state, { payload }) => {
    let masks = []
    const symbolId = `erase-${state.symbols.length}`

    // Create a mask (and assign mask id to path) for any path that doesn't have one
    const paths = state.paths.map((props, i) => {
      if(props.mask) return props
      const maskId = `mask-${i}`

      masks.push({ id: maskId, contents: [] })
      return Object.assign({}, props, { mask: maskId })
    })

    return Object.assign({}, state, {
      symbols: state.symbols.concat({
        id: symbolId,
        contents: [{
          type: 'path',
          points: [[payload.x, payload.y]],
          color: 'black',
          size: state.tool.size
        }]
      }),

      masks: state.masks.concat(masks)
        .map(props => {
          const path = state.paths[props.id.split('-')[1]]

          props.contents.push({
            id: symbolId,
            type: 'use',
            // translation for mask's <use /> symbols (TODO: why reverse translation?)
            translate: [ -path.translate[0], -path.translate[1]]
          })

          return props
        }),
      paths: paths
    })
  },
  [CURSOR_DRAG]: (state, { payload }) => {
    const lastSymbol = state.symbols.pop()
    const lastPath = lastSymbol.contents.pop()

    return Object.assign({}, state, {
      symbols: state.symbols.concat(
        Object.assign({}, lastSymbol, {
          contents: lastSymbol.contents.concat(Object.assign({}, lastPath, {
            points: lastPath.points.concat([[ payload.x, payload.y ]])
        }))
      }))
    })
  },
  [CURSOR_UP]: (state, { payload }) => {
    const lastSymbol = state.symbols.pop()
    const lastPath = lastSymbol.contents.pop()

    return Object.assign({}, state, {
      symbols: state.symbols.concat(
        Object.assign({}, lastSymbol, {
          contents: lastSymbol.contents.concat(Object.assign({}, lastPath, {
            points: lastPath.points.concat([[ payload.x, payload.y ]])
        }))
      }))
    })
  }
}
