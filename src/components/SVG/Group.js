import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Path from './Path'

export default class Group extends Component {
  static propTypes = {
    contents: PropTypes.array
  };

  constructor(props) {
    super(props)
  }

  render() {
    const { contents, onClick } = this.props

    return (<g>{contents.map((props, i) => <Path key={i} onClick={onClick} {...props} />)}</g>)
  }
}
