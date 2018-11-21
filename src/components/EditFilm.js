import React, { Component } from 'react';
import Dvd from "./Dvd";
import Annee from "./Annee";
import Realisateur from "./Realisateur";
import Acteurs from "./Acteurs";
import {printPersonne,rest_api_url} from '../pages' // import our pages
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {fetchFilmById,postFilm,changeTitre} from '../actions'

class EditFilm extends Component {
  componentDidMount(){
    this.props.fetchFilmById(this.props.match.params.filmId);
  }
  handleTitreChange = (event) => {
      this.props.changeTitre(event.target.id,event.target.value);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postFilm(this.state.film);
  }

  getDataFromActeurs = (acteurs) => {
    this.setState({acteurs: acteurs });
  }

  doSubmit = (film) => {
    //console.log('film='+JSON.stringify(film));
    fetch(rest_api_url+'films/byId/'+film.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(film)
    }).then((result)=> {
        this.setState({isUpdated: true});
    },
    (error)=>{
      this.setState({error,isLoaded: true,isUpdated:false});
      console.log('error='+error);
    }
  )
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
      const acteurs = film.acteurs;
      return(
        <div className="container">
        <form id="principal" onSubmit={this.handleSubmit}>
            <div className="col-md-7 offset-md-2">
            <h2>Film Edition</h2>
              <div className="form-group">
                <label htmlFor="titre">Titre</label>
                <input type="text" id="titre" ref="titre" className="form-control" defaultValue={film.titre} onChange={this.handleTitreChange}/>
              </div>
              <div className="form-group">
                <label>Titre Original</label>
                <input type="text" id="titreO" className="form-control" defaultValue={film.titreO==null?'':film.titreO} onChange={this.handleTitreChange}/>
              </div>
              <Annee film_annee={film.annee} label='Année'/>
              <Dvd dvd={dvd}/>
              <Annee film_annee={dvd.annee} label='Année DVD'/>
              <Realisateur key={realisateur.id} print={printPersonne(realisateur.prenom,realisateur.nom)} label='Réalisateur'/>
              <Acteurs acteurs={acteurs} label='Acteurs' callbackFromEditFilm={this.getDataFromActeurs}/>
              <button type="submit" className="btn btn-primary">Submit</button>
              <div>{isUpdated}</div>
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
  error : PropTypes.object,
  id : PropTypes.string,
}
const mapStateToProps = (state, ownProps) => {
  return { 
    film: state.filmEdit.film, 
    isLoaded:state.filmEdit.isLoaded, 
    error:state.filmEdit.error, 
    id : ownProps.match.params.filmId,
    fieldValue : state.fieldValue,
    fieldName : state.fieldName,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFilmById: filmId => dispatch(fetchFilmById(filmId)),
    changeTitre : (fieldName, fieldValue) => dispatch(changeTitre(fieldName, fieldValue)),
    postFilm : () => dispatch(postFilm()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditFilm))