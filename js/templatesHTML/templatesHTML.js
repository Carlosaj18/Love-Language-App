
const retornoBotonEnviarTest = () => {
  return `<button  id="close-button" class="button button-outline botonEnviarTest">Enviar</button>`
}

const retornoBotonSiguientePregunta = () => {
  return `<button  id="close-button" class="button button-outline centrar">Siguiente</button>`
}

const retornoContainerRespuestas = (obj, key, value) => {
  return `<input autocomplete="off" type="radio" id="${obj.id}" name="${obj.id}" value="${key}">
          <label for="html">${value}</label><br>`
}

const retornoContainerPregunta = (obj, contador) => {
  return `<label class="pregunta" for="pregunta">Pregunta ${contador}: ${obj.pregunta} </label>`
}

const retornoContadorPregunta = (id) => {
  return `<div class="contador"> ${id}/12 </div>`
}

const retornoResultadosTest = () => { 
  return `<div class="containerValues"> 
            <div class="container"> 
              <div class="titleValueP"> PhysicalTouch </div>
              <div class="valuesCards physicalTouch">
                <div class="values">${valuePhysicalTouch}%</div>
              </div> 
            </div>
            <div class="container"> 
              <div class="titleValueA"> ActosOfService </div>
              <div class="valuesCards actosOfService">
                <div class="values">${valueActosOfService}%</div>
              </div> 
            </div>
            <div class="container"> 
              <div class="titleValueQ"> QualityTime </div>
              <div class="valuesCards qualityTime">
                <div class="values">${valueQualityTime}%</div>
              </div> 
            </div>
            <div class="container"> 
              <div class="titleValueW"> WordsOfAffirmation </div>
              <div class="valuesCards wordsOfAffirmation">
                <div class="values">${valueWordsOfAffirmation}%</div>
              </div> 
            </div>
            <div class="container"> 
              <div class="titleValueR"> ReceivingGifts </div>
              <div class="valuesCards receivingGifts">
                <div class="values">${valueReceivingGifts}%</div>
              </div> 
            </div>
          </div>
          <div class="container-footer margin">
                  <button class="button verLenguaje-Ordenar" id="guardarResultados" title="Guarda tus resultados"><a>Guardar Resultados 💗</a></button>
                  <button class="button verLenguaje-Ordenar" id="descartarResultados" title="Descarta tus resultados"><a>Eliminar Resultados ⛔</a></button>
              </div>
          `
}

// Template HTML Error Messages
const retornoFinalizacionTest = () => {
  return `<div class="card-error">
              <h2>Perfecto, haz completado tu test de los lenguajes del amor ❤️</h2>
              <h3>❗️Tus resultados los podras ver aqui abajo❕</h3>
              <h3>Gracias por usar Family App 📣 </h3>
          </div>`;
};
// Template PopuUp HTML Test Lenguajes 
const retornoFormTestUser = () => {
  return `
      <fieldset>
        <div class="containerComenzarTest"> 
            <button  id="close-button" class="button button-outline centrar comenzarTest">Comenzar Test </button>
        </div>
          <span class="pln">
              </span>
                  <div class="infoFormTest notBorder loader" > 
                    <div class="containerPregunta"> </div>
                    <div class="radio-info"> </div>
                    <div class="containerContador centrar "> </div>
                  </div>
                  <div class="botonSiguiente center separador"> </div>
                  <div class="botonEnviarFormTest center separador"> </div>
              <span class="pln">
          </span>
      </fieldset>
      `;
};
// Template HTML Users
const retornoCardUser = (user) => {
  /* Alias + Destructuracion*/
  let {
    id: id,
    pariente: pariente,
    imagen: imagen,
    nombre: nombre,
    description: description,
  } = user;

  return `<div class="card" id="${id}">
              <!--<div class="card-image"> <img class="card-image"  src='images/${imagen}' alt=" "> </div>-->
              <div class="card-tag"><div class="text">${pariente}</div></div>
              <div class="card-image">${imagen}</div>
              <div class="card-name">${nombre}</div>
              <div class="card-description">${description}</div>
              <div class="card-button-top">
                <button data-modal-target-lenguajes="#modalLanguage" class="button button-outline" id="${id}" title="Clic para ver los lengajes del amor de '${nombre}'">Lenguajes</button>
              </div>
              <div class="card-button-icons">
                  <button class="button button-clear button-add" id="${id}-add" title="Clic para agregar a tus favoritos '${nombre}'">💗</button>
                  <button class="button button-clear button-delete" id="${id}-delete" title="Clic para eliminar de tus favoritos '${nombre}'">⛔</button>
              </div>
            </div>`;
};

// Template Dashboard HTML Users
const retornoTableDashboard = ({
  id,
  imagen,
  pariente,
  nombre,
  physicalTouch,
  actosOfService,
  qualityTime,
  wordsOfAffirmation,
  receivingGifts,
  totalLanguage,
  favoritos,
}) => {
  return `
          <span class="pln"> </span>
            <tr>
              <td class="border-botton centrar">${id}</td>
              <td class="border-botton centrar">${imagen}</td>
              <td class="border-botton centrar">${pariente}</td>
              <td class="border-botton centrar">${nombre}</td>
              <td class="border-botton centrar">${physicalTouch}</td>
              <td class="border-botton centrar">${actosOfService}</td>
              <td class="border-botton centrar">${qualityTime}</td>
              <td class="border-botton centrar">${wordsOfAffirmation}</td>
              <td class="border-botton centrar">${receivingGifts}</td>
              <td class="border-botton centrar">${totalLanguage}</td>
              <td class="border-botton centrar">${favoritos}</td>
              <th><button id="${id}" data-modal-target-edit="#modalEditUser" class="button-update button-small border-botton centrar edit-style">✔️</button></th>
              <th><button id="${id}" class="button-delete button-small border-botton centrar edit-style">⛔</button></th>
            </tr>
          <span class="pln"> </span>`;
};

// Template PopuUp HTML create User
const retornoFormAddUser = () => {
  return `
      <div>
          <span class="pln">
              </span>
                  <div id="infoForm">
                      <label for="nameField">Nombre</label>
                      <input type="text" placeholder="Nombre" id="nombre">
                      <span class="pln"></span>
                      <label for="genero">Selecciona genero</label>
                      <select id="genero">
                          <option selected disabled>...</option>
                      </select>
                      <span class="pln"></span>
                      <label for="pariente">Pariente</label>
                      <select id="pariente">
                          <option selected disabled>...</option>
                      </select>
                      <span class="pln"></span>
                      <label for="description">Comment</label>
                      <textarea placeholder="Hi ..." id="description"></textarea>  
                  </div>
                  <div class="float-right">
                        <input type="checkbox" id="confirmField">
                        <label class="label-inline" for="confirmField">Send a copy to yourself</label>
                  </div>
                  <div class="center separador">
                        <button  id="close-button" class="button button-outline">Enviar</button>
                  </div>
                  <div class="center separador">
                      <p class="importe"> <span id="userCreated"></span><span class="guardar ocultar" title="Enviar por Email"></span></p>
                  </div>
              <span class="pln">
          </span>
      </div>
      `;
};

// Template PopuUp HTML edit User
const retornoUpdateUser = () => {
  return `
      <div class="edit-form">
          <span class="pln">
              </span>
                    <div>
                      <label for="id" disabled>ID</label>
                      <input type="number" placeholder="id" id="id" disabled>
                      <label for="image">Imagen</label>
                      <input type="text" placeholder="Imagen" id="imagen" disabled>
                      <label for="nameField">Nombre</label>
                      <input type="text" placeholder="Nombre" id="nombre">
                      <label for="favoritos">Favoritos</label>
                      <input type="text" placeholder="favoritos" id="favoritos" disabled>
                      <span class="pln"></span>
                      <label for="genero">Selecciona genero</label>
                      <select id="genero">
                          <option selected disabled>...</option>
                      </select>
                      <span class="pln"></span>
                      <label for="pariente">Pariente</label>
                      <select id="pariente">
                          <option selected disabled>...</option>
                      </select>
                      <span class="pln"></span>
                      <label for="description">Comment</label>
                      <textarea placeholder="Hi ..." id="description"></textarea>
                    </div>
                    <div>
                      <label for="physicalTouch">PhysicalTouch</label>
                      <input type="text" placeholder="physicalTouch" id="physicalTouch-edit">
                      <label for="actosOfService">ActosOfService</label>
                      <input type="text" placeholder="actosOfService" id="actosOfService-edit">
                      <label for="qualityTime">QualityTime</label>
                      <input type="text" placeholder="qualityTime" id="qualityTime-edit">
                      <label for="wordsOfAffirmation">wordsOfAffirmation</label>
                      <input type="text" placeholder="wordsOfAffirmation" id="wordsOfAffirmation-edit">
                      <label for="receivingGifts">receivingGifts</label>
                      <input type="text" placeholder="receivingGifts" id="receivingGifts-edit">

                      <div class="float-right separador">
                        <input type="checkbox" id="confirmField">
                        <label class="label-inline" for="confirmField">Send a copy to yourself</label>
                      </div>
                      <div class="center separador">
                        <button  id="close-button-edit" class="button button-outline">Editar</button>
                      </div>
                    </div>
              <span class="pln">
          </span>
      </div>
      `;
};

// Template PopuUp HTML display User Lenguajes
const retornoUserLanguagesPopUp = ({
  id,
  pariente,
  nombre,
  physicalTouch,
  actosOfService,
  qualityTime,
  wordsOfAffirmation,
  receivingGifts,
  totalLanguage,
}) => {
  return `<article class="container popUp">
                <div class="container titleUser"> 
                    <h1> ¿Quieres amar hoy a tu ${pariente}?</h1>
                    <p class="descriptionUser">  Estos son los 5 lenguajes del amor de ${nombre}: </p>
                    <div class="container-image">
                      <button> <img src='../images/physicalTouch.jpg'     id='physicalTouch-imagen'      class="images-languages" alt="physicalTouch" width="60" height="60"> </button> 
                      <button> <img src='../images/actosOfService.jpg'     id='actosOfService-imagen'      class="images-languages" alt="actosOfService" width="60" height="60"> </button> 
                      <button> <img src='../images/qualityTime.jpg'       id='qualityTime-imagen'        class="images-languages" alt="qualityTime" width="60" height="60"> </button> 
                      <button> <img src='../images/wordsOfAffirmation.jpg' id='wordsOfAffirmation-imagen'  class="images-languages" alt="wordsOfAffirmation" width="60" height="60"> </button> 
                      <button> <img src='../images/receivingGifts.jpg'     id='receivingGifts-imagen'      class="images-languages" alt="receivingGifts" width="60" height="60"> </button> 
                    </div>
                </div>
                <div class="containerTable">
                    <table>
                    <thead class="titleUserLanguage">
                        <tr class="header">
                          <th class="id-user">ID</th>
                          <th>Nombre</th>
                          <th>PhysicalTouch</th>
                          <th>ActosOfService</th>
                          <th>QualityTime</th>
                          <th>WordsOfAffirmation</th>
                          <th>ReceivingGifts</th>
                          <th id="tablehead" class="border-right">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody class="tbody-user">
                        <tr>
                            <td id="id-user">${id}</td>
                            <td class="border-botton centrar">${nombre}</td>
                            <td class="border-botton centrar">${physicalTouch}</td>
                            <td class="border-botton centrar">${actosOfService}</td>
                            <td class="border-botton centrar">${qualityTime}</td>
                            <td class="border-botton centrar">${wordsOfAffirmation}</td>
                            <td class="border-botton centrar">${receivingGifts}</td>
                            <td class="border-botton centrar"right">${totalLanguage}</td>
                        </tr>
                        <tr>
                            <td class="centrar">Ideas de Amor </td>
                            <td class="centrar"><button class="button-update button-small border-botton centrar edit-style" id="physicalTouch">💡</button></td>
                            <td class="centrar"><button class="button-update button-small border-botton centrar edit-style" id="actosOfService">💡</button></td>
                            <td class="centrar"><button class="button-update button-small border-botton centrar edit-style" id="qualityTime">💡</button></td>
                            <td class="centrar"><button class="button-update button-small border-botton centrar edit-style" id="wordsOfAffirmation">💡</button></td>
                            <td class="centrar"><button class="button-update button-small border-botton centrar edit-style" id="receivingGifts">💡</button></td>
                            <td class="centrar"><button class="button-update button-small border-botton centrar edit-style">💘</button></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <footer class="container-footer">
                    <button class="button verLenguaje-Ordenar">
                      <a href="#" class="centrar lenguages" id="ordenarPopUpLenguajes">Ordenar Lenguajes del Amor</a>
                    </button>
                    <button class="button  verLenguaje-Ordenar" >
                      <a class="centrar lenguages crearActividad" id="crearActividad">Crear Actividad ➕ </a>
                    </button>
                </footer>
            </article>`;
};

// Template PopuUp HTML display User Lenguajes
const retornoUserLanguagesPopUpOrdenados = ({
  id,
  pariente,
  nombre,
  elemento1,
  elemento2,
  elemento3,
  elemento4,
  elemento5,
  valor1,
  valor2,
  valor3,
  valor4,
  valor5,
  totalLanguage,
}) => {
  return `<article class="container popUp">
                <div class="container titleUser"> 
                    <h1> ¿Quieres amar hoy a tu ${pariente}?</h1>
                    <p class="descriptionUser">  Estos son los 5 lenguajes del amor de ${nombre}: </p>
                    <div class="container-image">
                      <button> <img src='../images/${elemento1}.jpg' id='${elemento1}-imagen'      class="images-languages" alt="physicalTouch" width="60" height="60"> </button> 
                      <button> <img src='../images/${elemento2}.jpg'  id='${elemento2}-imagen'      class="images-languages" alt="actosOfService" width="60" height="60"> </button> 
                      <button> <img src='../images/${elemento3}.jpg' id='${elemento3}-imagen'        class="images-languages" alt="qualityTime" width="60" height="60"> </button> 
                      <button> <img src='../images/${elemento4}.jpg'  id='${elemento4}-imagen'  class="images-languages" alt="wordsOfAffirmation" width="60" height="60"> </button> 
                      <button> <img src='../images/${elemento5}.jpg' id='${elemento5}-imagen'      class="images-languages" alt="receivingGifts" width="60" height="60"> </button> 
                    </div>
                </div>
                <div class="containerTable">
                    <table>
                    <thead class="titleUserLanguage">
                        <tr class="header">
                          <th class="id-user">ID</th>
                          <th>Nombre</th>
                          <th>${elemento1}</th> 
                          <th>${elemento2}</th>
                          <th>${elemento3}</th>
                          <th>${elemento4}</th>
                          <th>${elemento5}</th>
                          <th id="" class="border-right">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody class="tbody-user">
                        <tr>
                            <td id="id-user">${id}</td>
                            <td class="border-botton centrar">${nombre}</td>
                            <td class="border-botton centrar">${valor1}</td>
                            <td class="border-botton centrar">${valor2}</td>
                            <td class="border-botton centrar">${valor3}</td>
                            <td class="border-botton centrar">${valor4}</td>
                            <td class="border-botton centrar">${valor5}</td>
                            <td class="border-botton centrar"right">${totalLanguage}</td>
                        </tr>
                        <tr>
                            <td class="centrar">Ideas de Amor </td>
                            <td class="centrar"><button class="button-update button-small border-botton centrar edit-style" id="${elemento1}">💡</button></td>
                            <td class="centrar"><button class="button-update button-small border-botton centrar edit-style" id="${elemento2}">💡</button></td>
                            <td class="centrar"><button class="button-update button-small border-botton centrar edit-style" id="${elemento3}">💡</button></td>
                            <td class="centrar"><button class="button-update button-small border-botton centrar edit-style" id="${elemento4}">💡</button></td>
                            <td class="centrar"><button class="button-update button-small border-botton centrar edit-style" id=${elemento5}>💡</button></td>
                            <td class="centrar"><button class="button-update button-small border-botton centrar edit-style"></button>💘</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <footer class="container-footer">
                    <button class="button verLenguaje-Ordenar">
                      <a href="#" class="centrar lenguages" id="ordenarPopUpLenguajes">Ordenar Lenguajes del Amor</a>
                    </button>
                    <button class="button verLenguaje-Ordenar" >
                      <a class="centrar lenguages crearActividad" id="crearActividad">Crear Actividad ➕ </a>
                    </button>
                </footer>
            </article>`;
};

// Template HTML Error Messages
const retornoError = () => {
  return `<div class="card-error">
              <h2>Houston, tenemos un problema 🧨</h2>
              <h3>No pudimos cargar los Usuarios. 🤦🏻‍♂️</h3>
              <h3>Intenta nuevamente en unos instantes...</h3>
          </div>`;
};

// Template HTML ComboBox Genero
const retornoComboBoxGenero = (elemento) => {
  return `<option value="${elemento.valor}">${elemento.genero}</option>`;
};

// Template HTML ComboBox Pariente
const retornoComboBoxPariente = (elemento) => {
  return `<option value="${elemento.pariente}">${elemento.pariente}</option>`;
};

// Template HTML ComboBox Lenguajes 
const retornoComboBoxLenguajes = (elemento) => {
  return `<option value="${elemento.nombre}">${elemento.nombre}</option>`;
};


// Template HTML image loader
const retornoImageLoader = () => {
  return `<img class="centrado" src="images/Ellipsis-1.1s-44px.gif" width="30px">`;
};

const retornoBottonAgregarActivity = () => {
  return `<button  id="buttonAddActivity" class="button button-outline">➕</button>`
}

// Template HTML New Actividad
const retornoNewActivity = (id) => {
  return `<div id="${id}" class="containerActivity">
            <span class="pln">
                </span>
                <div class="center separador botonAgregar"> <button  id="${id}" class="button button-outline buttonDeleteActivity">❌</button> </div>
                    <div id="infoForm">
                        <label for="targetLanguage">Selecciona Lenguaje del Amor </label>
                        <select id="${id}-option" class="targetLanguage">
                            <option selected disabled>...</option>
                        </select>
                        <span class="pln"></span>
                        <label for="idea">Idea 💡</label>
                        <textarea placeholder="La actividad es ..." id="idea"></textarea>  
                    </div>
                    <div class="center separador">
                          <button  id="${id}-enviar" class="button button-outline enviar">Enviar</button>
                    </div>

                <span class="pln">
            </span>
          </div>`
}