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
const PopUpEditUser      = document.querySelector(".modal-body.editUser");
const closeEditButton    = document.getElementById("close-button-edit");
const closeModalButtonEditUser = document.querySelectorAll("[data-close-button-edit]");
const modalEditUser = document.querySelector(".modalEditUser");

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

         
const activoBotonesDelete = () => {
  const btnsDelete = document.querySelectorAll(".button-delete.button-small");
        btnsDelete.forEach(btn => {
          btn.addEventListener("click", (e)=> { //LES ASIGNO EL EVENTO CLICK
              eliminarUser(e.target.id); 
              let userLocals = recuperarUsers();
              displayLenguajesDelAmor(userLocals);
          })
      })
}

const editButton = () => {
  closeEditButton.addEventListener("click", () => {
    if(datosCompletos(selectNombreUser(), selectGeneroUser())) {
      const modal = button.closest(".modalEditUser");
      closeModal(modal);  
    }
  })
}

closeModalButtonEditUser.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modalEditUser");
    closeModal(modal);
  });
});

const pushUserEdit = (userExist, nombre, genero, description, physicalTouch, actosOfService, qualityTime, wordsOfAffirmation, receivingGifts) => {

  const newArr = recuperarUsers().map(obj => {
    if (obj.id === parseInt(userExist.id)) {
      return { 
        id: userExist.id, 
        imagen: userExist.imagen,
        nombre      : nombre.value,
        favoritos: userExist.favoritos,
        description : description.value,
        genero      : genero.value,
        languages   : {
          physicalTouch : physicalTouch.value,     
          actosOfService : actosOfService.value,    
          qualityTime   : qualityTime.value,       
          wordsOfAffirmation : wordsOfAffirmation.value,
          receivingGifts : receivingGifts.value,   
        }
      };
    }
    return obj;
  });
  almacenarDatosLocalStorageUsers(newArr);
  let userLocals = recuperarUsers();
  displayLenguajesDelAmor(userLocals);

}

const recuperarDatosUser = (userId)=> {
  const id = document.querySelector("#id");
  const imagen = document.querySelector("#imagen");
  const nombre = document.querySelector("#nombre");
  const favoritos = document.querySelector("#favoritos");
  const genero = document.querySelector("#genero");
  const description = document.querySelector("#description");
  const physicalTouch = document.querySelector("#physicalTouch");
  const actosOfService = document.querySelector("#actosOfService");
  const qualityTime = document.querySelector("#qualityTime");
  const wordsOfAffirmation = document.querySelector("#wordsOfAffirmation");
  const receivingGifts = document.querySelector("#receivingGifts");
  const closeButtonEdit = document.querySelector("#close-button-edit");
  cargarCombo(datosGenero, selectGeneroUser());
  
  let userlocal = recuperarUsers();
  let userExist = userlocal.find((user) => user.id === parseInt(userId));

  if(localStorage.getItem("users")){
    if(userExist != undefined){
      id.value =  userExist.id;          
      imagen.value = userExist.imagen;
      nombre.value =  userExist.nombre;
      favoritos.value = userExist.favoritos == true ? "⭐" : "😅";  
      if (userExist.genero == "M"){
        genero.value = "Masculino";
      } else if (userExist.genero == "F") {
        genero.value = "Femenino";
      } else {
        genero.value = "Indefinido";
      }
      description.value         = userExist.description;
      physicalTouch.value       =  userExist.languages.physicalTouch;
      actosOfService.value      = userExist.languages.actosOfService;
      qualityTime.value         =  userExist.languages.qualityTime;
      wordsOfAffirmation.value  = userExist.languages.wordsOfAffirmation;
      receivingGifts.value      =  userExist.languages.receivingGifts;
    }
  }

  closeButtonEdit.addEventListener("click", () => {
    pushUserEdit(userExist, nombre, genero, description, physicalTouch, actosOfService, qualityTime, wordsOfAffirmation, receivingGifts);
    const modalEditUser = document.querySelector(".modalEditUser");
    closeModal(modalEditUser);
  })
}

const popUpEditUser = (idUser) => {
  PopUpEditUser.innerHTML = "";
  PopUpEditUser.innerHTML = retornoUpdateUser();
  recuperarDatosUser(idUser);
}

const activarBotonesPopUpEditUser = (idUser) => {
  const openModalButtonsForm = document.querySelectorAll("[data-modal-target-edit]");
  openModalButtonsForm.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(".modalEditUser"); // select our modal
      openModalForm(modal);
      popUpEditUser(idUser);
    });
  });
};

const updateUser = (userId) => {
  if(localStorage.getItem("users")){
    let localList = localStorage.getItem("users");
    let list = JSON.parse(localList);
    let user = list.find(object => {return object.id === parseInt(userId)});
    // open a modal 
  }
}

const activoBotonesUpdate = () => {
  const btnUpdate = document.querySelectorAll(".button-update.button-small");
        btnUpdate.forEach(btn => {
          btn.addEventListener("click", (e) => {
            activarBotonesPopUpEditUser(e.target.id);
            updateUser(e.target.id);
          })
        })
}

// HTML para cargar el dashboard
const topLenaguajes = (topLenguajeDelAmor) => {
  container.innerHTML = "";
  tbody.innerHTML = "";
  topLenguajeDelAmor.forEach((user) => {
    tbody.innerHTML += retornoTableDashboard(user);
  });
  activoBotonesDelete();
  activoBotonesUpdate();
  activoBotonesUpdate();
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
        parseInt(user.languages.physicalTouch) + 
        parseInt(user.languages.actosOfService) +
        parseInt(user.languages.qualityTime) +
        parseInt(user.languages.wordsOfAffirmation) +
        parseInt(user.languages.receivingGifts),
      favoritos: user.favoritos == true ? "⭐" : "😅"
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
  
  if(localStorage.getItem("usersFavorite") || usersFavorite.length > 0) {
    let localList = localStorage.getItem("usersFavorite"); // json object
    let list = JSON.parse(localList);
    let indexLocals = list.findIndex((userFavorite) => userFavorite.id === parseInt(userId));
    list.splice(indexLocals, 1); // Elimina el elemento del array ​list
    localStorage.setItem("usersFavorite", JSON.stringify(list));  // Sobrescribe el array de favoritos en el localStorage
    alerta("", `⛔️ El usuario se elimino de favoritos`, 'warning');
    //toast(userExist.nombre);
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
  let userName = prompt("Ingresa el usuario a buscar: ");
  localStorage.getItem("users") ? userSearchContainer(recuperarUsers(), capitalizeFirstLetter(userName)) : userSearchContainer(users);
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
  let userExist = recuperarUsers(); // valido que exista el usuario 
  userExist = userExist.find(user => { return user.id == parseInt(userId) });
  if(userExist){
    if(localStorage.getItem("usersFavorite")){
      let usersFavoriteLocals = recuperarUsersFavoritos();
      let userFound = usersFavoriteLocals.find((user) => { return user.id == parseInt(userId) });
      if(userFound == undefined){
        alerta("", `El User ${userExist.nombre} se ha agregado a Favoritos`, 'success', `${userExist.id}`);
        //alertaImageFavoritos(userExist);
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
  //alertaOrdenar("success", "Todos los usuarios fueron ordenados");
  alertaOrdenarDashboard(localUsers.length);
});

                                        /*** LIBRERIAS WINDOW **/

/** https://sweetalert2.github.io/ */                                        
const alerta = (titulo, mensaje, icono) => {
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

const alertaImageFavoritos = (user) => {
  Swal.fire({
    title: 'Agregado a favoritos',
    text: `El usuario ${user.nombre} fue agregado a favoritos`,
    imageUrl: "https://unsplash.it/400/200",
    imageWidth: 400,
    imageHeight: 200,
    timer: 4500,
    imageAlt: 'Custom image',
  })
}

const alertaOrdenar = (icono, mensaje) => {
  Swal.fire({
    icon: icono,
    timer: 3000,
    text: mensaje, 
    showConfirmButton: false,
  });
}

const alertaOrdenarDashboard = (arrayLenght) => {
  let timerInterval;
  Swal.fire({
    title: 'Ordenando los Usuarios',
    html: 'Contando total de usuarios <b></b>.',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
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

const toast = ()=> {
  Toastify({
      text: `Usuario eliminado`,
      duration: 4000,
      newWindow: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      style: {
        background: "crimson",
      }
    }).showToast();
}


                                        /*** LOAD WINDOW **/
window.addEventListener("load", (event) => {
  containerDashboard.style.display = "none";
  modal.style.display = "none";
  activarBotonesPopUpForm();
  const displayLanguage = document.querySelector(".modalLanguage");
  displayLanguage.style.display = "none";
  const PopUpEditUser      = document.querySelector(".modalEditUser");
  PopUpEditUser.style.display = "none";
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


