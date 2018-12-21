import * as types from '../constants/ActionTypes'
import {rest_api_url} from '../pages'
import {handleNewActeursList} from '../pages'

/************ Film/Realisateur/Acteur List *************************************/
export const requestListFilm = () => ({
  type: types.REQUEST_LIST_FILM,
  isLoaded: false,
  hasError:false,
})

export const receivedListFilm = result => ({
  type: types.RECEIVED_LIST_FILM,
  isLoaded: true,
  films:{result},
  hasError:false,
})

export const errorOccuredWhenRequestListFilm = (error) => ({
  type: types.ERROR_WHEN_REQUEST_LIST_FILM,
  isLoaded: true,
  error:error,
  hasError:true,
})

export const requestListFilmFiltered = (criteria,param) => ({
  type: types.FILTER_SELECTED,
  criteria:criteria,
  param:param,
})

export const changeFilterParam = (fieldName, fieldValue) => ({
  type: types.CHANGE_FILTER_PARAM,
  fieldName:fieldName,
  fieldValue:fieldValue,
})

export const requestListRealisateur = () => ({
  type: types.REQUEST_LIST_REALISATEUR,
  isLoaded: false,
  hasError:false,
})

export const receivedListRealisateur = result => ({
  type: types.RECEIVED_LIST_REALISATEUR,
  isLoaded: true,
  realisateurs:{result},
  hasError:false,
})

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
})

export const receivedListActeur  = (result,acteurMap) => ({
  type: types.RECEIVED_LIST_ACTEUR,
  isLoaded: true,
  acteurs:{result},
  acteurMap:{acteurMap},
  hasError:false,
})

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
  isLoaded: true,
  isUpdated : false,
  film:{
    annee:'',
    titre:'',
    titreO:'',
    realisateur : {id:''},
    realisateurs : [],
    dvd:{id:'',annee:'',zone:1},
    acteurs:[],
    ripped : '',
  },
  newActeur : {
    nom : '',
    prenom : '',
    id : 0,
    checked : true,
  },
  newActeursList : [],
})

export const addActeur = () => ({
  type: types.REQUEST_ADD_ACTEUR,
})

export const changeNewActChecked = (fieldName, fieldValue) => ({
  type: types.CHANGE_ACTEUR_CHECKED_PARAM,
  fieldName:fieldName,
  fieldValue:fieldValue,
})

/************************************************************/



/************ Personne Edit *************************************/
export const requestUpdatePersonne = () => ({
  type: types.REQUEST_UPDATE_PERSONNE,
  isLoaded: false,
  hasError:false,
});

export const receivedUpdatePersonne = (personneSelected) => ({
  type: types.RECEIVED_UPDATE_PERSONNE,
  isLoaded: true,
  hasError:false,
  personneSelected:personneSelected,
});

export const errorOccuredWhenRequestUpdatePersonne = (error) => ({
  type: types.ERROR_WHEN_UPDATE_PERSONNE,
  isLoaded: true,
  error:error,
  hasError:true,
})

export const initSearchPersonneForm = () => ({
  type: types.INIT_SEARCH_PERSONNE,
  personneSelected:{
    id:'',
    nom:'',
    prenom:'',
  },
})

export const changePersonneParam = (fieldName,fieldValue) =>({
  type: types.CHANGE_PERSONNE_PARAM,
  fieldName:fieldName,
  fieldValue:fieldValue,
})

export const requestFetchAllPersonne = (personneId) => ({
  type: types.REQUEST_ALL_PERSONNE,
  isLoaded: false,
  hasError:false,
  personneMap:{},
  personneSelected:{
    id:personneId,
  },
});

export const receivedFetchAllPersonne = (result,personneMap) => ({
  type: types.RECEIVED_ALL_PERSONNE,
  isLoaded: true,
  allPersonne:result,
  personneMap:personneMap,
  hasError:false,
});

export const errorOccuredWhenFetchAllPersonne = (error) => ({
  type: types.ERROR_WHEN_REQUEST_ALL_PERSONNE,
  isLoaded: true,
  error:error,
  hasError:true,
})

export const selectPersonne = (selected) => ({
  type: types.REQUEST_SELECT_PERSONNE,
  isLoaded: true,
  hasError:true,
  personneSelected:selected,
})

export function fetchAllPersonne(realId){
  return (dispatch) => {
    dispatch(requestFetchAllPersonne(realId));
   return fetch(rest_api_url+'/personnes', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
   }).then(result => result.json())
   .then((result) => {
      dispatch(receivedFetchAllPersonne(result,buildIndexListActeur(result)));
   },
   (error)=>{
     dispatch(errorOccuredWhenFetchAllPersonne(error));
   }
 )
  }
}
export function update(personneSelected) {
  let personne = {id:personneSelected.id,nom:personneSelected.nom.toUpperCase(),prenom:personneSelected.prenom.toUpperCase()}
  return (dispatch) => {
    dispatch(requestUpdatePersonne());
   return fetch(rest_api_url+'personnes/byId/'+personne.id, {
    method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personne)
   }).then((result) => {
      dispatch(receivedUpdatePersonne(personne));
   },
   (error)=>{
     dispatch(errorOccuredWhenRequestUpdatePersonne(error));
   }
 )
}
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
  newActeur : {
    nom : '',
    prenom : '',
    id : 0,
    checked : true,
  },
  newActeursList : [],
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

export const handleNewActeursChange = (fieldName, fieldValue) => ({
  type: types.CHANGE_ACTEUR_PARAM,
  fieldName:fieldName,
  fieldValue:fieldValue,
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

export const receivedUpdateFilm = (result) => ({
  type: types.RECEIVED_UPDATE_FILM,
  isLoaded: true,
  hasError:false,
  postStatus:result,
});

export const errorOccuredWhenUpdateFilm = (error) => ({
  type: types.ERROR_WHEN_UPDATE_FILM,
  isLoaded: true,
  error:error,
  hasError:true,
})

export function updateFilm(film,newActeursList){
  let newList = handleNewActeursList(newActeursList)
  /*
  for(let i=0;i<newActeursList.length;i++){
    if(newActeursList[i].checked===true){
      newList.push(newActeursList[i]);
    }
  }
  */
  film.newActeurDtoSet = Object.assign([],film.newActeurDtoSet,newList)
  return (dispatch) => {
    dispatch(requestUpdateFilm());
    fetch(rest_api_url+'films/'+film.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(film)
    }).then((result) => {
       dispatch(receivedUpdateFilm(result));
    },
    (error)=>{
      dispatch(errorOccuredWhenUpdateFilm(error));
    }
  )}
}

export const requestSaveFilm = () => ({
  type: types.REQUEST_SAVE_FILM,
  isLoaded: false,
  isUpdated: false,
  hasError:false,
});

export const receivedSaveFilm = () => ({
  type: types.RECEIVED_SAVE_FILM,
  isLoaded: true,
  isUpdated: true,
  hasError:false,
});

export const errorOccuredWhenSaveFilm = (error) => ({
  type: types.ERROR_WHEN_SAVE_FILM,
  isLoaded: true,
  error:error,
  isUpdated: false,
  hasError:true,
})

export function saveFilm(film){
  return (dispatch) => {
    dispatch(requestSaveFilm());
    fetch(rest_api_url+'films', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(film)
    }).then((result) => {
      console.log(result);
       dispatch(receivedSaveFilm());
    },
    (error)=>{
      dispatch(errorOccuredWhenSaveFilm(error));
    }
  )}
}
/************************************************************/