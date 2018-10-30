import React, { Component } from 'react';
import FilmList from "./FilmList";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {films:[],err:null,isLoaded: false};
  }

  componentDidMount(){
    fetch('http://localhost:8083/dvdtheque/films', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then((result)=> {
          this.setState({isLoaded: true,films:result});
    },
    (error)=>{
      this.setstate({isLoaded:true,error});
    }
  );
  }

  render() {
    const {films,err,isLoaded } = this.state;
    if (err) {
      return <div className="container-fluid text-center">Error : {err}</div>;
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
