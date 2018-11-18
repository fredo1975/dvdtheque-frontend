import {ERROR_WHEN_EDIT_FILM, REQUEST_EDIT_FILM,RECEIVED_EDIT_FILM} from '../constants/ActionTypes'
import PropTypes from 'prop-types'

const filmEdit = (state = {error:{},isLoaded:false,film:{},hasError:false,filmId:null,},action) => {
    switch (action.type) {
      case REQUEST_EDIT_FILM:
        return {
          ...state,
          isLoaded: false,
          hasError:false,
          filmId:action.filmId,
        }
      case RECEIVED_EDIT_FILM:
        return {
          ...state,
          isLoaded: true,
          film: action.film.result,
          hasError:false,
          filmId:action.filmId,
        }
      case ERROR_WHEN_EDIT_FILM:
        return {
          ...state,
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
    filmId : PropTypes.number,
  }
  export default filmEdit