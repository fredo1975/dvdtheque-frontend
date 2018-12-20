import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {changeFilmParam} from '../actions'

class Dvd extends Component {
  constructor(props){
    super(props);
    this.zoneList = [];
    for(let i=1;i<4;i++){
      this.zoneList.push(i);
    }
  }
  handleFilmParamChange = (event) => {
    this.props.changeFilmParam(event.target.name,Number(event.target.value),this.props.obj);
  }
  
  render() {
    return(
      <div className="form-group">
        <label>Zone DVD</label>
          <select className="form-control" name="zone" value={this.props.film.dvd.zone} onChange={this.handleFilmParamChange}>
          {
            this.zoneList.map((zone)=>{
              return <option key={zone} value={zone}>{zone}</option>
            })
          }
          </select>
      </div>
    )
  }
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
    changeFilmParam : (fieldName, fieldValue,obj) => dispatch(changeFilmParam(fieldName,fieldValue,obj)),
  };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Dvd))
