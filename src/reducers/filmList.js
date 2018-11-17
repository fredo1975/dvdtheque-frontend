import {REQUEST_LIST_FILM, RECEIVED_LIST_FILM,ERROR_WHEN_REQUEST_LIST_FILM} from '../constants/ActionTypes'

const filmList = (state = {error:{},isLoaded:false,films:[]},action) => {
  switch (action) {
    case REQUEST_LIST_FILM:
      return {
        ...state,
        isLoaded: false
      }
    case RECEIVED_LIST_FILM:
      return {
        ...state,
        isLoaded: true,
        films: action.films,
      }
    case ERROR_WHEN_REQUEST_LIST_FILM:
      return {
        ...state,
        isLoaded: true,
      }
    default:
      return state
  }
}

export default filmList