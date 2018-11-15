import React, { Component } from 'react';
import FilmList from "./FilmList";
import {rest_api_url} from '../pages' // import our pages
import {fetchFilms} from '../actions'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {films:[],error:null,isLoaded: false};
  }

  componentDidMount(){
    fetch(rest_api_url+'films', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then((result)=> {
          this.setState({isLoaded: true,films:result});
    },
    (error)=>{
      this.setState({isLoaded:true,error});
    }
  );
  }

  render() {
    const {films,error,isLoaded } = this.state;
    if (error) {
      return <div className="container-fluid text-center"><h3>Error : {error.message} film list</h3></div>;
    } else if (!isLoaded) {
      return <div className="container-fluid text-center"><h3>Loading...</h3></div>;
    }else{
      return(
        <div className="container-fluid text-center">
          <FilmList films={films} />
        </div>
      )
    }
  }
}
export default Home
