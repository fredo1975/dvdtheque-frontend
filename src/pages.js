import React from 'react';

export const UpdatePersonne = () => (
    <div>
        <h1>Modifier une Personne</h1>
    </div>
)

export const printPersonne = function(prenom,nom) {
  return prenom+' '+nom;
}

//export const rest_api_url = 'http://192.168.99.100:8083/dvdtheque/';
export const rest_api_url = 'http://localhost:8083/dvdtheque/';
