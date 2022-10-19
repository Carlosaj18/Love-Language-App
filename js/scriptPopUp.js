const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const nameUserPopUp = document.querySelector(".titleUser");
const infoPopUp = document.querySelector(".tbody-User");

const retornoUserPopUpTitle = (user) => {
  return `<h1>${user.nombre}</h1>`;
};

const retornoInfoPopUp = (user) => {
  return `<tr>
            <td class="border-botton">${user.physicalTouch}</td>
            <td class="border-botton">${user.actosOfService}</td>
            <td class="border-botton">${user.qualityTime}</td>
            <td class="border-botton">${user.wordsOfAffirmation}</td>
            <td class="border-botton">${user.receivingGifts}</td>
            <td class="border-botton right">${user.totalLanguage}</td>
          </tr>`;
};

const popUpTable = (userId) => {
  nameUserPopUp.innerHTML = "";
  infoPopUp.innerHTML = "";
  let userMapeado = displayLenguajesDelAmorUser(userId);
  console.log('User mapeado antes de crear el HTML ', userMapeado);
  nameUserPopUp.innerHTML = retornoUserPopUpTitle(userMapeado);
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
