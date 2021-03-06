import {REQUEST_LIST_ACTEUR, RECEIVED_LIST_ACTEUR,ERROR_WHEN_REQUEST_LIST_ACTEUR} from '../constants/ActionTypes'
import PropTypes from 'prop-types'

const acteurList = (state = {error:{},isLoaded:false,acteurs:[],hasError:false},action) => {
  switch (action.type) {
    case REQUEST_LIST_ACTEUR:
      return {
        ...state,
        isLoaded: false,
        hasError:false,
      }
    case RECEIVED_LIST_ACTEUR:
      return {
        ...state,
        isLoaded: true,
        acteurs: action.acteurs.result,
        acteurMap:action.acteurMap.acteurMap,
        hasError:false,
      }
    case ERROR_WHEN_REQUEST_LIST_ACTEUR:
      return {
        isLoaded: true,
        hasError:true,
        error:action.error,
      }
    default:
      return state
  }
}

acteurList.propTypes = {
  isLoaded : PropTypes.bool,
  hasError : PropTypes.bool,
  acteurs : PropTypes.array,
  error : PropTypes.object,
}
export default acteurList