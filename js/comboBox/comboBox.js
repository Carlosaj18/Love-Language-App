// DRY - KISS - YAGNI

const almacenarDatosLocalStorageComboBox = (clave, dataLocalStorage, array) => { localStorage.getItem(`${clave}`) ? localStorage.setItem(`${clave}`, JSON.stringify(dataLocalStorage)) : localStorage.setItem(`${clave}`, JSON.stringify(array)) };

const dataInArray = (array, input) => {
    let inputInArray = false;
    const dataExist = array.find((element) => { return element.id == input.id });
    if (dataExist == undefined) { inputInArray = true }
    return inputInArray;
  };

const recuperarDatosLocalStorage = (dataLocalStorage) => {
    if (dataLocalStorage !== null) {
      let dataRecuperada = JSON.parse(dataLocalStorage);
        return dataRecuperada; 
    }
  };

const fetchDatosComboBox = async (URL, clave, array) => {
    let dataJSON;
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
     }
    try {
        const response = await fetch(`${URL}`, { 
          method: "GET",
          headers: headersList
        });
        if(response.ok){
            dataJSON = await response.json();
            dataJSON.forEach((elemento) => { dataInArray(array, elemento) == true ? array.push(elemento) : null });
            almacenarDatosLocalStorageComboBox(clave, dataJSON, array);
            return array;
        }
    } catch (error) {
            return error;
    }
}

// Combo Box Lenjuages en el popUp de ideas
const cargarComboLenguajes = (array, select) => { array.forEach((elemento) => {
  select.innerHTML += retornoComboBoxLenguajes(elemento);
}) }; 

// ComboBox Generos en el form 
const cargarComboGenero = (array, select) => { array.forEach((elemento) => {
    select.innerHTML += retornoComboBoxGenero(elemento);
  }) }; 

// ComboBox Target family
  const cargarComboPariente = (array, select) => { array.forEach((elemento) => {
    select.innerHTML += retornoComboBoxPariente(elemento);
})}
