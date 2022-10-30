
// Template HTML Users
const retornoCardUser = (user) => {
    /* Alias + Destructuracion*/
    let {
        id: id, 
        imagen: imagen,
        nombre: nombre, 
        description: description
      } = user;

    return `<div class="card" id="${id}">
              <!--<div class="card-image"> <img class="card-image"  src='${imagen}' alt=" "> </div>-->
              <div class="card-image">${imagen}</div>
              <div class="card-name">${nombre}</div>
              <div class="card-description">${description}</div>
              <div class="card-button-top">
                <button data-modal-target="#modal" class="button button-outline" id="${id}" title="Clic para ver los lengajes del amor de '${nombre}'">Lenguajes</button>
              </div>
              <div class="card-button-icons">
                  <button class="button button-clear button-add" id="${id}-add" title="Clic para agregar a tus favoritos '${nombre}'">💗</button>
                  <button class="button button-clear button-delete" id="${id}-delete" title="Clic para eliminar de tus favoritos '${nombre}'">⛔</button>
                  
              </div>
            </div>`;
};


// Template HTML Favorite Users
const retornoCardUserFavoritos = ({id, imagen, nombre, description}) => {
    return `<div class="card" id="${id}">
              <!--<img class="card-image"  src="https://media.giphy.com/media/64hEwo9SHwBjIX1J5g/giphy.gif"
                alt="GFG image" />-->
              <div class="card-image">${imagen}</div>
              <div class="card-name">${nombre}</div>
              <div class="card-description">${description}</div>
              <div class="card-button-top">
                <button data-modal-target="#modal" class="button button-outline" id="${id}" title="Clic para ver los lengajes del amor de '${nombre}'">Lenguajes</button>
              </div>
              <div class="card-button-icons">
                  <button class="button button-clear button-delete" id="${id}-delete-favorite" title="Clic para eliminar de tus favoritos '${nombre}'">⛔</button>
              </div>
            </div>`;
};
  
// Template Dashboard HTML Users
  const retornoTableDashboard = ({id, imagen, nombre, physicalTouch, actosOfService, qualityTime, wordsOfAffirmation, receivingGifts, totalLanguage}) => {
    return `
          <span class="pln"> </span>
            <tr>
              <td class="border-botton">${id}</td>
              <td class="border-botton">${imagen}</td>
              <td class="border-botton">${nombre}</td>
              <td class="border-botton">${physicalTouch}</td>
              <td class="border-botton">${actosOfService}</td>
              <td class="border-botton">${qualityTime}</td>
              <td class="border-botton">${wordsOfAffirmation}</td>
              <td class="border-botton">${receivingGifts}</td>
              <td class="border-botton">${totalLanguage}</td>
            </tr>
          <span class="pln"> </span>`;
};

// Template PopuUp HTML create User
  const retornoFormAddUser = () => {
    return `
      <div>
          <span class="pln">
              </span>
                  <div>
                      <label for="nameField">Nombre</label>
                      <input type="text" placeholder="Nombre" id="nombre">
                      <span class="pln"></span>
                      <label for="genero">Selecciona el tipo de propiedad</label>
                      <select id="genero">
                          <option selected disabled>...</option>
                      </select>
                      <span class="pln"></span>
                      <label for="description">Comment</label>
                      <textarea placeholder="Hi ..." id="description"></textarea>
                      <div class="float-right">
                      <input type="checkbox" id="confirmField">
                      <label class="label-inline" for="confirmField">Send a copy to yourself</label>
                      </div>
                      <div class="center separador">
                        <button  id="close-button" class="button button-outline">Enviar</button>
                      </div>
                      <div class="center separador">
                        <p class="importe">USUARIO CREADO <span id="userCreated"></span><span class="guardar ocultar" title="Enviar por Email"></span></p>
                      </div>
                  </div>
              <span class="pln">
          </span>
      </div>
      `;
};

// Template PopuUp HTML display User Lenguajes
const retornoInfoPopUp = ({nombre, physicalTouch, actosOfService, qualityTime, wordsOfAffirmation, receivingGifts, totalLanguage}) => {
    return `<article class="container popUp">
                <div class="container titleUser"> 
                    <h1>Hi, ${nombre}!</h1>
                    <p class="descriptionUser">  Estos son tus 5 lenguajes del amor: </p>
                </div>
                <div class="containerTable">
                    <table class="table" class="border border-success">
                    <thead class="titleUserLanguage">
                        <tr class="header">
                        <th>PhysicalTouch</th>
                        <th>ActosOfService</th>
                        <th>QualityTime</th>
                        <th>WordsOfAffirmation</th>
                        <th>ReceivingGifts</th>
                        <th class="border-right">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody class="tbody-user">
                        <tr>
                            <td class="border-botton">${physicalTouch}</td>
                            <td class="border-botton">${actosOfService}</td>
                            <td class="border-botton">${qualityTime}</td>
                            <td class="border-botton">${wordsOfAffirmation}</td>
                            <td class="border-botton">${receivingGifts}</td>
                            <td class="border-botton"right">${totalLanguage}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <footer>
                    <button class="btn verCurso">
                    <a href="#" class="reservar">Listar</a>
                    </button>
                    <button class="btn verCurso">
                    <a class="reservar">Editar</a>
                    </button>
                </footer>
            </article>`;
};