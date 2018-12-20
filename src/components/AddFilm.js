import React, { Component } from 'react';
import Dvd from "./Dvd";
import Annee from "./Annee";
import Realisateur from "./Realisateur";
import Acteurs from "./Acteurs";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {requestAddFilm,saveFilm,changeFilmParam,fetchRealisateurs,fetchActeurs} from '../actions'
import {handleNewActeursList} from '../pages'

class AddFilm extends Component {
  componentDidMount(){
    this.props.requestAddFilm();
    this.props.fetchRealisateurs();
    this.props.fetchActeurs();
  }
  handleFilmParamChange = (event) => {
    if(event.target.id==='ripped'){
      this.props.changeFilmParam(event.target.id,event.target.checked);
    }else{
      this.props.changeFilmParam(event.target.id,event.target.value);
    }
  }

  init = () => {
    this.props.requestAddFilm();
  }
  handleSubmit = (event) => {
    event.preventDefault();
    let newFilm = {...this.props.film};
    if(newFilm.titre==='' || newFilm.titre===undefined){
      alert('Il faut un titre au film')
      return
    }
    if(newFilm.annee==='' || newFilm.annee===undefined){
      alert('Il faut une année au film')
      return
    }
    if(newFilm.realisateur.id==='' || newFilm.realisateur.id===undefined){
      alert('Il faut un réalisateur au film')
      return
    }
    newFilm.annee =  Number(newFilm.annee);
    newFilm.dvd.annee = Number(newFilm.dvd.annee);
    newFilm.dvd.id=null;
    let realisateur = {id:Number(newFilm.realisateur.id)}
    let realisateurs = []
    realisateurs.push(realisateur);
    newFilm.realisateurs = Object.assign([],newFilm.realisateurs,realisateurs);
    let newList = handleNewActeursList(this.props.newActeursList)
    /*
    let newList = []
    for(let i=0;i<this.props.newActeursList.length;i++){
      if(this.props.newActeursList[i].checked===true){
        newList.push(this.props.newActeursList[i]);
      }
    }*/
    let isActeurExists = true;
    if(newFilm.acteurs===undefined || newFilm.acteurs.length===0){
      isActeurExists = false
    }
    if(newList===undefined || newList.length===0){
    }else{
      isActeurExists = true
    }
    if(isActeurExists===false){
      alert('Il faut au moins un acteur au film')
      return
    }
    newFilm.newActeurDtoSet = Object.assign([],newFilm.newActeurDtoSet ,newList)
    let film = Object.assign({},newFilm);
    this.props.saveFilm(film);
  }
  render() {
    const isUpdated = this.props.isUpdated===true?'Le Film a bien été sauvé':'';
    const isLoaded = true;
      return(
        <div className="container">
        <form id="principal" onSubmit={this.handleSubmit}>
        <div className="row">
            <div className="col-md-10 offset-md-2">
            <h2>Ajout d'un Film</h2>
              <div className="form-group">
                <label htmlFor="titre">Titre</label>
                <input type="text" id="titre" ref="titre" className="form-control" value={this.props.film.titre} onChange={this.handleFilmParamChange}/>
              </div>
              <div className="form-group">
                <label>Titre Original</label>
                <input type="text" id="titreO" ref="titreO" className="form-control" value={this.props.film.titreO} onChange={this.handleFilmParamChange}/>
              </div>
              <Annee label='Année' obj='film'/>
              <Dvd obj='dvd'/>
              <Annee label='Année DVD' obj='dvd'/>
              <Realisateur label='Réalisateur'/>
              <Acteurs label='Acteurs' isLoaded={isLoaded}/>
              <div className="checkbox">
                <label><input type="checkbox" id="ripped" checked={this.props.film.ripped} onChange={this.handleFilmParamChange}/> Ripped</label>
              </div>
            </div>
            <div className="col-md-8 offset-md-4">
              <button type="submit" className="btn btn-primary" name='save' ref="save">Sauver</button> <button type="button" className="btn btn-primary" onClick={this.init}>Réinitialiser</button>
            </div>
            <div className="col-md-3 offset-md-4">
              <strong>{isUpdated}</strong>
            </div>
            </div>
        </form>
        </div>
      )
  }
  
}
AddFilm.propTypes = {
  film : PropTypes.object,
  dvd : PropTypes.object,
  realisateur : PropTypes.object,
  acteurs : PropTypes.array,
  filmId : PropTypes.number,
  isUpdated : PropTypes.bool,
  fieldValue : PropTypes.string,
  fieldName : PropTypes.string,
}

const mapStateToProps = (state, ownProps) => {
  return { 
    film : state.filmEdit.film,
    isUpdated : state.filmEdit.isUpdated,
    fieldValue : state.fieldValue,
    fieldName : state.fieldName,
    newActeursList : state.filmEdit.newActeursList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestAddFilm: () => dispatch(requestAddFilm()),
    changeFilmParam : (fieldName, fieldValue) => dispatch(changeFilmParam(fieldName, fieldValue)),
    saveFilm : (film) => dispatch(saveFilm(film)),
    fetchRealisateurs : () => dispatch(fetchRealisateurs()),
    fetchActeurs : () => dispatch(fetchActeurs()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddFilm))