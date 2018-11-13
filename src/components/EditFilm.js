import React, { Component } from 'react';
import Dvd from "./Dvd";
import Annee from "./Annee";
import Realisateur from "./Realisateur";
import Acteurs from "./Acteurs";
import {printPersonne,rest_api_url} from '../pages' // import our pages
import PropTypes from 'prop-types'

export default class EditFilm extends Component {
  constructor(props){
    super(props);
    this.state = {film:null,err:null,isLoaded: false,realisateur:null,acteurs:[],isUpdated:false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    fetch(rest_api_url+'films/byId/'+this.props.match.params.filmId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then((result)=> {
          this.setState({isLoaded: true,film:result});
    },
    (error)=>{
      this.setState({error,isLoaded: true,});
      console.log('error='+error);
    }
    )
  }
  handleChange(event) {
      let film = Object.assign({}, this.state.film);
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
    const isLoaded = this.state.isLoaded;
    if(this.state.error){
      return <div className="container-fluid text-center"><h3>Error : {this.state.error.message} film</h3></div>;
    }else if (!isLoaded) {
      return <div className="container-fluid text-center"><h3>Loading...</h3></div>;
    }else{
      const film = this.state.film;
      const dvd = this.state.film.dvd;
      const realisateur = this.state.film.realisateur;
      const acteurs = this.state.film.acteurs;
      const updated = this.state.isUpdated===true?'Le Film a bien été updaté':'';
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
              <div>{updated}</div>
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
  isUpdated : PropTypes.boolean,
}
