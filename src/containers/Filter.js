import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {printPersonne,getAnneesSelect} from '../pages' // import our pages
import {changeFilterParam,requestListFilmFiltered,fetchFilms} from '../actions'

class Filter extends Component {
    
    handleFilterParamChange = (event) => {
        if(event.target.id==='ripped'){
          this.props.changeFilterParam(event.target.id,event.target.checked);
        }else if(event.target.id==='selectedTitre'){
            this.props.changeFilterParam(event.target.id,event.target.value.toUpperCase());
        }else{
          this.props.changeFilterParam(event.target.name,Number(event.target.value));
        }
    }
    selectRealisateur = (event) => {
        let realisateurId = event.target.value;
        this.props.requestListFilmFiltered('real',realisateurId);
    }
    render() {
        const anneesSelect = getAnneesSelect()
        const acteurs_list = this.props.acteurs
        return (
            <div className="row">
                
                    <div className="col">
                        <div className="form-group #{!name.valid ? 'has-error' : 'none'}">
                            <label htmlFor="titre">Titre</label>
                            <input type="text" id="selectedTitre" ref="selectedTitre" className="form-control" value={this.props.filter.selectedTitre} onChange={this.handleFilterParamChange}/>
                        </div>
                    </div>
                    <div className="col">
						<div className="form-group #{!name.valid ? 'has-error' : 'none'}">
							<label htmlFor="realisateur">Par Réalisateur</label>
                            <select className="form-control" name='selectedRealisateur' ref="selectedRealisateur" value={this.props.filter.selectedRealisateur.id} onChange={this.handleFilterParamChange}>
                            <option value={undefined}>Non renseigné</option>
                            {
                            this.props.realisateurs.map(real=>{
                                return <option key={real.id} value={real.id} name='selectedRealisateur'>{printPersonne(real.prenom,real.nom)}</option>
                            })
                            }
                            </select>
                        </div>
					</div>
                    <div className="col">
						<div className="form-group #{!name.valid ? 'has-error' : 'none'}">
							<label htmlFor="annee">Par Année</label>
                            <select className="form-control" name="selectedAnnee" value={this.props.filter.selectedAnnee} onChange={this.handleFilterParamChange}>
                            {
                                anneesSelect.map((annee)=>{
                                return <option key={annee} value={annee}>{annee}</option>
                                })
                            }
                            </select>
                         </div>
					</div>
                    <div className="col">
						<div className="form-group #{!name.valid ? 'has-error' : 'none'}">
							<label htmlFor="acteur">Par Acteur
                            <select className="form-control" name="selectedActeur" value={this.props.filter.selectedActeur} onChange={this.handleFilterParamChange}>
                            <option value={undefined}>Non renseigné</option>
                            {
                            this.props.acteurs.map(acteur=>{
                                return (
                                <option key={acteur.id} value={acteur.id}>{printPersonne(acteur.prenom,acteur.nom)}</option>
                                )
                            })
                            }
                            </select>
                            </label>
                        </div>
					</div>
						
					<div className="col">
						<div className="form-group #{!name.valid ? 'has-error' : 'none'}">
						    <label htmlFor="ripped">Ripped</label>
                        </div>
					</div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
        realisateurs: state.realisateurList.realisateurs,
        acteurs: state.acteurList.acteurs,
        isLoaded:state.realisateurList.isLoaded,
        error:state.realisateurList.error,
        hasError: state.realisateurList.hasError,
        filter : state.filmList.filter,
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        changeFilterParam : (fieldName, fieldValue) => dispatch(changeFilterParam(fieldName, fieldValue)),
        requestListFilmFiltered : (criteria,param) => dispatch(requestListFilmFiltered(criteria,param)),
        requestListFilm : () => dispatch(fetchFilms()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter))