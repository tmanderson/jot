import React, {  Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { actions } from '../../actions/notebook'
import Toolbar from '../Toolbar/Toolbar'
import Page from '../Page/Page'

import styles from './Notebook.scss'

// max time between mouse_down and mouse_up that merits a click
const CLICK_DURATION = 400;

class Notebook extends React.Component {
  static mapStateToProps = (state) => state.notebook;
  static lastDown = Date.now();

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

  componentWillMount() {
    document.onkeydown = (e) => {
      let triggered = false
      switch(e.key) {
        case 'z': if(e.metaKey) this.props.undo(); break;
        default: triggered = true
      }

      this.props.keyPress(e)
    }
  }

  handleDown = e => {
    const { cursorDown } = this.props;

    if(Notebook.lastDown = Date.now() && !e.target.getAttribute('data-toolbar')) {
      cursorDown(e);
    }

    Notebook.lastDown = Date.now();
  }

  handleClick = e => {
    const { cursorClick } = this.props;

    if(Date.now() - Notebook.lastDown < CLICK_DURATION && !e.target.getAttribute('data-toolbar')) {
      cursorClick(e);
    }
  }

  render() {
    const {
      keys,
      dragging,
      cursorMove,
      cursorUp,
      cursorDrag,
      keyPress
    } = this.props

    return (
      <div
        className={[styles.notebook, styles.open].join(' ')}
        onClick={this.handleClick}
        onMouseDown={this.handleDown}
        onMouseMove={e => dragging && !e.target.getAttribute('data-toolbar') && cursorDrag(e) }
        onMouseUp={e => !e.target.getAttribute('data-toolbar') && cursorUp(e)}
      >
        <Toolbar />
        <Page />
      </div>
    )
  }
}

export default connect(Notebook.mapStateToProps, actions)(Notebook)
