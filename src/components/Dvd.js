import React, { Component } from 'react';


class Dvd extends Component {
  constructor(props){
    super(props);
    this.state = {dvd: {zone:1}};
    this.handleChange = this.handleChange.bind(this);
    this.zoneList = [];
    for(let i=1;i<4;i++){
      this.zoneList.push(i);
    }
  }

  handleChange(event) {
      let change = {}
      change[event.target.name] = event.target.value;
      this.setState(change);
  }
  render() {
    
    return(
      <div className="form-group">
        <label>Zone DVD</label>
          <select className="form-control" name="dvd_zone" value={this.props.dvd.zone} onChange={this.handleChange}>
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

export default Dvd;
