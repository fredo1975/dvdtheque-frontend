import React, { PureComponent } from 'react';
import {printPersonne,rest_api_url} from '../pages' // import our pages


const getSelectedFromActeurList = function(acteurs) {
  var selected = selected || [];
  acteurs.map((acteur)=>{
    selected.push(acteur.id);
    }
  )
  return selected;
}

const isActeurSelected = function(id,selected) {
  var found = selected.find(function(element) {
    return element==id;
  });
  return found;
}

class Acteurs extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      label:props.label,
      acteurs:props.acteurs,
      selected: getSelectedFromActeurList(props.acteurs)
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount(){
    fetch(rest_api_url+'acteurs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then((result)=> {
          this.setState({isLoaded: true,acteurs:result});
    },
    (error)=>{
      this.setState({error,isLoaded: true,});
      console.log('error='+error);
    }
    )
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
    change[event.target.name] = event.target.value;
    this.setState(change);
    this.props.callbackFromEditFilm(selectedValue);
  }
  render() {
    const acteurs_list = this.state.acteurs;
    const isLoaded = this.state.isLoaded;
    const label = this.props.label;
    //console.log('print='+print);
    if(this.state.error){
      return <div className="container-fluid text-center"><h3>Error : {this.state.error.message} film</h3></div>;
    }else if (!isLoaded) {
      return <div className="container-fluid text-center"><h3>Loading...</h3></div>;
    }else{
      return(
        <div className="form-group">
        <label>{label}
          <select className="custom-select" size="20" multiple defaultValue={this.state.selected} onChange={this.handleSelect}>
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

export default Acteurs;
