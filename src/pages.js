
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

  export const filterFilmList = function(filmList,filter) {
    let newList = []
    for(let i=0;i<filmList.length;i++){
      /*
      if(filmList[i].checked===true){
        newList.push(newActeursList[i]);
      }*/
    }
    return newList;
  }

  export const getAnneesSelect = () => {
    let anneeList = [];
    var currentTime = new Date();
    var yyyy = currentTime.getFullYear();
    anneeList.push('Non renseigné');
    for(let i=yyyy;i>1930;i--){
      anneeList.push(i);
    }
    return anneeList;
  }

//export const rest_api_url = 'http://192.168.1.105:8762/dvdtheque/';
export const rest_api_url = 'http://localhost:8762/dvdtheque/';
