const container = document.querySelector(".container");
const allUsers = document.querySelector(".button.allUsers");
const favoritosUsers = document.querySelector(".button.button-favoritos");
const addUser = document.querySelector(".button.button-grey.createUser");

const retornoCardUser = (user) => {
  return `<div class="card" id="${user.id}">
            <!--<img class="card-image"  src="https://media.giphy.com/media/64hEwo9SHwBjIX1J5g/giphy.gif"
              alt="GFG image" />-->
            <div class="card-image">${user.imagen}</div>
            <div class="card-name">${user.nombre}</div>
            <div class="card-description">${user.description}</div>
            <div class="card-button-top">
                <button class="button button-outline button-seeUser" id="${user.id}" title="Clic para ver los lengajes del amor de '${user.nombre}'">Lenguajes</button>
            </div>
            <div class="card-button-icons">
                <button class="button button-outline button-add" id="${user.id}" title="Clic para agregar a tus favoritos '${user.nombre}'">💗</button>
                <button class="button button-outline button-delete" id="${user.id}" title="Clic para eliminar de tus favoritos '${user.nombre}'">⛔</button>
                <!-- Condicionalmente mostrar el button -->
            </div>
          </div>`;
};

// Id card
const activarBotonesDelete = () => {
  const botonesDelete = document.querySelectorAll(
    ".button.button-outline.button-delete"
  );
  botonesDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      eliminarFavoritoUser(btn.id);
    });
  });
};

// Activar Bottones de favoritos
const activarBotonesAdd = () => {
  const botonesAdd = document.querySelectorAll(
    ".button.button-outline.button-add"
  );
  botonesAdd.forEach((btn) => {
    btn.addEventListener("click", () => {
      agregarAFavoritos(btn.id);
      console.log("diste click en el usuario", btn.id);
      // Se debe eliminar el buton de favoritos si lo seleccionada
      // botonesAdd.classList.toggle("active");
    });
  });
};

// Read Users
const cargarUsers = (array) => {
  container.innerHTML = "";
  array.forEach((user) => {
    container.innerHTML += retornoCardUser(user);
  });
  activarBotonesAdd();
  activarBotonesDelete();
};

allUsers.addEventListener("click", () => {
  cargarUsers(users);
});

const cargarUsersFavoritos = (array) => {
  container.innerHTML = "";
  array.forEach((user) => {
    container.innerHTML += retornoCardUser(user);
  });
  activarBotonesAdd();
  activarBotonesDelete();
};

favoritosUsers.addEventListener("click", () => {
  cargarUsers(usersFavorite);
});

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

const buttonShowFavoritos = (userId) => {
  const botonesAdd = document.querySelectorAll(
    ".button.button-outline.button-add"
  );

  if (userId) {
    botonesAdd.classList.toggle("button-add-hide");
  }
};

// Crear User

function createUser() {
  let id = 10;
  let imagen = "😄";
  let nombre = prompt("Ingresa tu nombre");
  let description =
    "Cuando una acción no es algo natural para ti, eso es una expresión de amor";
  let genero = prompt("Ingresa tu genero");
  let languages = [];

  const NewUser = new User(id, imagen, nombre, description, genero, languages);

  let profileUser = NewUser.asingacionPorcentajesLenguajes(NewUser);
  console.log("En el DOM este es el user ", profileUser);
  let userFound = users.find((userArray) => userArray.id === parseInt(profileUser.id));
  // console.log("User found", userFound);
  if (userFound == undefined) {
    users.push(profileUser);
    console.table(users);
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

addUser.addEventListener("click", () => {
  createUser();
});

// Eliminar usuario
function eliminarUser(userId) {
  let userArrayRemaining = users.filter(function (user) {
    return user.id !== parseInt(userId);
  });
}

// Eliminar usuario de favoritos
function eliminarFavoritoUser(userId) {
  const index = usersFavorite.findIndex((userFavorite) => {
    return userFavorite.id === parseInt(userId);
  });
  if (index > -1) {
    usersFavorite.splice(index, 1); //quita un elemento desde un índice específico
    cargarUsersFavoritos(usersFavorite);
  }
}
