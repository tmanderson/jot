import { combineReducers } from 'redux'
import undoable, { includeAction, excludeAction } from 'redux-undo'

import notebook, { CURSOR_DOWN, CURSOR_UP } from '../actions/notebook'
import tool, { SET_TOOL } from '../actions/tool'
import page, { SELECT } from '../actions/page'

export default combineReducers({
  notebook,
  tool,
  page: undoable(page, {
    limit: 100,
    debug: false,
    filter: includeAction(CURSOR_DOWN, CURSOR_UP)
  })
})
