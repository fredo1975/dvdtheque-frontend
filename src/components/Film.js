import React from "react";

function Film(props) {
  return (
    <div className="film">
      <span>{props.id} - {props.titre}</span>
    </div>
  );
}

export default Film;
