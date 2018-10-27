import React from "react";
import FilmRow from "./FilmRow";
import EditFilm from "./EditFilm";
import { Switch, Route } from 'react-router-dom'

function FilmList(props) {
  console.log(props.films);
  //const listFilm = props.films.map((film)=> <Film key={film.id} titre={film.titre}/>);
  return (
    <div>
    <h3>Film liste</h3>
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
        props.films.map((film)=> {
          return (
            <FilmRow key={film.id} id={film.id} titre={film.titre} realisateur={film.printRealisateur} acteurs={film.printActeurs} annee={film.annee} ripped={film.ripped===true?"oui":"non"}/>
          );
        })
      }
      </tbody>
    </table>
    </div>
  );
}

export default FilmList;
