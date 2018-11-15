import * as types from '../constants/ActionTypes'
import {rest_api_url} from '../pages' // import our pages

export const requestListFilm = () => ({
  type: types.REQUEST_LIST_FILM,
  isLoaded: false,
});

export const receivedListFilm = result => ({
  type: types.RECEIVED_LIST_FILM,
  isLoaded: true,
  films:result,
});

export const errorOccuredWhenRequestListFilm = (error) => ({
  type: types.ERROR_WHEN_REQUEST_LIST_FILM,
  isLoaded: true,
  error:error,
})

export function fetchFilms() {
  return function (dispatch) {
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
