import React, { Component } from 'react';
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
export default Home
