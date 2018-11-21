import React, { PureComponent } from 'react';
import {printPersonne} from '../pages' // import our pages
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

const getSelectedFromActeurList = function(acteurs) {
  var selected = selected || [];
  acteurs.map(acteur=>selected.push(acteur.id))
  return selected;
}

class Acteurs extends PureComponent {
  constructor(){
    super();
    this.handleSelect = this.handleSelect.bind(this);
  }
  
  handleSelect(event) {
    var options = event.target.options;
    var selectedValue = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        console.log('options['+i+'].value='+options[i].value);
        selectedValue.push(options[i].value);
      }
    }
    let change = {};

    console.log('event.target.name='+event.target.name);
    console.log('event.target.value='+event.target.value);
    change[event.target.name] = event.target.value;
    this.setState(change);
    this.props.callbackFromEditFilm(selectedValue);
  }
  render() {
    const acteurs_list = this.props.acteurs;
    const isLoaded = this.props.isLoaded;
    const label = this.props.label;
    const selected = getSelectedFromActeurList(this.props.film.acteurs);
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
            acteurs_list.map((acteur)=>{
              return (
                <option key={acteur.id} value={acteur.id}>{printPersonne(acteur.prenom,acteur.nom)}</option>
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
const mapStateToProps = state => {
  return { acteurs: state.acteurList.acteurs,isLoaded:state.acteurList.isLoaded,error:state.acteurList.error,hasError: state.acteurList.hasError,film:state.filmEdit.film};
};

export default withRouter(connect(mapStateToProps)(Acteurs))
