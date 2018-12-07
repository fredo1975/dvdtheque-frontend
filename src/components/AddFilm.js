import React, { Component } from 'react';
import Dvd from "./Dvd";
import Annee from "./Annee";
import Realisateur from "./Realisateur";
import Acteurs from "./Acteurs";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {requestAddFilm,saveFilm,changeFilmParam,fetchRealisateurs,fetchActeurs} from '../actions'

class AddFilm extends Component {
  constructor(props){
    super(props);
    this.state = {film:{
      annee:undefined,
      titre:'',
      titreO:'',
      realisateur : {id:'',},
      realisateurs : [],
      dvd:{id:undefined,annee:undefined,zone:1},
      acteurs:[],
      ripped:false,}
    }
  }

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
    newFilm.annee =  Number(newFilm.annee);
    newFilm.dvd.annee = Number(newFilm.dvd.annee);
    newFilm.dvd.id=null;
    let realisateur = {id:Number(newFilm.realisateur.id)}
    let realisateurs = []
    realisateurs.push(realisateur);
    newFilm.realisateurs = Object.assign([],newFilm.realisateurs,realisateurs);
    let film = Object.assign({},newFilm);
    this.props.saveFilm(film);
  }
  render() {
    const isUpdated = this.props.isUpdated===true?'Le Film a bien été sauvé':'';
    const isLoaded = true;
      return(
        <div className="container">
        <form id="principal" onSubmit={this.handleSubmit}>
            <div className="col-md-10 offset-md-1">
            <h2>Ajout d'un Film</h2>
              <div className="form-group">
                <label htmlFor="titre">Titre</label>
                <input type="text" id="titre" ref="titre" className="form-control" value={this.props.film.titre} onChange={this.handleFilmParamChange}/>
              </div>
              <div className="form-group">
                <label>Titre Original</label>
                <input type="text" id="titreO" className="form-control" value={this.props.film.titreO} onChange={this.handleFilmParamChange}/>
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
            <button type="submit" className="btn btn-primary" name='save'>Sauver</button> <button type="button" className="btn btn-primary" onClick={this.init}>Réinitialiser</button>
            </div>
            <div className="col-md-8 offset-md-2">
              <h3>{isUpdated}</h3>
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