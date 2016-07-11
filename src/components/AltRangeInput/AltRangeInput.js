import React, { PropTypes, Component } from 'react'
import './AltRangeInput.scss'

const MAX_SIZE = 100

export default class AltRangeInput extends Component {
  active = false
  origin = {x: 0, y: 0};
  _size = 0.2

  static contextTypes = {
    events: PropTypes.object
  };

  constructor(props) {
    super(props)
  }

  enable({ target: el, clientX:x, clientY:y }) {
    this.active = true

  }

  size(e) {
    const { target:el, clientX:x, clientY:y } = e
    // do something with the size!
    const dx = (x-this.origin.x)/2
    this._size = Math.min(1, Math.max(0.01,dx/MAX_SIZE))
    e.stopPropagation()
  }

  disable() {
    this.context.events.off('mousemove', this._listener[0])
    this.context.events.off('mouseup', this._listener[1])
    this.active = false
  }

  render() {
    const { styles } = this.props

    return (
      <div className="alt-range" onMouseDown={e=>this.enable(e)}>
        <div className="size" style={{ transform: `scale(${this._size})` }}></div>
      </div>
    )
  }
}