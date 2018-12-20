import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class AddRealisateur extends Component {

    render() {
        const isUpdated=false
        return(
            <div className="container">
            <form id="principal" onSubmit={this.handleSubmit}>
            <div className="col-md-7 offset-md-2">
            <h2>Ajout d'un Réalisateur</h2>
                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" id="nom" ref="nom" className="form-control" value={this.props.film.titre} onChange={this.handleFilmParamChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" id="prenom" ref="prenom" className="form-control" value={this.props.film.titre} onChange={this.handleFilmParamChange}/>
                </div>
                <button type="submit" className="btn btn-primary" name='save'>Sauver</button> <button type="button" className="btn btn-primary" onClick={this.init}>Réinitialiser</button>
            <h2>{isUpdated}</h2>
            </div>
            </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
      film : state.filmEdit.film,
      isUpdated : state.filmEdit.isUpdated,
      fieldValue : state.fieldValue,
      fieldName : state.fieldName,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      
    };
  };
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddRealisateur))