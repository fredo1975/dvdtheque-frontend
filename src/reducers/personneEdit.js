import {REQUEST_SEARCH_PERSONNE, 
  RECEIVED_SEARCH_PERSONNE,
  ERROR_WHEN_SEARCH_PERSONNE,
  INIT_SEARCH_PERSONNE,
  CHANGE_PERSONNE_PARAM,
  ERROR_WHEN_REQUEST_ALL_PERSONNE,
  RECEIVED_ALL_PERSONNE,
  REQUEST_ALL_PERSONNE,
  REQUEST_SELECT_PERSONNE
} from '../constants/ActionTypes'
import PropTypes from 'prop-types'

const personneEdit = (state = {error:{},isLoaded:false,isUpdated:false,hasError:false,personneSelected:{nom:'',prenom:'',id:''},allPersonne:[{nom:'',prenom:'',id:''}]},action) => {
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
        hasError:false,
        isUpdated:true,
      }
    case ERROR_WHEN_SEARCH_PERSONNE:
      return {
        ...state,
        isLoaded: true,
        hasError:true,
        error:action.error,
      }
    case INIT_SEARCH_PERSONNE:
      return {
        ...state,
        personneSelected:action.personneSelected,
      }
    case CHANGE_PERSONNE_PARAM:
      let changePersonneParamState={...state.personne};
      changePersonneParamState[action.fieldName]=action.fieldValue;
      state.personneSelected = Object.assign({}, state.personneSelected, changePersonneParamState)
      return {
        ...state,
      }
    case REQUEST_ALL_PERSONNE:
      return {
        ...state,
        isLoaded: false,
        hasError:false,
        personneSelected:{
          id:'',
          nom : '',
          prenom : '',
        },
      }
    case RECEIVED_ALL_PERSONNE:
      return {
        ...state,
        isLoaded: true,
        allPersonne:action.allPersonne,
        personneMap:action.personneMap,
        hasError:false,
        personneSelected:{
          id:'',
        },
      }
    case ERROR_WHEN_REQUEST_ALL_PERSONNE:
      return {
        isLoaded: true,
        hasError:true,
        error:action.error,
        personneSelected:{
          id:'',
        },
      }
    case REQUEST_SELECT_PERSONNE:
      return {
        ...state,
        personneSelected:action.personneSelected,
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