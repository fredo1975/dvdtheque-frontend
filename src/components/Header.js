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
      links[j].isActive = i === j ;
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
      return(
        <Header/>
      )

  }
}

export default Header;
