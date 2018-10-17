import React, { Component } from 'react';
import FilmList from "./components/FilmList";

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
        },

    })
        .then(result=> {
                this.setState({films:result.json()});
                console.log("state",this.state);
        });
  }

  render() {
    return (
      <div className="Dvdtheque">
        <FilmList films={Array.from(this.state.films)} />
      </div>
    );
  }
}
export default Dvdtheque;
