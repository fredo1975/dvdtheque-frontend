import * as types from '../constants/ActionTypes'
import {rest_api_url} from '../pages'

/************ Film/Realisateur/Acteur List *************************************/
export const requestListFilm = () => ({
  type: types.REQUEST_LIST_FILM,
  isLoaded: false,
  hasError:false,
});

export const receivedListFilm = result => ({
  type: types.RECEIVED_LIST_FILM,
  isLoaded: true,
  films:{result},
  hasError:false,
});

export const errorOccuredWhenRequestListFilm = (error) => ({
  type: types.ERROR_WHEN_REQUEST_LIST_FILM,
  isLoaded: true,
  error:error,
  hasError:true,
})

export const requestListRealisateur = () => ({
  type: types.REQUEST_LIST_REALISATEUR,
  isLoaded: false,
  hasError:false,
});

export const receivedListRealisateur = result => ({
  type: types.RECEIVED_LIST_REALISATEUR,
  isLoaded: true,
  realisateurs:{result},
  hasError:false,
});

export const errorOccuredWhenRequestListRealisateur = (error) => ({
  type: types.ERROR_WHEN_REQUEST_LIST_REALISATEUR,
  isLoaded: true,
  error:error,
  hasError:true,
})

export const requestListActeur  = () => ({
  type: types.REQUEST_LIST_ACTEUR,
  isLoaded: false,
  hasError:false,
});

export const receivedListActeur  = (result,acteurMap) => ({
  type: types.RECEIVED_LIST_ACTEUR,
  isLoaded: true,
  acteurs:{result},
  acteurMap:{acteurMap},
  hasError:false,
});

export const errorOccuredWhenRequestListActeur = (error) => ({
  type: types.ERROR_WHEN_REQUEST_LIST_ACTEUR,
  isLoaded: true,
  error:error,
  hasError:true,
})

export function fetchFilms() {
  return (dispatch) => {
   dispatch(requestListFilm());
   return fetch(rest_api_url+'films', {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   }).then(result => result.json())
   .then((resultListFilm) => {
      dispatch(receivedListFilm(resultListFilm));
   },
   (error)=>{
     dispatch(errorOccuredWhenRequestListFilm(error));
   }
 )}
}

export function fetchRealisateurs() {
  return (dispatch) => {
   dispatch(requestListRealisateur());
   return fetch(rest_api_url+'realisateurs', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
   }).then(result => result.json())
   .then((resultRealisateurs) => {
      dispatch(receivedListRealisateur(resultRealisateurs));
   },
   (error)=>{
     dispatch(errorOccuredWhenRequestListRealisateur(error));
   }
 )}
}
export const buildIndexListActeur = acteurList => {
  var acteurMap = {};
  for(let i=0;i<acteurList.length;i++){
    acteurMap = {...acteurMap,[Number(acteurList[i].id)]:acteurList[i]};
  }
  return acteurMap;
}
export function fetchActeurs() {
  return (dispatch) => {
   dispatch(requestListActeur());
   return fetch(rest_api_url+'acteurs', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
   }).then(result => result.json())
   .then((resultActeurs) => {
      dispatch(receivedListActeur(resultActeurs,buildIndexListActeur(resultActeurs)));
   },
   (error)=>{
     dispatch(errorOccuredWhenRequestListActeur(error));
   }
 )}
}

/************************************************************/

/************ Film Add *************************************/
export const requestAddFilm = () => ({
  type: types.REQUEST_ADD_FILM,
  hasError:false,
  isLoaded: false,
  film:{
    annee:undefined,
    titre:'',
    titreO:'',
    realisateur : {id:undefined,},
    realisateurs : [],
    realisateurSelected:undefined,
    dvd:{id:undefined,annee:undefined,zone:1},
    acteurs:[],
  },
});

/************************************************************/


/************ Film Edit *************************************/
export const requestEditFilm = (filmId) => ({
  type: types.REQUEST_EDIT_FILM,
  isLoaded: false,
  hasError:false,
  filmId:filmId,
});

export const receivedEditFilm = result => ({
  type: types.RECEIVED_EDIT_FILM,
  isLoaded: true,
  film:{result},
  realisateurSelected:result.realisateur.id,
  hasError:false,
});

export const errorOccuredWhenRequestEditFilm = (error) => ({
  type: types.ERROR_WHEN_EDIT_FILM,
  isLoaded: true,
  error:error,
  hasError:true,
})
export const changeRealisateur = (id) => ({
  type: types.CHANGE_REALISATEUR,
  realisateurSelected: id,
})
export const changeFilmParam = (fieldName, fieldValue,obj) => ({
  type: types.CHANGE_FILM_PARAM,
  fieldName:fieldName,
  fieldValue:fieldValue,
  obj:obj,
})
export const changeActeur = (selectedValue) => ({
  type: types.CHANGE_ACTEUR,
  newActeurList : selectedValue,
})
export function fetchFilmById(filmId) {
  return (dispatch) => {
   dispatch(requestEditFilm(filmId));
   return fetch(rest_api_url+'films/byId/'+filmId, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
   }).then(result => result.json())
   .then((result) => {
      dispatch(receivedEditFilm(result));
   },
   (error)=>{
     dispatch(errorOccuredWhenRequestEditFilm(error));
   }
 )}
}
export const requestUpdateFilm = () => ({
  type: types.REQUEST_UPDATE_FILM,
  isLoaded: false,
  hasError:false,
});

export const receivedUpdateFilm = () => ({
  type: types.RECEIVED_UPDATE_FILM,
  isLoaded: true,
  hasError:false,
});

export const errorOccuredWhenUpdateFilm = (error) => ({
  type: types.ERROR_WHEN_UPDATE_FILM,
  isLoaded: true,
  error:error,
  hasError:true,
})

export function updateFilm(film){
  return (dispatch) => {
    dispatch(requestUpdateFilm());
    fetch(rest_api_url+'films/byId/'+film.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(film)
    }).then((result) => {
       dispatch(receivedUpdateFilm());
    },
    (error)=>{
      dispatch(errorOccuredWhenUpdateFilm(error));
    }
  )}
}

export const requestSaveFilm = () => ({
  type: types.REQUEST_SAVE_FILM,
  isLoaded: false,
  hasError:false,
});

export const receivedSaveFilm = () => ({
  type: types.RECEIVED_SAVE_FILM,
  isLoaded: true,
  hasError:false,
});

export const errorOccuredWhenSaveFilm = (error) => ({
  type: types.ERROR_WHEN_SAVE_FILM,
  isLoaded: true,
  error:error,
  hasError:true,
})

export function saveFilm(film){
  return (dispatch) => {
    dispatch(requestSaveFilm());
    fetch(rest_api_url+'film/save', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(film)
    }).then((result) => {
       dispatch(receivedSaveFilm());
    },
    (error)=>{
      dispatch(errorOccuredWhenSaveFilm(error));
    }
  )}
}
/************************************************************/