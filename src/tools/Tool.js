import React, { PropTypes, Component } from 'react'

export default class Tool extends Component {
  static propTypes = {
    position: PropTypes.object,
    dragging: PropTypes.bool
  }
}