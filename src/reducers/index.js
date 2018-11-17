import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router/immutable'
import filmList from './filmList'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history,filmList),
  filmList
})

export default rootReducer
