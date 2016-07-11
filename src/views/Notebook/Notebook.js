import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import { actions } from '../../actions/notebook'
import Toolbar from '../Toolbar/Toolbar'
import Page from '../Page/Page'

import styles from './Notebook.scss'

class Notebook extends React.Component {
  static mapStateToProps = (state) => state.notebook

  static propTypes = {
    dragging: PropTypes.bool,
    name: PropTypes.string,
    cover: PropTypes.string,
    defaults: PropTypes.shape({
      background: PropTypes.string,
      tool: PropTypes.string,
      color: PropTypes.string,
      size: PropTypes.number
    }),
    pages: PropTypes.array
  };

  constructor(props) {
    super(props)
  }

  render() {
    const { dragging, cursorDown, cursorMove, cursorUp, cursorDrag, cursorClick } = this.props

    return (
      <div className="notebook open"
        onClick={cursorClick}
        onMouseDown={e => !e.target.getAttribute('data-toolbar') && cursorDown(e)}
        onMouseMove={e => dragging && !e.target.getAttribute('data-toolbar') && cursorDrag(e) }
        onMouseUp={e => !e.target.getAttribute('data-toolbar') && cursorUp(e)}>
        <Toolbar />
        <Page />
      </div>
    )
  }
}

export default connect(Notebook.mapStateToProps, actions)(Notebook)