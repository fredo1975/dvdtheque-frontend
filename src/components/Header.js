import React, { Component } from "react";

import NavLink from "./NavLink";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        {path: "/", text: "Home", isActive: true},
        {path: "/AddFilm", text: "AddFilm", isActive: false},
        {path: "/AddPersonne", text: "AddPersonne", isActive: false},
        {path: "/UpdatePersonne", text: "UpdatePersonne", isActive: false},
      ]
    }
  }
  handleClick(i) {
    const links = this.state.links.slice();
    for (const j in links) {
      links[j].isActive = i == j ;
    }
    this.setState({links: links});
  }
  render() {
      const Header = () => (
        <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Navbar</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          {this.state.links.map((link, i) =>
            <NavLink
              path={link.path}
              text={link.text}
              isActive={link.isActive}
              key={link.path}
              onClick={() => this.handleClick(i)}
            />
            )}
            </ul>
      </div>
      </nav>
        </header>
      )

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

      return(
        <Header/>
      )

  }
}

export default Header;
