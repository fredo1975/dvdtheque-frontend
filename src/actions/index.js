import * as types from '../constants/ActionTypes'

export const listFilm = text => ({ type: types.LIST_FILM, text })
export const addFilm = text => ({ type: types.ADD_FILM, text })
export const deleteFilm = id => ({ type: types.DELETE_FILM, id })
export const editFilm = (id, text) => ({ type: types.EDIT_FILM, id, text })
//export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter})
