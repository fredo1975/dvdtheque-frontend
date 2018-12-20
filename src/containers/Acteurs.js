import React, { PureComponent } from 'react';
import {printPersonne} from '../pages' // import our pages
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {changeActeur,handleNewActeursChange,addActeur,changeNewActChecked} from '../actions'

class Acteurs extends PureComponent {
  getSelectedFromActeurList = (acteurs) => {
    var selected = selected || [];
    if(acteurs===undefined || acteurs.length===0){

    }else{
      acteurs.map(acteur=>selected.push(acteur.id))
    }
    return selected;
  }
  handleSelect = (event) => {
    var options = event.target.options;
    var selectedValue = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        let acteur = {id:Number(options[i].value),...this.props.acteurMap[options[i].value]}
        selectedValue.push(acteur);
      }
    }
    this.props.changeActeur(selectedValue);
  }
  init = () => {
    //this.props.requestAddFilm();
  }
  addActeur = () => {
    this.props.addActeur();
  }
  handleNewActCheckedParamChange= (event) => {
    this.props.changeNewActChecked(event.target.id,event.target.checked);
  }
  handleNewActeursChange = (event) => {
    this.props.handleNewActeursChange(event.target.id,event.target.value);
  }
  render() {
    const isLoaded = this.props.isLoaded;
    const label = this.props.label;
    const selected = this.getSelectedFromActeurList(this.props.film.acteurs);
    if(this.props.hasError){
      return <div className="container-fluid text-center"><h3>Error : {this.state.error.message} film</h3></div>;
    }else if (!isLoaded) {
      return <div className="container-fluid text-center"><h3>Loading...</h3></div>;
    }else{
      const acteurs_list = this.props.acteurs
      return(
        <div className="row">
        <div className="col-md-4">
          <div className="form-group">
          <label>{label}
            <select className="custom-select" size="20" multiple defaultValue={selected} onChange={this.handleSelect}>
            {
              acteurs_list.map(acteur=>{
                return (
                  <option key={acteur.id} value={acteur.id}>{printPersonne(acteur.prenom,acteur.nom)}</option>
                )
              })
            }
            </select>
            </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
            <label>Nouveaux Acteurs{
              this.props.newActeursList.map(act => {
                return(
                  <div className="checkbox">
                    <label><input type="checkbox" key={act.id} id={act.id} checked={act.checked} onChange={this.handleNewActCheckedParamChange}/> {printPersonne(act.prenom,act.nom)}</label>
                  </div>
                )
              }
            )}
            </label>
              </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
            <p><b>Ajout d'un Acteur</b></p>
              <div className="form-group">
                  <label htmlFor="Nom">Nom</label>
                  <input type="text" id="nom" ref="nom" className="form-control" value={this.props.newActeur.nom} onChange={this.handleNewActeursChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="prenom">Prénom</label>
                <input type="text" id="prenom" ref="prenom" className="form-control" value={this.props.newActeur.prenom} onChange={this.handleNewActeursChange}/>
              </div>
            </div>
            <div className="col-md-8 offset-md-4"><button type="button" className="btn btn-primary" name='addActeur' onClick={this.addActeur}>Ajouter</button></div>
          </div>
        </div>
      )
    }
  }
}
Acteurs.propTypes = {
  acteurs : PropTypes.array,
  newActeur : PropTypes.object,
  newActeursList : PropTypes.array,
  isLoaded : PropTypes.bool,
  hasError : PropTypes.bool,
  film : PropTypes.object,
  acteurMap : PropTypes.object,
}
const mapDispatchToProps = dispatch => {
  return {
    changeActeur : (selectedValue) => dispatch(changeActeur(selectedValue)),
    addActeur : () => dispatch(addActeur()),
    handleNewActeursChange : (fieldName, fieldValue) => dispatch(handleNewActeursChange(fieldName, fieldValue)),
    changeNewActChecked : (fieldName, fieldValue) => dispatch(changeNewActChecked(fieldName, fieldValue)),
  };
};
const mapStateToProps = state => {
  return { 
    acteurs: state.acteurList.acteurs,
    isLoaded:state.acteurList.isLoaded,
    error:state.acteurList.error,
    hasError: state.acteurList.hasError,
    film:state.filmEdit.film,
    acteurMap:state.acteurList.acteurMap,
    newActeursList : state.filmEdit.newActeursList,
    newActeur : state.filmEdit.newActeur,
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Acteurs))
