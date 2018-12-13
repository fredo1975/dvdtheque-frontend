import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {update,initSearchPersonneForm,changePersonneParam,fetchAllPersonne,selectPersonne} from '../actions'
import {printPersonne} from '../pages' // import our pages

class UpdatePersonne extends Component {
    componentDidMount(){
        this.props.fetchAllPersonne();
    }
    handlePersonneParamChange = (event) => {
        this.props.changePersonneParam(event.target.id,event.target.value);
    }
    init = () => {
        this.props.initSearchPersonneForm();
    }
    
    update = () => {
        this.props.update(this.props.personneSelected);
    }
    handleSubmit = (event) => {
        event.preventDefault();
    }
    selectPersonne = (event) => {
        let personne = this.props.personneMap[event.target.value]
        this.props.selectPersonne(personne);
    }
    render() {
        const {error,hasError,personneSelected,allPersonne,isUpdated} = this.props
        const errorRender=hasError?<div className="container-fluid text-center"><h3>Error : {error.message} personne</h3></div>:''
        const isUpdateRendered = isUpdated?'La personne a bien été modifiée':''
        return(
            <div className="container">
            <form id="principal" onSubmit={this.handleSubmit}>
            <div className="col-md-7 offset-md-2">
            <h2>Modification d'une personne</h2>
                <div className="form-group">
                    <label>Toutes les personnes</label>
                    <select className="form-control" name='personneSelected' value={personneSelected.id} onChange={this.selectPersonne}>
                    <option value={undefined}>Non renseigné</option>
                    {
                    allPersonne.map(p=>{
                        return <option key={p.id} value={p.id}>{printPersonne(p.prenom,p.nom)}</option>
                    })
                    }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" id="prenom" className="form-control" value={personneSelected.prenom} onChange={this.handlePersonneParamChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Nom">Nom</label>
                    <input type="text" id="nom" className="form-control" value={personneSelected.nom} onChange={this.handlePersonneParamChange}/>
                </div>
                <button type="submit" className="btn btn-primary" name='save' onClick={this.update}>Sauver</button>&nbsp;
                <button type="button" className="btn btn-primary" onClick={this.init}>Réinitialiser</button>
                <h2> {errorRender}</h2>
                <div className="col-md-6 offset-md-4">
                <strong>{isUpdateRendered}</strong>
                </div>
            </div>
            </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
      allPersonne : state.personneEdit.allPersonne,
      isUpdated : state.personneEdit.isUpdated,
      fieldValue : state.fieldValue,
      fieldName : state.fieldName,
      error : state.error,
      personneSelected : state.personneEdit.personneSelected,
      personneMap : state.personneEdit.personneMap,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        update : (personne) => dispatch(update(personne)),
        initSearchPersonneForm : () => dispatch(initSearchPersonneForm()),
        changePersonneParam : (fieldName,fieldValue) => dispatch(changePersonneParam(fieldName,fieldValue)),
        fetchAllPersonne : () => dispatch(fetchAllPersonne()),
        selectPersonne : (personne) => dispatch(selectPersonne(personne)),
    };
  };
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdatePersonne))