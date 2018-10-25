import React, { Component } from "react";
import { Link } from 'react-router-dom'
/*
function Header(props) {
  //console.log(props.films);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Navbar</a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">Liste des Films <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Ajouter un Film</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Ajouter une Personne</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Modifier une Personne</a>
        </li>
        </ul>
  </div>
</nav>
  );
}*/

class Header extends Component {
  render() {
      const Header = () => (
        <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Navbar</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to='/'>Liste des Films <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/AddFilm'>Ajouter un film</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/AddPersonne'>Ajouter une personne</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/UpdatePersonne'>Modifier une personne</Link>
            </li>
            </ul>
      </div>
      </nav>
        </header>
      )
      return(
        <Header/>
      )
  }
}

/*
const Header = () => (
  <header>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">Navbar</a>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to='/'>Liste des Films <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/AddFilm'>Ajouter un film</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/AddPersonne'>Ajouter une personne</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/UpdatePersonne'>Modifier une personne</Link>
      </li>
      </ul>
</div>
</nav>
  </header>
)*/
export default Header;
