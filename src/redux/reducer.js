import { combineReducers } from 'redux'

import notebook from '../actions/notebook'
import tool from '../actions/tool'
import page from '../actions/page'

export default combineReducers({
  notebook,
  tool,
  page
})