import {REQUEST_SEARCH_PERSONNE, RECEIVED_SEARCH_PERSONNE,ERROR_WHEN_SEARCH_PERSONNE,INIT_SEARCH_PERSONNE} from '../constants/ActionTypes'
import PropTypes from 'prop-types'

const personneEdit = (state = {error:{},isLoaded:false,personne:{},hasError:false},action) => {
  switch (action.type) {
    case REQUEST_SEARCH_PERSONNE:
      return {
        ...state,
        isLoaded: false,
        hasError:false,
      }
    case RECEIVED_SEARCH_PERSONNE:
      return {
        ...state,
        isLoaded: true,
        personne:action.personne,
        hasError:false,
      }
    case ERROR_WHEN_SEARCH_PERSONNE:
      return {
        isLoaded: true,
        hasError:true,
        error:action.error,
      }
    case INIT_SEARCH_PERSONNE:
      return {
        isLoaded: true,
        hasError:true,
        error:action.error,
        personne:action.personne,
      }
    default:
      return state
  }
}

personneEdit.propTypes = {
  isLoaded : PropTypes.bool,
  hasError : PropTypes.bool,
  personne : PropTypes.object,
  error : PropTypes.object,
}
export default personneEdit