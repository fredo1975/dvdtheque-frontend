import React, { PureComponent } from 'react';
import {printPersonne} from '../pages' // import our pages
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {changeActeur} from '../actions'


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
  render() {
    const acteurs_list = this.props.acteurs;
    const isLoaded = this.props.isLoaded;
    const label = this.props.label;
    const selected = this.getSelectedFromActeurList(this.props.film.acteurs);
    if(this.props.hasError){
      return <div className="container-fluid text-center"><h3>Error : {this.state.error.message} film</h3></div>;
    }else if (!isLoaded) {
      return <div className="container-fluid text-center"><h3>Loading...</h3></div>;
    }else{
      return(
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
      )
    }
  }
}
Acteurs.propTypes = {
  acteurs : PropTypes.array,
}
const mapDispatchToProps = dispatch => {
  return {
    changeActeur : (selectedValue) => dispatch(changeActeur(selectedValue)),
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
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Acteurs))
