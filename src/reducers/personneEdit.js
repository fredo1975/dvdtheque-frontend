import {REQUEST_UPDATE_PERSONNE, 
  RECEIVED_UPDATE_PERSONNE,
  ERROR_WHEN_UPDATE_PERSONNE,
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
    case REQUEST_UPDATE_PERSONNE:
      return {
        ...state,
        isLoaded: false,
        hasError:false,
        isUpdated:false,
      }
    case RECEIVED_UPDATE_PERSONNE:
      state.personneMap[state.personneSelected.id] = action.personneSelected
      for(let i=0;i<state.allPersonne.length;i++){
        if(state.allPersonne[i].id===state.personneSelected.id){
          state.allPersonne[i]=action.personneSelected
        }
      }
      return {
        ...state,
        personneSelected:action.personneSelected,
        isLoaded: true,
        hasError:false,
        isUpdated:true,
      }
    case ERROR_WHEN_UPDATE_PERSONNE:
      return {
        ...state,
        isLoaded: true,
        hasError:true,
        isUpdated:false,
        error:action.error,
      }
    case INIT_SEARCH_PERSONNE:
      return {
        ...state,
        isUpdated:false,
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
    let personneSelected
      if(action.personneSelected.id!==undefined){
        personneSelected=action.personneSelected
      }else{
        personneSelected={
          id:'',
          nom : '',
          prenom : '',
        }
      }
      return {
        ...state,
        isLoaded: false,
        hasError:false,
        isUpdated:false,
        personneSelected:personneSelected,
      }
    case RECEIVED_ALL_PERSONNE:
      let personneSelectedTemp
      if(state.personneSelected.id!==''){
        personneSelectedTemp = action.personneMap[state.personneSelected.id]
      }else{
        personneSelectedTemp = {
          id:'',
          nom : '',
          prenom : '',}
      }
      return {
        ...state,
        isLoaded: true,
        allPersonne:action.allPersonne,
        personneMap:action.personneMap,
        hasError:false,
        personneSelected:personneSelectedTemp,
      }
    case ERROR_WHEN_REQUEST_ALL_PERSONNE:
      return {
        isLoaded: true,
        hasError:true,
        error:action.error,
        personneSelected:{
          id:'',
          nom : '',
          prenom : '',
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