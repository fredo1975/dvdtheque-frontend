import React from 'react';

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

export const printPersonne = function(prenom,nom) {
  return prenom+' '+nom;
}

export const rest_api_url = 'http://192.168.99.100:8083/dvdtheque/';
