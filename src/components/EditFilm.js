import React, { Component } from 'react';
import Dvd from "./Dvd";
import Annee from "./Annee";
import Realisateur from "./Realisateur";
import Acteurs from "./Acteurs";
import {printPersonne,rest_api_url} from '../pages' // import our pages
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {fetchFilmById} from '../actions'

class EditFilm extends Component {
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchFilmById(Number(this.props.match.params.filmId));
  }
  handleChange(event) {
      let film = Object.assign({}, this.props.film);
      if(event.target.id==='titre'){
        film.titre=event.target.value;
      }else{
        film.titreO=event.target.value;
      }

      this.setState({film});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.doSubmit(this.state.film);
  }

  getDataFromRealisateur = (realisateur) => {
    console.log('realisateur='+realisateur);
    this.setState({realisateur: realisateur });
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
                <input type="text" id="titre" className="form-control" defaultValue={film.titre} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <label>Titre Original</label>
                <input type="text" id="titreO" className="form-control" defaultValue={film.titreO==null?'':film.titreO} onChange={this.handleChange}/>
              </div>
              <Annee film_annee={film.annee} label='Année'/>
              <Dvd dvd={dvd}/>
              <Annee film_annee={dvd.annee} label='Année DVD'/>
              <Realisateur key={realisateur.id} id={realisateur.id} print={printPersonne(realisateur.prenom,realisateur.nom)} label='Réalisateur' callbackFromEditFilm={this.getDataFromRealisateur}/>
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
}
const mapStateToProps = (state, ownProps) => {
  return { film: state.filmEdit.film, isLoaded:state.filmEdit.isLoaded, error:state.filmEdit.error, id : ownProps.match.params.filmId };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFilmById: filmId => dispatch(fetchFilmById(filmId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditFilm))