import React, { PureComponent } from 'react';
import {printPersonne} from '../pages' // import our pages
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {changeRealisateur} from '../actions'

class Realisateur extends PureComponent {
  changeRealisateur = (event) => {
    this.props.changeRealisateur(Number(event.target.value));
  }
  
  render() {
    if(this.props.hasError){
      return <div className="container-fluid text-center"><h3>Error : {this.props.error.message} film</h3></div>;
    }else if(this.props.film.realisateur===undefined){
      return <div className="container-fluid text-center"><h3>Loading...</h3></div>;
    }else{
      return(
        <div className="form-group">
            <label>{this.props.label}</label>
            <select className="form-control" name='realisateurSelected' value={this.props.film.realisateur.id} onChange={this.changeRealisateur}>
            <option value={undefined}>Non renseigné</option>
            {
              this.props.realisateurs.map((real)=>{
                return <option key={real.id} value={real.id}>{printPersonne(real.prenom,real.nom)}</option>
              })
            }
            </select>
        </div>
      )
  }
  }
}
Realisateur.propTypes = {
  realisateurs : PropTypes.array,
}
const mapStateToProps = state => {
  return { 
    realisateurs: state.realisateurList.realisateurs,
    isLoaded:state.realisateurList.isLoaded,
    error:state.realisateurList.error,
    hasError: state.realisateurList.hasError,
    film : state.filmEdit.film,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeRealisateur: realisateurId => dispatch(changeRealisateur(realisateurId))
  };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Realisateur))

