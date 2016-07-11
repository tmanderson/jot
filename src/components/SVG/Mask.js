import React, { PropTypes, Component } from 'react'

import Path from './Path'
import SVGSymbol from './Symbol'

export default class Mask extends Path {
  static propTypes = {
    id: PropTypes.string,
    contents: PropTypes.array,
    size: PropTypes.number
  };

  static defaultProps = { contents: [] }

  constructor(props) {
    super(props)
  }

  render() {
    const { id, contents, size } = this.props

    return (
      <mask id={id} key={id}>
        <rect width="100%" height="100%" fill="white" />
        { contents.map((props, i) => props.type === 'use' && <use key={i} {...props} />) }
      </mask>
    )
  }
}
