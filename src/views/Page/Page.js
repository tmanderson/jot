import React, {  Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SVGSymbol from '../../components/SVG/Symbol'
import Path from '../../components/SVG/Path'
import Mask from '../../components/SVG/Mask'

import { actions } from '../../actions/page'
import styles from './Page.scss'

class Page extends React.Component {
  static mapStateToProps = state => state.page.present

  static propTypes = {
    clipPaths: PropTypes.array,
    cursor: PropTypes.object,
    masks: PropTypes.array,
    paths: PropTypes.array,
    selection: PropTypes.array,
    symbols: PropTypes.array,
    tool: PropTypes.object,
  };

  constructor(props) {
    super(props)
  }

  get paths() {
    const { paths, selectPath } = this.props;
    return paths.map((props, i) =>
      <Path
        key={`path-${i}`}
        onClick={() => selectPath(i)}
        {...props}
      />
    );
  }

  get symbols() {
    const { symbols } = this.props;
    return symbols.map((props, i) =>
      <SVGSymbol
        key={`symbol-${i}`}
        {...props}
      />
    );
  }

  get masks() {
    const { masks } = this.props;
    return masks.map((props, i) =>
      <Mask
       key={`mask-${i}`}
       {...props}
      />
    );
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
      height={Math.abs(selection[3])}
    />
  }

  serialize() {
    const svg  = this.svg;
    const xml  = new XMLSerializer().serializeToString(svg)
    const data = "data:image/svg+xml;base64," + btoa(xml)
    const img  = new Image()
    img.setAttribute('src', data);
  }

  render() {
    const { tool, cursor, clipPaths, selectPath } = this.props

    return (
      <div className={styles.page}>
        <svg ref={el => (this.svg = el)}>
          <defs>
            <symbol id="selection">
              <rect
                fill="none"
                stroke="black"
                strokeWidth="4"
                strokeDasharray="4, 4"
                width="100%"
                height="100%"
              >
                <animate
                  attributeType="XML"
                  attributeName="stroke-dashoffset"
                  from="0" to="6"
                  dur="300ms"
                  repeatCount="indefinite"
                />
              </rect>
            </symbol>
            { this.symbols }
            { this.masks }
          </defs>
          { this.paths }
          { this.selection }
        </svg>
      </div>
    )
  }
}

export default connect(Page.mapStateToProps, actions)(Page)
