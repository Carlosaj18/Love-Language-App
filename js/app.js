/** Container Button */
const allUsers = document.querySelector("button.allUsers");
const favoritosUsers = document.querySelector(".button.button-favoritos");
const findUser = document.querySelector(".button.findUser");
const searchContainer = document.querySelector(".search-container");
const input = document.querySelector("input.input");
const log = document.getElementById("values");
const buttonOrdenar = document.querySelector("button.ordenar");
const buttonDashboard = document.querySelector("button.button-dashboard");
const container = document.querySelector(".containerCards");
const containerDashboard = document.querySelector(".container-dashboard");
const tbody = document.querySelector(".tbody");
const modal = document.querySelector(".modal");


// Load Window 
window.addEventListener("load", (event) => {
  containerDashboard.style.display = "none";
  modal.style.display = "none";
  activarBotonesPopUpForm();
});

// Id User
const idUser = () => parseInt(Math.random() * 10000);

// Activar Botton de delete favoritos
const iconCardAdd = (userId) => {
  let btnFavorites = document.getElementById(userId);
  btnFavorites.style.display = "none"; // btnFavorites.classList.add("deactive");
}

const iconCardDelete = (userId) => {
  const botonCardDelete = document.getElementById(userId);
  botonCardDelete.style.display = "none"; ///botonDeleteCard.classList.add("deactive-delete");
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

const activarBotonesDeleteFavoritos = () => {const botonesDelete = document.querySelectorAll(".button.button-clear.button-delete");
  botonesDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      eliminarFavoritoUser(btn.id);
    });
  });
};

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

// Function
const topLenaguajes = (topLenguajeDelAmor) => {
  container.innerHTML = "";
  tbody.innerHTML = "";
  topLenguajeDelAmor.forEach((user) => {
    tbody.innerHTML += retornoTableDashboard(user);
  });
};

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

const displayLenguajesDelAmorUserFavoritos = (userId) => {
  let user = usersFavorite.find((userArray) => userArray.id === parseInt(userId));
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

const displayLenguajesDelAmor = () => {
  let userLocals = recuperarUsers();
  let topLenguajeDelAmor = userLocals.map((user) => {
    return {
      ID: user.id,
      imagen: user.imagen,
      nombre: user.nombre,
      physicalTouch: user.languages.physicalTouch / 100,
      actosOfService: user.languages.actosOfService / 100,
      qualityTime: user.languages.qualityTime / 100,
      wordsOfAffirmation: user.languages.wordsOfAffirmation / 100,
      receivingGifts: user.languages.receivingGifts / 100,
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

// Evento click Dashboard
buttonDashboard.addEventListener("click", () => {
  containerDashboard.style.display = "block";
  displayLenguajesDelAmor();
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
  console.table(userOrdenados);
  cargarUsers(userOrdenados);
};

// Evento click boton Ordenar
buttonOrdenar.addEventListener("click", () => {
  let localUsers = recuperarUsers();
  ordenar(localUsers);
});

// Read Users
const cargarUsers = (array) => {
  containerDashboard.style.display = "none";
  tbody.innerHTML = "";
  container.innerHTML = "";
  array.forEach((user) => {
    if(user != undefined)
    {
      container.innerHTML += retornoCardUser(user)
    }
    else {
      console.log("Usuario Indefinido")
    } 
  })
  activarBotonesAdd();
  activarBotonesDelete();
  activarBotonesPopUp();
};

// Read One User
const cargarOneUser = (user) => {
  tbody.innerHTML = "";
  container.innerHTML = "";
  container.innerHTML += retornoCardUser(user);
  activarBotonesAdd();
  activarBotonesDelete();
};

const usersLoad = () => {
  if(localStorage.getItem("users")) { 
    let usersLocals = recuperarUsers();
    cargarUsers(usersLocals);
  }
  else {
    cargarUsers(users);
  }
}

// Evento click boton All Users
allUsers.addEventListener("click", () => { 
  usersLoad();
});

const almacenarDatosLocalStorageUsers = (usersLocals) => {
  if(localStorage.getItem("users")) { 
    localStorage.setItem("users", JSON.stringify(usersLocals));
  }
  else {
    localStorage.setItem("users", JSON.stringify(users));
  }
}

const almacenarDatosLocalStorageFavoritos = () => {
  if(usersFavorite.length > 0) { 
    localStorage.setItem("usersFavorite", JSON.stringify(usersFavorite));
  }
}

const recuperarUserFavoritos = () => {
  if (localStorage.getItem("usersFavorite")) {
      let usersFavoriteRecuperados = JSON.parse(localStorage.getItem("usersFavorite"));
          usersFavoriteRecuperados.forEach(userFavorite => usersFavorite.push(userFavorite));
      return usersFavoriteRecuperados;
  }
}

// Agregar a favoritos
const agregarAFavoritos = (userId) => {
  userId = parseInt(userId);
  let userFound = users.find((userArray) => userArray.id === userId);
  if (userFound !== undefined) {
    let userInFavoritos = usersFavorite.find(
      (userArray) => userArray.id === userId
    );
    if (userInFavoritos === undefined) {
      usersFavorite.push(userFound);
      almacenarDatosLocalStorageFavoritos()
    }
  }
};

// PREGUNTA
/** ¿Como hacer para cuando este seleccionado el corazon que aparezca el boton de eliminar,
 * y que cuando este seleccionado el de eliminar apareza el del corazon? */
const buttonShowFavoritos = (userId) => {const botonesAdd = document.querySelectorAll(".button.button-outline.button-add");
  if (userId) {
    botonesAdd.classList.toggle("button-add-hide");
  }
};

// Read favoritos
const cargarUsersFavoritos = (array) => {
  tbody.innerHTML = "";
  container.innerHTML = "";
  array.forEach((user) => {
    container.innerHTML += retornoCardUserFavoritos(user);
  });
  activarBotonesDeleteFavoritos()
  activarBotonesPopUp();
};

// Evento click boton Favoritos
favoritosUsers.addEventListener("click", () => {
  let userRecuperados = recuperarUserFavoritos();
  if (userRecuperados) {
    cargarUsersFavoritos(userRecuperados);
  } else {
    alert("No tienes ningun usuario dentro de favoritos.");
  }
});

// Editar user
// PREGUNTA
/** ¿Como editar el usuario? */

const userSearchContainer = (userLocals, userName) => {
  let userFound = userLocals.find((userArray) => userArray.nombre === userName);
    if (userFound === undefined) {
      alert(`No se encontró el usuario ${userName} en tus contactos`);
    } else {
      cargarOneUser(userFound);
    }
}

// Find User con prompt
const findUserArray = () => {
  let userName = prompt("Ingresa el usuario a buscar:");
  if(localStorage.getItem("users")){
    let userLocals = recuperarUsers();
    userSearchContainer(userLocals, userName);
  } else {
    userSearchContainer(users);
  }
};

// Evento click boton Find User prompt
findUser.addEventListener("click", () => {
  findUserArray();
});

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

// Filter user by inputs in search bar
/**  PREGUNTA: 1) COMO TOMAR LOS VALORES DEL INPUT para hacer la busqueda filtrada
     PREGUNTA: 2) Como reseteo el input del search bar  */
const findUserSearchBar = () => {
  searchContainer.addEventListener("keydown", (e) => {
    let targetValue = e.target.value; // arranca un valor atras
    let key = e.key.toUpperCase();
    if (
      (e.key != "Backspace" && e.keyCode >= 65 && e.keyCode <= 90) ||
      (e.keyCode >= 97 && e.keyCode <= 122)
    ) {
      if (targetValue != "") {
        targetValue = capitalizeFirstLetter(targetValue);
        userFilterMap(targetValue);
      } else {
        userFilterMap(key);
      }
    }
    inputListener();
  });
};

// Evento para print user input in the container
const inputListener = () => {
  input.addEventListener("input", updateValue);
  function updateValue(e) {
    capitalizeFirstLetter((log.textContent = e.target.value));
  }
};

// Evento click search bar & keydown
searchContainer.addEventListener("click", () => {
  usersLoad();
  findUserSearchBar();
});

// Eliminar usuario
const eliminarLocalStorageUsers = (userId) => {
  if(localStorage.getItem("users"))
  { 
    let localList = localStorage.getItem("users"); // json object
    let list = JSON.parse(localList);
    let index = list.findIndex(object => {return object.id === parseInt(userId)});
    list.splice(index, 1); // Elimina el elemento del array ​list
    localStorage.setItem("users", JSON.stringify(list));  // Sobrescribe el array de favoritos en el localStorage
  }
  else {
    let index = users.findIndex((user) => user.id === parseInt(userId));
    users.splice(index, 1);
  }
  
}

// Eliminar usuarios
function eliminarUser(userId) {
  eliminarLocalStorageUsers(userId);
  usersLoad();
}

const eliminarLocalStorageFavoritos = (userId) => {
  let localList = localStorage.getItem("usersFavorite"); // json object
  let list = JSON.parse(localList);
  let index = list.findIndex((userFavorite) => userFavorite.id === parseInt(userId));
  list.splice(index, 1); // Elimina el elemento del array ​list
  localStorage.setItem("usersFavorite", JSON.stringify(list));  // Sobrescribe el array de favoritos en el localStorage
  return list;
}

// Eliminar usuario de favoritos
function eliminarFavoritoUser(userId) {
  let userRecuperados = eliminarLocalStorageFavoritos(userId);
  cargarUsersFavoritos(userRecuperados);
}
// Cargar datos en localStorage
/*almacenarDatosLocalStorageUsers();*/

