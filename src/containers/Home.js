import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {fetchFilms} from '../actions'
import PropTypes from 'prop-types'

class Home extends Component {

  componentDidMount(){
    this.props.fetchFilms();
  }

  render() {
    const {
      films,
      filter,
      isFilmListLoaded,
      filmFetchListError,
      hasFetchListFilmError,
    } = this.props;

    const isLoaded = isFilmListLoaded;

    const hasError = hasFetchListFilmError;
    let filmList=[]
    if (hasError) {
      if(hasFetchListFilmError){
        return <div className="container-fluid text-center"><h3>Error : {filmFetchListError.message} Film list</h3></div>;
      }
      
    } else if (!isLoaded) {
      return <div className="container-fluid text-center"><h3>Loading...</h3></div>;
    }else{
      console.log(filter);
      if(filter.selectedTitre==='' && Object.keys(filter.selectedRealisateur).length === 0 && Object.keys(filter.selectedActeur).length === 0 && filter.ripped==='' && filter.selectedAnnee===''){
        for(let i=0;i<films.length;i++){
          filmList.push(films[i])
        }
      }else{
        for(let i=0;i<filter.filteredFilms.length;i++){
          filmList.push(filter.filteredFilms[i])
        }
      }

      return(
        <div className="container-fluid text-center">
         
        </div>
      )
    }
  }
}


const mapStateToProps = state => {
  return { 
    films: state.filmList.films,
    filter : state.filmList.filter,
    isFilmListLoaded:state.filmList.isLoaded,
    filmFetchListError:state.filmList.error,
    hasFetchListFilmError:state.filmList.hasError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilms: () => dispatch(fetchFilms()),
  };
};

Home.propTypes = {
  isLoaded : PropTypes.bool,
  hasError : PropTypes.bool,
  films : PropTypes.array,
  error : PropTypes.object,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))