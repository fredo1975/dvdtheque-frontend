import React, { Component } from 'react';
import Dvd from "./Dvd";
import Annee from "./Annee";
import Realisateur from "./Realisateur";
import Acteurs from "./Acteurs";
import {printPersonne,rest_api_url} from '../pages' // import our pages

class EditFilm extends Component {
  constructor(props){
    super(props);
    this.state = {film:null,err:null,isLoaded: false,realisateur:null,acteurs:[]};
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
      if(event.target.id=='titre'){
        film.titre=event.target.value;
      }else{
        film.titreO=event.target.value;
      }
      this.setState({film});
      //console.log('this.state.film.titre='+this.state.film.titre);
  }

  handleSubmit = (event) => {
    event.preventDefault();
      alert('this.state.film.titre=' + this.state.film.titre);
      var res = this.doSubmit(this.state.film);
      alert('res=' + res);

  }

  getDataFromRealisateur = (realisateur) => {
    console.log('realisateur='+realisateur);
    this.setState({realisateur: realisateur });
  }

  getDataFromActeurs = (acteurs) => {
    console.log('acteurs='+acteurs);
    this.setState({acteurs: acteurs });
  }

  doSubmit = (data) => {
    console.log('data='+data.id);
    return fetch(rest_api_url+'films/byId/'+this.props.match.params.filmId, {
      method: 'POST',
      mode: 'CORS',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: this.state.film,
        secondParam: this.props.match.params.filmId,
      })
    }).then(res => {return res;}).catch(err => err);
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
      const realisateur = this.state.film.personnesFilm.realisateur.personne;
      const acteurs = this.state.film.personnesFilm.acteurs;
      //console.log('this.state.film='+this.state.film.dvd.zone);
      return(
        <div className="container">
        <form id="principal" onSubmit={this.handleSubmit}>
            <div className="col-md-5 offset-md-3">
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
            </div>
        </form>
        </div>
      )
  }
  }
}

export default EditFilm;
