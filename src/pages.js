import React from 'react';

export const printPersonne = function(prenom,nom) {
  return prenom+' '+nom;
}

export const handleNewActeursList = function(newActeursList) {
    let newList = []
    for(let i=0;i<newActeursList.length;i++){
      if(newActeursList[i].checked===true){
        newList.push(newActeursList[i]);
      }
    }
    return newList;
  }

//export const rest_api_url = 'http://192.168.99.100:8083/dvdtheque/';
export const rest_api_url = 'http://localhost:8083/dvdtheque/';
