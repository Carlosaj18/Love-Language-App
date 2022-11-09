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

  let user = recuperarUsers().find((userArray) => userArray.id === parseInt(userId));
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
  let listaFavoritos = recuperarUsersFavoritos();
  let indexFavoritos = listaFavoritos.findIndex((object) => { return object.id === parseInt(userId) });
  listaFavoritos.splice(indexFavoritos, 1);
  almacenarDatosLocalStorageFavoritos(listaFavoritos);
};

const confirmationPromese = (index, list) => {
  list.splice(index, 1);
  almacenarDatosLocalStorageUsers(list);
  toast();
  usersLoad();
};

// Eliminar usuario
const eliminarLocalStorageUsers = (userId) => {
  if (localStorage.getItem("users")) {
    let list = recuperarUsers();
    let index = list.findIndex((object) => { return object.id === parseInt(userId) });
    elimarUserFavoritoLocalStorage(userId);
    confirmDeleteUser(index, list);
  } else {
    let index = users.findIndex((user) => user.id === parseInt(userId));
    users.splice(index, 1);
  }
};

// Eliminar usuarios
const eliminarUser = (userId) => { eliminarLocalStorageUsers(userId) };

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

const editarUsersIcon = (array, user, bandera) => {
  const newArrLocalUsers = array.map((obj) => {
    if (obj.id === parseInt(user.id)) { return { ...obj, favoritos: bandera } }
    return obj;
  });
  almacenarDatosLocalStorageUsers(newArrLocalUsers);
};

// Agregar a favoritos
const agregarAFavoritos = async (userId) => {
  let localStorageUsers = recuperarUsers();
  let userExist = localStorageUsers.find((user) => { return user.id === parseInt(userId) }); // btn-id = 1-add 
  if (userExist) {
    if (localStorage.getItem("usersFavorite")) {
      let = localStorageUsersFavoritos = recuperarUsersFavoritos();
      let userFound = localStorageUsersFavoritos.find((user) => { return user.id == userExist.id });
      if (userFound == undefined) {
          userExist = {
            ...userExist,
            favoritos: true,
          };
          localStorageUsersFavoritos.push(userExist);
          almacenarDatosLocalStorageFavoritos(localStorageUsersFavoritos);
          editarUsersIcon(localStorageUsers, userExist, true);
          alerta("", `El User ${userExist.nombre} se ha agregado a Favoritos`, "success", `${userExist.id}`);
      } else {
          alerta("", `User ${userExist.nombre} already in Favoritos`, "error");
      }
    } else {
      let userFound = usersFavorite.find((user) => { user.id == parseInt(userId) });
      if (userFound == undefined) {
        userExist = {
          ...userExist,
          favoritos: true,
        };
        usersFavorite.push(userExist);
        almacenarDatosLocalStorageFavoritos(usersFavorite);
        editarUsersIcon(users, userExist, true);
        alerta("", `El User ${userExist.nombre} se ha agregado a Favoritos`, "success", `${userExist.id}`);
      }
    }
  }
};

// Ocultar el Botton de Favoritos
const iconCardAdd = async (userId) => {
  let btnFavorites = document.getElementById(userId);
  let userLocals = await recuperarUsers();
  let userFound = userLocals.find((userArray) => userArray.id === parseInt(userId));
  userFound.favoritos === true ? (btnFavorites.style.display = "none") : (btnFavorites.style.display = "block");
};

// Activar Bottones de favoritos
const activarBotonesAdd = () => {
  const botonesAdd = document.querySelectorAll(".button.button-clear.button-add");
  botonesAdd.forEach((btn) => {
    btn.addEventListener("click", () => {
      agregarAFavoritos(btn.id); // btn.id = 1-add
      iconCardAdd(btn.id);
    });
  });
};

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

const loader = () => `<img src="images/Ellipsis-1.1s-44px.gif" width="30px">`;

// Read Users
const cargarUsers = async (usersData) => {
  let array;
  let armoHTML = "";
  let activoBotones = true;
  container.innerHTML = loader();
  containerDashboard.style.display = "none";
  try {
    tbody.innerHTML = "";
    array = await usersData;
    array.forEach((user) => { user != undefined ? (armoHTML += retornoCardUser(user)) : console.log("Usuario Indefinido") });
  } catch (error) {
    armoHTML = retornoError();
    activoBotones = false;
  } finally {
    container.innerHTML = armoHTML;
    activoBotones == true;
    activarBotonesAdd();
    activarBotonesDelete();
    activarBotonesPopUp();
    comprobarIconoFavoritos();
    /*
    setTimeout(() => {
      container.innerHTML = armoHTML;
      activoBotones == true
        ? activarBotonesAdd() +
          activarBotonesDelete() +
          activarBotonesPopUp() +
          comprobarIconoFavoritos()
        : (activoBotones = false);
    }, 2500);*/
  }
};

// Validation same data from JSON & localStorage
const isObject = (object) => {
  return object != null && typeof object === "object";
};

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
function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i) rv[i] = arr[i];
  return rv;
}

// Validar datos en localStorage y database
const validationJSONAndLocalStorage = async () => {
  if (localStorage.getItem("users") !== undefined) {
    try {
      const response = await fetch(`../../bbdd/users.json`);
      usersJSON = await response.json();
    } catch (error) {
      return error.message;
    } finally {
      let localStorageUsers = recuperarUsersLocalStorage(
        localStorage.getItem("users")
      );
      return isDeepEqual(toObject(usersJSON), toObject(localStorageUsers));
    }
  }
};

// REVIEW CAMBIO EN EL JSON O EN LOCALSTORAGE PARA HACER EL UPDATE -> Implementar un boton para hacer el update
/*const recuperarUsers = async () => {
  if (validationLocalStorageUsers(localStorage.getItem("users"))) {
    let validation = await validationJSONAndLocalStorage();
    if (validation) {
      return recuperarUsersLocalStorage(localStorage.getItem("users"));
    } else {
      try {
        const response = await fetch(`../../bbdd/users.json`); // When there is a modification in the JSON
        usersJSON = await response.json();
        almacenarDatosLocalStorageUsers(usersJSON);
      } catch (error) {
        return error;
      } finally {
        return usersJSON;
      }
    }
  } else {
    usersLoadJSON();
  }
};*/

// Validar users in array
const userInArrayUsers = (user) => {
  let userNotArray = false;
  userExist = users.find((userJSON) => { return userJSON.id == user.id });
  if (userExist == undefined) { userNotArray = true }
  return userNotArray;
};

// Cargar users from JSON
const usersLoadJSON = async () => {
  let usersJSON;
  try {
    const response = await fetch(`../../bbdd/users.json`, {cache: 'no-cache'} );
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

// LocalStorage lenght
const localStorageKeysLengh = (localStorageKey) => { localStorageKey.length > 0 ? true : false };

// Convert to Object data in localStorage
const recuperarUsersLocalStorage = (localStorageUsers) => {
  if (localStorageUsers !== null) {
    let usersRecuperados = JSON.parse(localStorageUsers);
      usersRecuperados.forEach((user) => { userInArrayUsers(user) == true ? users.push(user) : null });
      return usersRecuperados; 
  }
};

// Validation localStorage users
const validationLocalStorageUsers = (localStorageUsers) => { localStorageUsers && localStorageKeysLengh(recuperarUsersLocalStorage(localStorageUsers)) ? true : false };

// Recuperar Users localStorags
const recuperarUsers = () => {
  if (localStorage.getItem("users")) {
    let usersRecuperados = JSON.parse(localStorage.getItem("users"));
        usersRecuperados.forEach((user) => { userInArrayUsers(user) == true ? users.push(user) : null });
        return usersRecuperados;
  } else {
    return users;
  }
};

// Revisar si hay users en localStorage || users json para cargar
const usersLoad = () => { localStorage.getItem("users") != undefined ? cargarUsers(recuperarUsers()) : cargarUsers(usersLoadJSON()) };
