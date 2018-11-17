import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const rootReducer = (history,filmList,filmEdit) => combineReducers({
  router: connectRouter(history),
  filmList,
  filmEdit,
})

export default rootReducer
