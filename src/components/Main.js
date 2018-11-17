import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from "./Home";
import EditFilm from "./EditFilm";
import {AddFilm, UpdatePersonne, AddPersonne} from '../pages' // import our pages

export default class Main extends Component {
  

  render() {
    return(
        <main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/AddFilm' component={AddFilm}/>
            <Route path='/AddPersonne' component={AddPersonne}/>
            <Route path='/UpdatePersonne' component={UpdatePersonne}/>
            <Route path="/editFilm/:filmId" component={EditFilm} />
          </Switch>
        </main>
      )
  }
}
