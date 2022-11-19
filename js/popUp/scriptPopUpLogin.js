const closeModalButtonsLogin = document.querySelectorAll("[data-close-button-login]");
const infoPopUpLogin         = document.querySelector(".modal-body.login");
const selectNombreLogin      = () => { return document.querySelector("#nombre") };
const selectNombrePassword   = () => { return document.querySelector("#password") };
const btnEnviarLogin         = () => { return document.querySelector("button.button.button-outline.enviar") };
const btnEnviarRegistro      = () => { return document.querySelector("button.button.button-outline.registrarse") };


function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }
  
  // Cerrar modal con enviar
  closeModalButtonsLogin.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modalLogin");
      closeModal(modal);
    });
  });

const datosCompletosLogin = (nombre, password) => { 
    if(selectNombreLogin().value !== "" && selectNombrePassword().value !== "") { return true } 
    else { return alertaErrorUsuarios("error", "Falta diligenciar los campos") }
};

// Almacenar one user en localStorage
const almacenarOneUserLocalStorage = (profileUser) => { profileUser ? localStorage.setItem(`IdUser`, JSON.stringify(profileUser)) : null };

const validationUserLogin = () => {

    btnEnviarLogin().addEventListener("click", async () => {
        if(datosCompletosLogin()){
            let userFound = recuperarUsers().find((userArray) => userArray.nombre === selectNombreLogin().value);
            if(userFound !== undefined) {
                almacenarOneUserLocalStorage(userFound);
                const modalLogin = document.querySelector(".modalLogin");
                closeModal(modalLogin);
            } else {
                alertaErrorUsuarios("error", `El usuario ${selectNombreLogin().value} no existe en la base de datos`)
            }
        }
    })

    btnEnviarRegistro().addEventListener("click", () => {
        console.log("click");
        const modal = document.querySelector(".modal");
        let opcion =  parseInt(prompt("Si desea asingar el porcentaje de sus lenguajes del amor via promt, seleccione 1, o por el formulario seleccione 2: "));
        openModalForm(modal);
        popUpForm(opcion);
    })
}

const recuperarDatos = () => {
    // selectNombreLogin() = 
    if(localStorage.getItem('IdUser')){
        let user = recuperarUserLocalStorage();
        selectNombreLogin().value = user.nombre,
        selectNombrePassword().value = "1234"
    }
}

// Carga info del Form
const popUpLogin = () => {
    infoPopUpLogin.innerHTML = "";
    infoPopUpLogin.innerHTML = retornoLogin();
    recuperarDatos();
    validationUserLogin();
  };

const openModalLogin = (modal) => { 
    if (modal == null) return "no hay modal";
    modal.style.display = "block";
    modal.classList.add("active");
    overlay.classList.add("active");
  };