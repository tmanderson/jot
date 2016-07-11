import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import { actions } from '../../actions/page'
import './Page.scss'

/**
 * USE DISPATCHER TO SET PROPS!!!!!!!!!!
 * This will make adding paths more sensible...
 * Undo/Redo history
 * Active Tool
 */
class Page extends React.Component {
  static mapStateToProps = state => state.page

  static propTypes = {
    tool: PropTypes.object,
    paths: PropTypes.array,
    symbols: PropTypes.array,
    clipPaths: PropTypes.array,
    masks: PropTypes.array,
    cursor: PropTypes.object
  };

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(props) {

  }

  render() {
    const { cursor, masks, paths, symbols, clipPaths } = this.props

    return (
      <div className="page">
        <svg>
          <defs>
            { masks.map((m, i) => React.cloneElement(m, { key: i })) }
            { clipPaths }
          </defs>
          { paths.map((p, i) => p) }
        </svg>
      </div>
    )
  }
}

export default connect(Page.mapStateToProps, actions)(Page)