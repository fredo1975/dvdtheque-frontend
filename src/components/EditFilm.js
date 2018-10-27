import React from "react";

function EditFilm({ match }) {
  console.log(match.params.filmId);
  return(
    <h1>film - {match.params.filmId}</h1>
  )
}

export default EditFilm;
