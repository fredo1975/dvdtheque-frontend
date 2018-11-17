import React, { Component } from 'react';
import FilmList from "./FilmList";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {fetchFilms} from '../actions'
import PropTypes from 'prop-types'

class Home extends Component {

  componentDidMount(){
    this.props.fetchFilms();
  }

  render() {
    const {films,error,isLoaded,hasError } = this.props;
    if (hasError) {
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
  return { films: state.filmList.films,isLoaded:state.filmList.isLoaded,error:state.filmList.error };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilms: () => dispatch(fetchFilms())
  };
};

Home.propTypes = {
  isLoaded : PropTypes.bool,
  hasError : PropTypes.bool,
  films : PropTypes.array,
  error : PropTypes.object,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))