import React, { Component } from 'react';
import {AddFilm, UpdatePersonne, AddPersonne} from '../pages' // import our pages
import { Switch, Route } from 'react-router-dom'
import FilmList from "./FilmList";

class Home extends Component {
  constructor(){
    super();
    this.state = {films:[]};
  }

  componentDidMount(){
    fetch('http://localhost:8083/dvdtheque/films', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then((result)=> {
          this.setState({films:result});
    }
    ,
    (error)=>{
      this.setstate({error});
    }
    )
  }

  render() {
    const { error, films } = this.state;
    return(
      <div className="container-fluid text-center">
        <FilmList films={Array.from(films)} />
      </div>
    )
  }
}

export default Home
