const infoPopUpTest         = document.querySelector(".modal-body.test");
const openModalButtonsTest  = document.querySelectorAll("[data-modal-target-test]");
const closeModalButtonsTest = document.querySelectorAll("[data-close-button-test]");
const comenzarTest          = () => { return document.querySelector(".comenzarTest") };
const infoFormTest          = () => { return document.querySelector(".infoFormTest") }; 
const containerPregunta     = () => { return document.querySelector(".containerPregunta")}
const containerRespuesta    = () => { return document.querySelector(".radio-info")}
const contadorPregunta      = () => { return document.querySelector(".containerContador")};
const botonSiguiente        = () => { return document.querySelector(".botonSiguiente")}
const botonEnviarFormTest   = () => { return document.querySelector(".botonEnviarFormTest")}
const botonEnviarTest       = () => { return document.querySelector(".button.button-outline.enviar") }
const notBorder             = () => { return document.querySelector(".notBorder")}
const valueCheck            = () => { return document.getElementsByTagName('input') };
const guardarResultados     = () => { return document.getElementById("guardarResultados")}
const descartarResultados     = () => { return document.getElementById("descartarResultados")}


function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }
  
  // Cerrar modal con enviar
  closeModalButtonsTest.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modalTest");
      closeModal(modal);
    });
  });

const loadBotonEnviarTest = () => retornoBotonEnviarTest();

const loadBotonSiguientePregunta = () => retornoBotonSiguientePregunta();

const cambiarEstadoPregunta = (input) => {
    datosPreguntas.map((obj) => {
        if(obj.id == input.id)
        { input.status = true }
      })
};

const displayRadioValue = () => {
    function listener() {
        //console.log('Previous:', prev ? prev.value : null);
        prev ? prev.value : null
        prev = this;
        //console.log('Current:', this.value);
        radioValueCheck.push(this.value);
    }
    var prev, rad = valueCheck();
    for(var i = 0; i < rad.length; i++) {
        rad[i].addEventListener('click', listener);
    }
}

  // LLamar datos y almacenar
  // Create HTML dinamiclly to show languages of love
const asignarLenguagesUserFormTest = (pregunta) => {
    if(pregunta.status !== true) {
        infoFormTest().classList.add("infoFormTest");
        containerPregunta().innerHTML = "";
        containerPregunta().innerHTML += retornoContainerPregunta(pregunta, contador);
        containerRespuesta().innerHTML = "";
        Object.entries(pregunta.respuestas).forEach(([key, value]) => { 
            containerRespuesta().innerHTML += retornoContainerRespuestas(pregunta, key, value);
        });
        displayRadioValue();
        cambiarEstadoPregunta(pregunta);
        contadorPregunta().innerHTML = retornoContadorPregunta(contador);
        contador++;
        botonSiguiente().innerHTML = loadBotonSiguientePregunta();
    }
  };

const getRandomIntPregunta = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const preguntaInArray = (pregunta) => {
    let preguntaNotArray = false;
    preguntaExist = newArrPreguntasTest.find((preguntaJSON) => { return preguntaJSON.id == pregunta.id });
    if (preguntaExist == undefined) { preguntaNotArray = true }
    return preguntaNotArray;
};

const selectedPregunta = () => {
    newArrPreguntasTest = [];
    datosPreguntas.forEach(pregunta => { // pregunta.status !== true && preguntaInArray(pregunta) ? newArrPreguntasTest.push(pregunta) : null); 
        if(pregunta.status !== true){ // false 
            newArrPreguntasTest.push(pregunta);
        }
    })
    return indexAleatorio = getRandomIntPregunta(0, newArrPreguntasTest.length -1);
}

const calcularResultados = () => {

    for (let language of radioValueCheck){
        // ["P", "A", "Q", "W", "R"]
        // "P" -> 100% del 10% 
        const valorPregunta = (1 * 100) /  datosPreguntas.length;

        switch(true) {
          case language == "P":
            valuePhysicalTouch += valorPregunta; 
            break;
          case language == "A":
            valueActosOfService += valorPregunta; 
            break;
          case language == "Q":
            valueQualityTime += valorPregunta; 
            break;
          case language == "W":
            valueWordsOfAffirmation += valorPregunta; 
            break;
          case language == "R":
            valueReceivingGifts += valorPregunta; 
            break;
        } 
    }

    valuePhysicalTouch = Math.ceil(valuePhysicalTouch);
    valueActosOfService = Math.ceil(valueActosOfService);
    valueQualityTime = Math.ceil(valueQualityTime );
    valueWordsOfAffirmation = Math.ceil(valueWordsOfAffirmation)
    valueReceivingGifts = Math.ceil(valueReceivingGifts);
    radioValueCheck = [];
    radioValueCheck.push(valuePhysicalTouch, valueActosOfService, valueQualityTime, valueWordsOfAffirmation, valueReceivingGifts);

}

const almacenarDatosLocalStorageResultados = (loveLanguageLocals) => { localStorage.getItem("loveLanguages") ? localStorage.setItem("loveLanguages", JSON.stringify(loveLanguageLocals)) : localStorage.setItem("loveLanguages", JSON.stringify(loveLanguages)) };

const mostrarPregunta = () => {
    let indexAleatorio = selectedPregunta();
    if (contador <= datosPreguntas.length) {
        let pregunta = newArrPreguntasTest[indexAleatorio];
        asignarLenguagesUserFormTest(pregunta);
    } else {
        //alerta("TEST", `⛔️ Terminaste el test`, "success");
        botonEnviarFormTest().innerHTML = loadBotonEnviarTest();
        botonSiguiente().style.display = "none";
        infoFormTest().innerHTML = retornoFinalizacionTest();
        botonEnviarFormTest().addEventListener("click", () => {
            calcularResultados();
            infoFormTest().innerHTML = loader();
            setTimeout(() => {
                infoFormTest().innerHTML = retornoResultadosTest();
                botonEnviarFormTest().innerHTML  = "";
                botonEnviarFormTest().style.display = "none";
                if(guardarResultados() != null) {
                    guardarResultados().addEventListener("click", () => { 
                        // Revisar como se puede recorrer con object or forEach        
                        loveLanguages.physicalTouch = radioValueCheck[0];
                        loveLanguages.actosOfService = radioValueCheck[1];
                        loveLanguages.qualityTime = radioValueCheck[2];
                        loveLanguages.wordsOfAffirmation = radioValueCheck[3];
                        loveLanguages.receivingGifts = radioValueCheck[4];
                        almacenarDatosLocalStorageResultados(loveLanguages);
                        closeModal(modalTest);
                      })
                  }
                  if(descartarResultados() != null){
                    descartarResultados().addEventListener("click", () => {
                        closeModal(modalTest);
                      })
                  }
              }, 2500);
        })
    } 
}
// Carga info del form para el test
const popUpTestLenguajes = (opcion) => {
    infoPopUpTest.innerHTML = "";
    infoPopUpTest.innerHTML = retornoFormTestUser();
    infoFormTest().classList.add("notBorder");
    comenzarTest().addEventListener("click", () => { 
        mostrarPregunta();
        comenzarTest().style.display = "none";
        botonSiguiente().addEventListener("click", () => {
            mostrarPregunta(); 
        });
    })
  };

// Opem Modal
const openModalTest = (modal) => { 
    if (modal == null) return "no hay modal";
    modal.style.display = "block";
    modal.classList.add("active");
    overlay.classList.add("active");
  };