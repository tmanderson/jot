import React, { PropTypes, Component } from 'react'

import Path from './Path'

export default class SVGSymbol extends Component {
  static propTypes = {
    id: PropTypes.string,
    contents: PropTypes.array,
    size: PropTypes.number
  };

  constructor(props) {
    super(props)
  }

  use() {
    return <use xlinkHref={this._id} x="0" y="0" width="100%" height="100%" />
  }

  render() {
    const { id, contents, size } = this.props

    return (
      <symbol id={id} width="100%" height="100%">
        { contents.map((props, i) => <Path key={i} {...props} />) }
      </symbol>
    )
  }
}
