import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Filter extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div className="row">
                
                    <div className="col">
                        <div className="form-group #{!name.valid ? 'has-error' : 'none'}">
                            <label htmlFor="titre">Titre</label>
                            <input type="text" id="titre" ref="titre" className="form-control" value="Filter" onChange={this.handleFilmParamChange}/>
                        </div>
                    </div>
                    <div className="col">
						<div className="form-group #{!name.valid ? 'has-error' : 'none'}">
							<label htmlFor="realisateur">Par Réalisateur</label>
                        </div>
					</div>
                    <div className="col">
						<div className="form-group #{!name.valid ? 'has-error' : 'none'}">
							<label htmlFor="annee">Par Année</label>
                         </div>
					</div>
                    <div className="col">
						<div className="form-group #{!name.valid ? 'has-error' : 'none'}">
							<label htmlFor="acteur">Par Acteur</label>
                        </div>
					</div>
						
					<div className="col">
						<div className="form-group #{!name.valid ? 'has-error' : 'none'}">
						    <label htmlFor="ripped">Ripped</label>
                        </div>
					</div>
                    <div className="col">
                        <div className="act-submit">
                            
                            <button type="submit" className="btn btn-primary " name='search' ref="search">Filtrer</button>		
                        </div>
				    </div>
               
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
      
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter))