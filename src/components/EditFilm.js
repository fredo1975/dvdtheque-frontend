import React, { Component } from 'react';
import Dvd from "./Dvd";
import Annee from "./Annee";

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
      return <div className="container-fluid text-center">Loading...</div>;
    }else{
      const film = this.state.film;
      const dvd = this.state.film.dvd;
      //console.log('this.state.film='+this.state.film.dvd.zone);
      return(

        <div className="container-fluid">

        <form id="principal">
          <div className="row justify-content-md-center">

            <div className="col-md-2 col-md-offset-5 text-center">
            <h2>Film Edition</h2>
              <div className="form-group">
                <label>Titre
                  <input type="text" id="titre" className="form-control" value={film.titre}/>
                </label>
              </div>
              <div className="form-group">
                <label>Titre Original
                  <input type="text" id="titreO" className="form-control" value={film.titreO==null?'':film.titreO}/>
                </label>
              </div>
              <Annee film_annee={film.annee} label='Année'/>
              <Dvd dvd={dvd}/>
              <Annee film_annee={dvd.annee} label='Année DVD'/>
            </div>
          </div>
        </form>
        </div>
      )
  }
  }
}

export default EditFilm;
