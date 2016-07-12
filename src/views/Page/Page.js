import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import SVGSymbol from '../../components/SVG/Symbol'
import Path from '../../components/SVG/Path'
import Mask from '../../components/SVG/Mask'

import { actions } from '../../actions/page'
import './Page.scss'

class Page extends React.Component {
  static mapStateToProps = state => state.page.present

  static propTypes = {
    selection: PropTypes.array,
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

  get selection() {
    const { selection } = this.props
    if(!selection[2] && !selection[3]) return null

    const matrix = [
      1, 0,
      0, 1,
      selection[2] < 0 ? selection[2] : 0, selection[3] < 0 ? selection[3] : 0
    ];

    return <use
      xlinkHref="#selection"
      transform={`matrix(${matrix.join(',')})`}
      x={selection[0]}
      y={selection[1]}
      width={Math.abs(selection[2])}
      height={Math.abs(selection[3])} />
  }

  render() {
    const { tool, cursor, masks, paths, symbols, clipPaths, selectPath } = this.props

    return (
      <div className="page">
        <svg>
          <defs>
            <symbol id="selection">
              <rect fill="none" stroke="black" strokeWidth="4" strokeDasharray="4, 4" width="100%" height="100%">
                <animate attributeType="XML"
                   attributeName="stroke-dashoffset"
                   from="0" to="6"
                   dur="300ms"
                   repeatCount="indefinite"/>
              </rect>
            </symbol>
            { symbols.map((props, i) => <SVGSymbol key={`symbol-${i}`} {...props} />) }
            { masks.map((props, i) => (<Mask key={`mask-${i}`} {...props} />)) }
          </defs>
          { paths.map((props, i) => <Path key={`path-${i}`} onClick={() => selectPath(i)} {...props} />) }
          { this.selection }
        </svg>
      </div>
    )
  }
}

export default connect(Page.mapStateToProps, actions)(Page)
