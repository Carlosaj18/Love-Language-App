                                        /*** FIND USER PROMT SECTION **/

const comprobarIconoFavoritosUser = (user) => {
    let btnFavorites = document.getElementById(`${parseInt(user.id)}-add`);
    user.favoritos === true ? btnFavorites.style.display = "none" : btnFavorites.style.display = "block";
};

// Read One User
const cargarOneUser = async (user) => {
  let userFound;
  let armoHTML = "";
  let activoBotones = true;
  containerDashboardLoad();
  container.innerHTML = loader();
  try {
    tbody.innerHTML = "";
    userFound = await user;
    armoHTML = retornoCardUser(userFound);
  } catch (error) {
    armoHTML += retornoError();
    activoBotones = false;
  } finally {
    setTimeout(() => {
      container.innerHTML = armoHTML;
      activoBotones == true ? activarBotonesDelete() + activarBotonesAdd() + activarBotonesPopUp() + comprobarIconoFavoritosUser(userFound) + alerta("", `Se encontro el usuario '${user.nombre}'`, 'success') : activoBotones = false;
    }, 1500);
  }
};

// Peticion al JSON
const userInJSON = async (id) => {
  let userJSON;
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
  try {
      const response = await fetch(`${URL}/users/${id}`, { 
        method: "GET",
        headers: headersList
      });
      if(response.ok){
        userJSON = await response.json();
        console.log(`Se encontro el usuario en el endpoint /users/:id por medio del metodo GET: ${userJSON}`);  
        return userJSON;
      }
  } catch (error) {
        return error;
  }
}

const userFindInJSONByName = async (nombre) => {
  let userJSON;
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
  try {
      const response = await fetch(`${URL}/users?filter=${nombre}`, { 
        method: "GET",
        headers: headersList
      });
      if(response.ok){
        userJSON = await response.json();
        console.log(`Se encontro el usuario en el endpoint /users/?filter:nombre por medio del metodo GET: ${userJSON}`);  
        return userJSON;
      }
  } catch (error) {
        return error;
  }
}

// Buscar user en JSON
const userSearchContainer = async (userLocals, userName) => {
    let userJSON;
    let userFound = userLocals.find((userArray) => userArray.nombre === userName);
    if(userFound !== undefined) {
        // userJSON = await userFindInJSONByName(userFound.nombre);
        userJSON = await userInJSON(userFound.id);
    }
    userJSON ? cargarOneUser(userJSON) : alerta("", `No se encontró el usuario '${userName}' en tus contactos`, 'error');
};
    
const findUserArray = () => {
    let userName = prompt("Ingresa el usuario a buscar: ");
    localStorage.getItem("users") ? userSearchContainer(recuperarUsers(), userName) : userSearchContainer(users);
};