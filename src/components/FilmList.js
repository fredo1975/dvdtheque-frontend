import React from "react";
import Film from "./Film";

function FilmList(props) {
  return (
    <div>{props.films.map(film => <Film key={film.id} titre={film.titre} />)}</div>
  );
}

export default FilmList;
