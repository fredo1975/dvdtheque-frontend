import React from "react";
import { Link } from 'react-router-dom'
import ripped_ok from '../img/ok.png'
import ripped_ko from '../img/ko.png'

export default class FilmRow extends React.PureComponent{
  render() {
    const { id, titre, realisateur, acteurs, annee } = this.props;
    return (
      <tr>
        <td>
          <Link to={'editFilm/'+Number(id)}>{titre}</Link>
        </td>
        <td>
          <Link to={'UpdatePersonne/'+Number(realisateur.id)}>{realisateur}</Link>
        </td>
        <td>
          {acteurs}
        </td>
        <td>
          {annee}
        </td>
        <td>
          <img src={this.props.ripped==='oui'?ripped_ok:ripped_ko} alt={this.props.ripped==='oui'?'oui':'non'}></img>
        </td>
      </tr>
    );
  }
}
