import React, { Component } from 'react';
import Dvd from "./Dvd";
import Annee from "./Annee";
import Realisateur from "./Realisateur";
import Acteurs from "./Acteurs";
import {printPersonne} from '../pages' // import our pages
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {fetchFilmById,updateFilm,changeFilmParam} from '../actions'

class EditFilm extends Component {
  componentDidMount(){
    this.props.fetchFilmById(this.props.match.params.filmId);
  }
  handleFilmParamChange = (event) => {
    if(event.target.id==='ripped'){
      this.props.changeFilmParam(event.target.id,event.target.checked);
    }else{
      this.props.changeFilmParam(event.target.id,event.target.value);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateFilm(this.props.film);
  }

  render() {
    const {isLoaded,film,error,hasError} = this.props;
    const isUpdated = this.props.isUpdated===true?'Le Film a bien été updaté':'';
    if(hasError){
      return <div className="container-fluid text-center"><h3>Error : {error.message} film</h3></div>;
    }else if (!isLoaded) {
      return <div className="container-fluid text-center"><h3>Loading...</h3></div>;
    }else{
      const dvd = film.dvd;
      const realisateur = film.realisateur;
      return(
        <div className="container">
        <form id="principal" onSubmit={this.handleSubmit}>
            <div className="col-md-7 offset-md-2">
            <h2>Modification de Film</h2>
              <div className="form-group">
                <label htmlFor="titre">Titre</label>
                <input type="text" id="titre" ref="titre" className="form-control" defaultValue={film.titre} onChange={this.handleFilmParamChange}/>
              </div>
              <div className="form-group">
                <label>Titre Original</label>
                <input type="text" id="titreO" className="form-control" defaultValue={film.titreO==null?'':film.titreO} onChange={this.handleFilmParamChange}/>
              </div>
              <Annee label='Année' obj='film'/>
              <Dvd dvd={dvd} obj='dvd'/>
              <Annee label='Année DVD' obj='dvd'/>
              <Realisateur key={realisateur.id} print={printPersonne(realisateur.prenom,realisateur.nom)} label='Réalisateur'/>
              <Acteurs label='Acteurs'/>
              <div className="checkbox">
                <label><input type="checkbox" id="ripped" checked={this.props.film.ripped} onChange={this.handleFilmParamChange}/> Ripped</label>
              </div>
              <button type="submit" className="btn btn-primary">Modifier</button>
              <h2>{isUpdated}</h2>
            </div>
        </form>
        </div>
      )
  }
  }
}
EditFilm.propTypes = {
  film : PropTypes.object,
  dvd : PropTypes.object,
  realisateur : PropTypes.object,
  acteurs : PropTypes.array,
  filmId : PropTypes.number,
  isLoaded : PropTypes.bool,
  isUpdated : PropTypes.bool,
  error : PropTypes.object,
  id : PropTypes.string,
  fieldValue : PropTypes.string,
  fieldName : PropTypes.string,
}
const mapStateToProps = (state, ownProps) => {
  return { 
    film : state.filmEdit.film, 
    isLoaded : state.filmEdit.isLoaded,
    isUpdated : state.filmEdit.isUpdated,
    error : state.filmEdit.error, 
    id : ownProps.match.params.filmId,
    fieldValue : state.fieldValue,
    fieldName : state.fieldName,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFilmById: filmId => dispatch(fetchFilmById(filmId)),
    changeFilmParam : (fieldName, fieldValue) => dispatch(changeFilmParam(fieldName, fieldValue)),
    updateFilm : (film) => dispatch(updateFilm(film)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditFilm))