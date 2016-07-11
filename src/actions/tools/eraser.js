import React from 'react'
import { createAction, handleActions } from 'redux-actions'
import { CURSOR_DRAG, CURSOR_DOWN, CURSOR_UP } from '../notebook'

import SVGSymbol from '../../components/SVG/Symbol'
import Path from '../../components/SVG/Path'
import Mask from '../../components/SVG/Mask'

/**
 *  TODO - Create a mask for EVERY path. Due to translations, masks must be
 *  of the same origin as the original path
 *
 */
export default {
  [CURSOR_DOWN]: (state, { payload }) => {
    let symbolId = state.symbols.length && state.symbols.slice(-1)[0].id
    let maskId = `mask-${state.masks.length}`
    let symbols = state.symbols
    let masks = state.masks

    // Only need to create new symbol/mask if there's a path that hasn't been
    // assigned one
    if(state.paths.filter(p => !p.mask).length) {
      symbolId = `erase-${state.symbols.length}`

      symbols = symbols.concat({
        id: symbolId,
        contents: [{
          color: 'black',
          type:'path',
          points: [[ payload.x, payload.y ]],
          size: state.tool.size
        }]
      })

      masks = masks.concat({
        id: maskId,
        size: state.tool.size,
        contents: [],
      }).map(m => Object.assign({}, m, {
        contents: m.contents.concat({ type: 'use', xlinkHref: '#' + symbolId })
      }))
    }
    else {
      let lastSymbol = symbols.pop()

      symbols.push(Object.assign({}, lastSymbol, {
        contents: lastSymbol.contents.concat({
          color: 'black',
          type: 'path',
          size: state.tool.size,
          points: [[ payload.x, payload.y ]]
        })
      }))
    }

    return Object.assign({}, state, {
      symbols: symbols,
      masks: masks,
      paths: state.paths.map(path => path.mask && path || Object.assign({}, path, { mask: `url(#${maskId})` }))
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
