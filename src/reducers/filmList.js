import {
  REQUEST_LIST_FILM, 
  RECEIVED_LIST_FILM,
  ERROR_WHEN_REQUEST_LIST_FILM,
  FILTER_SELECTED,
  CHANGE_FILTER_PARAM,
} from '../constants/ActionTypes'


import PropTypes from 'prop-types'

const filmList = (state = {error:{},isLoaded:false,films:[],hasError:false,filter:{selectedTitre:'',selectedRealisateur:{},selectedActeur:{},ripped:'',selectedAnnee:'',filteredFilms:[]}},action) => {
  switch (action.type) {
    case REQUEST_LIST_FILM:
      return {
        ...state,
        isLoaded: false,
        hasError:false,
        filter:{selectedTitre:'',selectedRealisateur:{},selectedActeur:{},ripped:'',selectedAnnee:'',filteredFilms:[]},
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
        isLoaded: true,
        hasError:true,
        error:action.error
      }
    case CHANGE_FILTER_PARAM:
      let filteredFilms=[]
      let changeFilmParamState={...state.filter};
      if(action.fieldName==='selectedTitre'){
        changeFilmParamState[action.fieldName]=action.fieldValue;
        state.filter = Object.assign({}, state.filter, changeFilmParamState)
        for(let i=0;i<state.films.length;i++){
          let re = new RegExp(state.filter.selectedTitre, 'gi');
          if(state.films[i].titre.match(re)){
            filteredFilms.push(state.films[i]);
          }
        }
      }else if(action.fieldName==='selectedRealisateur'){
        changeFilmParamState[action.fieldName].id=action.fieldValue;
        state.filter = Object.assign({}, state.filter, changeFilmParamState)
        for(let i=0;i<state.films.length;i++){
          if(state.films[i].realisateur.id===changeFilmParamState.selectedRealisateur.id){
            filteredFilms.push(state.films[i]);
          }
        }
      }else if(action.fieldName==='selectedAnnee'){
      }
      state.filter.filteredFilms = filteredFilms
      return {
        ...state,
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