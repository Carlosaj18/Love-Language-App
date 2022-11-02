const activarPopUpForm = () => {
    const openModalButtonsForm = document.querySelectorAll("[data-modal-target-form]");
    openModalButtonsForm.forEach((button) => {
      button.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        let opcion =  parseInt(prompt("Si desea asingar el porcentaje de sus lenguajes del amor via promt, seleccione 1, o por el formulario seleccione 2: "));
        openModalForm(modal);
        popUpForm(opcion);
      });
    });
  };