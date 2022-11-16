const openModalButtons                 = document.querySelectorAll("[data-modal-target-lenguajes]");
const closeModalButtons                = document.querySelectorAll("[data-close-button-language]");
const overlay                          = document.getElementById("overlayLanguage");
const infoPopUp                        = document.getElementById("modal-porcentaje");
const titleUser                        = document.querySelector("titleUser");
const buttonPhysicalTouch              = () => { return document.querySelector("#physicalTouch-imagen") };
const buttonActsOfService              = () => { return document.querySelector("#actosOfService-imagen") };
const buttonQualityTime                = () => { return document.querySelector("#qualityTime-imagen") };
const buttonWordsOfAfirmation          = () => { return document.querySelector("#wordsOfAffirmation-imagen") };
const buttonRecevingGifts              = () => { return document.querySelector("#receivingGifts-imagen") };
const buttonOrdenarPopUpLenguajes      = () => { return document.querySelector("#ordenarPopUpLenguajes") };
const buttonIdeasPhysicalTouch         = () => { return document.querySelector("#physicalTouch") };
const buttonIdeasActsOfService         = () => { return document.querySelector("#actosOfService") };
const buttonIdeasQualityTime           = () => { return document.querySelector("#qualityTime") };
const buttonIdeasWordsOfAfirmation     = () => { return document.querySelector("#wordsOfAffirmation") }; 
const buttonIdeasRecevingGifts         = () => { return document.querySelector("#receivingGifts") };
const buttonCrearActividad             = () => { return document.querySelectorAll(".crearActividad") };
const newActivityLanguage              = () => { return document.querySelector(".newActivityLanguage") };               
const buttonDeleteActivity             = () => { return document.querySelectorAll(".buttonDeleteActivity") }
const botonAgregarActividadDinamico    = () => { return document.querySelector(".botonAgregar") }
const btnEnviar                        = (idContainerAdd) => { return document.getElementById(idContainerAdd) };
const selectedLenguajesUser            = (idContainerAdd) => { return document.getElementById(idContainerAdd) };
const selectedIdea                     = (idea) => { return document.getElementById(idea) };

// const selectLenguajesUser              = () => { return document.querySelector(".targetLanguage") };


function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
};

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modalLanguage");
    closeModal(modal);
  });
});

const activarBotonesLenguajesInfo = () => {
  buttonPhysicalTouch().addEventListener("click", () => { alertaImageLenguajes("PhysicalTouch", "Para esta persona, nada habla más profundamente que el contacto físico apropiado.", "../../images/physicalTouch.jpg", "www.youtube.com/watch?v=kI6U1o9lQy0");});
  buttonActsOfService().addEventListener("click", () => { alertaImageLenguajes("Acts of Service", "Para estas personas, las acciones hablan más que las palabras.", "../../images/actosOfService.jpg", "www.youtube.com/watch?v=RAKyUljqRWw"); });
  buttonQualityTime().addEventListener("click", () => { alertaImageLenguajes("Quality Time", "Este lenguaje tiene que ver con darle a la otra persona toda tu atención.", "../../images/qualityTime.jpg", "www.youtube.com/watch?v=57NzzpmwQs0"); });
  buttonWordsOfAfirmation().addEventListener("click", () => { alertaImageLenguajes("Words of Affirmation", "Este lenguaje usa palabras para afirmar a otras personas.", "../../images/wordsOfAffirmation.jpg", "www.youtube.com/watch?v=WEA-wEuNg4s"); });
  buttonRecevingGifts().addEventListener("click", () => { alertaImageLenguajes("Receiving Gifts", "Para algunas personas, recibir un regalo sincero es lo que las hace sentir más amadas.", "../../images/receivingGifts.jpg", "www.youtube.com/watch?v=l4QXTpV4WiU"); });
};

const toObjectLanguage = (arr) => {
  var rv = {};
  for (var i = 0; i < arr.length; ++i) rv[i] = arr[i];
  return rv;
};

const ordenarLengujes = (loveLanguages) => {
  let language = [];
  let claves = Object.keys(loveLanguages);  // [ "physicalTouch", "actosOfService", "qualityTime", "wordsOfAffirmation", "receivingGifts" ]
  let valores = Object.values(loveLanguages); // 25 10 15 30 20
  let valoresOrdenados = Object.values(loveLanguages).sort((a, b) => b - a); // 30 25 30 15 10  
  let clavesOrdenadas = [];

  for(let i = 0; i < valoresOrdenados.length; i++){
    for(let j = 0; j < valoresOrdenados.length; j++){
      if(valoresOrdenados[i] == parseInt(valores[j])){
        clavesOrdenadas.push([claves[j]]);
        //language.push( { [claves[j]] : [claves[j]] = valores[j] } );
      }
    }
  }

  return [language, clavesOrdenadas, valoresOrdenados];
};

const displayLenguajesDelAmorUserOrdenados = (user, languages) => {
  let returns = ordenarLengujes(languages);
  let lenguajesOrdenados = returns[0];
  lenguajesOrdenados = toObjectLanguage(lenguajesOrdenados);
  let clavesOrdenadas = returns[1];
  [elemento1, elemento2, elemento3, elemento4, elemento5] = clavesOrdenadas;
  let valoresOrdenados = returns[2];
  [valor1, valor2, valor3, valor4, valor5] = valoresOrdenados;
  return {
    id: user.id,
    pariente: user.pariente,
    nombre: user.nombre,
    valor1: valor1,    
    valor2: valor2,
    valor3: valor3,
    valor4: valor4,
    valor5: valor5,
    elemento1: elemento1,
    elemento2: elemento2,
    elemento3: elemento3,
    elemento4: elemento4,
    elemento5: elemento5,
    totalLanguage:
      parseInt(valor1) +
      parseInt(valor2) +
      parseInt(valor3) +
      parseInt(valor4) +
      parseInt(valor5),
  };

};

const ordenarPopUpLenguajes = () => {
  buttonOrdenarPopUpLenguajes().addEventListener("click", (e) => {
    let idUser = document.getElementById("id-user").innerText;
    let userFound = recuperarUsers().find(user => user.id === idUser);
    let userMapeado = displayLenguajesDelAmorUserOrdenados(userFound, userFound.languages);
    infoPopUp.innerHTML = retornoUserLanguagesPopUpOrdenados(userMapeado);
    activarBotonesLenguajesInfo();
    randomaizerIdeasLenguajes();
    createActividadLenguajeDelAmor();
  });
};

// Info PopuUp
const displayLenguajesDelAmorUser = (userId) => {

  let user = recuperarUsers().find((userArray) => userArray.id === parseInt(userId) || userArray.id === userId.toString());
  return {
    id: user.id,
    pariente: user.pariente,
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
  };
};

const randomaizer = async (language) => {
  let idasJSON;
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
  try {
      const response = await fetch(`${URLRandomaizer}/ideas?filter=${language}`, { 
      method: "GET",
      headers: headersList
      });
      if(response.ok){
        idasJSON = await response.json();
        return idasJSON;
      }
  } catch (error) {
      return error;
  } 
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const ideaInArrayUsers = (user) => {
  let userNotArray = false;
  userExist = users.find((userJSON) => { return userJSON.id == user.id });
  if (userExist == undefined) { userNotArray = true }
  return userNotArray;
};

const sendIdea = async (languageSelectionado) => {
  let selectLanguage = await randomaizer(languageSelectionado);
  selectLanguage.forEach((lenguaje) => lenguaje.status !== true ? newArrIdeasLenguajes.push(lenguaje) : null );
  return indexAleatorio = getRandomIntInclusive(0, newArrIdeasLenguajes.length - 1);
};

const modificationSatusIdea = (obj) => {
    obj = {
      ...obj,
      status: true
    }
    return obj;
};

const UpdatedIdeas = async (id, lenguaje) => {
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
   let bodyContent = JSON.stringify(lenguaje);
  try {
    let response = await fetch(`${URLRandomaizer}/ideas/${id}`, { 
      method: "PUT",
      body: bodyContent,
      headers: headersList
    });
      if(response.ok){
        let data = await response.text();
        console.log(`Data enviada al endpoint /ideas/ por medio del metodo PUT: ${data}`);   
      }
  } catch (error) {
      console.log(error);
  } 
}; 

const resetArray = () => { return newArrIdeasLenguajes = [] };

const restablecerBanderaLenguajes = async (lenguajeSelecionado) => {
  let selectLanguage = await randomaizer(lenguajeSelecionado);
  const arrayLanguages = selectLanguage.map((object) => { return {...object, status: false } });
  arrayLanguages.forEach((language) => { UpdatedIdeas(language.id, language)});
};

const randomaizerIdeasLenguajes = () => {
  buttonIdeasPhysicalTouch().addEventListener("click", async () => {
    let indexAleatorio = await sendIdea("physicalTouch");
    if (newArrIdeasLenguajes.length > 0) {
      idea = newArrIdeasLenguajes[indexAleatorio].idea;
      alertaRandomaizerLenguajes("PhysicalTouch", idea, "../../images/physicalTouch.jpg");
      let obj = modificationSatusIdea(newArrIdeasLenguajes[indexAleatorio]);
      UpdatedIdeas(obj.id, obj);
    } else {
      reorganizarRandomaizerLenguajes("PhysicalTouch", "Se nos acabaron las ideas!, Se estan generando nuevas ideas para ", "physicalTouch", "../../images/physicalTouch.jpg");
      restablecerBanderaLenguajes("physicalTouch");
    }
    resetArray();
  });
  buttonIdeasActsOfService().addEventListener("click", async () => {
    let indexAleatorio = await sendIdea("actosOfService");
    if (newArrIdeasLenguajes.length > 0) {
      idea = newArrIdeasLenguajes[indexAleatorio].idea;
      alertaRandomaizerLenguajes("ActsOfService", idea, "../../images/actosOfService.jpg");
      let obj = modificationSatusIdea(newArrIdeasLenguajes[indexAleatorio]);
      UpdatedIdeas(obj.id, obj);
    } else {
      reorganizarRandomaizerLenguajes("ActsOfService", "Se nos acabaron las ideas!, Se estan generando nuevas ideas para ", "actsOfService", "../../images/actosOfService.jpg");
      restablecerBanderaLenguajes("actosOfService");
    }
    resetArray();
  });
  buttonIdeasQualityTime().addEventListener("click", async () => {
    let indexAleatorio = await sendIdea("qualityTime");
    if (newArrIdeasLenguajes.length > 0) {
      idea = newArrIdeasLenguajes[indexAleatorio].idea;
      alertaRandomaizerLenguajes("QualityTime", idea, "../../images/qualityTime.jpg");
      let obj = modificationSatusIdea(newArrIdeasLenguajes[indexAleatorio]);
      UpdatedIdeas(obj.id, obj);
    } else {
      reorganizarRandomaizerLenguajes("QualityTime", "Se nos acabaron las ideas!, Se estan generando nuevas ideas para ", "qualityTime", "../../images/qualityTime.jpg");
      restablecerBanderaLenguajes("qualityTime");
    }
    resetArray();
  });
  buttonIdeasWordsOfAfirmation().addEventListener("click", async () => {
    let indexAleatorio = await sendIdea("wordsOfAffirmation");
    if (newArrIdeasLenguajes.length > 0) {
      idea = newArrIdeasLenguajes[indexAleatorio].idea;
      alertaRandomaizerLenguajes("WordsOfAffirmation", idea, "../../images/wordsOfAffirmation.jpg");
      let obj = modificationSatusIdea(newArrIdeasLenguajes[indexAleatorio]);
      UpdatedIdeas(obj.id, obj);
    } else {
      reorganizarRandomaizerLenguajes("WordsOfAffirmation", "Se nos acabaron las ideas!, Se estan generando nuevas ideas para ", "wordsOfAffirmation", "../../images/wordsOfAffirmation.jpg");
      restablecerBanderaLenguajes("wordsOfAffirmation");
    }
    resetArray();
  });
  buttonIdeasRecevingGifts().addEventListener("click", async () => {
    let indexAleatorio = await sendIdea("receivingGifts");
    if (newArrIdeasLenguajes.length > 0) {
      idea = newArrIdeasLenguajes[indexAleatorio].idea;
      alertaRandomaizerLenguajes("ReceivingGifts", idea, "../../images/receivingGifts.jpg");
      let obj = modificationSatusIdea(newArrIdeasLenguajes[indexAleatorio]);
      UpdatedIdeas(obj.id, obj);
    } else {
      reorganizarRandomaizerLenguajes("ReceivingGifts", "Se nos acabaron las ideas!, Se estan generando nuevas ideas para ", "receivingGifts", "../../images/receivingGifts.jpg");
      restablecerBanderaLenguajes("receivingGifts");
    }
    resetArray();
  });
};

const loadNewActivity = (id) => {
  newActivityLanguage().innerHTML += retornoNewActivity(id);
}

const botonDeleteActividad = () => {
  if(buttonDeleteActivity() !== null){
    buttonDeleteActivity().forEach(btn => {
      btn.addEventListener("click", () => {
        const node  = document.getElementById(btn.id); // el boton tiene el mismo id que el container
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      })
    })
  }
}

const loadButtonAgregarActivity = () => {
  botonAgregarActividadDinamico().innerHTML += retornoBottonAgregarActivity();
}

const validarLenguajesComboBoxLocal = async (idContainerAdd) => {
  const selectLenguajesUser  = document.getElementById(`${idContainerAdd}-option`) ;
  if(localStorage.getItem("userLenguajes")) {
    cargarComboLenguajes(recuperarDatosLocalStorage(localStorage.getItem("userLenguajes")), selectLenguajesUser);
  } else {
    cargarComboLenguajes(await fetchDatosComboBox("../../bbdd/datosLenguajes.json", "userLenguajes", datosLenguajes), selectLenguajesUser);
  }
}

const ideaCreatedJSON = async (newIdea) => {
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
   let bodyContent = JSON.stringify(newIdea)
  try {
    let response = await fetch("https://63729a98348e947299f99ae0.mockapi.io/api/v1/ideas", { 
      method: "POST",
      body: bodyContent,
      headers: headersList
    });
      if(response.ok){
        let data = await response.text();
        console.log(data);          
      }
  } catch (error) {
      return error;
  } 
}

const datosCompletosIdea = (selectedLenguajesUserForm, selectedIdeaForm) => { 
  if(selectedLenguajesUserForm.value !== "..." && selectedIdeaForm.value !== "") { return true } 
  else { return false }
};

const crearActividad = (idContainerAdd) => {

  btnEnviar(`${idContainerAdd}-enviar`).addEventListener("click", () => {
    if(datosCompletosIdea(selectedLenguajesUser(`${idContainerAdd}-option`), selectedIdea("idea"))) {
      let ideaTemplate = {
        id: idUser(),
        targetLanguage: selectedLenguajesUser(`${idContainerAdd}-option`).value,
        idea: selectedIdea("idea").value,
        status: false
      }
      const newIdea = new IdeaLenguajesDelAmor(ideaTemplate);
      ideaCreatedJSON(newIdea);
      const idContainerActivityAdd = document.getElementById(idContainerAdd); // el boton tiene el mismo id que el container
      idContainerActivityAdd.innerHTML = "";
    }
  });  
}

const loadComponentAddActivity = () => {
  buttonCrearActividad().forEach(btn => {
    btn.addEventListener("click", () => {
      let idContainerAdd = idUser();
      loadNewActivity(idContainerAdd);
      botonDeleteActividad();
      validarLenguajesComboBoxLocal(idContainerAdd);
      crearActividad(idContainerAdd);
    })
  })
}

const createActividadLenguajeDelAmor = () => {
  if(buttonCrearActividad() !== null){
    loadComponentAddActivity();
  }
};

const popUpTable = (userId) => {
  infoPopUp.innerHTML = "";
  newActivityLanguage().innerHTML = "";
  let userMapeado = displayLenguajesDelAmorUser(userId);
  infoPopUp.innerHTML = retornoUserLanguagesPopUp(userMapeado);
  activarBotonesLenguajesInfo();
  ordenarPopUpLenguajes();
  randomaizerIdeasLenguajes();
  createActividadLenguajeDelAmor();
};

function openModal(modal) {
  if (modal == null) return "no hay modal";
  modal.style.display = "block";
  modal.classList.add("active");
  overlay.classList.add("active");
};

const activarBotonesPopUp = () => {
  const openModalButtons = document.querySelectorAll("[data-modal-target-lenguajes]");
  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(".modalLanguage"); 
      openModal(modal);
      popUpTable(button.id);
    });
  });
};
