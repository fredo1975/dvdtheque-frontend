import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from "./Home";
import EditFilm from "./EditFilm";
import AddFilm from "./AddFilm";
import AddActeur from "./AddActeur";
import AddRealisateur from "./AddRealisateur";
import {UpdatePersonne} from '../pages' // import our pages

export default class Main extends Component {
  render() {
    return(
        <main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/AddFilm' component={AddFilm}/>
            <Route path='/AddRealisateur' component={AddRealisateur}/>
            <Route path='/AddActeur' component={AddActeur}/>
            <Route path='/UpdatePersonne' component={UpdatePersonne}/>
            <Route path="/editFilm/:filmId" component={EditFilm} />
          </Switch>
        </main>
      )
  }
}
