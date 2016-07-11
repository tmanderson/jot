import React, { PropTypes, Component } from 'react'

import Mask from '../components/Mask/Mask'
import Path from '../components/Path/Path'

import { CURSOR_DOWN, CURSOR_DRAG, CURSOR_UP } from '../actions/notebook'
/**
 * TODO:
 *   Make a single mask def.
 *
 *  Whenever the eraser `mouseover` on a path/symbol, add the mask to the element
 */
class Eraser {
  _drawing = null;
  name = 'Eraser';
  color = '#333';
  size = 2;

  get handlers() {
    const self = this
    let _path;

    return {
      [CURSOR_DOWN]: ({ masks, paths, cursor }) => {
        const { x, y } = cursor
        const id = `mask-${Math.floor(Math.random() * Date.now())}`
        let newMasks = masks
        // We only create new masks if there is a path that exists without a mask
        if(paths.filter(p => !p.props.mask).length) {
          newMasks = newMasks.concat(<Mask id={id} size={this.size} />)
        }

        return {
          paths: paths.map(p => React.cloneElement(p, { mask: p.props.mask || id })),
          masks: newMasks.map(m => React.cloneElement(m, {
            paths: m.props.paths.concat(<Path size={this.size} points={[[x,y]]} color="black" />)
          }))
        }
      },
      [CURSOR_DRAG]: ({ masks, cursor }) => {
        const { x, y } = cursor

        return {
          masks: masks.map(m => {
            const lastIndex = m.props.paths.length-1
            const lastPath = m.props.paths[lastIndex]

            return React.cloneElement(m, {
              paths: m.props.paths.slice(0, lastIndex)
                .concat(React.cloneElement(lastPath, {
                    points: lastPath.props.points.concat([[x,y]])
                  })
                )
            })
          })
        }
      },
      [CURSOR_UP]: ({ masks, cursor }) => {
        return {
          masks: masks.map(m => React.cloneElement(m, { paths: m.props.paths.filter(p => p.props.points.length > 2)}))
        }
      }
    }
  }
}

export default new Eraser()