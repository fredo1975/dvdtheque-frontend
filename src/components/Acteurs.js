import React, { PureComponent } from 'react';
import {printPersonne} from '../pages' // import our pages
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {changeActeur} from '../actions'


class Acteurs extends PureComponent {
  
  getSelectedFromActeurList = (acteurs) => {
    var selected = selected || [];
    acteurs.map(acteur=>selected.push(acteur))
    return selected;
  }
  handleSelect = (event) => {
    var options = event.target.options;
    var selectedValue = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        //console.log('options['+i+'].value='+options[i].value);
        let acteur = this.props.acteurMap.get(Number(options[i].value));
        selectedValue.push(acteur);
      }
    }
    //console.log('event.target.name='+event.target.name);
    //console.log('event.target.value='+event.target.value);
    this.props.changeActeur(selectedValue);
  }
  render() {
    const acteurs_list = this.props.acteurMap;
    const isLoaded = this.props.isLoaded;
    const label = this.props.label;
    const selected = this.getSelectedFromActeurList(this.props.film.acteurs);
    //console.log('print='+print);
    if(this.props.hasError){
      return <div className="container-fluid text-center"><h3>Error : {this.state.error.message} film</h3></div>;
    }else if (!isLoaded) {
      return <div className="container-fluid text-center"><h3>Loading...</h3></div>;
    }else{
      return(
        <div className="form-group">
        <label>{label}
          <select className="custom-select" size="20" multiple defaultValue={selected} onChange={this.handleSelect}>
          {
            Object.keys(acteurs_list).map((id)=>{
              return (
                <option key={acteurs_list[id].id} value={acteurs_list[id]}>{printPersonne(acteurs_list[id].prenom,acteurs_list[id].nom)}</option>
              )
            })
          }
          </select>
          </label>
          </div>
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
