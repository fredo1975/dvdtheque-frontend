import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router/immutable'
import filmList from './filmList'
import filmEdit from './filmEdit'
import acteurList from './acteurList'
import realisateurList from './realisateurList'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history,filmList,filmEdit,realisateurList,acteurList),
  filmList,
  filmEdit,
  realisateurList,
  acteurList,
})

export default rootReducer
