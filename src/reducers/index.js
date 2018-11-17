import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router/immutable'
import filmList from './filmList'
import filmEdit from './filmEdit'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history,filmList,filmEdit),
  filmList,
  filmEdit,
})

export default rootReducer
