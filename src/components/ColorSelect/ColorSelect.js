import React, {  Component } from 'react'
import PropTypes from 'prop-types'
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
