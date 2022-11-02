/*** ALL USERS SECTION **/

// Function ordenar Users
const ordenar = (array) => {
    let userOrdenados = array.sort((a, b) => {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      return 0;
    });
    cargarUsers(userOrdenados);
  };

// Info PopuUp 
const displayLenguajesDelAmorUser = (userId) => {
    let user = users.find((userArray) => userArray.id === parseInt(userId));
    return {
      nombre: user.nombre,
      physicalTouch: user.languages.physicalTouch,
      actosOfService: user.languages.actosOfService,
      qualityTime: user.languages.qualityTime,
      wordsOfAffirmation: user.languages.wordsOfAffirmation,
      receivingGifts: user.languages.receivingGifts,
      totalLanguage:
        parseInt(user.languages.physicalTouch) +
        parseInt(user.languages.actosOfService) +
        parseInt(user.languages.qualityTime) +
        parseInt(user.languages.wordsOfAffirmation) +
        parseInt(user.languages.receivingGifts),
    };
  };
  
const elimarUserFavoritoLocalStorage = (userId) => {
    let localListFavoritos = localStorage.getItem("usersFavorite");
    let listaFavoritos = JSON.parse(localListFavoritos);
    let indexFavoritos = listaFavoritos.findIndex(object => {return object.id === parseInt(userId)});
    listaFavoritos.splice(indexFavoritos, 1);
    localStorage.setItem("usersFavorite", JSON.stringify(listaFavoritos));
  }
  
const confirmationPromese = (index, list) => {
    list.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(list));
    toast();
    usersLoad();
  }
  
  // Eliminar usuario
const eliminarLocalStorageUsers = (userId) => {
    if(localStorage.getItem("users"))
    { 
      let localList = localStorage.getItem("users");
      let list = JSON.parse(localList);
      let index = list.findIndex(object => {return object.id === parseInt(userId)});
      elimarUserFavoritoLocalStorage(userId);
      confirmDeleteUser(index, list);
    }
    else {
      let index = users.findIndex((user) => user.id === parseInt(userId));
      users.splice(index, 1);
    }
  }
  
  // Eliminar usuarios
const eliminarUser = (userId) => {
    eliminarLocalStorageUsers(userId);
  }
  
  // Activar Bottones de delete
const activarBotonesDelete = () => {
    const botonesDelete = document.querySelectorAll(".button.button-clear.button-delete");
    botonesDelete.forEach((btn) => {
      btn.addEventListener("click", () => {
        eliminarUser(btn.id);
      });
    });
  };
  
  // Setear usersFavorite en localStorage
const almacenarDatosLocalStorageFavoritos = (usersFavoriteLocals) => localStorage.getItem("usersFavorite") ? localStorage.setItem("usersFavorite", JSON.stringify(usersFavoriteLocals)) : localStorage.setItem("usersFavorite", JSON.stringify(usersFavorite));
  
const editarUsersIcon = (array, user, bandera) => {
    const newArr = array.map(obj => {
      if (obj.id === parseInt(user.id)) {
        return {...obj, favoritos: bandera};
      }
      return obj;
    });
    almacenarDatosLocalStorageUsers(newArr);
  }
  
  // Agregar a favoritos
const agregarAFavoritos = (userId) => { 
    userExist = recuperarUsers().find(user => { return user.id == parseInt(userId) });
    if(userExist){
      if(localStorage.getItem("usersFavorite")){
        let usersFavoriteLocals = recuperarUsersFavoritos();
        let userFound = usersFavoriteLocals.find((user) => { return user.id == parseInt(userId) });
        if(userFound == undefined){
          userExist = {
            ...userExist,
            favoritos: true,
          }
          usersFavoriteLocals.push(userExist);
          almacenarDatosLocalStorageFavoritos(usersFavoriteLocals);
          editarUsersIcon(recuperarUsers(), userExist, true);
          alerta("", `El User ${userExist.nombre} se ha agregado a Favoritos`, 'success', `${userExist.id}`);
        } else {
          alerta("", `User ${userExist.nombre} already in Favoritos`, 'error');
        }
      } 
      else {
        let userFound = usersFavorite.find((user) => { return user.id == parseInt(userId) });
        if(userFound == undefined){
          userExist = {
            ...userExist,
            favoritos: true,
          }
          usersFavorite.push(userExist);
          almacenarDatosLocalStorageFavoritos(usersFavorite);
          editarUsersIcon(users, userExist, true);
          alerta("", `El User ${userExist.nombre} se ha agregado a Favoritos`, 'success', `${userExist.id}`);
        }
      }
    }
  };
  
  // Ocultar el Botton de Favoritos  
const iconCardAdd = (userId) => {
    let btnFavorites = document.getElementById(`${userId}`);
    let userLocals = recuperarUsers();
    let userFound = userLocals.find((userArray) => userArray.id === parseInt(userId));
    userFound.favoritos === true ? btnFavorites.style.display = "none" : btnFavorites.style.display = "block";
  }
  
  // Activar Bottones de favoritos
const activarBotonesAdd = () => {
    const botonesAdd = document.querySelectorAll(".button.button-clear.button-add");
    botonesAdd.forEach((btn) => {
      btn.addEventListener("click", () => {
        agregarAFavoritos(btn.id);
        iconCardAdd(btn.id);
      });
    });
  };
  
const comprobarIconoFavoritos = () => {
    recuperarUsersFavoritos().map(obj => { 
      if(obj.favoritos === true) {
        let btnFavorites = document.getElementById(`${obj.id}-add`);
        btnFavorites.style.display = "none";
      } else {
        let btnFavorites = document.getElementById(`${obj.id}-add`);
        btnFavorites.style.display = "block";
      };
    })
  }
  
// Read Users
const cargarUsers = (array) => {
    if(array.length > 0){
      containerDashboard.style.display = "none";
      tbody.innerHTML = "";
      container.innerHTML = "";
      array.forEach(user => user != undefined ? container.innerHTML += retornoCardUser(user) : console.log("Usuario Indefinido"));
      activarBotonesDelete();
      activarBotonesAdd();
      activarBotonesPopUp(); 
      comprobarIconoFavoritos();
    } else {
        alertaErrorUsuarios("warning", `No se encontró usuarios`);
    }
  };

// Recuperar Users localStorags into JavaScript objects || array 
const recuperarUsers = () => {
    if (localStorage.getItem("users")) {
      let usersRecuperados = JSON.parse(localStorage.getItem("users"))
        usersRecuperados.forEach(user => users.push(user));
        return usersRecuperados;
    } 
    else {
      return users;
    }
  }
  
// Revisar si hay users en localStorage || users para cargar 
const usersLoad = () => localStorage.getItem("users") ? cargarUsers(recuperarUsers()) : cargarUsers(users);
  
  
