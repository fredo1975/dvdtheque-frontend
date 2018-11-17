import React, { Component } from 'react';
import FilmList from "./FilmList";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {fetchFilms} from '../actions'

class Home extends Component {

  componentDidMount(){
    this.props.fetchFilms();
  }

  render() {
    const {films,error,isLoaded } = this.props;
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

const mapStateToProps = state => {
  return { films: state.films,isLoaded:state.isLoaded };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilms: () => dispatch(fetchFilms())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))