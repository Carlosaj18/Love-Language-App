/** Container Button */
const allUsers = document.querySelector("button.allUsers");
const favoritosUsers = document.querySelector(".button.button-favoritos");
const findUser = document.querySelector(".button.findUser");
const searchContainer = document.querySelector(".search-container");
const input = document.querySelector("input.input");
const log = document.getElementById("values");
const buttonOrdenar = document.querySelector("button.ordenar");
const buttonDashboard = document.querySelector("button.button-dashboard");

const container = document.querySelector(".containerCards");
const containerDashboard = document.querySelector(".container-dashboard");
const tbody = document.querySelector(".tbody");
const modal = document.querySelector(".modal");

const selectGenero = document.querySelector("#genero");

// Template HTML Users
const retornoCardUser = (user) => {
  return `<div class="card" id="${user.id}">
            <!--<img class="card-image"  src="https://media.giphy.com/media/64hEwo9SHwBjIX1J5g/giphy.gif"
              alt="GFG image" />-->
            <div class="card-image">${user.imagen}</div>
            <div class="card-name">${user.nombre}</div>
            <div class="card-description">${user.description}</div>
            <div class="card-button-top">
              <button data-modal-target="#modal" class="button button-outline" id="${user.id}" title="Clic para ver los lengajes del amor de '${user.nombre}'">Lenguajes</button>
            </div>
            <div class="card-button-icons">
                <button class="button button-clear button-add" id="${user.id}-add" title="Clic para agregar a tus favoritos '${user.nombre}'">💗</button>
                <button class="button button-clear button-delete" id="${user.id}-delete" title="Clic para eliminar de tus favoritos '${user.nombre}'">⛔</button>
                
            </div>
          </div>`;
};

// Template Dashboard HTML Users
const retornoTableDashboard = (user) => {
  return `
        <span class="pln"> </span>
          <tr>
            <td class="border-botton">${user.ID}</td>
            <td class="border-botton">${user.imagen}</td>
            <td class="border-botton">${user.nombre}</td>
            <td class="border-botton">${user.physicalTouch}</td>
            <td class="border-botton">${user.actosOfService}</td>
            <td class="border-botton">${user.qualityTime}</td>
            <td class="border-botton">${user.wordsOfAffirmation}</td>
            <td class="border-botton">${user.receivingGifts}</td>
            <td class="border-botton">${user.totalLanguage}</td>
          </tr>
        <span class="pln"> </span>`;
};

// Load Window 
window.addEventListener("load", (event) => {
  containerDashboard.style.display = "none";
  modal.style.display = "none";
  activarBotonesPopUpForm();
});

// Id User
const idUser = () => parseInt(Math.random() * 10000);

// Activar Botton de delete favoritos
/** REVIEW */

function iconCardAdd(userId) {
  const botonCardAdd = document.getElementById(userId);
  ///botonDeleteCard.classList.add("deactive-delete");
  botonCardAdd.style.display = "none";
}

function iconCardDelete(userId) {
  const botonCardDelete = document.getElementById(userId);
  ///botonDeleteCard.classList.add("deactive-delete");
  botonCardDelete.style.display = "none";
}

// Activar Bottones de delete
const activarBotonesDelete = () => {
  const botonesDelete = document.querySelectorAll(
    ".button.button-clear.button-delete"
  );
  botonesDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      eliminarFavoritoUser(btn.id);
      iconCardDelete(`${btn.id}`);
    });
  });

  botonesDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      eliminarUser(btn.id);
    });
  });
};

// Activar Bottones de favoritos
const activarBotonesAdd = () => {
  const botonesAdd = document.querySelectorAll(
    ".button.button-clear.button-add");
  botonesAdd.forEach((btn) => {
    btn.addEventListener("click", () => {
      agregarAFavoritos(btn.id);
      iconCardAdd(`${btn.id}`);
    });
  });
};

// Function
const topLenaguajes = (topLenguajeDelAmor) => {
  console.table(topLenguajeDelAmor);
  container.innerHTML = "";
  tbody.innerHTML = "";
  topLenguajeDelAmor.forEach((user) => {
    tbody.innerHTML += retornoTableDashboard(user);
    //activarBotonesAdd();
    //activarBotonesDelete();
  });
};

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

const displayLenguajesDelAmor = () => {
  let topLenguajeDelAmor = users.map((user) => {
    return {
      ID: user.id,
      imagen: user.imagen,
      nombre: user.nombre,
      physicalTouch: user.languages.physicalTouch / 100,
      actosOfService: user.languages.actosOfService / 100,
      qualityTime: user.languages.qualityTime / 100,
      wordsOfAffirmation: user.languages.wordsOfAffirmation / 100,
      receivingGifts: user.languages.receivingGifts / 100,
      totalLanguage:
        user.languages.physicalTouch +
        user.languages.actosOfService +
        user.languages.qualityTime +
        user.languages.wordsOfAffirmation +
        user.languages.receivingGifts,
    };
  });
  topLenaguajes(topLenguajeDelAmor);
};

// Evento click Dashboard
buttonDashboard.addEventListener("click", () => {
  containerDashboard.style.display = "block";
  displayLenguajesDelAmor();
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
  console.table(userOrdenados);
  cargarUsers(userOrdenados);
};

// Evento click boton Ordenar
buttonOrdenar.addEventListener("click", () => {
  ordenar(users);
});

// Read Users
const cargarUsers = (array) => {
  containerDashboard.style.display = "none";
  tbody.innerHTML = "";
  container.innerHTML = "";
  array.forEach((user) =>
    user != undefined
      ? (container.innerHTML += retornoCardUser(user))
      : console.log("Usuario Indefinido")
  );
  activarBotonesAdd();
  activarBotonesDelete();
  activarBotonesPopUp();

};

// Read One User
const cargarOneUser = (user) => {
  tbody.innerHTML = "";
  container.innerHTML = "";
  container.innerHTML += retornoCardUser(user);
  activarBotonesAdd();
  activarBotonesDelete();
};

// Evento click boton All Users
allUsers.addEventListener("click", () => cargarUsers(users));

// Agregar a favoritos
const agregarAFavoritos = (userId) => {
  userId = parseInt(userId);
  let userFound = users.find((userArray) => userArray.id === userId);
  if (userFound !== undefined) {
    let userInFavoritos = usersFavorite.find(
      (userArray) => userArray.id === userId
    );
    if (userInFavoritos === undefined) {
      usersFavorite.push(userFound);
      // console.clear();
      // console.table(usersFavorite);
    }
  }
};

// PREGUNTA
/** ¿Como hacer para cuando este seleccionado el corazon que aparezca el boton de eliminar,
 * y que cuando este seleccionado el de eliminar apareza el del corazon? */
const buttonShowFavoritos = (userId) => {
  const botonesAdd = document.querySelectorAll(
    ".button.button-outline.button-add"
  );

  if (userId) {
    botonesAdd.classList.toggle("button-add-hide");
  }
};

// Read favoritos
const cargarUsersFavoritos = (array) => {
  tbody.innerHTML = "";
  container.innerHTML = "";
  array.forEach((user) => {
    container.innerHTML += retornoCardUser(user);
  });
  activarBotonesAdd();
  activarBotonesDelete();
};

// Evento click boton Favoritos
favoritosUsers.addEventListener("click", () => {
  if (usersFavorite.length >= 1) {
    cargarUsers(usersFavorite);
  } else {
    alert("No tienes ningun usuario dentro de favoritos.");
  }
});

// Crear User
function createUser() {
  let id = idUser();
  let imagen = "";
  let nombre = prompt("Ingresa tu nombre");
  let description =
    "Cuando una acción no es algo natural para ti, eso es una expresión de amor";
  let genero = prompt("Ingresa tu genero");
  let languages = loveLanguages;

  /** Instanciar Objeto */
  const NewUser = new User(id, imagen, nombre, description, genero, languages);
  let profileUser = NewUser.asingacionPorcentajesLenguajes(NewUser);
  let userFound = users.find(
    (userArray) => userArray.id === parseInt(profileUser.id)
  );
  if (userFound == undefined) {
    users.push(profileUser);
    console.table(users);
    cargarUsers(users);
  } else {
    respuesta = confirm(
      "El usuario " +
        profileUser.nombre +
        " ya existen en el array de usuarios. ¿Deseas agregar otro?"
    );
    if (respuesta) {
      createUser();
    }
  }
}

// Evento click boton Crear User
addUser.addEventListener("click", () => {
  console.log("Click add user")
  activarBotonesPopUpForm();
  // createUser();
});


// Editar user
// PREGUNTA
/** ¿Como editar el usuario? */

// Find User con prompt
const findUserArray = () => {
  let userName = prompt("Ingresa el usuario a buscar:");
  let userFound = users.find((userArray) => userArray.nombre === userName);
  if (userFound === undefined) {
    alert(`No se encontró el usuario ${userName} en tus contactos`);
  } else {
    cargarOneUser(userFound);
  }
};

// Evento click boton Find User prompt
findUser.addEventListener("click", () => {
  findUserArray();
});

// Function capitalizeFirstLetter
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Function userFilterMap
const userFilterMap = (key) => {
  var userFound = users.map((user, index) => {
    if (user.nombre.includes(key)) {
      return user;
    }
  });
  cargarUsers([]);
  cargarUsers(userFound);
};

// Filter user by inputs in search bar
/**  PREGUNTA: 1) COMO TOMAR LOS VALORES DEL INPUT para hacer la busqueda filtrada
     PREGUNTA: 2) Como reseteo el input del search bar  */
const findUserSearchBar = () => {
  searchContainer.addEventListener("keydown", (e) => {
    let targetValue = e.target.value; // arranca un valor atras
    //console.log("TARGET VALUE", targetValue);
    let key = e.key.toUpperCase();
    //console.log("KEY VALUE", key);
    if (
      (e.key != "Backspace" && e.keyCode >= 65 && e.keyCode <= 90) ||
      (e.keyCode >= 97 && e.keyCode <= 122)
    ) {
      if (targetValue != "") {
        targetValue = capitalizeFirstLetter(targetValue);
        userFilterMap(targetValue);
      } else {
        userFilterMap(key);
      }
    }
    inputListener();
  });
};

// Evento para print user input in the container
const inputListener = () => {
  input.addEventListener("input", updateValue);
  function updateValue(e) {
    capitalizeFirstLetter((log.textContent = e.target.value));
  }
};

// Evento click search bar & keydown
searchContainer.addEventListener("click", () => {
  cargarUsers(users);
  findUserSearchBar();
});

// Eliminar usuario
function eliminarUser(userId) {
  const index = users.findIndex((user) => {
    return user.id === parseInt(userId);
  });
  if (index > -1) {
    users.splice(index, 1); //quita un elemento desde un índice específico
    cargarUsers(users);
  }
}

// Eliminar usuario de favoritos
function eliminarFavoritoUser(userId) {
  const index = usersFavorite.findIndex((userFavorite) => {
    return userFavorite.id === parseInt(userId);
  });
  if (index > -1) {
    usersFavorite.splice(index, 1); // quita un elemento desde un índice específico
    cargarUsersFavoritos(usersFavorite);
  }
}
