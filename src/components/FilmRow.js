import React from "react";

class FilmRow extends React.PureComponent{
  render() {
    const { id, titre, realisateur, acteurs, annee, ripped } = this.props;
    console.log(`render FilmRow :: ${id} :: ${titre}`);
    return (
      <tr>
        <td>
          {titre}
        </td>
        <td>
          {realisateur}
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
