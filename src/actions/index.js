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

export const receivedListActeur  = result => ({
  type: types.RECEIVED_LIST_ACTEUR,
  isLoaded: true,
  acteurs:{result},
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
      dispatch(receivedListActeur(resultActeurs));
   },
   (error)=>{
     dispatch(errorOccuredWhenRequestListActeur(error));
   }
 )}
}

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

export const requestUpdateFilm = (filmId) => ({
  type: types.REQUEST_UPDATE_FILM,
  isLoaded: false,
  hasError:false,
  filmId:filmId,
});

export const receivedUpdateFilm = result => ({
  type: types.RECEIVED_UPDATE_FILM,
  isLoaded: true,
  film:{result},
  realisateurSelected:result.realisateur.id,
  hasError:false,
});

export const errorOccuredWhenUpdateFilm = (error) => ({
  type: types.ERROR_WHEN_UPDATE_FILM,
  isLoaded: true,
  error:error,
  hasError:true,
})

export function postFilm(filmId){
  return (dispatch) => {
    dispatch(requestUpdateFilm());
    fetch(rest_api_url+'films/byId/'+filmId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    }).then(result => result.json())
    .then((result) => {
       dispatch(receivedUpdateFilm(result));
    },
    (error)=>{
      dispatch(errorOccuredWhenUpdateFilm(error));
    }
  )}
}
/************************************************************/