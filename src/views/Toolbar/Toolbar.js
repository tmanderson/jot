import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import AltRangeInput from '../../components/AltRangeInput/AltRangeInput'
import ColorSelect from '../../components/ColorSelect/ColorSelect'

import defaultProps, { actions } from '../../actions/tool'
import './Toolbar.scss'

class Toolbar extends Component {
  static mapStateToProps = state => Object.assign({}, state.tool, defaultProps);

  static propTypes = {
    active: PropTypes.string,
    tools: PropTypes.array
  };

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  setSize(size) {
    this.props.tools.forEach(t => t.size = parseInt(size))
  }

  setColor(color) {
    this.props.tools.forEach(t => t.color = color)
  }

  select(e, tool) {
    e.preventDefault();
    e.stopPropagation();
    this.props.setTool(tool)
  }

  render() {
    const { tools, setTool } = this.props

    return (
      <div className="toolbar">
        <input type="range" min="1" max="100" onChange={e => this.setSize(e.target.value)} data-toolbar="true" />
        <ColorSelect data-toolbar="true" className="color" onChange={val=>this.setColor(val)} />
        { tools.map(tool => <button key={tool.name} data-toolbar="true" onClick={e => this.select(e, tool)}>{tool.name}</button>)}
      </div>
    )
  }
}

export default connect(Toolbar.mapStateToProps, actions)(Toolbar)