const openModalButtons  = document.querySelectorAll("[data-modal-target-lenguajes]");
const closeModalButtons = document.querySelectorAll("[data-close-button-language]");
const overlay           = document.getElementById("overlayLanguage");
const infoPopUp         = document.getElementById("modal-porcentaje");
const titleUser         = document.querySelector("titleUser");

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modalLanguage");
    closeModal(modal);
  });
});

const popUpTable = (userId) => {
  infoPopUp.innerHTML = "";
  let userMapeado = displayLenguajesDelAmorUser(userId);
  infoPopUp.innerHTML = retornoInfoPopUp(userMapeado);
};

function openModal(modal) {
  if (modal == null) return "no hay modal";
  modal.style.display = "block";
  modal.classList.add("active");
  overlay.classList.add("active");
}

const activarBotonesPopUp = () => {
  const openModalButtons = document.querySelectorAll("[data-modal-target-lenguajes]");
  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("click open")
      const modal = document.querySelector(".modalLanguage"); 
      openModal(modal);
      popUpTable(button.id);
    });
  });
};
