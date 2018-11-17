import React, { PureComponent } from 'react';
import {printPersonne} from '../pages' // import our pages
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Realisateur extends PureComponent {
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
      let change = {};
      change[event.target.name] = event.target.value;
      this.setState(change);
      this.props.callbackFromEditFilm(event.target.value);
  }

  render() {
    const label = this.props.label;
    const id = this.props.id;
    const real_list = this.props.realisateurs;
    const hasError = this.props.hasError;
    if(hasError){
      return <div className="container-fluid text-center"><h3>Error : {this.props.error.message} film</h3></div>;
    }else{
      return(
        <div className="form-group">
            <label>Realisateur</label>
            <select className="form-control" name='id' value={id} onChange={this.handleChange}>
            {
              real_list.map((real)=>{
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
  realisateurs : PropTypes.object,
}
const mapStateToProps = state => {
  return { realisateurs: state.realisateurList.realisateurs,isLoaded:state.realisateurList.isLoaded,error:state.realisateurList.error,hasError: state.realisateurList.hasError};
};

export default withRouter(connect(mapStateToProps)(Realisateur))

