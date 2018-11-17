import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import createBrowserHistory from 'history/createBrowserHistory'
import rootReducer from './routes'
import filmList from './reducers/filmList'
import filmEdit from './reducers/filmEdit'
import realisateurList from './reducers/realisateurList'
import acteurList from './reducers/acteurList'

export const history = createBrowserHistory()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer(history,filmList,filmEdit,realisateurList,acteurList),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),thunk,
    ),
  ),
)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
    , document.getElementById('root'))
}

render()

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./components/App', () => {
    render()
  })

  // Reload reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer(history))
  })
}
