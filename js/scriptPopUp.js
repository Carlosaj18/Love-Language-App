const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const infoPopUp = document.getElementById("modal-porcentaje");
const titleUser = document.querySelector("titleUser");

const retornoInfoPopUp = (user) => {
  return `
            <article class="container popUp">
                <div class="container titleUser"> 
                    <h1>Hi, ${user.nombre}!</h1>
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
                              <td class="border-botton">${user.physicalTouch}</td>
                              <td class="border-botton">${user.actosOfService}</td>
                              <td class="border-botton">${user.qualityTime}</td>
                              <td class="border-botton">${user.wordsOfAffirmation}</td>
                              <td class="border-botton">${user.receivingGifts}</td>
                              <td class="border-botton"right">${user.totalLanguage}</td>
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

const popUpTable = (userId) => {
  infoPopUp.innerHTML = "";
  let userMapeado = displayLenguajesDelAmorUser(userId);
  console.log('User mapeado antes de crear el HTML ', userMapeado);
  infoPopUp.innerHTML = retornoInfoPopUp(userMapeado);
};

function openModal(modal) {
  if (modal == null) return "no hay modal";
  modal.style.display = "block";
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

const activarBotonesPopUp = () => {
  // Get the button that opens the modal
  const openModalButtons = document.querySelectorAll("[data-modal-target]");
  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(button.dataset.modalTarget); // select our modal
      openModal(modal);
      console.log("Se abrio el Pop Up ");
      popUpTable(button.id);
    });
  });
};
