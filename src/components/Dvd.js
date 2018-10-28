import React, { Component } from 'react';


class Dvd extends Component {
  constructor(props){
    super(props);
    this.state = {dvd:props};
    this.handleChange = this.handleChange.bind(this);
    this.zoneList = [];
    for(let i=1;i<4;i++){
      this.zoneList.push(i);
    }
  }

  handleChange(event) {
      console.log('event.target.name='+event.target.name);
      console.log('event.target.value='+event.target.value);
      this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const {dvd} = this.state.dvd;
    console.log('dvd.zone='+dvd.zone);
    return(
      <div className="form-group">
        <label>Zone DVD
          <select name="dvd_zone" value={dvd.zone} onChange={this.handleChange}>
          {
            this.zoneList.map((zone)=>{
              return <option value={zone}>{zone}</option>
            })
          }
          </select>
        </label>
      </div>
    )
  }
}

export default Dvd;
