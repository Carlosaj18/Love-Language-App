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

const elimarUserFavoritoLocalStorage = (userId) => {
  let listaFavoritos = recuperarUsersFavoritos();
  let indexFavoritos = listaFavoritos.findIndex((object) => { return parseInt(object.id) === parseInt(userId) });
  listaFavoritos.splice(indexFavoritos, 1);
  almacenarDatosLocalStorageFavoritos(listaFavoritos);
};

const usersDeleteJSON = async (id) => {
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
   try {
    let response = await fetch(`${URL}/users/${id}`, { 
      method: "DELETE",
      headers: headersList
    });
      if(response.ok){
        let data = await response.text();
        console.log(`Usuario eliminado en el endpoint /users/ por medio del metodo DELETE: ${data}`);  
      }
  } catch (error) {
      console.log(error);
  } 
}

const loadingDataUserCads = (usersJSON) => {
  container.innerHTML = loader();
  let armoHTML = "";
  setTimeout(() => {
    container.innerHTML = armoHTML;
    cargarUsers(usersJSON);
  }, 500);  
}

const isInViewport = (elem) => {
  var distance = elem.getBoundingClientRect();
  return (distance.top < (window.innerHeight || document.documentElement.clientHeight) && distance.bottom > 0);
}

const confirmationPromese = async (id, index, list) => {
  list.splice(index, 1);
  almacenarDatosLocalStorageUsers(list);
  await usersDeleteJSON(id);
  toast();
  let usersJSON = await usersLoadJSON();
  loadingDataUserCads(usersJSON);
  // isInViewport(containerDashboard) ? loadingDataUserCads(cargarUsers(usersJSON)) : loadingDataUserCads(displayLenguajesDelAmor(usersJSON))
};

// Eliminar usuario
const eliminarLocalStorageUsers = (userId) => {
  if (localStorage.getItem("users")) {
    let list = recuperarUsers();
    let index = list.findIndex((object) => { return parseInt(object.id) === parseInt(userId) || object.id === userId.toString() });
    let userEnFavoritos = recuperarUsersFavoritos().find((user) => { return parseInt(user.id) == parseInt(userId)})
    userEnFavoritos ? elimarUserFavoritoLocalStorage(userId) : false;
    confirmDeleteUser(parseInt(userId), index, list);
  } else {
    let index = users.findIndex((user) => user.id === parseInt(userId));
    users.splice(index, 1);
  }
};

// Eliminar usuarios
const eliminarUser = async (userId) => {  eliminarLocalStorageUsers(userId) };

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
const almacenarDatosLocalStorageFavoritos = (usersFavoriteLocals) => { localStorage.getItem("usersFavorite") ? localStorage.setItem("usersFavorite", JSON.stringify(usersFavoriteLocals)) : localStorage.setItem("usersFavorite", JSON.stringify(usersFavorite)) };

// Modificar bandera de favoritos to true
const editarUsersIcon = (array, user, bandera) => {
  const newArrLocalUsers = array.map((obj) => {
    if (parseInt(obj.id) === parseInt(user.id)) { return { ...obj, favoritos: bandera } }
    return obj;
  });
  almacenarDatosLocalStorageUsers(newArrLocalUsers);
};

// Agregar a favoritos
const agregarAFavoritos = (userId) => {
  let userExist = recuperarUsers().find((user) => { return parseInt(user.id) === parseInt(userId) }); // btn-id = 1-add 
  if (userExist) {
    if (localStorage.getItem("usersFavorite")) {
      let userFound = recuperarUsersFavoritos().find((user) => { return parseInt(user.id) == parseInt(userExist.id) });
      if (userFound == undefined) {
          userExist = {
            ...userExist,
            favoritos: true,
          };
          let localStorageFavoritos = recuperarUsersFavoritos();
          localStorageFavoritos.push(userExist); // push to favoritos
          almacenarDatosLocalStorageFavoritos(localStorageFavoritos);
          usersUodatedJSON(userExist.id, userExist); // push to JSON
          editarUsersIcon(recuperarUsers(), userExist, true); // push to localStorage
          alerta("", `El User ${userExist.nombre} se ha agregado a Favoritos`, "success", `${userExist.id}`);
      } else {
          alerta("", `User ${userExist.nombre} already in Favoritos`, "error");
      }
    } else {
      let localStorageFavoritos = recuperarUsersFavoritos();
      let userFound = localStorageFavoritos.find((user) => { parseInt(user.id) == parseInt(userId) });
      if (userFound == undefined) {
        userExist = {
          ...userExist,
          favoritos: true,
        };
        localStorageFavoritos.push(userExist);
        almacenarDatosLocalStorageFavoritos(localStorageFavoritos);
        usersUodatedJSON(userExist.id, userExist); // push to JSON
        editarUsersIcon(users, userExist, true);
        alerta("", `El User ${userExist.nombre} se ha agregado a Favoritos`, "success", `${userExist.id}`);
      }
    }
  }
};

// Ocultar el Botton de Favoritos
const iconCardAdd = (userId) => {
  let btnFavorites = document.getElementById(userId);
  let userLocals = recuperarUsers();
  let userFound = userLocals.find((userArray) => { return parseInt(userArray.id) == parseInt(userId) });
  userFound.favoritos === true ? (btnFavorites.style.display = "none") : (btnFavorites.style.display = "block");
};

// Activar Bottones de favoritos -> btn.id = 1-add
const activarBotonesAdd = () => {
  const botonesAdd = document.querySelectorAll(".button.button-clear.button-add");
  botonesAdd.forEach((btn) => {
    btn.addEventListener("click", () => {
      agregarAFavoritos(btn.id); 
      iconCardAdd(btn.id); 
    });
  });
};

// Controlar visualizacion de botones favoritos con la bandera true
const comprobarIconoFavoritos = () => {
  recuperarUsersFavoritos().map((obj) => {
    if (obj.favoritos === true) {
      let btnFavorites = document.getElementById(`${obj.id}-add`);
      btnFavorites.style.display = "none";
    } else {
      let btnFavorites = document.getElementById(`${obj.id}-add`);
      btnFavorites.style.display = "block";
    }
  });
};

const loader = () => retornoImageLoader();

// Read Users
const cargarUsers = async (usersData) => {
  let array;
  let armoHTML = "";
  let activoBotones = true;
  containerDashboardLoad();
  container.innerHTML = loader();
  try {
    tbody.innerHTML = "";
    array = await usersData;
    array.forEach((user) => { user != undefined ? armoHTML += retornoCardUser(user) : console.log("Usuario Indefinido") });
  } catch (error) {
    armoHTML = retornoError();
    activoBotones = false;
  } finally {
    setTimeout(() => {
      container.innerHTML = armoHTML;
      activoBotones == true ? activarBotonesDelete() + activarBotonesAdd() + activarBotonesPopUp() + comprobarIconoFavoritos() : (activoBotones = false);
    }, 2500);
  }
};

// Validation same data from JSON & localStorage
const isObject = (object) => { return object != null && typeof object === "object" };

// Function object comparation 
const isDeepEqual = (object1, object2) => {
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (var key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects = isObject(value1) && isObject(value2);

    if (
      (isObjects && !isDeepEqual(value1, value2)) ||
      (!isObjects && value1 !== value2)
    ) {
      return false;
    }
  }
  return true;
};

// Pasar a objeto
const toObject = (arr) => {
  var rv = {};
  for (var i = 0; i < arr.length; ++i) rv[i] = arr[i];
  return rv;
}

// Validar datos en localStorage y JSON
const validationJSONAndLocalStorage = async () => {
  if (localStorage.getItem("users") !== undefined) {
    let usersJSON;
    try {
      usersJSON = await usersLoadJSON();
    } catch (error) {
      return error.message;
    } finally {
      let localStorageUsers = recuperarUsers();
      return isDeepEqual(toObject(usersJSON), toObject(localStorageUsers));
    }
  }
};

// LocalStorage lenght
const localStorageKeysLengh = (localStorageKey) => { localStorageKey.length > 0 ? true : false };

// Validation localStorage users
const validationLocalStorageUsers = (localStorageUsers) => { localStorageUsers && localStorageKeysLengh(recuperarUsers(localStorageUsers)) ? true : false };

// Comparar alguna modificacion en la base de datos para actualizar el localstorage
const recuperarUsersJSON = async () => {
  if (validationLocalStorageUsers(localStorage.getItem("users"))) {
    let validation = await validationJSONAndLocalStorage();
    if (validation.ok) {
      return recuperarUsers();
    } else {
      try {
        usersJSON = await usersLoadJSON();
        if(usersJSON.ok) { almacenarDatosLocalStorageUsers(usersJSON) };
      } catch (error) {
        return error;
      } finally {
        return usersJSON;
      }
    }
  } 
};

// Validar user in array users
const userInArrayUsers = (user) => {
  let userNotArray = false;
  userExist = users.find((userJSON) => { return userJSON.id == user.id });
  if (userExist == undefined) { userNotArray = true }
  return userNotArray;
};

// Cargar users from JSON
const usersLoadJSON = async () => {
  let usersJSON;
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
  try {
      const response = await fetch(`${URL}/users/`, { 
      method: "GET",
      headers: headersList
      });
      if(response.ok){
        usersJSON = await response.json();
        usersJSON.forEach((user) => { userInArrayUsers(user) == true ? users.push(user) : null });
        almacenarDatosLocalStorageUsers(usersJSON); 
      }
  } catch (error) {
      return error;
  } finally {
      return usersJSON;
  }
};

// Recuperar Users localStorags
const recuperarUsers = () => {
  if (localStorage.getItem("users")) {
      let usersRecuperados = JSON.parse(localStorage.getItem("users") || []);
          usersRecuperados.forEach((user) => { userInArrayUsers(user) == true ? users.push(user) : null });
          return usersRecuperados;
  } else {
    return users;
  }
};

// Revisar si hay users en localStorage || users json para cargar en las cards
const usersLoad = () => { localStorage.getItem("users") != undefined ? cargarUsers(recuperarUsers()) && botonOrdenarLoad() : cargarUsers(usersLoadJSON()) && botonOrdenarLoad() };
