import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const rootReducer = (history,filmList,filmEdit,realisateurList,acteurList,personneEdit) => combineReducers({
  router: connectRouter(history),
  filmList,
  filmEdit,
  realisateurList,
  acteurList,
  personneEdit,
})

export default rootReducer
