/*** LIBRERIAS WINDOW **/

const alerta = (titulo, mensaje, icono) => {
  Swal.fire({
    icon: icono || "",
    title: titulo || "",
    text: mensaje,
    target: ".search-container",
    customClass: {
      container: "position-fixed",
    },
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 6500,
    width: "240px",
  });
};

const alertaErrorUsuarios = (icono, mensaje) => {
  Swal.fire({
    icon: icono,
    timer: 5000,
    text: mensaje,
    showConfirmButton: false,
  });
};

const alertaImageLenguajes = (title, message, photo, videoURL) => {
  Swal.fire({
    title: title,
    html: `${message}. <b><a href="//${videoURL}" target="_blank">Whatch the video</a></b>`,
    imageUrl: photo,
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Custom image",
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
    confirmButtonAriaLabel: "Entendido!",
  });
};

const alertaRandomaizerLenguajes = (title, message, photo) => {
  Swal.fire({
    title: title,
    html: `${message}`,
    imageUrl: photo,
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Custom image",
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
    confirmButtonAriaLabel: "Entendido!",
  });
};

const reorganizarRandomaizerLenguajes = (title, message, lenguaje, photo) => {
  let timerInterval;
  Swal.fire({
    title: title,
    html: `${message} ${lenguaje} <b></b>.`,
    imageUrl: photo,
    timer: 8000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
};

const alertaImageFavoritos = (user) => {
  Swal.fire({
    title: "Agregado a favoritos",
    text: `El usuario ${user.nombre} fue agregado a favoritos`,
    imageUrl: "https://unsplash.it/400/200",
    imageWidth: 400,
    imageHeight: 200,
    timer: 4500,
    imageAlt: "Custom image",
  });
};

const alertaOrdenar = (icono, mensaje) => {
  Swal.fire({
    icon: icono,
    timer: 3000,
    text: mensaje,
    showConfirmButton: false,
  });
};

const alertaOrdenarDashboard = () => {
  let timerInterval;
  Swal.fire({
    title: "Ordenando los Usuarios",
    html: "Contando total de usuarios <b></b>.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
};

const confirmDeleteUser = (id, index, list) => {
  Swal.fire({
    icon: "warning",
    text: "Are you sure to delete this user?",
    showConfirmButton: true,
  }).then(({ value }) => {
    if (value === true) return confirmationPromese(id, index, list);
  });
};

const confirmDeleteUserDashboard = (id, index, list) => {
  Swal.fire({
    icon: "warning",
    text: "Are you sure to delete this user?",
    showConfirmButton: true,
  }).then(({ value }) => {
    if (value === true) return confirmationPromeseDashboard(id, index, list);
  });
};

const toast = () => {
  Toastify({
    text: `Usuario eliminado`,
    duration: 4000,
    newWindow: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    style: {
      background: "crimson",
    },
  }).showToast();
};
