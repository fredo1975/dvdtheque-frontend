import {ERROR_WHEN_EDIT_FILM, REQUEST_EDIT_FILM,RECEIVED_EDIT_FILM} from '../constants/ActionTypes'
import PropTypes from 'prop-types'


const filmEdit = (state = {error:{},isLoaded:false,film:{},hasError:false,},action) => {
    switch (action.type) {
      case REQUEST_EDIT_FILM:
        return {
          ...state,
          isLoaded: false,
          hasError:false,
        }
      case RECEIVED_EDIT_FILM:
        return {
          ...state,
          isLoaded: true,
          film: action.film.result,
          hasError:false,
        }
      case ERROR_WHEN_EDIT_FILM:
        return {
          isLoaded: true,
          hasError:true,
        }
      default:
        return state
    }
  }
  
  filmEdit.propTypes = {
    isLoaded : PropTypes.bool,
    hasError : PropTypes.bool,
    films : PropTypes.array,
    error : PropTypes.object,
  }
  export default filmEdit