const openModalButtonsForm  = document.querySelectorAll("[data-modal-target-form]");
const closeModalButtonsForm = document.querySelectorAll("[data-close-button]");
const closeSendButton       = document.getElementById("close-button");
const overlayForm           = document.getElementById("overlay");
const infoPopUpForm         = document.querySelector(".modal-body.form");


function closeModal(modal){
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

// Validar datos en el form
const datosCompletos = (selectNombreUser, selectGenero) => selectNombreUser.value !== "..." && selectGenero.value !== "..." ? true : false;

// Id User
const idUser = () => parseInt(Math.random() * 10000);

// Validar datos duplicados con mismo ID
const validarUser = (newUser) => {
  let userFound = users.find((userArray) => userArray.id === parseInt(newUser.id));
  if (userFound == undefined) return userFound;
}

// Recuperar datos de un solo user
const recuperarUserLocalStorage = (id)=> {
  //debugger
  if (localStorage.getItem(`${id}`)) {
    let obj = localStorage.getItem(`${id}`)
    let userRecuperado = JSON.parse(obj);
    console.log("User recuperado local", userRecuperado);
    return cargarOneUser(userRecuperado);
  }
}

// Almacenar one user en localStorage
const almacenarOneUserLocalStorage = (profileUser) => profileUser ? localStorage.setItem(`${profileUser.id}`, JSON.stringify(profileUser)) : null;

// Almacenar users en localStorage
const almacenarDatosLocalStorageUsers = (usersLocals) => localStorage.getItem("users") ? localStorage.setItem("users", JSON.stringify(usersLocals)) : localStorage.setItem("users", JSON.stringify(users));

// Recuperar Users localStorags || array 

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

// Almacenar datos de users en localStorage
const agregarNewUser = (newUser) => {
  if(localStorage.getItem("users")) { 
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

// Asingacion de lenguajes al User 
const asignacionLenguajesNewUser = (NewUser) => {
  if(!validarUser(NewUser)){
    let profileUser = NewUser.asingacionPorcentajesLenguajes(NewUser);
    almacenarOneUserLocalStorage(profileUser);
    agregarNewUser(profileUser);
    userCreated.innerText = profileUser.imagen + "✅";
  }
  else {  
    confirm("El usuario " + profileUse?.nombre + " ya existen en el array de usuarios. ¿Deseas agregar otro?") ? createUserForm() : null;
  }
}

// Create User
const createUserForm = (selectNombre, selectGenero, selectDescription, userCreated) => {
  if (datosCompletos(selectNombre, selectGenero)) {
    let id = idUser();
    let imagen = "";
    let nombre = selectNombre.value;
    let description = selectDescription.value != "" ? selectDescription.value : "Cuando una acción no es algo natural para ti, eso es una expresión de amor";
    let genero = selectGenero.value;
    let languages = loveLanguages;
  
    const NewUser = new User(id, imagen, nombre, description, genero, languages);
    asignacionLenguajesNewUser(NewUser);
  } else {
    alert("⛔️ Debes completar todos los datos en pantalla.");
  }
};

const clickBtnEnviar = (selectNombre, selectGenero, selectDescription, btnEnviar, userCreated) => {
  btnEnviar.addEventListener("click", () => {
    createUserForm(selectNombre, selectGenero, selectDescription, userCreated);
    closeModal(modal);
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

const cargarCombo = (array, select) => {
  //DRY - KISS - YAGNI
  array.forEach(
    (elemento) =>
      (select.innerHTML += `<option value="${elemento.valor}">${elemento.genero}</option>`)
  );
};

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

// Carga info del Form 
const popUpForm = () => {
  infoPopUpForm.innerHTML = "";
  infoPopUpForm.innerHTML = retornoFormAddUser();
  selectNombreUser();
  selectGeneroUser();
  cargarCombo(datosGenero, selectGeneroUser());
  selectDescriptionUser();
  selectUserCreated();
  btnEnviarUser();
  clickBtnEnviar(selectNombreUser(), selectGeneroUser(), selectDescriptionUser(), btnEnviarUser(), selectUserCreated());
};

// Opem Modal
const openModalForm = (modal) => {
  if (modal == null) return "no hay modal";
  modal.style.display = "block";
  modal.classList.add("active");
  overlay.classList.add("active");
}