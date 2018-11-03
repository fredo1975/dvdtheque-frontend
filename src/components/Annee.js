import React, { Component } from 'react';


class Annee extends Component {
  constructor(props){
    super(props);
    this.state = {film_annee:props.film_annee==null?'Non renseigné':props.film_annee,label:props.label};
    this.handleChange = this.handleChange.bind(this);
    this.anneeList = [];
    var currentTime = new Date();
    var yyyy = currentTime.getFullYear();
    this.anneeList.push('Non renseigné');
    for(let i=yyyy;i>1930;i--){
      this.anneeList.push(i);
    }
  }

  handleChange(event) {
      let change = {};
      change[event.target.name] = event.target.value;
      this.setState(change);
  }
  render() {
    const film_annee = this.state.film_annee;
    const label = this.state.label;
    //console.log('film_annee='+film_annee);
    return(
      <div className="form-group">
        <label>{label}</label>
          <select className="form-control" name="film_annee" value={film_annee} onChange={this.handleChange}>
          {
            this.anneeList.map((annee)=>{
              return <option key={annee} value={annee}>{annee}</option>
            })
          }
          </select>
      </div>
    )
  }
}

export default Annee;
