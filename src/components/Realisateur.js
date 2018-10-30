import React, { Component } from 'react';
import {printRealisateur} from '../pages' // import our pages

class Realisateur extends Component {
  constructor(props){
    super(props);
    this.state = {real:'',print:props.print==null?'Non renseigné':props.print,label:props.label,realisateurs:[],id:props.id};
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    fetch('http://localhost:8083/dvdtheque/realisateurs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then((result)=> {
          this.setState({isLoaded: true,realisateurs:result});
    },
    (error)=>{
      this.setstate({err:error,isLoaded: true,});
      console.log('error='+error);
    }
    )
  }
  handleChange(event) {
      let change = {};
      change[event.target.name] = event.target.value;
      this.setState(change);
  }
  render() {
    const print = this.state.print;
    const label = this.state.label;
    const id = this.state.id;
    const real_list = this.state.realisateurs;
    console.log('print='+print);
    return(
      <div className="form-group">
        <div className="form-group">
          <label>Realisateur</label>
          <select className="form-control" name='id' value={id} onChange={this.handleChange}>
          {
            real_list.map((real)=>{
              return <option key={real.id} value={real.id}>{printRealisateur(real.prenom,real.nom)}</option>
            })
          }
          </select>
        </div>
      </div>
    )
  }
}

export default Realisateur;
