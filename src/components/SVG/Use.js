import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class extends Component {
  static propTypes = {
    id: PropTypes.string,
    transform: PropTypes.array
  };

  static defaultProps = { translate: [0, 0] }

  render() {
    const { translate, id } = this.props

    return (<use
      xlinkHref={`#${id}`}
      transform={`translate(${translate[0]}, ${translate[1]})`} />)
  }
}
