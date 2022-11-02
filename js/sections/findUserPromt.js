                                        /*** FIND USER PROMT SECTION **/

const comprobarIconoFavoritosUser = (user) => {
    let btnFavorites = document.getElementById(`${user.id}-add`);
    user.favoritos === true ? btnFavorites.style.display = "none" : btnFavorites.style.display = "block";
};
    
    // Read One User
const cargarOneUser = (user) => {
    tbody.innerHTML = "";
    container.innerHTML = "";
    container.innerHTML += retornoCardUser(user);
    activarBotonesAdd();
    activarBotonesDelete();
    activarBotonesPopUp(); 
    comprobarIconoFavoritosUser(user);
    alerta("", `Se encontro el usuario '${user.nombre}'`, 'success');
};
    
const userSearchContainer = (userLocals, userName) => {
    let userFound = userLocals.find((userArray) => userArray.nombre === userName);
    userFound === undefined ? alerta("", `No se encontró el usuario '${userName}' en tus contactos`, 'error') : cargarOneUser(userFound);
};
    
const findUserArray = () => {
    let userName = prompt("Ingresa el usuario a buscar: ");
    localStorage.getItem("users") ? userSearchContainer(recuperarUsers(), capitalizeFirstLetter(userName)) : userSearchContainer(users);
};