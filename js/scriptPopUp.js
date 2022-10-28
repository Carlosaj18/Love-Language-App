const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const infoPopUp = document.getElementById("modal-porcentaje");
const titleUser = document.querySelector("titleUser");

const popUpTable = (userId) => {
  infoPopUp.innerHTML = "";
  let userMapeado = displayLenguajesDelAmorUser(userId);
  infoPopUp.innerHTML = retornoInfoPopUp(userMapeado);
};

const popUpTableFavoritos = (userId) => {
  infoPopUp.innerHTML = "";
  let userMapeado = displayLenguajesDelAmorUserFavoritos(userId);
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
      popUpTable(button.id);
    });
  });
};
