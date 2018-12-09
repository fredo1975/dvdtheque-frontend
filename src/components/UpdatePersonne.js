import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {search,initSearchPersonneForm} from '../actions'

class UpdatePersonne extends Component {
    handlePersonneParamChange = (event) => {
        this.props.changePersonneParam(event.target.id,event.target.value);
    }
    init = () => {
        this.props.initSearchPersonneForm();
    }
    search = () => {
        this.props.search(this.props.personne);
    }
    handleSubmit = (event) => {
        event.preventDefault();
    }
    render() {
        const isUpdated=false
        return(
            <div className="container">
            <form id="principal" onSubmit={this.handleSubmit}>
            <div className="col-md-7 offset-md-2">
            <h2>Modification d'une personne</h2>
                <div className="form-group">
                    <label htmlFor="Nom">Nom</label>
                    <input type="text" id="nom" ref="nom" className="form-control" value={this.props.personne.nom} />
                </div>
                <div className="form-group">
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" id="prenom" ref="prenom" className="form-control" value={this.props.personne.prenom} />
                </div>
                <button type="submit" className="btn btn-primary" name='save'>Sauver</button>&nbsp;
                <button type="button" className="btn btn-primary" name='search' onClick={this.search}>Chercher</button>&nbsp;
                <button type="button" className="btn btn-primary" onClick={this.init}>Réinitialiser</button>
            <h2>{isUpdated}</h2>
            </div>
            </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
      personne : state.personneEdit.personne,
      isUpdated : state.personneEdit.isUpdated,
      fieldValue : state.fieldValue,
      fieldName : state.fieldName,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        search : (personne) => dispatch(search(personne)),
        initSearchPersonneForm : () => dispatch(initSearchPersonneForm()),
    };
  };
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdatePersonne))