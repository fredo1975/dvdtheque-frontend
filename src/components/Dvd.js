import React, { Component } from 'react';


class Dvd extends Component {
  constructor(props){
    super(props);
    this.state = {dvd:props};
  }

  render() {
    return(
      <div className="form-group">
        <label>Zone DVD
          <input type="text" id="zone_dvd"  className="form-control" defaultValue={this.props.dvd.zone}/>
        </label>
      </div>
    )
  }
}

export default Dvd;
