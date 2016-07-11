import '../assets/styles/main.scss'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './redux/store'
import Notebook from './views/Notebook/Notebook'

const store = createStore(window.__INITIAL_STATE__)

render(
  <Provider store={store}>
    <Notebook />
  </Provider>,
  document.querySelector('main')
);
