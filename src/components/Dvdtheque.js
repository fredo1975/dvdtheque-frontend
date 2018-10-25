import React, { Component } from 'react';
import FilmList from "./FilmList";
import Header from "./Header";
import { Switch, Route, Link } from 'react-router-dom'; // import the react-router-dom components
import { Home, AddFilm, UpdatePersonne, AddPersonne } from '../pages' // import our pages

class Dvdtheque extends Component {
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
      this.setstate({
        error
      });
    }
    )
  }


  render() {
    const { error, films } = this.state;
    const Main = () => (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/AddFilm' component={AddFilm}/>
          <Route exact path='/UpdatePersonne' component={UpdatePersonne} />
          <Route exact path='/AddPersonne' component={AddPersonne} />
        </Switch>
      </main>
  )
    if (error) {
      return <div>Error: {error.message}</div>;
    }else{
      return(
        <div >
          <Header/>
          - {Main} -
          <div className="container-fluid text-center">
          <FilmList films={Array.from(films)} />
          </div>
        </div>
      )
    }
  }
}
export default Dvdtheque;
