import {REQUEST_LIST_REALISATEUR, RECEIVED_LIST_REALISATEUR,ERROR_WHEN_REQUEST_LIST_REALISATEUR} from '../constants/ActionTypes'
import PropTypes from 'prop-types'

const realisateurList = (state = {error:{},isLoaded:false,realisateurs:[],hasError:false},action) => {
  switch (action.type) {
    case REQUEST_LIST_REALISATEUR:
      return {
        ...state,
        isLoaded: false,
        hasError:false,
      }
    case RECEIVED_LIST_REALISATEUR:
      return {
        ...state,
        isLoaded: true,
        realisateurs: action.realisateurs.result,
        hasError:false,
      }
    case ERROR_WHEN_REQUEST_LIST_REALISATEUR:
      return {
        ...state,
        isLoaded: true,
        hasError:true,
        error:action.error,
      }
    default:
      return state
  }
}

realisateurList.propTypes = {
  isLoaded : PropTypes.bool,
  hasError : PropTypes.bool,
  realisateurs : PropTypes.array,
  error : PropTypes.object,
}
export default realisateurList