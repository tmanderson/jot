import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import SVGSymbol from '../../components/SVG/Symbol'
import Path from '../../components/SVG/Path'
import Mask from '../../components/SVG/Mask'

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
    const { tool, cursor, masks, paths, symbols, clipPaths, selectPath } = this.props

    return (
      <div className="page">
        <svg>
          <defs>
            { masks.map((props, i) => {
                props = Object.assign({}, props, { key: `mask-${i}`, maskUnits: "userSpaceOnUse" })
                return (<Mask {...props} />)
              })
            }
          </defs>
          { symbols.map((props, i) => <SVGSymbol key={`symbol-${i}`} {...props} />) }
          { paths.map((props, i) => <Path key={`path-${i}`} onClick={() => selectPath(i)} {...props} />) }
        </svg>
      </div>
    )
  }
}

export default connect(Page.mapStateToProps, actions)(Page)
