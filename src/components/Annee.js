import React, { Component } from 'react';
import {changeFilmParam} from '../actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class Annee extends Component {
  getAnneesSelect = () => {
    let anneeList = [];
    var currentTime = new Date();
    var yyyy = currentTime.getFullYear();
    anneeList.push('Non renseigné');
    for(let i=yyyy;i>1930;i--){
      anneeList.push(i);
    }
    return anneeList;
  }
  handleFilmParamChange = (event) => {
    this.props.changeFilmParam(event.target.name,event.target.value,this.props.obj);
  }
  render() {
    const label = this.props.label;
    const anneesSelect = this.getAnneesSelect();
    return(
      <div className="form-group">
        <label>{label}</label>
          <select className="form-control" name="annee" value={this.props.obj==='film'?this.props.film.annee:this.props.film.dvd.annee} onChange={this.handleFilmParamChange}>
          {
            anneesSelect.map((annee)=>{
              return <option key={annee} value={annee}>{annee}</option>
            })
          }
          </select>
      </div>
    )
  }
}
Annee.propTypes = {
  film : PropTypes.object,
  annee : PropTypes.number,
  fieldValue : PropTypes.string,
  fieldName : PropTypes.string,
}
const mapStateToProps = (state, ownProps) => {
  return { 
    film: state.filmEdit.film, 
    fieldValue : state.filmEdit.fieldValue,
    fieldName : state.filmEdit.fieldName,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFilmParam : (fieldName, fieldValue,obj) => dispatch(changeFilmParam(fieldName, fieldValue,obj)),
  };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Annee))
