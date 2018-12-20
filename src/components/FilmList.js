import React from "react";
import FilmRow from "./FilmRow";
import Filter from "../containers/Filter";
import PropTypes from 'prop-types'

const FilmList = (props) => (
  <div className="container-fluid">
    <Filter/>
    <br/>
  <h3>Liste des Films </h3>
  Taille : {props.films.length}
  <br/>
  <table className="table table-bordered table-striped">
    <thead>
    <tr>
      <th>Titre</th>
      <th>Réalisateur</th>
      <th>Acteur</th>
      <th>Année</th>
      <th>Ripped</th>
      </tr>
    </thead>
    <tbody>
    {
      props.films.map((film) => {
        return (
          <FilmRow key={film.id} id={film.id} titre={film.titre} realisateur={film.printRealisateur} realisateurId={film.realisateur.id} acteurs={film.printActeurs} annee={film.annee} ripped={film.ripped===true?"oui":"non"}/>
        );
      })
    }
    </tbody>
  </table>
  
  </div>
)

FilmList.propTypes = {
  films : PropTypes.array,
}

export default FilmList
