import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'; // import the react-router-dom components

export const Home = () => (
    <div>
        <h1>Home</h1>
    </div>
)

export const AddFilm = () => (
    <div>
        <h1>Ajouter un Film</h1>
    </div>
)

export const UpdatePersonne = () => (
    <div>
        <h1>Modifier une Personne</h1>
    </div>
)

export const AddPersonne = () => (
    <div>
        <h1>Ajouter une Personne</h1>
    </div>
)

export const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Main}/>
      <Route path='/AddFilm' component={AddFilm}/>
      <Route path='/AddPersonne' component={AddPersonne}/>
    </Switch>
  </main>
)
