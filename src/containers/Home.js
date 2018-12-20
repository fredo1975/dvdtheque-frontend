import React, { Component } from 'react';
import FilmList from "../components/FilmList";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {fetchFilms,fetchRealisateurs,fetchActeurs} from '../actions'
import PropTypes from 'prop-types'

class Home extends Component {

  componentDidMount(){
    this.props.fetchFilms();
    this.props.fetchRealisateurs();
    this.props.fetchActeurs();
  }

  render() {
    const {
      films,
      isFilmListLoaded,
      filmFetchListError,
      hasFetchListFilmError,
      realisateurListLoaded,
      realisateurListFetchError,
      hasFetchListRealisateurError,
      acteurListLoaded,
      acteurListFetchError,
      hasFetchListActeurError 
    } = this.props;

    const isLoaded = isFilmListLoaded && realisateurListLoaded && acteurListLoaded;

    const hasError = hasFetchListFilmError && hasFetchListRealisateurError && hasFetchListActeurError;
    if (hasError) {
      if(hasFetchListFilmError){
        return <div className="container-fluid text-center"><h3>Error : {filmFetchListError.message} Film list</h3></div>;
      }
      if(hasFetchListRealisateurError){
        return <div className="container-fluid text-center"><h3>Error : {realisateurListFetchError.message} Realisateur list</h3></div>;
      }
      if(hasFetchListActeurError){
        return <div className="container-fluid text-center"><h3>Error : {acteurListFetchError.message} Realisateur list</h3></div>;
      }
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
  return { 
    films: state.filmList.films,
    isFilmListLoaded:state.filmList.isLoaded,
    filmFetchListError:state.filmList.error,
    hasFetchListFilmError:state.filmList.hasError,
    realisateurListLoaded:state.realisateurList.isLoaded,
    realisateurListFetchError:state.realisateurList.error,
    hasFetchListRealisateurError:state.filmList.hasError,
    acteurListLoaded:state.acteurList.isLoaded,
    acteurListFetchError:state.acteurList.error,
    hasFetchListActeurError:state.acteurList.hasError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilms: () => dispatch(fetchFilms()),
    fetchRealisateurs : () => dispatch(fetchRealisateurs()),
    fetchActeurs : () => dispatch(fetchActeurs()),
  };
};

Home.propTypes = {
  isLoaded : PropTypes.bool,
  hasError : PropTypes.bool,
  films : PropTypes.array,
  error : PropTypes.object,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))