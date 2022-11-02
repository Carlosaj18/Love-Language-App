const allUsers                 = document.querySelector("button.allUsers");
const buttonOrdenar            = document.querySelector("button.ordenar");
const addUser                  = document.getElementById("createUser");
const findUser                 = document.querySelector(".button.findUser");
const favoritosUsers           = document.querySelector(".button.button-favoritos");
const searchContainer          = document.querySelector(".search-container");
const input                    = document.querySelector("input.input");
const log                      = document.getElementById("values");
const buttonDashboard          = document.querySelector("button.button-dashboard");
const container                = document.querySelector(".containerCards");
const containerDashboard       = document.querySelector(".container-dashboard");
const tbody                    = document.querySelector(".tbody");
const modal                    = document.querySelector(".modal");
const PopUpEditUser            = document.querySelector(".modal-body.editUser");
const closeEditButton          = document.getElementById("close-button-edit");

                                          /*** SEARCH BAR SECTION */

// Evento click search bar & keydown
searchContainer.addEventListener("click", () => {
  usersLoad();
  findUserSearchBar();
});

                                          /*** DASHBOARD SECTION **/

// Evento click Dashboard
buttonDashboard.addEventListener("click", () => {
  containerDashboard.style.display = "block";
  let userLocals = recuperarUsers();
  displayLenguajesDelAmor(userLocals);
  ordenarDashboard();
});

                                      /*** USER FAVORITES SECTION **/ 

// Evento click boton Favoritos
favoritosUsers.addEventListener("click", () => {
  userFavoriteLoad();
  if(usersFavorite.length <= 0 ){
    alertaErrorUsuarios("error", "No hay usuarios en favoritos");
  }
  containerDashboard.style.display = "none";
});

                                            /*** FIND USER PROMT SECTION **/

// Evento click boton Find User prompt
findUser.addEventListener("click", () => {
  findUserArray();
  containerDashboard.style.display = "none";
});

                                            /*** ADD USER SECTION **/                                          
// Evento click boton Crear User
addUser.addEventListener("click", () => activarPopUpForm());

                                            /*** ALL USERS SECTION **/
   
 // Evento click boton Ordenar
 buttonOrdenar.addEventListener("click", () => recuperarUsers() ? ordenar(recuperarUsers()) + alertaOrdenarDashboard() :  alertaErrorUsuarios("warning", `No se encontró usuarios`));

// Evento click boton All Users
allUsers.addEventListener("click", () => usersLoad()); 


                                            /*** LOAD WINDOW **/
window.addEventListener("load", (event) => {
  containerDashboard.style.display = "none";
  modal.style.display = "none";
  activarPopUpForm();
  const displayLanguage = document.querySelector(".modalLanguage");
  displayLanguage.style.display = "none";
  const PopUpEditUser      = document.querySelector(".modalEditUser");
  PopUpEditUser.style.display = "none";
});

// See localStorage Keys
const localStorageKeys = () => {
  for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    console.log("Clave ", clave);
    console.log("Valor " + localStorage.getItem(clave));
  }
}


