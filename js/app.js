const URL = "https://63630f9937f2167d6f716022.mockapi.io/api/v1";
const URLRandomaizer = "https://63729a98348e947299f99ae0.mockapi.io/api/v1";
const input = document.querySelector("input.input");
const displayValues = document.getElementById("values");
const searchNameDisplay = document.querySelector(".search-name-display");
const allUsers = document.querySelector("button.allUsers");
const favoritosUsers = document.querySelector(".button.button-favoritos");
const addUser = document.getElementById("createUser");
const findUser = document.querySelector(".button.findUser");
const tbody = document.querySelector(".tbody");
const doTest = document.getElementById("createTest");
const modal = document.querySelector(".modal");
const PopUpBodyEditUser = document.querySelector(".modal-body.editUser");
const closeEditButton = document.getElementById("close-button-edit");
const displayLanguage = document.querySelector(".modalLanguage");
const PopUpEditUser = document.querySelector(".modalEditUser");
const modalTest = document.querySelector(".modalTest");
const modalLogin = document.querySelector(".modalLogin");
const bodyContainer = () => {
  return document.querySelectorAll("body");
};
const buttonOverviewPanel = () => {
  return document.querySelector("button.section");
};
const headerOverviewPanelLoad = () => {
  return document.querySelector(".header.section");
};
const infoCardsOverviewLoad = () => {
  return document.querySelector(".info-cards.section");
};
const trendsContainerOverviewLoad = () => {
  return document.querySelector(".trends-container.section");
};
const lgCardsOverviewLoad = () => {
  return document.querySelector(".lg-cards.section");
};
const announAndTrending = () => {
  return document.querySelector(".announ-and-trending");
};
const trends = () => {
  return document.querySelector(".trends");
};
const dataContainer1 = () => {
  return document.querySelector(".data-container1");
};
const dataContainer2 = () => {
  return document.querySelector(".data-container");
};
const containerCards = () => {
  return document.querySelector(".containerCards");
};
const buttonOrdenarCards = () => {
  return document.querySelector("button.ordenar");
};
const searchContainer = () => {
  return document.querySelectorAll(".search-container");
};
const searchButtonNavBar = () => {
  return document.querySelectorAll(".searchButton");
};
const mainTitle = () => {
  return document.querySelector(".mainTitle");
};
const containerDashboard = () => {
  return document.querySelector(".container-dashboard");
};
const buttonDashboard = () => {
  return document.querySelector("button.button-dashboard");
};
const modalForm = () => {
  return document.querySelector(".modal");
};
const cardsInfo = () => {
  return document.querySelectorAll(".info-card");
};
const totalFamily = () => {
  return document.querySelector(".totalFamily");
};
const targetLove = () => {
  return document.querySelector(".targetLove");
};
const goals = () => {
  return document.querySelector(".goals");
};
const recordatorios = () => {
  return document.querySelector(".recordatorios");
};
const porcentajeLenguaje = () => {
  return document.querySelectorAll(".porcentajeLenguaje");
};

/*** SEARCH BAR SECTION */
// Evento click search bar & keydown
searchButtonNavBar().forEach((searchComponent) => {
  searchComponent.addEventListener("click", () => {
    searchContainer().forEach((element) => {
      if (element.offsetParent === null) {
        element.style.display = "block";
        trends().style.display = "none";
        dataContainer1().style.display = "none";
        dataContainer2().style.display = "none";
        containerDashboardLoad();
        containerCards().style.display = "flex";
        mainTitle().style.display = "none";
        recuperarUsers().length > 0
          ? findUserSearchBar()
          : alertaErrorUsuarios("warning", `No se encontró usuarios`);
      } else {
        element.style.display = "none";
        mainTitle().style.display = "block";
      }
    });
  });
});

/*** DASHBOARD SECTION **/
// Evento click Dashboard
buttonDashboard().addEventListener("click", () => {
  trends().style.display = "none";
  dataContainer1().style.display = "none";
  dataContainer2().style.display = "none";
  buttonOrdenarCards().style.display = "none";
  recuperarUsers().length > 0
    ? displayLenguajesDelAmor(recuperarUsers())
    : alertaErrorUsuarios("warning", `No se encontró usuarios`);
});

/*** USER FAVORITES SECTION **/
// Evento click boton Favoritos
favoritosUsers.addEventListener("click", () => {
  containerDashboardLoad();
  containerCards().style.display = "flex";
  trends().style.display = "none";
  dataContainer1().style.display = "none";
  dataContainer2().style.display = "none";
  buttonOrdenarCards().style.display = "none";
  usersFavorite.length > 0 || recuperarUsersFavoritos().length > 0
    ? userFavoriteLoad()
    : alertaErrorUsuarios("error", "No hay usuarios en favoritos");
});

/*** FIND USER PROMT SECTION **/
// Evento click boton Find User prompt
findUser.addEventListener("click", () => {
  containerDashboardLoad();
  containerCards().style.display = "flex";
  trends().style.display = "none";
  dataContainer1().style.display = "none";
  dataContainer2().style.display = "none";
  recuperarUsers().length > 0
    ? findUserArray()
    : alertaErrorUsuarios("error", "No se encontro el usuario");
});

/*** ADD USER SECTION **/
// Evento click boton Crear User
addUser.addEventListener("click", () => {
  activarPopUpForm();
});

/*** ALL USERS SECTION **/
// Evento click boton Ordenar
buttonOrdenarCards().addEventListener("click", () => {
  recuperarUsers()
    ? ordenar(recuperarUsers()) && alertaOrdenarDashboard()
    : alertaErrorUsuarios("warning", `No se encontró usuarios`);
});

// Evento click boton All Users
allUsers.addEventListener("click", async () => {
  containerDashboardLoad();
  containerCards().style.display = "flex";
  trends().style.display = "none";
  dataContainer1().style.display = "none";
  dataContainer2().style.display = "none";
  //botonOrdenarLoad();
  recuperarUsers().length > 0 || (await usersLoadJSON().length) > 0
    ? usersLoad() && containerDashboardLoad()
    : alertaErrorUsuarios("warning", `No se encontró usuarios`);
});
/*** TEST LENGUAJES */
doTest.addEventListener("click", () => {
  activarPopUpTest();
});
/*** LOAD WINDOW **/
buttonOverviewPanel().addEventListener("click", () => {
  trends().style.display = "block";
  dataContainer1().style.display = "block";
  dataContainer2().style.display = "block";
  buttonOrdenarCards().style.display = "none";
  displayLanguage.style.display = "none";
  PopUpEditUser.style.display = "none";
  modalTest.style.display = "none";
  containerCards().style.display = "none";
  searchNameDisplay.style.display = "none";
});

/*** LOAD WINDOW **/
/*** Cards  */
const loadCardsInfo = () => {
  recuperarUsers().length > 0
    ? (totalFamily().textContent = recuperarUsers().length)
    : (totalFamily().textContent = 0);
  recuperarUsersFavoritos().length > 0
    ? (targetLove().textContent = recuperarUsersFavoritos().length)
    : (targetLove().textContent = 0);
  // Falta objetivos
  // Falta recordatorios
};

// Recuperar Users localStorags
const recuperarLenguajes = () => {
  if (localStorage.getItem("loveLanguages")) {
    let lenguajesRecuperados = JSON.parse(
      localStorage.getItem("loveLanguages")
    );
    return lenguajesRecuperados;
  }
};

const loadLenguajesInfo = () => {
  let lenguajeStorage = recuperarLenguajes();
  let value = Object.values(lenguajeStorage);
  porcentajeLenguaje().forEach((lenguaje, index) => {
    console.log(lenguaje);
    lenguaje.textContent = `${value[index]}%`;
  });
  const total = document.querySelector(".total");
  let sum = value.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  total.textContent = `${sum}%`;
};

// Container Dashboard loading
const containerDashboardLoad = () => {
  containerDashboard().style.display = "none";
};

// PopuUps loading
const popUpsLoad = () => {
  displayLanguage.style.display = "none";
  PopUpEditUser.style.display = "none";
  modalTest.style.display = "none";
  // modalLogin.style.display      = "none";
};

// Window loading
window.addEventListener("load", () => {
  loadCardsInfo();
  loadLenguajesInfo();
  buttonOrdenarCards().style.display = "none";
  displayLanguage.style.display = "none";
  PopUpEditUser.style.display   = "none";
  modalTest.style.display       = "none";
  modalForm().style.display = "none";
  searchNameDisplay.style.display = "none";
  containerCards().style.display = "none";
  containerDashboardLoad();
  //activarPopUpForm();
  //activarPopUpLogin();
});
