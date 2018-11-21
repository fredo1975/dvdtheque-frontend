import {ERROR_WHEN_EDIT_FILM, 
  REQUEST_EDIT_FILM,
  RECEIVED_EDIT_FILM,
  CHANGE_REALISATEUR,
  REQUEST_UPDATE_FILM,
  RECEIVED_UPDATE_FILM,
  ERROR_WHEN_UPDATE_FILM,
  CHANGE_TITRE,
  CHANGE_ANNEE} from '../constants/ActionTypes'
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
          realisateurSelected:action.realisateurSelected,
          hasError:false,
        }
      case CHANGE_REALISATEUR:
          return {
          ...state,
          isLoaded: true,
          realisateurSelected:action.realisateurSelected,
          hasError:false,
        }
      case ERROR_WHEN_EDIT_FILM:
        return {
          isLoaded: true,
          hasError:true,
        }
      case REQUEST_UPDATE_FILM:
        return {
          ...state,
          isLoaded: false,
          hasError:false,
        }
      case CHANGE_TITRE:
        let newState={...state};
        newState[action.fieldName]=action.fieldValue;
        for(let v in newState){
          console.log('v='+v);
          for(let vv in newState.film){
            console.log('vv='+vv+' newState.film[vv]='+newState.film[vv]);
          }
        }
        
        return {
          ...newState,
          isLoaded: true,
        }
      case RECEIVED_UPDATE_FILM:
        return {
          ...state,
          isLoaded: true,
          film: action.film.result,
          realisateurSelected:action.realisateurSelected,
          hasError:false,
        }
      case CHANGE_ANNEE:
        //let newState={...state};
        //state.annee=action.fieldValue;
        return {
          ...state,
          isLoaded: true,
        }
      case ERROR_WHEN_UPDATE_FILM:
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
    state : PropTypes.object,
    film : PropTypes.object,
  }
  export default filmEdit