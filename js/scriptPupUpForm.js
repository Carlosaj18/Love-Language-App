const openModalButtonsForm = document.querySelectorAll("[data-modal-target]");
const closeModalButtonsForm = document.querySelectorAll("[data-close-button]");
const overlayForm = document.getElementById("overlay");
const infoPopUpForm = document.querySelector(".modal-body.form");
const addUser = document.getElementById("createUser");
const nombreUser = document.querySelector("form.fieldset#nombre");

const retornoFormAddUser = () => {
  return `
    <form>
        <span class="pln">
            </span>
                <fieldset>
                    <label for="nameField">Nombre</label>
                    <input type="text" placeholder="Nombre" id="nombre">
                    <span class="pln"></span>
                    <label for="genero">Selecciona el tipo de propiedad</label>
                    <select id="genero">
                        <option selected disabled>...</option>
                        <option value="F">Femenino</option>
                        <option value="M">Masculino</option>
                    </select>
                    <span class="pln"></span>
                    <label for="commentField">Comment</label>
                    <textarea placeholder="Hi CJ …" id="commentField"></textarea>
                    <div class="float-right">
                    <input type="checkbox" id="confirmField">
                    <label class="label-inline" for="confirmField">Send a copy to yourself</label>
                    </div>
                    <input class="button-primary" type="submit" value="Send">
                </fieldset>
            <span class="pln">
        </span>
    </form>
    `;
};

const popUpForm = () => {
  infoPopUpForm.innerHTML = "";
  infoPopUpForm.innerHTML = retornoFormAddUser();
  cargarCombo(datosGenero, selectGenero);
};

function openModalForm(modal) {
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

closeModalButtonsForm.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

const cargarCombo = (array, select) => {
  //DRY - KISS - YAGNI
  array.forEach(
    (elemento) =>
      (select.innerHTML += `<option value="${elemento.valor}">${elemento.genero}</option>`)
  );
};

const activarBotonesPopUpForm = () => {
  const openModalButtonsForm = document.querySelectorAll("[data-modal-target]");
  openModalButtonsForm.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(".modal"); // select our modal
      openModalForm(modal);
      popUpForm();
    });
  });
};

