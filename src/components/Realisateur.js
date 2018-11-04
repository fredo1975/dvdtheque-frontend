import React, { PureComponent } from 'react';
import {printPersonne,rest_api_url} from '../pages' // import our pages

class Realisateur extends PureComponent {
  constructor(props){
    super(props);
    this.state = {real:'',print:props.print==null?'Non renseigné':props.print,label:props.label,realisateurs:[],id:props.id};
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    fetch(rest_api_url+'realisateurs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then((result)=> {
          this.setState({isLoaded: true,realisateurs:result});
    },
    (error)=>{
      this.setState({error,isLoaded: true,});
      console.log('error='+error);
    }
    )
  }
  handleChange(event) {
      let change = {};
      change[event.target.name] = event.target.value;
      this.setState(change);
      this.props.callbackFromEditFilm(event.target.value);
  }

  render() {
    const label = this.state.label;
    const id = this.state.id;
    const real_list = this.state.realisateurs;
    const isLoaded = this.state.isLoaded;
    //console.log('print='+print);
    if(this.state.error){
      return <div className="container-fluid text-center"><h3>Error : {this.state.error.message} film</h3></div>;
    }else if (!isLoaded) {
      return <div className="container-fluid text-center"><h3>Loading...</h3></div>;
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

export default Realisateur;
