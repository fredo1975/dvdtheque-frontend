import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import FilmList from "./FilmList";
import Header from "./Header";
import {AddFilm, UpdatePersonne, AddPersonne} from '../pages' // import our pages

class Main extends Component {
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
    const Main = () => (
      <Main>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/AddFilm' component={AddFilm}/>
          <Route path='/AddPersonne' component={AddPersonne}/>
        </Switch>
        <div className="container-fluid text-center">
          <FilmList films={Array.from(films)} />
        </div>
      </Main>
    )
    if (error) {
      return <div>Error: {error.message}</div>;
    }else{
      return(
        <div className="container-fluid text-center">
          <FilmList films={Array.from(films)} />
        </div>
      )
    }
  }
}

export default Main
