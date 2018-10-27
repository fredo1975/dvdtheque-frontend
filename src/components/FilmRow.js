import React from "react";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import EditFilm from "./EditFilm";
import { Link } from 'react-router-dom'

class FilmRow extends React.PureComponent{
  render() {
    const { id, titre, realisateur, acteurs, annee, ripped } = this.props;

    //console.log(`render FilmRow :: ${id} :: ${titre}`);
    return (
      <tr>
        <td>
          <Link to={'editFilm/'+id}>{titre}</Link>
        </td>
        <td>
          <Link to={'editFilm/'+id}>{realisateur}</Link>
        </td>
        <td>
          {acteurs}
        </td>
        <td>
          {annee}
        </td>
        <td>
          {ripped}
        </td>
      </tr>
    );
  }
}
export default FilmRow;
