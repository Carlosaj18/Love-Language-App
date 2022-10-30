const allUsers           = document.querySelector("button.allUsers");
const addUser            = document.getElementById("createUser");
const findUser           = document.querySelector(".button.findUser");
const favoritosUsers     = document.querySelector(".button.button-favoritos");
const searchContainer    = document.querySelector(".search-container");
const input              = document.querySelector("input.input");
const log                = document.getElementById("values");
const buttonOrdenar      = document.querySelector("button.ordenar");
const buttonDashboard    = document.querySelector("button.button-dashboard");
const container          = document.querySelector(".containerCards");
const containerDashboard = document.querySelector(".container-dashboard");
const tbody              = document.querySelector(".tbody");
const modal              = document.querySelector(".modal");

                                          /*** SEARCH BAR SECTION */

// Function capitalizeFirstLetter
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const comprobarIconoFavoritosSearchBar = (array) => {
  array.map(obj => { 
    if(obj !== undefined){
      if(obj.favoritos === true) {
        let btnFavorites = document.querySelector(".button.button-clear.button-add");
        btnFavorites.style.display = "none";
      } 
    }
  })
}

const cargarUsersSearchBar = (array) => {
  if(array.length > 0) {
    containerDashboard.style.display = "none";
    tbody.innerHTML = "";
    container.innerHTML = "";
    array.forEach((user) => user != undefined ? container.innerHTML += retornoCardUser(user) : undefined);
    activarBotonesAdd();
    activarBotonesDelete();
    activarBotonesPopUp(); 
    comprobarIconoFavoritosSearchBar(array);
  } else {
    alerta("", `No se encontró usuarios`, 'error');
  }
}

// Function userFilterMap
const userFilterMap = (key) => {
  let userLocals = recuperarUsers();
  let userFound = userLocals.map((user) => {
    if (user.nombre.includes(key)) {
      return user;
    }
  });
  cargarUsersSearchBar(userFound);
  //userFound.forEach((user) => user != undefined ? cargarUsersSearchBar(user) : null);
};

const updateValue = (e) => {
  capitalizeFirstLetter((log.textContent = e.target.value));
}

// Evento para print user input in the container
const inputListener = (e) => {
  input.addEventListener("input", updateValue(e));
};

const findUserSearchBar = () => {
  searchContainer.addEventListener("keydown", (e) => {
    let targetValue = e.target.value; // Toma un valor atras
    let key = e.key.toUpperCase();
    if ((e.key != "Backspace" && e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)
    ) {
      if (targetValue != "") {
        targetValue = capitalizeFirstLetter(targetValue);
        userFilterMap(targetValue);
      } else {
        userFilterMap(key);
      }
    }
    inputListener(e);
  });
};

// Evento click search bar & keydown
searchContainer.addEventListener("click", () => {
  usersLoad();
  findUserSearchBar();
});

                                          /*** DASHBOARD SECTION **/

// HTML para cargar el dashboard
const topLenaguajes = (topLenguajeDelAmor) => {
  container.innerHTML = "";
  tbody.innerHTML = "";
  topLenguajeDelAmor.forEach((user) => {
    tbody.innerHTML += retornoTableDashboard(user);
  });
};

// Function para cargar info Dashboard
const displayLenguajesDelAmor = (userLocals) => {
  let topLenguajeDelAmor = userLocals.map((user) => {
    return {
      id: user.id,
      imagen: user.imagen,
      nombre: user.nombre,
      physicalTouch: user.languages.physicalTouch,
      actosOfService: user.languages.actosOfService,
      qualityTime: user.languages.qualityTime,
      wordsOfAffirmation: user.languages.wordsOfAffirmation,
      receivingGifts: user.languages.receivingGifts,
      totalLanguage:
        user.languages.physicalTouch +
        user.languages.actosOfService +
        user.languages.qualityTime +
        user.languages.wordsOfAffirmation +
        user.languages.receivingGifts,
    };
  });
  topLenaguajes(topLenguajeDelAmor);
};

// Ordenar Boton Dashboard
const ordenarDashboardButton = (array) => {
  let userOrdenados = array.sort((a, b) => {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }
    return 0;
  });
  displayLenguajesDelAmor(userOrdenados);
};

// Boton ordenar Dashboard
const ordenarDashboard = () => {
  const ordenarButtonDashboard = document.querySelector(".button-outline.ordenar-dashboard");
  ordenarButtonDashboard.addEventListener("click", () => {
    let localUsers = recuperarUsers();
    ordenarDashboardButton(localUsers);
    alertaOrdenar("success", "Todos los usuarios fueron ordenados");
  });
}

// Evento click Dashboard
buttonDashboard.addEventListener("click", () => {
  containerDashboard.style.display = "block";
  let userLocals = recuperarUsers();
  displayLenguajesDelAmor(userLocals);
  ordenarDashboard();
});

                                      /*** USER FAVORITES SECTION **/ 

const eliminarCacheFavoritos = () => {
  if(!localStorage.getItem("usersFavorite")){
      localStorage.removeItem("usersFavorite");
  } else {
    usersFavorite = [];
  }
} 

const eliminarLocalStorageFavoritos = (userId) => {
  let userExist = recuperarUsers();
  userExist = userExist.find(user => { return user.id == parseInt(userId) });
  editarUsersIcon(recuperarUsers(), userExist, false);
  
  // Si lo eliminan de all users tambien tiene que ser elimado de favoritos

  if(localStorage.getItem("usersFavorite") || usersFavorite.length > 0) {
    let localList = localStorage.getItem("usersFavorite"); // json object
    let list = JSON.parse(localList);
    let indexLocals = list.findIndex((userFavorite) => userFavorite.id === parseInt(userId));
    list.splice(indexLocals, 1); // Elimina el elemento del array ​list
    localStorage.setItem("usersFavorite", JSON.stringify(list));  // Sobrescribe el array de favoritos en el localStorage
    alerta("", `⛔️ El usuario se elimino de favoritos`, 'warning');
  } else {
    editarUsersIcon(users, userExist, false);
    let index = usersFavorite.findIndex((userFavorite) => userFavorite.id === parseInt(userId));
    usersFavorite.splice(index, 1);
  }
}

// Eliminar usuario de favoritos
const eliminarFavoritoUser = (userId) => {
  eliminarLocalStorageFavoritos(userId);
  userFavoriteLoad();
}

// Activar Bottones de delete Favoritos
const activarBotonesDeleteFavoritos = () => {
  const botonesDelete = document.querySelectorAll(".button.button-clear.button-delete");
  botonesDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      eliminarFavoritoUser(btn.id);
    });
  });
};

// Read favoritos
const cargarUsersFavoritos = (array) => {
  tbody.innerHTML = "";
  container.innerHTML = "";
  // array.forEach((user) => container.innerHTML += retornoCardUserFavoritos(user));
  array.forEach((user) => container.innerHTML += retornoCardUser(user));
  activarBotonesDeleteFavoritos();
  comprobarIconoFavoritos();
  activarBotonesPopUp();
};

// Recuperar Favoritos LocalStorage
const recuperarUsersFavoritos = () => {
  if (localStorage.getItem("usersFavorite")) {
      let usersFavoriteRecuperados = JSON.parse(localStorage.getItem("usersFavorite"));
          usersFavoriteRecuperados.forEach(user => usersFavorite.push(user));
          return usersFavoriteRecuperados; 
  } else {
    return usersFavorite;
  }
}

const userFavoriteLoad = () => localStorage.getItem("usersFavorite") ? cargarUsersFavoritos(recuperarUsersFavoritos()) : cargarUsersFavoritos(usersFavorite);

// Evento click boton Favoritos
favoritosUsers.addEventListener("click", () => {
  userFavoriteLoad();
  if(usersFavorite.length <= 0 ){
    alertaOrdenar("error", "No hay usuarios en favoritos");
  }
  containerDashboard.style.display = "none";
});

                                        /*** FIND USER PROMT SECTION **/

const comprobarIconoFavoritosUser = (user) => {
  let btnFavorites = document.getElementById(`${user.id}-add`);
  user.favoritos === true ? btnFavorites.style.display = "none" : btnFavorites.style.display = "block";
}

// Read One User
const cargarOneUser = (user) => {
  tbody.innerHTML = "";
  container.innerHTML = "";
  container.innerHTML += retornoCardUser(user);
  activarBotonesAdd();
  activarBotonesDelete();
  comprobarIconoFavoritosUser(user);
  alerta("", `Se encontro el usuario '${user.nombre}'`, 'success');
};

const userSearchContainer = (userLocals, userName) => {
  let userFound = userLocals.find((userArray) => userArray.nombre === userName);
  userFound === undefined ? alerta("", `No se encontró el usuario '${userName}' en tus contactos`, 'error') : cargarOneUser(userFound);
}

const findUserArray = () => {
  let userName = prompt("Ingresa el usuario a buscar:");
  localStorage.getItem("users") ? userSearchContainer(recuperarUsers(), userName) : userSearchContainer(users);
};

// Evento click boton Find User prompt
findUser.addEventListener("click", () => {
  findUserArray();
  containerDashboard.style.display = "none";
});

                                        /*** ADD USER SECTION **/

const activarBotonesPopUpForm = () => {
  const openModalButtonsForm = document.querySelectorAll("[data-modal-target-form]");
  openModalButtonsForm.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(".modal"); // select our modal
      openModalForm(modal);
      popUpForm();
    });
  });
};
// Evento click boton Crear User
addUser.addEventListener("click", activarBotonesPopUpForm());

                                        /*** ALL USERS SECTION **/

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
      user.languages.physicalTouch +
      user.languages.actosOfService +
      user.languages.qualityTime +
      user.languages.wordsOfAffirmation +
      user.languages.receivingGifts,
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
  let userExist = recuperarUsers(); // valido que exista el usuario 
  userExist = userExist.find(user => { return user.id == parseInt(userId) });
  if(userExist){
    if(localStorage.getItem("usersFavorite")){
      let usersFavoriteLocals = recuperarUsersFavoritos();
      let userFound = usersFavoriteLocals.find((user) => { return user.id == parseInt(userId) });
      if(userFound == undefined){
        alerta("", `El User ${userExist.nombre} se ha agregado a Favoritos`, 'success', `${userExist.id}`);
        userExist = {
          ...userExist,
          favoritos: true,
        }
        usersFavoriteLocals.push(userExist);
        almacenarDatosLocalStorageFavoritos(usersFavoriteLocals);
        editarUsersIcon(recuperarUsers(), userExist, true);
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
    // Mapeo los usuarios y los que tengan favoritos == true oculto el boton button-add
    activarBotonesAdd();
    activarBotonesDelete();
    activarBotonesPopUp(); 
    comprobarIconoFavoritos();
    
  } else {
    alerta("", `No se encontró usuarios`, 'error');
  }

};

// Revisar si hay users en localStorage || users para cargar 
const usersLoad = () => localStorage.getItem("users") ? cargarUsers(recuperarUsers()) : cargarUsers(users);

// Evento click boton All Users
allUsers.addEventListener("click", () => { 
  usersLoad(); 
}); 

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

// Evento click boton Ordenar
buttonOrdenar.addEventListener("click", () => {
  let localUsers = recuperarUsers();
  ordenar(localUsers);
  alertaOrdenar("success", "Todos los usuarios fueron ordenados");
});

                                        /*** LIBRERIAS WINDOW **/

const alerta = (titulo, mensaje, icono)=> {
  Swal.fire({
      icon: icono || '', 
      title: titulo || '', 
      text: mensaje, 
      target: '.search-container',
      customClass: {
        container: 'position-fixed',
      },
      toast: true, 
      position: 'top-right',
      showConfirmButton: false,
      timer: 4500,
      width: '240px',      
    });
}

const alertaOrdenar = (icono, mensaje) => {
  Swal.fire({
    icon: icono,
    timer: 3000,
    text: mensaje, 
    showConfirmButton: false,
  });
}

const confirmDeleteUser = (index, list) => {
  Swal.fire({
    icon:"warning",
    text: "Are you sure to delete this user?", 
    showConfirmButton: true,
  }).then(({value}) => {
    if(value === true) return confirmationPromese(index, list);
  })
}



                                        /*** LOAD WINDOW **/
window.addEventListener("load", (event) => {
  containerDashboard.style.display = "none";
  modal.style.display = "none";
  activarBotonesPopUpForm();
  // localStorage.setItem("users", JSON.stringify(users));
});

// See localStorage Keys
const localStorageKeys = () => {
  for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    console.log("Clave ", clave);
    console.log("Valor " + localStorage.getItem(clave));
  }
}


