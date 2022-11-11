                                     /*** DASHBOARD SECTION **/
                                     
// Ordenar Boton Dashboard
const ordenarDashboardButton = (array) => {
  let userOrdenados = array.sort((a, b) => {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }
    return 0;
  });
  displayLenguajesDelAmor(userOrdenados);
};

// Boton ordenar Dashboard
const ordenarDashboard = () => {
  const ordenarButtonDashboard = document.querySelector(".button-outline.ordenar-dashboard");
  ordenarButtonDashboard.addEventListener("click", () => {
    let localUsers = recuperarUsers();
    ordenarDashboardButton(localUsers);
    alertaOrdenar("success", "Todos los usuarios fueron ordenados");
  });
}

const confirmationPromeseDashboard = async (id, index, list) => {
  list.splice(index, 1);
  almacenarDatosLocalStorageUsers(list);
  await usersDeleteJSON(id);
  toast();
  let usersJSON = await usersLoadJSON();
  loadingDataUser(usersJSON);
};

// Eliminar usuario
const eliminarLocalStorageUsersDashboard = (userId) => {
  if (localStorage.getItem("users")) {
    let list = recuperarUsers();
    let index = list.findIndex((object) => { return parseInt(object.id) === parseInt(userId) || object.id === userId.toString() });
    let userEnFavoritos = recuperarUsersFavoritos().find((user) => { return parseInt(user.id) == parseInt(userId)})
    userEnFavoritos ? elimarUserFavoritoLocalStorage(userId) : false;
    confirmDeleteUserDashboard(parseInt(userId), index, list);
  } else {
    let index = users.findIndex((user) => user.id === parseInt(userId));
    users.splice(index, 1);
  }
};

const eliminarUserDashboard = async (userId) => {
  eliminarLocalStorageUsersDashboard(userId);
}

const activoBotonesDeleteDashboard = () => {
    const btnsDelete = document.querySelectorAll(".button-delete.button-small");
          btnsDelete.forEach(btn => {
            btn.addEventListener("click", (e)=> { //LES ASIGNO EL EVENTO CLICK
                eliminarUserDashboard(e.target.id); 
                let userLocals = recuperarUsers();
                displayLenguajesDelAmor(userLocals);
            })
        })
  }
  
  const activoBotonesUpdateDashboard = () => {
    const btnUpdate = document.querySelectorAll(".button-update.button-small");
          btnUpdate.forEach(btn => {
            btn.addEventListener("click", (e) => {
              activarBotonesPopUpEditUser(e.target.id);
            })
          })
  }
  
  // HTML para cargar el dashboard
  const topLenaguajes = (topLenguajeDelAmor) => {
    container.innerHTML = loader(); 
    setTimeout(() => {
      containerDashboard.style.display = "block";
      container.innerHTML = "";
      tbody.innerHTML = "";
      topLenguajeDelAmor.forEach((user) => {
        tbody.innerHTML += retornoTableDashboard(user);
      });
      activoBotonesDeleteDashboard();
      activoBotonesUpdateDashboard();
      ordenarDashboard();
    }, 2500);
  };
  
  // Function para cargar info Dashboard
  const displayLenguajesDelAmor = (userLocals) => {
    let topLenguajeDelAmor = userLocals.map((user) => {
      return {
        id: user.id,
        imagen: user.imagen,
        nombre: user.nombre,
        physicalTouch: user.languages.physicalTouch,
        actosOfService: user.languages.actosOfService,
        qualityTime: user.languages.qualityTime,
        wordsOfAffirmation: user.languages.wordsOfAffirmation,
        receivingGifts: user.languages.receivingGifts,
        totalLanguage:
          parseInt(user.languages.physicalTouch) + 
          parseInt(user.languages.actosOfService) +
          parseInt(user.languages.qualityTime) +
          parseInt(user.languages.wordsOfAffirmation) +
          parseInt(user.languages.receivingGifts),
        favoritos: user.favoritos == true ? "⭐" : "😅"
      };
    });
    topLenaguajes(topLenguajeDelAmor);
  };
  
  
