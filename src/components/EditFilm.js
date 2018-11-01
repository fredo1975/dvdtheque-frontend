import React, { Component } from 'react';
import Dvd from "./Dvd";
import Annee from "./Annee";
import Realisateur from "./Realisateur";
import Acteurs from "./Acteurs";
import {printPersonne,rest_api_url} from '../pages' // import our pages

class EditFilm extends Component {
  constructor(props){
    super(props);
    this.state = {film:null,err:null,isLoaded: false};
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
      //this.setState(state => ({film: event.target.value.toString()}));
      console.log('event.target.value='+event.target.value);
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
        <form id="principal">
            <div className="col-md-5 offset-md-3">
            <h2>Film Edition</h2>
              <div className="form-group">
                <label for="titre">Titre</label>
                <input type="text" id="titre" className="form-control" value={film.titre}/>
              </div>
              <div className="form-group">
                <label>Titre Original</label>
                <input type="text" id="titreO" className="form-control" value={film.titreO==null?'':film.titreO}/>
              </div>
              <Annee film_annee={film.annee} label='Année'/>
              <Dvd dvd={dvd}/>
              <Annee film_annee={dvd.annee} label='Année DVD'/>
              <Realisateur key={realisateur.id} id={realisateur.id} print={printPersonne(realisateur.prenom,realisateur.nom)} label='Réalisateur' />
              <Acteurs acteurs={acteurs} label='Acteurs' />
            </div>
        </form>
        </div>
      )
  }
  }
}

export default EditFilm;
