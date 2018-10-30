import React, { Component } from 'react';
import Dvd from "./Dvd";
import Annee from "./Annee";
import Realisateur from "./Realisateur";
import {printRealisateur} from '../pages' // import our pages

class EditFilm extends Component {
  constructor(props){
    super(props);
    this.state = {film:null,err:null,isLoaded: false};
  }

  componentDidMount(){
    fetch('http://localhost:8083/dvdtheque/films/byId/'+this.props.match.params.filmId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then((result)=> {
          this.setState({isLoaded: true,film:result});
    },
    (error)=>{
      this.setstate({err:error,isLoaded: true,});
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
    if (!isLoaded) {
      return <div className="container-fluid text-center"><h3>Loading...</h3></div>;
    }else{
      const film = this.state.film;
      const dvd = this.state.film.dvd;
      const realisateur = this.state.film.personnesFilm.realisateur.personne;
      //console.log('this.state.film='+this.state.film.dvd.zone);
      return(
        <div className="container">
        <form id="principal">
          <div className="row">
            <div className="col-md-5 offset-md-3">
            <h2>Film Edition</h2>
              <div className="form-group">
                <label>Titre</label>
                <input type="text" id="titre" className="form-control" value={film.titre}/>
              </div>
              <div className="form-group">
                <label>Titre Original</label>
                <input type="text" id="titreO" className="form-control" value={film.titreO==null?'':film.titreO}/>
              </div>
              <Annee film_annee={film.annee} label='Année'/>
              <Dvd dvd={dvd}/>
              <Annee film_annee={dvd.annee} label='Année DVD'/>
              <Realisateur key={realisateur.id} id={realisateur.id} print={printRealisateur(realisateur.prenom,realisateur.nom)} label='Réalisateur' />
            </div>
          </div>
        </form>
        </div>
      )
  }
  }
}

export default EditFilm;
