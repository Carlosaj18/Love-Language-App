const URL                      = 'https://63630f9937f2167d6f716022.mockapi.io/api/v1';
const URLRandomaizer           = 'https://63729a98348e947299f99ae0.mockapi.io/api/v1';
const doTest                   = document.getElementById("createTest");
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
const PopUpBodyEditUser        = document.querySelector(".modal-body.editUser");
const closeEditButton          = document.getElementById("close-button-edit");
const displayLanguage          = document.querySelector(".modalLanguage");
const PopUpEditUser            = document.querySelector(".modalEditUser");
const modalForm                = document.querySelector(".modal");
const searchNameDisplay        = document.querySelector(".search-name-display"); 
const modalTest                = document.querySelector(".modalTest");


                                          /*** SEARCH BAR SECTION */
// Evento click search bar & keydown
searchContainer.addEventListener("click", () => { recuperarUsers().length > 0 ? findUserSearchBar() :  alertaErrorUsuarios("warning", `No se encontró usuarios`) });

                                          /*** DASHBOARD SECTION **/
// Evento click Dashboard
buttonDashboard.addEventListener("click", () => { recuperarUsers().length > 0 ? displayLenguajesDelAmor(recuperarUsers()) : alertaErrorUsuarios("warning", `No se encontró usuarios`) });

                                         /*** USER FAVORITES SECTION **/ 
// Evento click boton Favoritos
favoritosUsers.addEventListener("click", () => {
  usersFavorite.length > 0 || recuperarUsersFavoritos().length > 0  ? userFavoriteLoad() + containerDashboardLoad() : alertaErrorUsuarios("error", "No hay usuarios en favoritos") });

                                          /*** FIND USER PROMT SECTION **/
// Evento click boton Find User prompt
findUser.addEventListener("click", () => { recuperarUsers().length > 0 ? findUserArray() && containerDashboardLoad() : alertaErrorUsuarios("error", "No se encontro el usuario") });

                                          /*** ADD USER SECTION **/                                          
// Evento click boton Crear User
addUser.addEventListener("click", () => activarPopUpForm());

                                          /*** ALL USERS SECTION **/   
 // Evento click boton Ordenar
buttonOrdenar.addEventListener("click", () => { recuperarUsers() ? ordenar(recuperarUsers()) && alertaOrdenarDashboard() :  alertaErrorUsuarios("warning", `No se encontró usuarios`) });

// Evento click boton All Users
allUsers.addEventListener("click", async () => { recuperarUsers().length > 0 || await usersLoadJSON().length > 0 ? usersLoad() && containerDashboardLoad() : alertaErrorUsuarios("warning", `No se encontró usuarios`) }); 

                                          /*** TEST LENGUAJES */

doTest.addEventListener("click", () => {
  activarPopUpTest();
});

                                          /*** LOAD WINDOW **/
// Container Dashboard loading                                             
const containerDashboardLoad = () => {
  const containerDashboard         = document.querySelector(".container-dashboard");
  containerDashboard.style.display = "none";
};

const botonOrdenarLoad = () => {
  buttonOrdenar.style.display = "block";
}

// PopuUps loading 
const popUpsLoad = () => {
  displayLanguage.style.display = "none";
  PopUpEditUser.style.display   = "none";
  modalForm.style.display       = "none";
  modalTest.style.display       = "none";
};

// Window loading 
window.addEventListener("load", () => {
  popUpsLoad();
  containerDashboardLoad();
  activarPopUpForm();
  buttonOrdenar.style.display = "none";
});

