
const setearPreguntas = () => {
  datosPreguntas.map((obj) => {
    { return obj.status = false }
  })
}
const activarPopUpTest = () => {
    const openModalButtonsTest = document.querySelectorAll("[data-modal-target-test]");
    openModalButtonsTest.forEach((button) => {
      button.addEventListener("click", () => {
        const modal = document.querySelector(".modalTest");
        openModalTest(modal);
        //setearPreguntas();
        popUpTestLenguajes();
      });
    });
  };
