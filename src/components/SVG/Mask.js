import React, { PropTypes, Component } from 'react'

import Path from './Path'
import Use from './Use'
import SVGSymbol from './Symbol'

export default class Mask extends Path {
  static propTypes = {
    id: PropTypes.string,
    contents: PropTypes.array,
    size: PropTypes.number
  };

  static defaultProps = { contents: [], translate: [0, 0] }

  constructor(props) {
    super(props)
  }

  render() {
    const { id, contents, translate, size } = this.props

    return (
      <mask id={id} key={id}>
        <rect width="100%" height="100%" fill="white" />
        { contents.map((props, i) => {
            switch(props.type) {
              case 'use': return <Use key={i} translate={translate} {...props} />
              case 'path': return <Path key={i} translate={translate} {...props} />
              default: return <Use key={i} translate={translate} {...props} />
            }
          })
        }
      </mask>
    )
  }
}
