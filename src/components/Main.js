import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from "./Home";
import EditFilm from "./EditFilm";
import AddFilm from "./AddFilm";
import UpdatePersonne from "./UpdatePersonne";

export default class Main extends Component {
  render() {
    return(
        <main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/AddFilm' component={AddFilm}/>
            <Route path='/UpdatePersonne/:realId' component={UpdatePersonne}/>
            <Route path='/UpdatePersonne' component={UpdatePersonne}/>
            <Route path="/EditFilm/:filmId" component={EditFilm} />
          </Switch>
        </main>
      )
  }
}
