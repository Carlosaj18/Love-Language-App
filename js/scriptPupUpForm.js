const openModalButtonsForm = document.querySelectorAll("[data-modal-target-form]");
const closeModalButtonsForm = document.querySelectorAll("[data-close-button]");
const closeSendButton = document.getElementById("close-button");
const overlayForm = document.getElementById("overlay");
const infoPopUpForm = document.querySelector(".modal-body.form");
const addUser = document.getElementById("createUser");

const datosCompletos = (selectNombreUser, selectGenero) => {
  if ( selectNombreUser.value !== "..." && selectGenero.value !== "..."
  ) {
    return true;
  } else {
    return false;
  }
};

const validarUser = (newUser) => {
  let userFound = users.find((userArray) => userArray.id === parseInt(newUser.id));
  if (userFound == undefined) return userFound;
}

const agregarNewUser = (newUser) => {
  if(localStorage.getItem("users"))
  { 
    let usersLocals = recuperarUsers(); 
    let user = usersLocals.find(user => { return user.id == newUser.id });
    if (user == undefined) {
        usersLocals.push(newUser);
        almacenarDatosLocalStorageUsers(usersLocals);
    }
  } else {
    let user = users.find(user => { return user.id == newUser.id });
    if (user == undefined) {
        users.push(newUser);
        almacenarDatosLocalStorageUsers(users); // seteo el localstorage
    }
  }
}

const almacenarOneUserLocalStorage = (profileUser) => {
  if(profileUser) { return localStorage.setItem(`${profileUser.id}`, JSON.stringify(profileUser))};
}

const recuperarUserLocalStorage = (id)=> {
  //debugger
  if (localStorage.getItem(`${id}`)) {
    let obj = localStorage.getItem(`${id}`)
    let userRecuperado = JSON.parse(obj);
    console.log("User recuperado local", userRecuperado);
    return cargarOneUser(userRecuperado);
  }
}

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

const createUserForm = (selectNombre, selectGenero, selectDescription, userCreated) => {
  if (datosCompletos(selectNombre, selectGenero)) {
    let id = idUser();
    let imagen = "";
    let nombre = selectNombre.value;
    let description = selectDescription.value != "" ? selectDescription.value : "Cuando una acción no es algo natural para ti, eso es una expresión de amor";
    let genero = selectGenero.value;
    let languages = loveLanguages;
    
    const NewUser = new User(id, imagen, nombre, description, genero, languages);
    if(!validarUser(NewUser)){
      let profileUser = NewUser.asingacionPorcentajesLenguajes(NewUser);
      almacenarOneUserLocalStorage(profileUser);
      agregarNewUser(profileUser);
      userCreated.innerText = profileUser.imagen + "✅";
    }
    else {
        respuesta = confirm(
          "El usuario " +
            profileUser.nombre +
            " ya existen en el array de usuarios. ¿Deseas agregar otro?"
        );
          if (respuesta) {
            createUserForm();
        }
    }
    //btnEnviar.classList.remove("ocultar");
  } else {
    alert("⛔️ Debes completar todos los datos en pantalla.");
  }
};

const clickBtnEnviar = (selectNombre, selectGenero, selectDescription, btnEnviar, userCreated) => {
  btnEnviar.addEventListener("click", () => {
    createUserForm(selectNombre, selectGenero, selectDescription, userCreated);
    closeModal(modal);
    // recuperar users localstorage 
    //let userRecuperados = recuperarUsers();
    //cargarUsers(userRecuperados);
  });
}

const selectNombreUser = () => {
  const selectNombreUser = document.querySelector("#nombre")
  return selectNombreUser;
}

const selectGeneroUser = () => {
  const selectGenero = document.querySelector("#genero");
  return selectGenero;
}

const selectDescriptionUser = () => {
  const selectDescription = document.querySelector("#description");
  return selectDescription;
}

const selectUserCreated = () => {
  const userCreated = document.querySelector("#userCreated");
  return userCreated;
}

const btnEnviarUser = () => {
  const btnEnviar = document.querySelector("button.button.button-outline");
  return btnEnviar;
}

const popUpForm = () => {
  infoPopUpForm.innerHTML = "";
  infoPopUpForm.innerHTML = retornoFormAddUser();
  selectNombreUser();
  selectGeneroUser();
  selectDescriptionUser();
  cargarCombo(datosGenero, selectGeneroUser());
  selectUserCreated()
  btnEnviarUser();
  clickBtnEnviar(selectNombreUser(), selectGeneroUser(), selectDescriptionUser(), btnEnviarUser(), selectUserCreated());
};

function openModalForm(modal) {
  if (modal == null) return "no hay modal";
  modal.style.display = "block";
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

closeModalButtonsForm.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

const cargarCombo = (array, select) => {
  //DRY - KISS - YAGNI
  array.forEach(
    (elemento) =>
      (select.innerHTML += `<option value="${elemento.valor}">${elemento.genero}</option>`)
  );
};

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
addUser.addEventListener("click", () => {
  activarBotonesPopUpForm();
  // createUser();
});

const localStorageKeys = () => {
  for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    console.log("Clave ", clave);
    console.log("Valor " + localStorage.getItem(clave));
  }
}