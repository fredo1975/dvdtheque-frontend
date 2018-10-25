import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import FilmList from "./FilmList";
import Home from "./Home";
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

    if (error) {
      return <div>Error: {error.message}</div>;
    }else{
      return(
        <main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/AddFilm' component={AddFilm}/>
            <Route path='/AddPersonne' component={AddPersonne}/>
            <Route path='/UpdatePersonne' component={UpdatePersonne}/>
          </Switch>
        </main>
      )
    }
  }
}

export default Main
