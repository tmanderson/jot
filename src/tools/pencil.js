import React, { PropTypes, Component } from 'react'

import Path from '../components/Path/Path'
import { CURSOR_DOWN, CURSOR_DRAG, CURSOR_UP } from '../actions/notebook'

class Pencil {
  _drawing = null;
  name = 'Pencil';
  color = '#333';
  size = 2;

  get handlers() {
    const self = this

    return {
      [CURSOR_DOWN]: ({ paths, symbols, cursor }) => {
        const { x, y } = cursor
        self._drawing = <Path
          points={[[ x, y ]]}
          color={self.color}
          size={self.size}
          key={paths.length} />

        return {
          paths: paths.concat(self._drawing),
          symbols,
          cursor
        }
      },
      [CURSOR_DRAG]: ({ paths, symbols, cursor }) => {
        const { x, y } = cursor
        const i = paths.findIndex(p => p === self._drawing)

        self._drawing = React.cloneElement(self._drawing, {
          points: self._drawing.props.points.concat([[x, y]])
        })

        return {
          paths: paths.slice(0, i).concat(self._drawing).concat(paths.slice(i+1)),
          symbols,
          cursor
        }
      },
      [CURSOR_UP]: ({ paths, symbols, cursor }) => {
        return { paths, symbols, cursor }
      }
    }
  }
}

export default new Pencil()