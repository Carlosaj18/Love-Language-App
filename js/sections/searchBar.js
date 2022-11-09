// Function capitalizeFirstLetter
                                /*** SEARCH BAR SECTION */

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  
  const comprobarIconoFavoritosSearchBar = (array) => {
    array.map(obj => { 
      if(obj !== undefined){
        if(obj.favoritos === true) {
          let btnFavorites = document.querySelector(".button.button-clear.button-add");
          btnFavorites.style.display = "none";
        } 
      }
    })
  }
  
  const cargarUsersSearchBar = (array) => {
    if(array.length > 0) {
      containerDashboard.style.display = "none";
      tbody.innerHTML = "";
      container.innerHTML = "";
      array.forEach((user) => user != undefined ? container.innerHTML += retornoCardUser(user) : undefined);
      activarBotonesAdd();
      activarBotonesDelete();
      activarBotonesPopUp(); 
      comprobarIconoFavoritosSearchBar(array);
    } else {
      alerta("", `No se encontró usuarios`, 'error');
    }
  }
  
  // Function userFilterMap
  const userFilterMap = (key) => {
    let userLocals = recuperarUsers();
    let userFound = userLocals.map((user) => {
      if (user.nombre.includes(key)) {
        return user;
      }
    });
    cargarUsersSearchBar(userFound);
  };
  
  const updateValue = (e) => {
    capitalizeFirstLetter((log.textContent = e.target.value));
  }
  
  // Evento para print user input in the container
  const inputListener = (e) => {
    input.addEventListener("input", updateValue(e));
  };
  
  const findUserSearchBar = () => {
    usersLoad();
    searchContainer.addEventListener("keydown", (e) => {
      let targetValue = e.target.value; // Toma un valor atras
      let key = e.key.toUpperCase();
      if ((e.key != "Backspace" && e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)
      ) {
        if (targetValue != "") {
          targetValue = capitalizeFirstLetter(targetValue);
          userFilterMap(targetValue);
        } else {
          userFilterMap(key);
        }
      }
      inputListener(e);
    });
  };