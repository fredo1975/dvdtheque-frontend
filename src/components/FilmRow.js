import React from "react";
import { Link } from 'react-router-dom'

export default class FilmRow extends React.PureComponent{
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
