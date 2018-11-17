import * as types from '../constants/ActionTypes'
import {rest_api_url} from '../pages' // import our pages

/************ Film List *************************************/
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

export function fetchFilms() {
  return (dispatch) => {
   dispatch(requestListFilm());
   return fetch(rest_api_url+'films', {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   }).then(result => result.json())
   .then((result) => {
      dispatch(receivedListFilm(result));
   },
   (error)=>{
     dispatch(errorOccuredWhenRequestListFilm(error));
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
  hasError:false,
});

export const errorOccuredWhenRequestEditFilm = (error) => ({
  type: types.ERROR_WHEN_EDIT_FILM,
  isLoaded: true,
  error:error,
  hasError:true,
})

export function fetchFilmById(filmId) {
  return (dispatch) => {
   dispatch(requestEditFilm());
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
/************************************************************/