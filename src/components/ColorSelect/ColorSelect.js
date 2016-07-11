import React, { PropTypes, Component } from 'react'
import './ColorSelect.scss'

export default class ColorSelectInput extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div className="color-select">
      <input type="color" onChange={(e) => this.props.onChange(e.target.value) } />
    </div>)
  }
}