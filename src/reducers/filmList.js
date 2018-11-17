import {REQUEST_LIST_FILM, RECEIVED_LIST_FILM,ERROR_WHEN_REQUEST_LIST_FILM} from '../constants/ActionTypes'
import PropTypes from 'prop-types'

const filmList = (state = {error:{},isLoaded:false,films:[],hasError:false},action) => {
  switch (action.type) {
    case REQUEST_LIST_FILM:
      return {
        ...state,
        isLoaded: false,
        hasError:false,
      }
    case RECEIVED_LIST_FILM:
      return {
        ...state,
        isLoaded: true,
        films: action.films.result,
        hasError:false,
      }
    case ERROR_WHEN_REQUEST_LIST_FILM:
      return {
        ...state,
        isLoaded: true,
        hasError:true,
      }
    default:
      return state
  }
}

filmList.propTypes = {
  isLoaded : PropTypes.bool,
  hasError : PropTypes.bool,
  films : PropTypes.array,
  error : PropTypes.object,
}
export default filmList