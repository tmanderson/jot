import { map } from 'lodash'
import React, {  Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AltRangeInput from '../../components/AltRangeInput/AltRangeInput'
import ColorSelect from '../../components/ColorSelect/ColorSelect'

import defaultProps, { actions } from '../../actions/tool'
import styles from './Toolbar.scss'

class Toolbar extends Component {
  static mapStateToProps = state => Object.assign({}, state.tool, defaultProps);

  static propTypes = {
    tools: PropTypes.object,
    size: PropTypes.number,
    color: PropTypes.string
  };

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { size, color } = this.props
    this.props.setTool(this.props.tools.pencil, { size, color })
  }

  setSize(size) {
    size = parseInt(size)
    this.props.setTool(this.props.active, { size, color: this.props.color })
  }

  setColor(color) {
    this.props.setTool(this.props.active, { color, size: this.props.size })
  }

  select(tool) {
    this.props.setTool(tool, { color: this.props.color, size: this.props.size })
  }

  render() {
    const { size, tools, setTool } = this.props

    return (
      <div className={styles.toolbar}>
        <input type="range" min="1" max="100" value={size} onChange={e => this.setSize(e.target.value)} data-toolbar="true" />
        <ColorSelect data-toolbar="true" className="color" onChange={val=>this.setColor(val)} />
        { map(tools, (tool, name) => <button key={name} data-toolbar="true" onClick={e => this.select(tool)}>{name}</button>) }
      </div>
    )
  }
}

export default connect(Toolbar.mapStateToProps, actions)(Toolbar)
