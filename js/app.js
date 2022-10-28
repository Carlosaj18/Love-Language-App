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

// Function userFilterMap
const userFilterMap = (key) => {
  let userLocals = recuperarUsers();
    var userFound = userLocals.map((user, index) => {
      if (user.nombre.includes(key)) {
        return user;
      }
    });
    cargarUsers(userFound);
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

const eliminarCacheFavoritos = () => {
  if(!localStorage.getItem("usersFavorite")){
      localStorage.removeItem("usersFavorite");
  } else {
    usersFavorite = [];
  }
} 

const eliminarLocalStorageFavoritos = (userId) => {
  if(localStorage.getItem("usersFavorite") || usersFavorite.length > 0) {
    let localList = localStorage.getItem("usersFavorite"); // json object
    let list = JSON.parse(localList);
    let indexLocals = list.findIndex((userFavorite) => userFavorite.id === parseInt(userId));
    list.splice(indexLocals, 1); // Elimina el elemento del array ​list
    localStorage.setItem("usersFavorite", JSON.stringify(list));  // Sobrescribe el array de favoritos en el localStorage
    
    let index = usersFavorite.findIndex((userFavorite) => userFavorite.id === parseInt(userId));
    usersFavorite.splice(index, 1);
    return list || usersFavorite;
  }
}

// Eliminar usuario de favoritos
const eliminarFavoritoUser = (userId) => cargarUsersFavoritos(eliminarLocalStorageFavoritos(userId));

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
  array.forEach((user) => container.innerHTML += retornoCardUserFavoritos(user));
  activarBotonesDeleteFavoritos();
  activarBotonesPopUp();
};

// Recuperar Favoritos LocalStorage
const recuperarUserFavoritos = () => {
  if (localStorage.getItem("usersFavorite")) {
      let usersFavoriteRecuperados = JSON.parse(localStorage.getItem("usersFavorite"));
          usersFavoriteRecuperados.forEach(user => usersFavorite.push(user));
          console.log('User recuperados', usersFavoriteRecuperados);
          return usersFavoriteRecuperados; 
  } 
}

// Evento click boton Favoritos
favoritosUsers.addEventListener("click", () => {
  if(recuperarUserFavoritos){
    let usersLocals = recuperarUserFavoritos();
    cargarUsersFavoritos(usersLocals);
  } else {
    cargarUsersFavoritos(usersFavorite);
  }
  // recuperarUserFavoritos() ? cargarUsersFavoritos(recuperarUserFavoritos()) : eliminarCacheFavoritos());
});


                                        /*** FIND USER PROMT SECTION **/

// Read One User
const cargarOneUser = (user) => {
  tbody.innerHTML = "";
  container.innerHTML = "";
  container.innerHTML += retornoCardUser(user);
  activarBotonesAdd();
  activarBotonesDelete();
};

const userSearchContainer = (userLocals, userName) => {
  let userFound = userLocals.find((userArray) => userArray.nombre === userName);
  userFound === undefined ? alert(`No se encontró el usuario ${userName} en tus contactos`) : cargarOneUser(userFound);
}

const findUserArray = () => {
  let userName = prompt("Ingresa el usuario a buscar:");
  localStorage.getItem("users") ? userSearchContainer(recuperarUsers(), userName) : userSearchContainer(users);
};

// Evento click boton Find User prompt
findUser.addEventListener("click", () => {
  findUserArray();
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

// Eliminar usuario
const eliminarLocalStorageUsers = (userId) => {
  if(localStorage.getItem("users"))
  { 
    let localList = localStorage.getItem("users");
    let list = JSON.parse(localList);
    let index = list.findIndex(object => {return object.id === parseInt(userId)});
    list.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(list));
  }
  else {
    let index = users.findIndex((user) => user.id === parseInt(userId));
    users.splice(index, 1);
  }
}

// Eliminar usuarios
const eliminarUser = (userId) => {
  eliminarLocalStorageUsers(userId);
  usersLoad();
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
const almacenarDatosLocalStorageFavoritos = () => usersFavorite.length > 0 ? localStorage.setItem("usersFavorite", JSON.stringify(usersFavorite)) : alert("No tienes ningun usuario dentro de favoritos.");

// Agregar a favoritos
const agregarAFavoritos = (userId) => { 
  // let usersLocal = recuperarUsers();
  let userFound = users.find((userArray) => userArray.id === parseInt(userId)) || localStorage.getItem("users").find((userArray) => userArray.id === parseInt(userId));
  console.log("Usuario encontrado en local", userFound);
  if (userFound) {
    let userInFavoritos = usersFavorite.find((userArray) => userArray.id === parseInt(userId));
    if (userInFavoritos == undefined) {
      // TRAER DATOS DEL LOCAL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      usersFavorite.push(userFound);
      almacenarDatosLocalStorageFavoritos();
    }
  }
};

// Ocular el Botton de Favoritos  
const iconCardAdd = (userId) => {
  let btnFavorites = document.getElementById(userId);
  btnFavorites.style.display = "none"; // btnFavorites.classList.add("deactive");
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

// Read Users
const cargarUsers = (array) => {
  containerDashboard.style.display = "none";
  tbody.innerHTML = "";
  container.innerHTML = "";
  array.forEach(user => user != undefined ? container.innerHTML += retornoCardUser(user) : console.log("Usuario Indefinido"));
  activarBotonesAdd();
  activarBotonesDelete();
  activarBotonesPopUp(); 
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
});

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