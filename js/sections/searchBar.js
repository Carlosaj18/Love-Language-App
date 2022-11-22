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
      containerCards().innerHTML = "";
      array.forEach((user) => user != undefined ? containerCards().innerHTML += retornoCardUser(user) : undefined);
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
    capitalizeFirstLetter((displayValues.textContent = e.target.value));
  }
  
  // Evento para print user input in the container
  const inputListener = (e) => {
    input.addEventListener("input", updateValue(e));
  };

  const filterURLParameters = () => {
    var url = window.location.href;
    URL = (typeof window !== 'undefined' && window.URL) ? window.URL : require('url').URL
    let params = url.search
    url.searchParams.set('foo', 4)
    console.log(url)
  }
  
  const findUserSearchBar = () => {
    usersLoad();
    
    searchContainer().forEach(element => element.addEventListener("keydown", (e) => {
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
    }));
  };

