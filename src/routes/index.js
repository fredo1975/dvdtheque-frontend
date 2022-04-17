import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const rootReducer = (history,filmList) => combineReducers({
  router: connectRouter(history),
  filmList,
})

export default rootReducer
