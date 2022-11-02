const closeModalButtonEditUser = document.querySelectorAll("[data-close-button-edit]");
const modalEditUser            = document.querySelector(".modalEditUser");

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

