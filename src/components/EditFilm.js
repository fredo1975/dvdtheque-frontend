import React, { Component } from 'react';
import Dvd from "./Dvd";

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

  render() {
    const {film,err,isLoaded } = this.state;
    console.log('this.props.match.params.filmId='+this.props.match.params.filmId);

    if (!isLoaded) {
      return <div className="container-fluid text-center">Loading...</div>;
    }else{
    return(
      <div className="container-fluid text-center">
      <form id="principal">
        <div className="row justify-content-md-center">
          <div className="col-md-2 col-md-offset-5 text-center">
            <div className="form-group">
              <label>Titre
                <input type="text" id="titre"  className="form-control" defaultValue={film.titre}/>
              </label>
            </div>
            <div className="form-group">
              <label>Titre Original
                <input type="text" id="titreO"  className="form-control" defaultValue={film.titreO==null?'':film.titreO}/>
              </label>
            </div>
            <div className="form-group">
              <label>Année
                <input type="text" id="annee"  className="form-control" defaultValue={film.annee}/>
              </label>
            </div>
            <Dvd dvd={film.dvd}/>
          </div>
        </div>
      </form>
      </div>
    )
  }
  }
}

export default EditFilm;
