const openModalButtonsForm  = document.querySelectorAll("[data-modal-target-form]");
const closeModalButtonsForm = document.querySelectorAll("[data-close-button-form]");
const closeSendButton       = document.getElementById("close-button");
const overlayForm           = document.getElementById("overlay");
const infoPopUpForm         = document.querySelector(".modal-body.form");
const selectNombreUser      = () => { return document.querySelector("#nombre") };
const selectGeneroUser      = () => { return document.querySelector("#genero") };
const selectParienteUser    = () => { return document.querySelector("#pariente") };
const deleteGenderUser      = () => { return selectGeneroUser().innerHTML = "" };
const selectDescriptionUser = () => { return document.querySelector("#description") };
const selectUserCreated     = () => { return document.querySelector("#userCreated") };
const infoFormUserInputs    = () => { return document.querySelector("infoForm") };
const btnEnviarUser         = () => { return document.querySelector("button.button.button-outline") };
const physicalTouch         = () => { return document.querySelector("#physicalTouch") };
const actosOfService        = () => { return document.querySelector("#actosOfService") };
const qualityTime           = () => { return document.querySelector("#qualityTime") };
const wordsOfAffirmation    = () => { return document.querySelector("#wordsOfAffirmation") };
const receivingGifts        = () => { return document.querySelector("#receivingGifts") };
const infoInputForm         = () => { return document.querySelector("#infoForm") };

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// Cerrar modal con enviar
closeModalButtonsForm.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

// Id User
const idUser = () => parseInt(Math.random() * 10000);

// Validar datos duplicados con mismo ID
const validarUser = (newUser) => {
  let userFound = users.find((userArray) => userArray.id === parseInt(newUser.id));
  if (userFound == undefined) return userFound;
};

// Recuperar datos de un solo user
const recuperarUserLocalStorage = () => {
    let obj = localStorage.getItem('IdUser');
    let userRecuperado = JSON.parse(obj);
    return userRecuperado;
};

// Almacenar users en localStorage
const almacenarDatosLocalStorageUsers = (usersLocals) => { validationLocalStorageUsers(localStorage.getItem("users") ? localStorage.setItem("users", JSON.stringify(usersLocals)) : localStorage.setItem("users", JSON.stringify(users))) };

// Time user creacion
const timeUserCreation = () => {
  const DateTime = luxon.DateTime;
  const dt = DateTime.now();
  return `el ${dt.toLocaleString(DateTime.DATETIME_SHORT)}`;
};

const usersCreatedJSON = async (newUser) => {
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
   let bodyContent = JSON.stringify(newUser)
  try {
    let response = await fetch("https://63630f9937f2167d6f716022.mockapi.io/api/v1/users/", { 
      method: "POST",
      body: bodyContent,
      headers: headersList
    });
      if(response.ok){
        let data = await response.text();
        console.log(data);          
      }
  } catch (error) {
      return error;
  } 
}

// Almacenar datos de users en localStorage
const agregarNewUser = (newUser) => {
  if (localStorage.getItem("users")) {
    let usersLocals = recuperarUsers();
    let user = usersLocals.find((user) => {
      return user.id == newUser.id;
    });
    if (user == undefined) {
      usersLocals.push(newUser);
      almacenarDatosLocalStorageUsers(usersLocals);
      usersCreatedJSON(newUser);
    }
  } else {
    let user = users.find((user) => {
      return user.id == newUser.id;
    });
    if (user == undefined) {
      users.push(newUser);
      almacenarDatosLocalStorageUsers(users); // seteo el localstorage
    }
  }
};

// Create HTML dinamiclly to show languages of love
const asignarLenguagesUserForm = () => {
  let infoForm = infoInputForm();

  Object.entries(loveLanguages).forEach(([key]) => {
    infoForm.innerHTML += `<label for="${key}">${key}</label>
                              <input type="text" placeholder="${key}" id="${key}">`;
  });
};

// Asingacion de lenguajes al User
const pushUser = (profileUser) => {
  if (!validarUser(profileUser)) {
    almacenarOneUserLocalStorage(profileUser);
    agregarNewUser(profileUser);
    userCreated.innerText = profileUser.imagen + "✅";
    let timeCreation = timeUserCreation(profileUser);
    usersLoad();
    alerta("",`El User ${profileUser.nombre} se ha creado con exito ${timeCreation}`, "success");
  } else {
    confirm("El usuario " + profileUse?.nombre + " ya existen en el array de usuarios. ¿Deseas agregar otro?") ? createUserForm() : null;
  }
};

// Template User
const objetoUser = (selectNombreUser, selectDescription, selectGeneroUser, selectPariente) => {
  let profileUser = {
    id: "",
    imagen: "",
    nombre: selectNombreUser.value != "" ? selectNombreUser.value : "Invitado",
    favoritos: false,
    description: selectDescription.value != "" ? selectDescription.value : "Cuando una acción no es algo natural para ti, eso es una expresión de amor",
    genero: selectGeneroUser.value != "" ? selectGeneroUser.value : "I",
    pariente: selectPariente.value != "" ? selectPariente.value : "Indefinido",
    languages: loveLanguages,
  };
  return profileUser;
};

// Create User
const createUserForm = () => {
  if (datosCompletos(selectNombreUser(), selectGeneroUser(), selectParienteUser())) {
    userTemplate = objetoUser(selectNombreUser(), selectDescriptionUser(), selectGeneroUser(), selectParienteUser());

    let user = {
      ...userTemplate,
      id: idUser(),
      nombre: selectNombreUser().value,
      genero: selectGeneroUser().value,
      pariente: selectParienteUser().value,
    };

    const NewUser = new User(user);
    profile = NewUser.asingacionPorcentajesLenguajes(NewUser);
    pushUser(profile);
  } else {
    alerta("", `⛔️ Debes completar todos los datos en pantalla.`, "error");
  }
};

// Asignacion image user base on gender
const asignacionImageProfile = (image, genero) => {
  genero = genero.toUpperCase();
  if (image == "") {
    if (genero == "F") return (image = "👧");
    else if (genero == "M") return (image = "👦");
    else return "😄";
  }
};

// Create user with all form fields
const createUserFormCompleteInputs = () => {
  
  if (datosCompletosForm(selectNombreUser(), selectGeneroUser(), selectParienteUser(), physicalTouch(), actosOfService(), qualityTime(), wordsOfAffirmation(), receivingGifts())) {
    
    userTemplate = objetoUser(selectNombreUser(), selectDescriptionUser(), selectGeneroUser(), selectParienteUser());

    user = {
      ...userTemplate,
      id: idUser(),
      imagen: asignacionImageProfile(userTemplate.imagen, selectGeneroUser().value),
      languages: {
        physicalTouch: physicalTouch().value,
        actosOfService: actosOfService().value,
        qualityTime: qualityTime().value,
        wordsOfAffirmation: wordsOfAffirmation().value,
        receivingGifts: receivingGifts().value,
      },
    };

    const NewUser = new User(user);
    pushUser(NewUser);
    usersLoad();
  } else {
    alerta("", `⛔️ Debes completar todos los datos en pantalla del formulario.`, "error");
  }
};

// Validar datos en el form
const datosCompletos = (selectNombreUser, selectGenero, selectPariente) => { 
  if(selectNombreUser.value !== "" && selectGenero.value !== "..." && selectPariente.value !== "...") { return true } 
  else { return false }
};

// Validar datos en el form completo
const datosCompletosForm = (selectNombreUser, selectGenero, selectPariente, physicalTouch, actosOfService, qualityTime, wordsOfAffirmation, receivingGifts) => { 
  if(selectNombreUser.value !== "" && selectGenero.value !== "..." && selectPariente.value !== "..." && physicalTouch.value !== "" && actosOfService.value !== "" && qualityTime.value !== "" && wordsOfAffirmation.value !== "" && receivingGifts.value !== ""){
    return true;
  } else {
    return false;
  }
};

// Click boton enviar
const clickBtnEnviar = (opcion, btnEnviar) => {
  btnEnviar.addEventListener("click", () => {
    if (opcion == 1) {
      createUserForm();
      if (datosCompletos(selectNombreUser(), selectGeneroUser(), selectParienteUser())) {
        closeModal(modal);
      }
    } else {
      createUserFormCompleteInputs();
      if (datosCompletosForm(selectNombreUser(), selectGeneroUser(), selectParienteUser(), physicalTouch(), actosOfService(), qualityTime(), wordsOfAffirmation(), receivingGifts())) {
        closeModal(modal);
      }
    }
  });
};

const validarParientesComboBoxLocal = async () => {
  if(localStorage.getItem("userParientes")) {
    cargarComboPariente(recuperarDatosLocalStorage(localStorage.getItem("userPariente")), selectParienteUser());
  } else {
    cargarComboPariente(await fetchDatosComboBox("../../bbdd/datosTagsFamily.json", "userPariente", datosTagsFamilia), selectParienteUser());
  }
}

const validarGeneroComboBoxLocal = async () => {
  if(localStorage.getItem("userGenero")) {
    cargarComboGenero(recuperarDatosLocalStorage(localStorage.getItem("userGenero")), selectGeneroUser());
  } else {
    cargarComboGenero(await fetchDatosComboBox("../../bbdd/datosGenero.json", "userGenero", datosGenero), selectGeneroUser());
  }
}

// Carga info del Form
const popUpForm = (opcion) => {
  infoPopUpForm.innerHTML = "";
  infoPopUpForm.innerHTML = retornoFormAddUser();
  validarGeneroComboBoxLocal();
  validarParientesComboBoxLocal();
  opcion == 2 ? asignarLenguagesUserForm() + clickBtnEnviar(opcion, btnEnviarUser()) : clickBtnEnviar(opcion, btnEnviarUser());
};

// Opem Modal
const openModalForm = (modal) => { 
  if (modal == null) return "no hay modal";
  modal.style.display = "block";
  modal.classList.add("active");
  overlay.classList.add("active");
};
