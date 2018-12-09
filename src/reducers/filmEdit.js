import {ERROR_WHEN_EDIT_FILM, 
  REQUEST_EDIT_FILM,
  RECEIVED_EDIT_FILM,
  CHANGE_REALISATEUR,
  REQUEST_UPDATE_FILM,
  RECEIVED_UPDATE_FILM,
  ERROR_WHEN_UPDATE_FILM,
  CHANGE_FILM_PARAM,
  CHANGE_ACTEUR,
  REQUEST_ADD_FILM,
  REQUEST_SAVE_FILM,
  RECEIVED_SAVE_FILM,
  ERROR_WHEN_SAVE_FILM,
  CHANGE_ACTEUR_PARAM,
  REQUEST_ADD_ACTEUR,
  CHANGE_ACTEUR_CHECKED_PARAM,
} from '../constants/ActionTypes'
import PropTypes from 'prop-types'


const filmEdit = (state = {error:{},isLoaded:false,film:{
  id : undefined,
  annee:undefined,
  titre:'',
  titreO:'',
  realisateur : {id:undefined,},
  realisateurs : [],
  realisateurSelected:undefined,
  dvd:{id:undefined,annee:undefined,zone:1},
  acteurs:[],
},hasError:false,},action) => {
    switch (action.type) {
      case REQUEST_EDIT_FILM:
        return {
          ...state,
          isLoaded: false,
          hasError:false,
          isUpdated:false,
        }
      case RECEIVED_EDIT_FILM:
        return {
          ...state,
          isLoaded: true,
          film: action.film.result,
          realisateurSelected:action.realisateurSelected,
          hasError:false,
          isUpdated:false,
          newActeur : action.newActeur,
          newActeursList : action.newActeursList,
        }
      case ERROR_WHEN_EDIT_FILM:
        return {
          isLoaded: true,
          hasError:true,
          isUpdated:false,
        }
      case CHANGE_REALISATEUR:
        let {realisateur:changerealisateurState}=state.film;
        changerealisateurState.id=action.realisateurSelected;
        state.film.realisateur = Object.assign({}, state.film.realisateur, changerealisateurState)
        state.film = Object.assign({}, state.film)
        return {
          ...state,
          isUpdated:false,
        }
      case CHANGE_ACTEUR:
        state.film.acteurs = action.newActeurList
        return {
          ...state,
          realisateurSelected:action.realisateurSelected,
          isUpdated:false,
        }
      case CHANGE_ACTEUR_PARAM:
        let changeActeurParamState={...state.newActeur};
        changeActeurParamState[action.fieldName]=action.fieldValue;
        state.newActeur = Object.assign({}, state.newActeur, changeActeurParamState)
        return {
          ...state,
        }
      case CHANGE_FILM_PARAM:
        if(action.obj==='film' || typeof action.obj === 'undefined'){
          let changeFilmParamState={...state.film};
          changeFilmParamState[action.fieldName]=action.fieldValue;
          state.film = Object.assign({}, state.film, changeFilmParamState)
        }else{
          let changeDvdParamState={...state.film.dvd};
          changeDvdParamState[action.fieldName]=action.fieldValue;
          state.film.dvd = Object.assign({}, state.film.dvd, changeDvdParamState)
        }
        state.film = Object.assign({}, state.film)
        return {
          ...state,
          isLoaded: true,
          isUpdated:false,
        }
      case REQUEST_UPDATE_FILM:
        return {
          ...state,
          isLoaded: false,
          hasError:false,
          isUpdated:false,
        }
      case RECEIVED_UPDATE_FILM:
        return {
          ...state,
          isLoaded: true,
          isUpdated:true,
          hasError:false,
          postStatus : action.postStatus,
        }
      case ERROR_WHEN_UPDATE_FILM:
        return {
          isLoaded: true,
          hasError:true,
          error:action.error,
          isUpdated:false,
        }
      case REQUEST_SAVE_FILM:
        return {
          ...state,
          isLoaded: false,
          hasError:false,
          isUpdated:false,
        }
      case RECEIVED_SAVE_FILM:
        return {
          ...state,
          isLoaded: true,
          isUpdated:true,
          hasError:false,
        }
      case ERROR_WHEN_SAVE_FILM:
        return {
          isLoaded: true,
          hasError:true,
          error:action.error,
          isUpdated:false,
        }
      case REQUEST_ADD_FILM:
        return {
          film : action.film,
          hasError:false,
          isLoaded : true,
          isUpdated:false,
          acteurs : action.acteurs,
          error : action.error,
          newActeur : action.newActeur,
          newActeursList : action.newActeursList,
      }
      case REQUEST_ADD_ACTEUR:
        let newActList = []
        let id = state.newActeur.id+1
        let act = state.newActeur
        act.id = id
        newActList = Object.assign(newActList, state.newActeursList)
        newActList.push(act)
        state.newActeursList = Object.assign([], newActList)
        return {
          ...state,
          hasError:false,
          isLoaded : true,
          isUpdated:false,
          acteurs : action.acteurs,
          error : action.error,
          newActeur : {
            nom : '', 
            prenom : '', 
            id : id, 
            checked : true,
          },
      }
      case CHANGE_ACTEUR_CHECKED_PARAM:
        let changeActeurCheckedParamState=state.newActeursList;
        for(let i=0;i<changeActeurCheckedParamState.length;i++){
          if(changeActeurCheckedParamState[i].id===Number(action.fieldName)){
            changeActeurCheckedParamState[i].checked=!changeActeurCheckedParamState[i].checked
          }
        }
        state.newActeursList = Object.assign([], changeActeurCheckedParamState)
        return {
          ...state,
          isLoaded: true,
          isUpdated:false,
        }
      default:
        return state
    }
  }
  
  filmEdit.propTypes = {
    isLoaded : PropTypes.bool,
    isUpdated : PropTypes.bool,
    hasError : PropTypes.bool,
    films : PropTypes.array,
    error : PropTypes.object,
    state : PropTypes.object,
    film : PropTypes.object,
  }
  export default filmEdit