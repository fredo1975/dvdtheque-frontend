import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from "../containers/Home";
import AddFilm from "../containers/AddFilm";
import Export from "../containers/Export";
import Import from "../containers/Import";
import Admin from "../containers/Admin";

export default class Main extends Component {
  render() {
    return(
        <main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/AddFilm' component={AddFilm}/>
            <Route path='/Export' component={Export}/>
            <Route path='/Import' component={Import}/>
            <Route path="/Admin" component={Admin} />
          </Switch>
        </main>
      )
  }
}
