                                          /*** USER FAVORITES SECTION **/ 
                                          
const eliminarCacheFavoritos = () => {
    if(!localStorage.getItem("usersFavorite")){
        localStorage.removeItem("usersFavorite");
    } else {
      usersFavorite = [];
    }
  } 
  
  const eliminarLocalStorageFavoritos = (userId) => {
    let userExist = recuperarUsers();
    userExist = userExist.find(user => { return user.id == parseInt(userId) });
    editarUsersIcon(recuperarUsers(), userExist, false);
    
    if(localStorage.getItem("usersFavorite") || usersFavorite.length > 0) {
      let localList = localStorage.getItem("usersFavorite"); // json object
      let list = JSON.parse(localList);
      let indexLocals = list.findIndex((userFavorite) => userFavorite.id === parseInt(userId));
      list.splice(indexLocals, 1); // Elimina el elemento del array ​list
      localStorage.setItem("usersFavorite", JSON.stringify(list));  // Sobrescribe el array de favoritos en el localStorage
      alerta("", `⛔️ El usuario se elimino de favoritos`, 'warning');
      //toast(userExist.nombre);
    } else {
      editarUsersIcon(users, userExist, false);
      let index = usersFavorite.findIndex((userFavorite) => userFavorite.id === parseInt(userId));
      usersFavorite.splice(index, 1);
    }
  }
  
  // Eliminar usuario de favoritos
  const eliminarFavoritoUser = (userId) => {
    eliminarLocalStorageFavoritos(userId);
    let userExist = recuperarUsers().find((user) => parseInt(user.id) === parseInt(userId));
    userExist = {
      ...userExist,
      favoritos: false,
    }
    usersUodatedJSON(userExist.id, userExist);
    userFavoriteLoad();
    loadCardsInfo();
  }
  
  // Activar Bottones de delete Favoritos
  const activarBotonesDeleteFavoritos = () => {
    const botonesDelete = document.querySelectorAll(".button.button-clear.button-delete");
    botonesDelete.forEach((btn) => {
      btn.addEventListener("click", () => {
        eliminarFavoritoUser(btn.id);
      });
    });
  };
  
  // Read favoritos
  const cargarUsersFavoritos = (array) => {
    containerCards().innerHTML = loader(); 
    setTimeout(() => {
      containerCards().innerHTML = "";
      array.forEach((user) => containerCards().innerHTML += retornoCardUser(user));
      activarBotonesDeleteFavoritos();
      comprobarIconoFavoritos();
      activarBotonesPopUp();
    }, 2500);
  };
  
  // Recuperar Favoritos LocalStorage
  const recuperarUsersFavoritos = () => {
    if (localStorage.getItem("usersFavorite")) {
        let usersFavoriteRecuperados = JSON.parse(localStorage.getItem("usersFavorite"));
            usersFavoriteRecuperados.forEach(user => usersFavorite.push(user));
            return usersFavoriteRecuperados; 
    } else {
      return usersFavorite;
    }
  }
  
  const userFavoriteLoad = () => localStorage.getItem("usersFavorite") ? cargarUsersFavoritos(recuperarUsersFavoritos()) : cargarUsersFavoritos(usersFavorite);
  