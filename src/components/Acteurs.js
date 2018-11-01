import React, { Component } from 'react';
import {printPersonne,rest_api_url} from '../pages' // import our pages


const getSelectedFromActeurList = function(acteurs) {
  var selected = selected || [];
  acteurs.map((acteur)=>{
    selected.push(acteur.personne.id);
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


class Acteurs extends Component {
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
      let change = {};
      change[event.target.name] = event.target.value;
      this.setState(change);
  }
  render() {
    const label = this.state.label;
    const acteurs_list = this.state.acteurs;
    const isLoaded = this.state.isLoaded;
    //console.log('print='+print);
    if(this.state.error){
      return <div className="container-fluid text-center"><h3>Error : {this.state.error.message} film</h3></div>;
    }else if (!isLoaded) {
      return <div className="container-fluid text-center"><h3>Loading...</h3></div>;
    }else{
      return(
          <div className="table-wrapper-scroll-y">
            <label>Acteurs</label>
            <table className="table table-bordered">
            {
              acteurs_list.map((acteur)=>{
                return (
                  <tr>
                  <td>
                    <input name={acteur.id} type="checkbox" checked={isActeurSelected(acteur.id,this.state.selected)} onChange={this.handleSelect}/> <label>{printPersonne(acteur.prenom,acteur.nom)}</label>
                    </td>
                    </tr>
                )
              })
            }
            </table>
        </div>
      )
  }
  }
}

export default Acteurs;
